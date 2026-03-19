import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, TextInput, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { C, R } from '../src/theme';
import { ALBUMS, fmtPrice, fmtStars, COND_LABEL, type Album } from '../src/data';
import { useCart } from '../src/store';

const FMTS = ['Todos','LP','CD','Cassete','Colecionável'];
const CCOLOR: Record<string,string> = { NEW:C.green, USED_MINT:'#2196F3', USED_GOOD:'#FF9800', USED_FAIR:C.red };

export default function Marketplace() {
  const [search, setSearch] = useState('');
  const [fmt, setFmt] = useState('Todos');
  const [sort, setSort] = useState('popular');
  const add = useCart(s => s.addItem);

  const list = useMemo(() => {
    const fmtMap: Record<string,string> = {LP:'LP',CD:'CD',Cassete:'CASSETTE',Colecionável:'COLLECTIBLE'};
    let l = [...ALBUMS];
    if (fmt !== 'Todos') l = l.filter(a => a.format === (fmtMap[fmt]??fmt));
    if (search.trim()) { const q = search.toLowerCase(); l = l.filter(a => a.title.toLowerCase().includes(q)||a.artist.toLowerCase().includes(q)||a.genres.some(g=>g.toLowerCase().includes(q))); }
    if (sort==='price_asc') l.sort((a,b)=>a.price-b.price);
    else if (sort==='price_desc') l.sort((a,b)=>b.price-a.price);
    else if (sort==='rating') l.sort((a,b)=>b.rating-a.rating);
    else l.sort((a,b)=>b.reviews-a.reviews);
    return l;
  }, [search, fmt, sort]);

  return (
    <View style={s.wrap}>
      <View style={s.srchRow}>
        <View style={s.srchBox}>
          <Ionicons name="search-outline" size={16} color={C.text3} />
          <TextInput style={s.srchIn} placeholder="Buscar álbuns, artistas..." placeholderTextColor={C.text3} value={search} onChangeText={setSearch} />
          {search.length>0 && <TouchableOpacity onPress={()=>setSearch('')}><Ionicons name="close-circle" size={16} color={C.text3}/></TouchableOpacity>}
        </View>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.fmtRow}>
  {FMTS.map(f => (
    <TouchableOpacity key={f} style={[s.fc, fmt===f&&s.fcOn]} onPress={()=>setFmt(f)}>
      <Text style={[s.fcT, fmt===f&&s.fcTOn]}>{f}</Text>
    </TouchableOpacity>
  ))}
</ScrollView>
      <View style={s.resHd}>
        <Text style={s.resCnt}>{list.length} itens</Text>
        <TouchableOpacity style={s.sortBtn} onPress={()=>setSort(sort==='popular'?'price_asc':sort==='price_asc'?'price_desc':sort==='price_desc'?'rating':'popular')}>
          <Ionicons name="swap-vertical-outline" size={14} color={C.gold}/>
          <Text style={s.sortText}>{sort==='popular'?'Populares':sort==='price_asc'?'↑ Preço':sort==='price_desc'?'↓ Preço':'★ Avaliação'}</Text>
        </TouchableOpacity>
      </View>
      <FlatList data={list} keyExtractor={i=>i.id} showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:80}}
        ItemSeparatorComponent={()=><View style={{height:1,backgroundColor:C.border,marginHorizontal:16}}/>}
        renderItem={({item:a}) => (
          <TouchableOpacity style={s.item} onPress={()=>router.push(`/product/${a.id}`)}>
            <Image source={{uri:`https://picsum.photos/seed/${a.seed}/160/160`}} style={s.cover}/>
            <View style={s.info}>
              <View style={s.badges}>
                <View style={s.fmtBadge}><Text style={s.fmtText}>{a.format}</Text></View>
                <View style={[s.condBadge,{backgroundColor:CCOLOR[a.condition]+'22'}]}><Text style={[s.condText,{color:CCOLOR[a.condition]}]}>{COND_LABEL[a.condition].split(' ')[1]??COND_LABEL[a.condition]}</Text></View>
                {a.stock<=2&&<Text style={s.lowStock}>Últimas {a.stock}!</Text>}
              </View>
              <Text style={s.title} numberOfLines={1}>{a.title}</Text>
              <Text style={s.artist}>{a.artist} · {a.year}</Text>
              <View style={s.ratRow}><Text style={s.stars}>{fmtStars(a.rating)}</Text><Text style={s.rat}>{a.rating} ({a.reviews.toLocaleString()})</Text></View>
              <View style={s.foot}>
                <View>{a.origPrice&&<Text style={s.orig}>{fmtPrice(a.origPrice)}</Text>}<Text style={s.price}>{fmtPrice(a.price)}</Text></View>
                <TouchableOpacity style={s.cartBtn} onPress={()=>add(a)}>
  <Text style={s.cartBtnText}>+ Carrinho</Text>
</TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const s = StyleSheet.create({
  wrap:{flex:1,backgroundColor:C.black},
  srchRow:{padding:12,paddingBottom:6},
  srchBox:{flexDirection:'row',alignItems:'center',gap:10,backgroundColor:C.s2,borderRadius:22,paddingHorizontal:14,borderWidth:1,borderColor:C.border2},
  srchIn:{flex:1,color:C.cream,fontSize:14,paddingVertical:10},
  fmtRow:{paddingHorizontal:12,paddingBottom:10,paddingTop:2,gap:8,flexDirection:'row'},
  fc:{paddingHorizontal:12,paddingVertical:5,borderRadius:R.xxl,backgroundColor:C.s2,borderWidth:1,borderColor:C.border2},
  fcOn:{backgroundColor:C.gold,borderColor:C.gold}, fcT:{color:C.text2,fontSize:12}, fcTOn:{color:C.black,fontWeight:'700'},
  resHd:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:16,paddingVertical:8,borderTopWidth:1,borderBottomWidth:1,borderColor:C.border},
  resCnt:{color:C.text3,fontSize:12},
  sortBtn:{flexDirection:'row',alignItems:'center',gap:5}, sortText:{color:C.gold,fontSize:12,fontWeight:'500'},
  item:{flexDirection:'row',padding:14,gap:12},
  cover:{width:72,height:72,borderRadius:R.md,backgroundColor:C.s2},
  info:{flex:1},
  badges:{flexDirection:'row',alignItems:'center',gap:5,marginBottom:4},
  fmtBadge:{backgroundColor:C.s3,paddingHorizontal:6,paddingVertical:2,borderRadius:3},
  fmtText:{color:C.gold,fontSize:10,fontWeight:'600'},
  condBadge:{paddingHorizontal:6,paddingVertical:2,borderRadius:3},
  condText:{fontSize:10,fontWeight:'600'},
  lowStock:{color:C.red,fontSize:10,fontWeight:'600'},
  title:{color:C.cream,fontSize:15,fontWeight:'600'},
  artist:{color:C.text2,fontSize:12,marginTop:2,marginBottom:4},
  ratRow:{flexDirection:'row',alignItems:'center',gap:5,marginBottom:8},
  stars:{color:C.gold,fontSize:11}, rat:{color:C.text3,fontSize:11},
  foot:{flexDirection:'row',alignItems:'flex-end',justifyContent:'space-between'},
  orig:{color:C.text3,fontSize:11,textDecorationLine:'line-through'},
  price:{color:C.cream,fontSize:18,fontWeight:'700'},
  cartBtn:{backgroundColor:C.gold,paddingHorizontal:12,paddingVertical:7,borderRadius:R.lg},
cartBtnText:{color:C.black,fontSize:12,fontWeight:'700'},
});
