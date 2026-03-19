// discover.tsx
import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { C, R, SW } from '../src/theme';
import { ALBUMS, fmtPrice, type Album } from '../src/data';
import { useCart } from '../src/store';

const CARD = (SW - 36) / 2;
const FMTS = ['Todos','LP','CD','Cassete'];
const GENRES = ['Todos','Jazz','Rock','Eletrônico','Hip Hop'];

export default function Discover() {
  const [fmt, setFmt] = useState('Todos');
  const [genre, setGenre] = useState('Todos');
  const add = useCart(s => s.addItem);

  const list = useMemo(() => {
    let l = [...ALBUMS];
    if (fmt !== 'Todos') { const m: Record<string,string> = {LP:'LP',CD:'CD',Cassete:'CASSETTE'}; l = l.filter(a => a.format === (m[fmt]??fmt)); }
    if (genre !== 'Todos') l = l.filter(a => a.genres.some(g => g.toLowerCase().includes(genre.toLowerCase())));
    return l;
  }, [fmt, genre]);

  return (
    <View style={s.wrap}>
      <View style={s.filterBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal:10, paddingTop:8 }}>
          {FMTS.map(f => <TouchableOpacity key={f} style={[s.fc, fmt===f&&s.fcOn]} onPress={()=>setFmt(f)}><Text style={[s.fcT, fmt===f&&s.fcTOn]}>{f}</Text></TouchableOpacity>)}
        </ScrollView>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal:10, paddingTop:4, paddingBottom:8 }}>
          {GENRES.map(g => <TouchableOpacity key={g} style={[s.fc, genre===g&&s.fcOn]} onPress={()=>setGenre(g)}><Text style={[s.fcT, genre===g&&s.fcTOn]}>{g}</Text></TouchableOpacity>)}
        </ScrollView>
      </View>
      <FlatList data={list} keyExtractor={i=>i.id} numColumns={2} columnWrapperStyle={s.row} contentContainerStyle={s.grid} showsVerticalScrollIndicator={false}
        renderItem={({item:a}) => (
          <TouchableOpacity style={[s.card,{width:CARD}]} onPress={()=>router.push(`/product/${a.id}`)} activeOpacity={.9}>
            <Image source={{uri:`https://picsum.photos/seed/${a.seed}/400/600`}} style={s.img} />
            <LinearGradient colors={['transparent','rgba(8,8,8,.97)']} style={s.grad}>
              <View style={s.fmtBadge}><Text style={s.fmtText}>{a.format}</Text></View>
              <Text style={s.title} numberOfLines={1}>{a.title}</Text>
              <Text style={s.artist}>{a.artist}</Text>
              <View style={s.foot}>
                <Text style={s.price}>{fmtPrice(a.price)}</Text>
                <TouchableOpacity style={s.cartBtn} onPress={()=>add(a)}><Ionicons name="bag-add" size={14} color={C.black}/></TouchableOpacity>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const s = StyleSheet.create({
  wrap:{flex:1,backgroundColor:C.black}, filterBar:{borderBottomWidth:1,borderBottomColor:C.border},
  fc:{paddingHorizontal:14,paddingVertical:6,borderRadius:R.xxl,backgroundColor:C.s2,marginHorizontal:3,borderWidth:1,borderColor:C.border2,marginBottom:4},
  fcOn:{backgroundColor:C.gold,borderColor:C.gold}, fcT:{color:C.text2,fontSize:12}, fcTOn:{color:C.black,fontWeight:'700'},
  grid:{padding:8,paddingBottom:80}, row:{justifyContent:'space-between',marginHorizontal:4},
  card:{height:CARD*1.3,borderRadius:R.lg,overflow:'hidden',marginBottom:8,backgroundColor:C.s2},
  img:{width:'100%',height:'100%',position:'absolute'}, grad:{position:'absolute',bottom:0,left:0,right:0,padding:10,paddingTop:40},
  fmtBadge:{backgroundColor:'rgba(8,8,8,.75)',paddingHorizontal:6,paddingVertical:2,borderRadius:3,alignSelf:'flex-start',marginBottom:4},
  fmtText:{color:C.gold,fontSize:9,fontWeight:'700',letterSpacing:.8},
  title:{color:'#fff',fontSize:13,fontWeight:'600'}, artist:{color:C.text2,fontSize:11,marginTop:1},
  foot:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:6},
  price:{color:'#fff',fontSize:14,fontWeight:'700'},
  cartBtn:{width:26,height:26,borderRadius:13,backgroundColor:C.gold,alignItems:'center',justifyContent:'center'},
});
