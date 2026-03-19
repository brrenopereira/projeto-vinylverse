import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { C, R } from './src/theme';

const ORDER = `VV${Date.now().toString().slice(-8)}`;
const TRACK = `BR${Math.floor(Math.random() * 900000 + 100000)}BR`;

export default function Done() {
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(scale, { toValue:1, useNativeDriver:true, tension:50, friction:7 }),
      Animated.timing(opacity, { toValue:1, duration:400, useNativeDriver:true }),
    ]).start();
  }, []);

  return (
    <View style={s.wrap}>
      <Animated.View style={[s.icon, { transform:[{ scale }] }]}>
        <Ionicons name="checkmark-circle" size={88} color={C.gold} />
      </Animated.View>

      <Animated.View style={[s.content, { opacity }]}>
        <Text style={s.title}>Pedido Confirmado!</Text>
        <Text style={s.sub}>Seu pedido foi processado com sucesso.</Text>

        <View style={s.card}>
          {[['Número do Pedido', ORDER],['Rastreamento', TRACK],['Status', '✓ Confirmado']].map(([l,v]) => (
            <View key={l} style={s.row}>
              <Text style={s.rowL}>{l}</Text>
              <Text style={[s.rowR, l==='Status' && { color:'#5ab96a' }]}>{v}</Text>
            </View>
          ))}
        </View>

        <View style={s.rewards}>
          <Text style={s.rewardsIco}>🏆</Text>
          <View>
            <Text style={s.rewardsTitle}>+50 pontos VinylVerse!</Text>
            <Text style={s.rewardsSub}>Continue comprando e suba de nível</Text>
          </View>
        </View>

        <View style={s.demo}>
          <Text style={s.demoText}>⚗ Demo — pedido fictício, nenhum pagamento foi cobrado</Text>
        </View>

        <View style={s.actions}>
          <TouchableOpacity style={s.primary} onPress={() => router.replace('/(tabs)')}>
            <Text style={s.primaryText}>Voltar ao Início</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.secondary} onPress={() => router.replace('/(tabs)/profile')}>
            <Text style={s.secondaryText}>Meus Pedidos</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

const s = StyleSheet.create({
  wrap:{ flex:1, backgroundColor:C.black, alignItems:'center', padding:24, paddingTop:60 },
  icon:{ marginBottom:24 },
  content:{ width:'100%', maxWidth:480, alignItems:'center' },
  title:{ color:C.cream, fontSize:28, fontWeight:'700', textAlign:'center' },
  sub:{ color:C.text2, fontSize:14, textAlign:'center', marginTop:10, lineHeight:22, marginBottom:24 },
  card:{ backgroundColor:C.s1, borderRadius:R.lg, padding:16, width:'100%', borderWidth:1, borderColor:C.border, marginBottom:16 },
  row:{ flexDirection:'row', justifyContent:'space-between', paddingVertical:10, borderBottomWidth:1, borderBottomColor:C.border },
  rowL:{ color:C.text2, fontSize:13 },
  rowR:{ color:C.cream, fontSize:13, fontWeight:'500' },
  rewards:{ flexDirection:'row', alignItems:'center', gap:14, backgroundColor:C.goldBg, borderRadius:R.lg, padding:16, width:'100%', borderWidth:1, borderColor:'rgba(200,169,110,.25)', marginBottom:12 },
  rewardsIco:{ fontSize:36 },
  rewardsTitle:{ color:C.gold, fontWeight:'700', fontSize:15 },
  rewardsSub:{ color:C.text2, fontSize:12, marginTop:2 },
  demo:{ backgroundColor:C.s1, borderRadius:R.md, padding:12, width:'100%', marginBottom:24, borderWidth:1, borderColor:C.border },
  demoText:{ color:C.text3, fontSize:11, textAlign:'center', fontStyle:'italic' },
  actions:{ gap:10, width:'100%' },
  primary:{ backgroundColor:C.gold, padding:16, borderRadius:R.lg, alignItems:'center' },
  primaryText:{ color:C.black, fontWeight:'700', fontSize:16 },
  secondary:{ borderWidth:1, borderColor:C.border2, padding:16, borderRadius:R.lg, alignItems:'center' },
  secondaryText:{ color:C.cream, fontWeight:'500', fontSize:15 },
});
