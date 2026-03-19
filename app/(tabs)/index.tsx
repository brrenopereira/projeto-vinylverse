import React, { useState } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, StyleSheet, Image, RefreshControl } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { C, R, CARD_W, SW } from '../src/theme';
import { ALBUMS, fmtPrice, fmtStars, type Album } from '../src/data';
import { useCart } from '../src/store';

function HeroCard({ a }: { a: Album }) {
  const add = useCart(s => s.addItem);
  return (
    <TouchableOpacity style={[st.hero, { width: SW - 32 }]} onPress={() => router.push(`/product/${a.id}`)} activeOpacity={.92}>
      <Image source={{ uri: `https://picsum.photos/seed/${a.seed}/800/500` }} style={st.heroCover} />
      <LinearGradient colors={['transparent', 'rgba(8,8,8,.97)']} style={st.heroGrad}>
        <View style={st.heroBadge}><Text style={st.heroBadgeText}>🔥 MAIS VENDIDO</Text></View>
        <Text style={st.heroTitle} numberOfLines={1}>{a.title}</Text>
        <Text style={st.heroArtist}>{a.artist}</Text>
        <View style={st.heroMeta}>
          <View style={st.chip}><Text style={st.chipText}>{a.format}</Text></View>
          <View style={st.chip}><Text style={st.chipText}>{a.year}</Text></View>
          <Text style={st.stars}>{fmtStars(a.rating)}</Text>
          <Text style={st.rat}>{a.rating}</Text>
        </View>
        <View style={st.heroFoot}>
          <Text style={st.heroPrice}>{fmtPrice(a.price)}</Text>
          <TouchableOpacity style={st.heroCartBtn} onPress={() => add(a)}>
            <Ionicons name="bag-add" size={18} color={C.black} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

function Card({ a }: { a: Album }) {
  const add = useCart(s => s.addItem);
  return (
    <TouchableOpacity style={[st.card, { width: CARD_W }]} onPress={() => router.push(`/product/${a.id}`)} activeOpacity={.85}>
      <Image source={{ uri: `https://picsum.photos/seed/${a.seed}/300/300` }} style={st.cardImg} />
      <View style={st.fmtPill}><Text style={st.fmtText}>{a.format}</Text></View>
      {a.sale && <View style={st.salePill}><Text style={st.saleText}>SALE</Text></View>}
      <View style={st.cardInfo}>
        <Text style={st.cardTitle} numberOfLines={1}>{a.title}</Text>
        <Text style={st.cardArtist} numberOfLines={1}>{a.artist}</Text>
        <View style={st.cardFoot}>
          <Text style={st.cardPrice}>{fmtPrice(a.price)}</Text>
          <TouchableOpacity style={st.miniBtn} onPress={() => add(a)}><Ionicons name="add" size={15} color={C.black} /></TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function Sec({ title, sub, onAll }: { title: string; sub?: string; onAll?: () => void }) {
  return (
    <View style={st.secHd}>
      <View><Text style={st.secTitle}>{title}</Text>{sub && <Text style={st.secSub}>{sub}</Text>}</View>
      {onAll && <TouchableOpacity onPress={onAll}><Text style={st.seeAll}>Ver tudo</Text></TouchableOpacity>}
    </View>
  );
}

export default function Home() {
  const [ref, setRef] = useState(false);
  const trending = [...ALBUMS].sort((a,b) => b.reviews - a.reviews);
  const newArr   = ALBUMS.slice(3).concat(ALBUMS.slice(0,3));
  const editors  = ALBUMS.filter(a => a.criticRating >= 4.8);

  return (
    <ScrollView style={st.wrap} showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={ref} onRefresh={() => { setRef(true); setTimeout(()=>setRef(false),800); }} tintColor={C.gold} />}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={st.filters}>
        {['Todos','LP','CD','Cassete','Jazz','Rock','Eletrônico'].map((f,i) => (
          <TouchableOpacity key={f} style={[st.fchip, i===0 && st.fchipOn]}>
            <Text style={[st.fchipText, i===0 && st.fchipTextOn]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={st.heroWrap}><HeroCard a={trending[0]} /></View>

      <Sec title="🔥 Em Alta" sub="Mais buscados esta semana" onAll={() => router.push('/marketplace')} />
      <FlatList data={trending} horizontal showsHorizontalScrollIndicator={false} keyExtractor={i=>i.id} contentContainerStyle={{ paddingHorizontal:12 }} renderItem={({item}) => <Card a={item} />} />

      <Sec title="🆕 Chegadas Recentes" sub="Adicionados recentemente" onAll={() => router.push('/marketplace')} />
      <FlatList data={newArr} horizontal showsHorizontalScrollIndicator={false} keyExtractor={i=>i.id} contentContainerStyle={{ paddingHorizontal:12 }} renderItem={({item}) => <Card a={item} />} />

      <Sec title="🎯 Escolhas dos Editores" sub="Nota máxima pela crítica" onAll={() => router.push('/discover')} />
      <FlatList data={editors} horizontal showsHorizontalScrollIndicator={false} keyExtractor={i=>i.id} contentContainerStyle={{ paddingHorizontal:12 }} renderItem={({item}) => <Card a={item} />} />

      <View style={st.demoBanner}>
        <Ionicons name="flask-outline" size={14} color={C.gold} />
        <Text style={st.demoText}>Modo Demo — dados fictícios, sem pagamentos reais</Text>
      </View>
      <View style={{ height:24 }} />
    </ScrollView>
  );
}

const st = StyleSheet.create({
  wrap: { flex:1, backgroundColor:C.black },
  filters: { paddingHorizontal:12, paddingVertical:12 },
  fchip: { paddingHorizontal:16, paddingVertical:7, borderRadius:R.xxl, backgroundColor:C.s2, marginHorizontal:3, borderWidth:1, borderColor:C.border2 },
  fchipOn: { backgroundColor:C.gold, borderColor:C.gold },
  fchipText: { color:C.text2, fontSize:13 },
  fchipTextOn: { color:C.black, fontWeight:'700' },
  heroWrap: { paddingHorizontal:16, marginBottom:4 },
  hero: { height:200, borderRadius:R.xxl, overflow:'hidden', backgroundColor:C.s2 },
  heroCover: { width:'100%', height:'100%', position:'absolute' },
  heroGrad: { position:'absolute', bottom:0, left:0, right:0, padding:16, paddingTop:48 },
  heroBadge: { backgroundColor:C.gold, paddingHorizontal:8, paddingVertical:3, borderRadius:3, alignSelf:'flex-start', marginBottom:6 },
  heroBadgeText: { color:C.black, fontSize:10, fontWeight:'800', letterSpacing:1 },
  heroTitle: { color:'#fff', fontSize:22, fontWeight:'700' },
  heroArtist: { color:C.gold, fontSize:13, marginTop:2 },
  heroMeta: { flexDirection:'row', alignItems:'center', marginTop:6, gap:8 },
  chip: { backgroundColor:C.s3, paddingHorizontal:7, paddingVertical:2, borderRadius:3 },
  chipText: { color:C.text2, fontSize:11 },
  stars: { color:C.gold, fontSize:11 },
  rat: { color:C.text2, fontSize:11 },
  heroFoot: { flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop:10 },
  heroPrice: { color:'#fff', fontSize:22, fontWeight:'700' },
  heroCartBtn: { width:38, height:38, borderRadius:19, backgroundColor:C.gold, alignItems:'center', justifyContent:'center' },
  secHd: { flexDirection:'row', justifyContent:'space-between', alignItems:'flex-start', paddingHorizontal:16, paddingTop:20, paddingBottom:10 },
  secTitle: { color:C.cream, fontSize:17, fontWeight:'700' },
  secSub: { color:C.text3, fontSize:12, marginTop:2 },
  seeAll: { color:C.gold, fontSize:13, fontWeight:'600' },
  card: { marginHorizontal:4, backgroundColor:C.s2, borderRadius:R.lg, overflow:'hidden', borderWidth:1, borderColor:C.border },
  cardImg: { width:'100%', aspectRatio:1.1 },
  fmtPill: { position:'absolute', top:7, left:7, backgroundColor:'rgba(8,8,8,.75)', paddingHorizontal:6, paddingVertical:2, borderRadius:3 },
  fmtText: { color:C.gold, fontSize:9, fontWeight:'700', letterSpacing:1 },
  salePill: { position:'absolute', top:7, right:7, backgroundColor:C.red, paddingHorizontal:6, paddingVertical:2, borderRadius:3 },
  saleText: { color:'#fff', fontSize:9, fontWeight:'700' },
  cardInfo: { padding:10 },
  cardTitle: { color:C.cream, fontSize:13, fontWeight:'500' },
  cardArtist: { color:C.text3, fontSize:11, marginTop:2 },
  cardFoot: { flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop:8 },
  cardPrice: { color:C.gold, fontSize:14, fontWeight:'700' },
  miniBtn: { width:26, height:26, borderRadius:13, backgroundColor:C.gold, alignItems:'center', justifyContent:'center' },
  demoBanner: { flexDirection:'row', alignItems:'center', gap:8, marginHorizontal:16, marginTop:20, padding:12, backgroundColor:C.s1, borderRadius:R.md, borderWidth:1, borderColor:'rgba(200,169,110,.2)' },
  demoText: { color:C.gold, fontSize:12, flex:1, opacity:.8 },
});
