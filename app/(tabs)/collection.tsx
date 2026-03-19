// collection.tsx
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';
import { C, R, SW } from '../src/theme';
import { ALBUMS } from '../src/data';
const ITEM = (SW - 32) / 3;

export default function Collection() {
  const [tab, setTab] = useState(0);
  const lists = [ALBUMS.slice(0,6), ALBUMS.slice(4,9), ALBUMS.slice(0,9)];
  const list = lists[tab];
  return (
    <View style={s.wrap}>
      <View style={s.tabs}>
        {['Coleção','Wishlist','Histórico'].map((t,i)=>(
          <TouchableOpacity key={t} style={[s.tab,tab===i&&s.tabOn]} onPress={()=>setTab(i)}>
            <Text style={[s.tabT,tab===i&&s.tabTOn]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={s.stats}>
        <View style={s.stat}><Text style={s.statV}>{list.length}</Text><Text style={s.statL}>{['coleção','wishlist','histórico'][tab]}</Text></View>
        <View style={s.div}/>
        <View style={s.stat}><Text style={s.statV}>R$ {ALBUMS.slice(0,6).reduce((s,a)=>s+a.price,0).toFixed(0)}</Text><Text style={s.statL}>valor estimado</Text></View>
        <View style={s.div}/>
        <View style={s.stat}><Text style={s.statV}>{new Set(list.map(a=>a.artist)).size}</Text><Text style={s.statL}>artistas</Text></View>
      </View>
      <FlatList data={list} keyExtractor={i=>i.id} numColumns={3} contentContainerStyle={s.grid} showsVerticalScrollIndicator={false}
        renderItem={({item:a})=>(
          <TouchableOpacity style={[s.item,{width:ITEM}]} onPress={()=>router.push(`/product/${a.id}`)}>
            <Image source={{uri:`https://picsum.photos/seed/${a.seed}/200/200`}} style={s.img}/>
            <View style={s.fp}><Text style={s.ft}>{a.format}</Text></View>
            <Text style={s.it} numberOfLines={1}>{a.title}</Text>
            <Text style={s.ia} numberOfLines={1}>{a.artist}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const s = StyleSheet.create({
  wrap:{flex:1,backgroundColor:C.black},
  tabs:{flexDirection:'row',borderBottomWidth:1,borderBottomColor:C.border},
  tab:{flex:1,paddingVertical:12,alignItems:'center',borderBottomWidth:2,borderBottomColor:'transparent'},
  tabOn:{borderBottomColor:C.gold},
  tabT:{color:C.text2,fontSize:13}, tabTOn:{color:C.gold,fontWeight:'600'},
  stats:{flexDirection:'row',padding:14,borderBottomWidth:1,borderBottomColor:C.border},
  stat:{flex:1,alignItems:'center'},
  statV:{color:C.gold,fontSize:18,fontWeight:'700'}, statL:{color:C.text3,fontSize:11,marginTop:2},
  div:{width:1,backgroundColor:C.border},
  grid:{padding:8,paddingBottom:80},
  item:{margin:4},
  img:{width:'100%',aspectRatio:1,borderRadius:R.md,backgroundColor:C.s2},
  fp:{position:'absolute',top:6,left:6,backgroundColor:'rgba(8,8,8,.75)',paddingHorizontal:5,paddingVertical:2,borderRadius:3},
  ft:{color:C.gold,fontSize:8,fontWeight:'700'},
  it:{color:C.text,fontSize:11,fontWeight:'500',marginTop:5}, ia:{color:C.text3,fontSize:10},
});
