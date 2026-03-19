import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { C, R } from '../src/theme';
import { useAuth } from '../src/store';

const ORDERS = [
  { id:'VV12345678', date:'15 Mar 2026', items:2, total:334.90 },
  { id:'VV87654321', date:'02 Fev 2026', items:1, total:189.90 },
  { id:'VV11223344', date:'18 Jan 2026', items:3, total:521.00 },
];

export default function Profile() {
  const { user, logout } = useAuth();

  if (!user) return (
    <View style={s.wall}>
      <Ionicons name="person-circle-outline" size={80} color={C.s4} />
      <Text style={s.wallTitle}>Entre na sua conta</Text>
      <Text style={s.wallSub}>Acesse sua coleção e recompensas</Text>
      <TouchableOpacity style={s.wallBtn} onPress={() => router.push('/(auth)/login')}>
        <Text style={s.wallBtnText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={s.wrap} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={s.hdr}>
        <Image source={{ uri: user.avatarUrl }} style={s.avatar} />
        <View style={s.hdrInfo}>
          <Text style={s.name}>{user.displayName}</Text>
          <Text style={s.username}>@{user.username}</Text>
          <View style={s.locRow}>
            <Ionicons name="location-outline" size={12} color={C.text3} />
            <Text style={s.loc}>{user.location}</Text>
          </View>
        </View>
        <TouchableOpacity style={s.editBtn}>
          <Ionicons name="pencil-outline" size={18} color={C.gold} />
        </TouchableOpacity>
      </View>

      <Text style={s.bio}>{user.bio}</Text>

      {/* Stats */}
      <View style={s.statsRow}>
        {[['Coleção', user.collection], ['Seguidores', user.followers], ['Seguindo', user.following]].map(([l, v]) => (
          <View key={l as string} style={s.stat}>
            <Text style={s.statV}>{v}</Text>
            <Text style={s.statL}>{l}</Text>
          </View>
        ))}
      </View>

      {/* Level */}
      <View style={s.levelCard}>
        <View style={s.levelRow}>
          <View style={s.levelBadge}><Text style={s.levelBadgeText}>⭐ {user.level}</Text></View>
          <Text style={s.levelPts}>{user.points} pts</Text>
        </View>
        <View style={s.bar}><View style={[s.barFill, { width: `${(user.points / 500) * 100}%` as any }]} /></View>
        <Text style={s.barLabel}>{user.points} / 500 pts para Colecionador</Text>
      </View>

      {/* Badges */}
      <View style={s.sec}>
        <Text style={s.secTitle}>Badges</Text>
        <View style={s.badgesRow}>
          {[['🎵','Bem-vindo'],['🛒','1ª Compra'],['⭐','Crítico']].map(([e,n]) => (
            <View key={n} style={s.badge}>
              <Text style={s.badgeE}>{e}</Text>
              <Text style={s.badgeN}>{n}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Coupons */}
      <View style={s.sec}>
        <Text style={s.secTitle}>Cupons Disponíveis</Text>
        {[{code:'VINYLVERSE5',disc:5,exp:'17 Abr 2026'},{code:'FIRSTORDER',disc:15,exp:'17 Mai 2026'}].map(c => (
          <View key={c.code} style={s.coupon}>
            <View style={s.couponL}>
              <Ionicons name="pricetag" size={16} color={C.gold} />
              <View>
                <Text style={s.couponCode}>{c.code}</Text>
                <Text style={s.couponExp}>Válido até {c.exp}</Text>
              </View>
            </View>
            <Text style={s.couponDisc}>{c.disc}% OFF</Text>
          </View>
        ))}
      </View>

      {/* Orders */}
      <View style={s.sec}>
        <Text style={s.secTitle}>Pedidos Recentes</Text>
        {ORDERS.map(o => (
          <TouchableOpacity key={o.id} style={s.order}>
            <View style={s.orderHdr}>
              <Text style={s.orderId}>{o.id}</Text>
              <View style={s.orderStatus}><Text style={s.orderStatusText}>Entregue</Text></View>
            </View>
            <View style={s.orderFoot}>
              <Text style={s.orderMeta}>{o.date} · {o.items} {o.items === 1 ? 'item' : 'itens'}</Text>
              <Text style={s.orderTotal}>R$ {o.total.toFixed(2).replace('.', ',')}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Menu */}
      <View style={s.sec}>
        {[['settings-outline','Configurações'],['help-circle-outline','Ajuda & Suporte'],['information-circle-outline','Sobre o VinylVerse']].map(([ico,label]) => (
          <TouchableOpacity key={label} style={s.menuItem}>
            <Ionicons name={ico as any} size={20} color={C.text2} />
            <Text style={s.menuText}>{label}</Text>
            <Ionicons name="chevron-forward" size={16} color={C.text3} />
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={s.logout} onPress={() => { logout(); router.replace('/(auth)/login'); }}>
          <Ionicons name="log-out-outline" size={20} color={C.red} />
          <Text style={s.logoutText}>Sair da conta</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 32 }} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  wrap: { flex:1, backgroundColor:C.black },
  wall: { flex:1, alignItems:'center', justifyContent:'center', padding:32, backgroundColor:C.black, gap:12 },
  wallTitle: { color:C.cream, fontSize:22, fontWeight:'700' },
  wallSub: { color:C.text2, fontSize:14, textAlign:'center' },
  wallBtn: { backgroundColor:C.gold, paddingHorizontal:40, paddingVertical:14, borderRadius:R.xxl },
  wallBtnText: { color:C.black, fontWeight:'700', fontSize:15 },
  hdr: { flexDirection:'row', alignItems:'center', padding:16, gap:14 },
  avatar: { width:72, height:72, borderRadius:36, borderWidth:2, borderColor:C.gold },
  hdrInfo: { flex:1 },
  name: { color:C.cream, fontSize:20, fontWeight:'700' },
  username: { color:C.text2, fontSize:14, marginTop:2 },
  locRow: { flexDirection:'row', alignItems:'center', gap:4, marginTop:4 },
  loc: { color:C.text3, fontSize:12 },
  editBtn: { width:38, height:38, borderRadius:R.lg, borderWidth:1, borderColor:C.gold, alignItems:'center', justifyContent:'center' },
  bio: { color:C.text2, fontSize:14, paddingHorizontal:16, paddingBottom:14, lineHeight:20 },
  statsRow: { flexDirection:'row', borderTopWidth:1, borderBottomWidth:1, borderColor:C.border },
  stat: { flex:1, alignItems:'center', paddingVertical:14 },
  statV: { color:C.cream, fontSize:20, fontWeight:'700' },
  statL: { color:C.text3, fontSize:12, marginTop:2 },
  levelCard: { margin:16, backgroundColor:C.s1, borderRadius:R.lg, padding:16, borderWidth:1, borderColor:C.border },
  levelRow: { flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:12 },
  levelBadge: { backgroundColor:C.goldBg, paddingHorizontal:12, paddingVertical:5, borderRadius:R.xxl, borderWidth:1, borderColor:'rgba(200,169,110,.25)' },
  levelBadgeText: { color:C.gold, fontWeight:'700', fontSize:13 },
  levelPts: { color:C.gold, fontSize:18, fontWeight:'700' },
  bar: { height:4, backgroundColor:C.s4, borderRadius:2, overflow:'hidden' },
  barFill: { height:'100%', backgroundColor:C.gold, borderRadius:2 },
  barLabel: { color:C.text3, fontSize:12, marginTop:6 },
  sec: { paddingHorizontal:16, marginTop:8 },
  secTitle: { color:C.cream, fontSize:17, fontWeight:'700', marginBottom:10, marginTop:6 },
  badgesRow: { flexDirection:'row', gap:10 },
  badge: { backgroundColor:C.s2, borderRadius:R.lg, padding:14, alignItems:'center', width:80, borderWidth:1, borderColor:C.border },
  badgeE: { fontSize:26, marginBottom:6 },
  badgeN: { color:C.text2, fontSize:10, textAlign:'center' },
  coupon: { flexDirection:'row', alignItems:'center', justifyContent:'space-between', backgroundColor:C.s1, borderRadius:R.lg, padding:14, marginBottom:8, borderWidth:1, borderColor:'rgba(200,169,110,.2)', borderStyle:'dashed' },
  couponL: { flexDirection:'row', alignItems:'center', gap:12 },
  couponCode: { color:C.gold, fontWeight:'700', fontSize:15 },
  couponExp: { color:C.text3, fontSize:11, marginTop:2 },
  couponDisc: { color:C.gold, fontWeight:'700', fontSize:18 },
  order: { backgroundColor:C.s1, borderRadius:R.lg, padding:14, marginBottom:8, borderWidth:1, borderColor:C.border },
  orderHdr: { flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:6 },
  orderId: { color:C.cream, fontWeight:'600', fontSize:13 },
  orderStatus: { backgroundColor:'rgba(58,138,74,.15)', paddingHorizontal:8, paddingVertical:3, borderRadius:4, borderWidth:1, borderColor:'rgba(58,138,74,.25)' },
  orderStatusText: { color:'#5ab96a', fontSize:11, fontWeight:'600' },
  orderFoot: { flexDirection:'row', justifyContent:'space-between' },
  orderMeta: { color:C.text2, fontSize:12 },
  orderTotal: { color:C.gold, fontWeight:'600', fontSize:13 },
  menuItem: { flexDirection:'row', alignItems:'center', gap:14, paddingVertical:14, borderBottomWidth:1, borderBottomColor:C.border },
  menuText: { flex:1, color:C.text, fontSize:15 },
  logout: { flexDirection:'row', alignItems:'center', gap:14, paddingVertical:14, marginTop:4 },
  logoutText: { color:C.red, fontSize:15 },
});
