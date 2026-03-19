import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { C, R } from '../src/theme';
import { ALBUMS, fmtPrice, fmtStars, COND_LABEL, type Album } from '../src/data';
import { useCart } from '../src/store';

type Tab = 'tracklist' | 'reviews' | 'details';

const PRO_REVIEWS = [
  { id:'1', albumId:'1', src:'Pitchfork', rating:'10/10', quote:'An essential recording. Miles Davis invented a new language for jazz.' },
  { id:'2', albumId:'1', src:'Rolling Stone', rating:'5★', quote:'The best-selling jazz album of all time for very good reason.' },
  { id:'3', albumId:'2', src:'Pitchfork', rating:'10/10', quote:'A landmark record that announced the future of rock music.' },
  { id:'4', albumId:'3', src:'Pitchfork', rating:'9.9/10', quote:'A grand artistic statement that synthesizes the history of black music.' },
];

const USER_REVIEWS = [
  { id:'r1', albumId:'1', user:'vinylhead_br', img:11, rating:5, title:'A cornerstone of jazz', body:'There are few albums that can genuinely claim to have changed music. Kind of Blue is one of them.', likes:142 },
  { id:'r2', albumId:'1', user:'collector_sp', img:22, rating:5, title:'Mandatory for any collection', body:'Got this 180g reissue and the sound quality is stunning.', likes:89 },
  { id:'r3', albumId:'2', user:'digital_to_analog', img:33, rating:5, title:'The soundtrack to the millennium', body:'OK Computer feels like a prophecy. Released in 1997, it predicted our disconnected world with eerie precision.', likes:234 },
];

export default function Product() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const album = ALBUMS.find(a => a.id === id);
  const addItem = useCart(s => s.addItem);
  const cartItems = useCart(s => s.items);
  const [tab, setTab] = useState<Tab>('tracklist');
  const [qty, setQty] = useState(1);
  const [inCart, setInCart] = useState(cartItems.some(i => i.album.id === id));
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  if (!album) return (
    <View style={{ flex:1, backgroundColor:C.black, alignItems:'center', justifyContent:'center' }}>
      <Text style={{ color:C.text }}>Álbum não encontrado</Text>
      <TouchableOpacity onPress={() => router.back()}><Text style={{ color:C.gold, marginTop:8 }}>Voltar</Text></TouchableOpacity>
    </View>
  );

  const similar = ALBUMS.filter(a => a.id !== id && a.genres.some(g => album.genres.includes(g))).slice(0, 8);
  const proRevs = PRO_REVIEWS.filter(r => r.albumId === id);
  const userRevs = USER_REVIEWS.filter(r => r.albumId === id);

  const handleAdd = () => { addItem(album); setInCart(true); };

  return (
    <View style={{ flex:1, backgroundColor:C.black }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={s.heroWrap}>
          <Image source={{ uri:`https://picsum.photos/seed/${album.seed}/600/600` }} style={s.heroCover} />
          <LinearGradient colors={['rgba(8,8,8,.4)', C.black]} style={s.heroGrad} />
          <TouchableOpacity style={s.backBtn} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={22} color={C.cream} />
          </TouchableOpacity>
        </View>

        <View style={s.body}>
          {/* Format + Condition */}
          <View style={s.topRow}>
            <View style={s.fmtPill}><Text style={s.fmtText}>{album.format}</Text></View>
            <Text style={s.condText}>{COND_LABEL[album.condition]}</Text>
          </View>

          <Text style={s.title}>{album.title}</Text>
          <Text style={s.artist}>{album.artist}</Text>

          {/* Meta chips */}
          <View style={s.chips}>
            {[album.year.toString(), album.label, album.condition === 'NEW' ? 'Novo' : 'Usado'].map(m => (
              <View key={m} style={s.chip}><Text style={s.chipText}>{m}</Text></View>
            ))}
          </View>

          {/* Ratings */}
          <View style={s.ratRow}>
            <View style={s.ratBlk}>
              <Text style={s.ratStars}>{fmtStars(album.rating)}</Text>
              <Text style={s.ratVal}>{album.rating.toFixed(1)}</Text>
              <Text style={s.ratLbl}>Usuários</Text>
              <Text style={s.ratCnt}>{album.reviews.toLocaleString()} reviews</Text>
            </View>
            <View style={s.ratDiv} />
            <View style={s.ratBlk}>
              <Text style={s.ratStars}>{fmtStars(album.criticRating)}</Text>
              <Text style={s.ratVal}>{album.criticRating.toFixed(1)}</Text>
              <Text style={s.ratLbl}>Crítica</Text>
              <Text style={s.ratCnt}>{proRevs.length || 2} publicações</Text>
            </View>
          </View>

          {/* Genres */}
          <View style={s.genres}>
            {album.genres.map(g => <View key={g} style={s.genre}><Text style={s.genreText}>{g}</Text></View>)}
          </View>

          {/* Seller */}
          <View style={s.seller}>
            <Ionicons name="storefront-outline" size={16} color={C.gold} />
            <View style={{ flex:1, marginLeft:10 }}>
              <Text style={s.sellerName}>{album.seller}</Text>
              <Text style={s.sellerSub}>Vendedor verificado</Text>
            </View>
            <Text style={s.sellerRat}>★ {album.sellerRating}</Text>
          </View>

          <Text style={s.desc}>{album.desc}</Text>

          {/* Tabs */}
          <View style={s.tabs}>
            {(['tracklist','reviews','details'] as Tab[]).map(t => (
              <TouchableOpacity key={t} style={[s.tab, tab===t && s.tabOn]} onPress={() => setTab(t)}>
                <Text style={[s.tabText, tab===t && s.tabTextOn]}>
                  {t === 'tracklist' ? 'Tracklist' : t === 'reviews' ? 'Reviews' : 'Detalhes'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Tab content */}
          {tab === 'tracklist' && (
            <View>
              {album.tracklist.map(t => (
                <View key={t.pos} style={s.track}>
                  <Text style={s.trackPos}>{t.pos}</Text>
                  <Text style={s.trackTitle} numberOfLines={1}>{t.title}</Text>
                  <Text style={s.trackDur}>{t.dur}</Text>
                </View>
              ))}
            </View>
          )}

          {tab === 'reviews' && (
            <View>
              {proRevs.length > 0 && (
                <>
                  <Text style={s.revSec}>Crítica Especializada</Text>
                  {proRevs.map(r => (
                    <View key={r.id} style={s.proRev}>
                      <View style={s.proRevHdr}>
                        <Text style={s.proRevSrc}>{r.src}</Text>
                        <View style={s.proRevBadge}><Text style={s.proRevRating}>{r.rating}</Text></View>
                      </View>
                      <Text style={s.proRevQuote}>"{r.quote}"</Text>
                    </View>
                  ))}
                  <Text style={[s.revSec, { marginTop:16 }]}>Avaliações de Usuários</Text>
                </>
              )}
              {userRevs.length > 0 ? userRevs.map(r => (
                <View key={r.id} style={s.rev}>
                  <View style={s.revHdr}>
                    <Image source={{ uri:`https://i.pravatar.cc/60?img=${r.img}` }} style={s.revAva} />
                    <View style={{ flex:1 }}>
                      <Text style={s.revUser}>{r.user}</Text>
                    </View>
                    <Text style={s.revStars}>{fmtStars(r.rating)}</Text>
                  </View>
                  <Text style={s.revTitle}>{r.title}</Text>
                  <Text style={s.revBody}>{r.body}</Text>
                  <TouchableOpacity style={s.likeBtn} onPress={() => setLiked(prev => ({ ...prev, [r.id]: !prev[r.id] }))}>
                    <Ionicons name={liked[r.id] ? 'heart' : 'heart-outline'} size={14} color={liked[r.id] ? C.red : C.text3} />
                    <Text style={[s.likeCount, liked[r.id] && { color:C.red }]}>{liked[r.id] ? r.likes+1 : r.likes}</Text>
                  </TouchableOpacity>
                </View>
              )) : <Text style={s.noRevs}>Seja o primeiro a avaliar!</Text>}
            </View>
          )}

          {tab === 'details' && (
            <View>
              {[['Artista',album.artist],['Formato',album.format],['Ano',album.year],['Gravadora',album.label],['Condição',COND_LABEL[album.condition]],['Gêneros',album.genres.join(', ')],['Estoque',`${album.stock} disponíveis`],['Vendedor',album.seller]].map(([l,v]) => (
                <View key={l as string} style={s.detRow}>
                  <Text style={s.detL}>{l}</Text>
                  <Text style={s.detV} numberOfLines={2}>{v}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Similar */}
          <Text style={s.simTitle}>Você também pode gostar</Text>
          <FlatList data={similar} horizontal showsHorizontalScrollIndicator={false} keyExtractor={i=>i.id}
            contentContainerStyle={{ paddingLeft:2 }}
            renderItem={({ item:a }) => (
              <TouchableOpacity style={s.simCard} onPress={() => router.push(`/product/${a.id}`)}>
                <Image source={{ uri:`https://picsum.photos/seed/${a.seed}/200/200` }} style={s.simImg} />
                <Text style={s.simTitle2} numberOfLines={1}>{a.title}</Text>
                <Text style={s.simArtist}>{a.artist}</Text>
                <Text style={s.simPrice}>{fmtPrice(a.price)}</Text>
              </TouchableOpacity>
            )}
          />
          <View style={{ height:120 }} />
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={s.cta}>
        <View>
          {album.origPrice && <Text style={s.origPrice}>{fmtPrice(album.origPrice)}</Text>}
          <Text style={s.price}>{fmtPrice(album.price)}</Text>
          <Text style={s.stock}>{album.stock} em estoque</Text>
        </View>
        <View style={s.ctaRight}>
          <TouchableOpacity style={s.wishBtn}>
            <Ionicons name="heart-outline" size={22} color={C.gold} />
          </TouchableOpacity>
          <TouchableOpacity style={[s.addBtn, inCart && s.addBtnIn]} onPress={handleAdd}>
            <Ionicons name={inCart ? 'checkmark' : 'bag-add'} size={20} color={C.black} />
            <Text style={s.addBtnText}>{inCart ? 'No Carrinho' : 'Adicionar'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  heroWrap: { height:320, position:'relative' },
  heroCover: { width:'100%', height:'100%' },
  heroGrad: { position:'absolute', bottom:0, left:0, right:0, height:160 },
  backBtn: { position:'absolute', top:52, left:16, width:38, height:38, borderRadius:19, backgroundColor:'rgba(0,0,0,.6)', alignItems:'center', justifyContent:'center' },
  body: { padding:16 },
  topRow: { flexDirection:'row', alignItems:'center', gap:8, marginBottom:8 },
  fmtPill: { backgroundColor:C.goldBg, paddingHorizontal:10, paddingVertical:4, borderRadius:R.sm, borderWidth:1, borderColor:'rgba(200,169,110,.25)' },
  fmtText: { color:C.gold, fontSize:11, fontWeight:'600', letterSpacing:.5 },
  condText: { color:C.text2, fontSize:12 },
  title: { fontSize:26, fontWeight:'700', color:C.cream, marginBottom:4 },
  artist: { fontSize:17, color:C.gold, marginBottom:12 },
  chips: { flexDirection:'row', gap:6, flexWrap:'wrap', marginBottom:14 },
  chip: { backgroundColor:C.s2, paddingHorizontal:10, paddingVertical:4, borderRadius:R.sm, borderWidth:1, borderColor:C.border2 },
  chipText: { color:C.text2, fontSize:11 },
  ratRow: { flexDirection:'row', backgroundColor:C.s1, borderRadius:R.lg, padding:14, marginBottom:14, borderWidth:1, borderColor:C.border },
  ratBlk: { flex:1, alignItems:'center' },
  ratDiv: { width:1, backgroundColor:C.border, marginHorizontal:12 },
  ratStars: { color:C.gold, fontSize:14, letterSpacing:.5 },
  ratVal: { color:C.cream, fontSize:22, fontWeight:'700', marginTop:4 },
  ratLbl: { color:C.text2, fontSize:12, marginTop:2 },
  ratCnt: { color:C.text3, fontSize:11, marginTop:2 },
  genres: { flexDirection:'row', gap:6, flexWrap:'wrap', marginBottom:14 },
  genre: { backgroundColor:C.s2, paddingHorizontal:12, paddingVertical:5, borderRadius:R.xxl, borderWidth:1, borderColor:C.border2 },
  genreText: { color:C.text2, fontSize:11 },
  seller: { flexDirection:'row', alignItems:'center', backgroundColor:C.s1, borderRadius:R.md, padding:12, marginBottom:14, borderWidth:1, borderColor:C.border },
  sellerName: { color:C.cream, fontSize:14, fontWeight:'500' },
  sellerSub: { color:C.text3, fontSize:11 },
  sellerRat: { color:C.gold, fontWeight:'600' },
  desc: { color:C.text2, fontSize:14, lineHeight:22, marginBottom:16 },
  tabs: { flexDirection:'row', borderBottomWidth:1, borderBottomColor:C.border, marginBottom:0 },
  tab: { flex:1, paddingVertical:12, alignItems:'center', borderBottomWidth:2, borderBottomColor:'transparent' },
  tabOn: { borderBottomColor:C.gold },
  tabText: { color:C.text2, fontSize:13 },
  tabTextOn: { color:C.gold, fontWeight:'600' },
  track: { flexDirection:'row', alignItems:'center', paddingVertical:10, borderBottomWidth:1, borderBottomColor:C.border },
  trackPos: { color:C.text3, fontSize:12, width:32 },
  trackTitle: { flex:1, color:C.text, fontSize:14 },
  trackDur: { color:C.text3, fontSize:12 },
  revSec: { color:C.text3, fontSize:10, letterSpacing:1, textTransform:'uppercase', marginTop:12, marginBottom:10 },
  proRev: { backgroundColor:C.s2, borderRadius:R.md, padding:14, marginBottom:10, borderWidth:1, borderColor:'rgba(200,169,110,.15)' },
  proRevHdr: { flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:6 },
  proRevSrc: { color:C.gold, fontWeight:'600', fontSize:14 },
  proRevBadge: { backgroundColor:C.gold, paddingHorizontal:8, paddingVertical:3, borderRadius:4 },
  proRevRating: { color:C.black, fontWeight:'700', fontSize:12 },
  proRevQuote: { color:C.text2, fontSize:13, lineHeight:20, fontStyle:'italic' },
  rev: { backgroundColor:C.s1, borderRadius:R.lg, padding:14, marginBottom:12, borderWidth:1, borderColor:C.border },
  revHdr: { flexDirection:'row', alignItems:'center', gap:10, marginBottom:8 },
  revAva: { width:34, height:34, borderRadius:17 },
  revUser: { color:C.cream, fontWeight:'500', fontSize:13 },
  revStars: { color:C.gold, fontSize:12 },
  revTitle: { color:C.text, fontSize:14, fontWeight:'500', marginBottom:6 },
  revBody: { color:C.text2, fontSize:13, lineHeight:20 },
  likeBtn: { flexDirection:'row', alignItems:'center', gap:5, marginTop:10 },
  likeCount: { color:C.text3, fontSize:12 },
  noRevs: { color:C.text3, textAlign:'center', padding:24 },
  detRow: { flexDirection:'row', justifyContent:'space-between', paddingVertical:10, borderBottomWidth:1, borderBottomColor:C.border },
  detL: { color:C.text3, fontSize:13 },
  detV: { color:C.text, fontSize:13, textAlign:'right', maxWidth:'60%' },
  simTitle: { color:C.cream, fontSize:18, fontWeight:'700', marginTop:20, marginBottom:12 },
  simCard: { width:160, marginRight:12 },
  simImg: { width:160, height:160, borderRadius:R.md, backgroundColor:C.s2, marginBottom:8 },
  simTitle2: { color:C.text, fontSize:13, fontWeight:'500' },
  simArtist: { color:C.text3, fontSize:11, marginTop:2 },
  simPrice: { color:C.gold, fontSize:13, fontWeight:'700', marginTop:4 },
  cta: { position:'absolute', bottom:0, left:0, right:0, flexDirection:'row', alignItems:'center', justifyContent:'space-between', padding:16, paddingBottom:34, backgroundColor:C.s1, borderTopWidth:1, borderTopColor:C.border },
  origPrice: { color:C.text3, fontSize:12, textDecorationLine:'line-through' },
  price: { color:C.cream, fontSize:24, fontWeight:'700' },
  stock: { color:C.text3, fontSize:11, marginTop:2 },
  ctaRight: { flexDirection:'row', alignItems:'center', gap:10 },
  wishBtn: { width:46, height:46, borderRadius:R.lg, borderWidth:1, borderColor:C.gold, alignItems:'center', justifyContent:'center' },
  addBtn: { flexDirection:'row', alignItems:'center', gap:8, backgroundColor:C.gold, paddingHorizontal:20, paddingVertical:13, borderRadius:R.lg },
  addBtnIn: { backgroundColor:'#2A5A2A' },
  addBtnText: { color:C.black, fontWeight:'700', fontSize:14 },
});
