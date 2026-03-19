import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, TextInput, Alert, Platform } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { C, R } from './src/theme';
import { useCart } from './src/store';
import { fmtPrice } from './src/data';

export default function Cart() {
  const { items, coupon, discount, removeItem, setQty, applyCoupon, removeCoupon, clearCart, sub, disc, total } = useCart();
  const [input, setInput] = useState('');
  const [msg, setMsg] = useState<{ text:string; ok:boolean } | null>(null);

  const handleCoupon = () => {
    if (!input.trim()) return;
    const r = applyCoupon(input.trim());
    setMsg({ text: r.msg, ok: r.ok });
    if (r.ok) setInput('');
    setTimeout(() => setMsg(null), 3000);
  };

  const confirmRemove = (id: string, title: string) => {
    if (Platform.OS === 'web') { removeItem(id); return; }
    Alert.alert('Remover', `Remover "${title}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Remover', style: 'destructive', onPress: () => removeItem(id) },
    ]);
  };

  if (items.length === 0) return (
    <View style={s.empty}>
      <Ionicons name="bag-outline" size={80} color={C.s4} />
      <Text style={s.emptyTitle}>Carrinho vazio</Text>
      <Text style={s.emptySub}>Explore a loja e adicione seus álbuns</Text>
      <TouchableOpacity style={s.emptyBtn} onPress={() => { router.dismiss(); router.push('/(tabs)/marketplace'); }}>
        <Text style={s.emptyBtnText}>Ir para a Loja</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={s.wrap}>
      <View style={s.header}>
        <TouchableOpacity style={s.backBtn} onPress={() => { router.dismiss(); router.push('/(tabs)/marketplace'); }}>
          <Ionicons name="chevron-back" size={18} color={C.gold} />
          <Text style={s.backBtnText}>Continuar comprando</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert('Limpar', 'Remover todos os itens?', [{ text:'Cancelar', style:'cancel' }, { text:'Limpar', style:'destructive', onPress:clearCart }])}>
          <Text style={s.clearText}>Limpar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom:120 }}>
        {items.map((item, idx) => (
          <View key={item.album.id}>
            <View style={s.item}>
              <TouchableOpacity onPress={() => router.push(`/product/${item.album.id}`)}>
                <Image source={{ uri:`https://picsum.photos/seed/${item.album.seed}/160/160` }} style={s.cover} />
              </TouchableOpacity>
              <View style={s.info}>
                <Text style={s.itemTitle} numberOfLines={2}>{item.album.title}</Text>
                <Text style={s.itemArtist}>{item.album.artist}</Text>
                <View style={s.itemMeta}>
                  <View style={s.fmtBadge}><Text style={s.fmtText}>{item.album.format}</Text></View>
                  <Text style={s.condText}>{item.album.condition === 'NEW' ? 'Novo' : 'Usado'}</Text>
                </View>
                <View style={s.itemFoot}>
                  <Text style={s.itemPrice}>{fmtPrice(item.album.price * item.qty)}</Text>
                  <View style={s.qtyCtrl}>
                    <TouchableOpacity style={s.qtyBtn} onPress={() => setQty(item.album.id, item.qty - 1)}>
                      <Ionicons name="remove" size={14} color={C.cream} />
                    </TouchableOpacity>
                    <Text style={s.qtyN}>{item.qty}</Text>
                    <TouchableOpacity style={s.qtyBtn} onPress={() => setQty(item.album.id, item.qty + 1)}>
                      <Ionicons name="add" size={14} color={C.cream} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <TouchableOpacity style={s.removeBtn} onPress={() => confirmRemove(item.album.id, item.album.title)}>
                <Ionicons name="trash-outline" size={18} color={C.red} />
              </TouchableOpacity>
            </View>
            {idx < items.length - 1 && <View style={s.sep} />}
          </View>
        ))}

        {/* Coupon */}
        <View style={s.couponSec}>
          <Text style={s.couponLabel}>Cupom de desconto</Text>
          {coupon ? (
            <View style={s.couponApplied}>
              <Ionicons name="pricetag" size={16} color={C.gold} />
              <Text style={s.couponCode}>{coupon}</Text>
              <Text style={s.couponDisc}>-{discount}%</Text>
              <TouchableOpacity onPress={removeCoupon} style={{ marginLeft:'auto' as any }}>
                <Ionicons name="close" size={16} color={C.text3} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={s.couponRow}>
              <TextInput style={s.couponInput} value={input} onChangeText={setInput} placeholder="Ex: VINYL10" placeholderTextColor={C.text3} autoCapitalize="characters" />
              <TouchableOpacity style={s.couponBtn} onPress={handleCoupon}>
                <Text style={s.couponBtnText}>Aplicar</Text>
              </TouchableOpacity>
            </View>
          )}
          {msg && <Text style={[s.couponMsg, { color: msg.ok ? C.gold : C.red }]}>{msg.text}</Text>}
          <Text style={s.couponHint}>💡 Tente: VINYL10, FIRSTORDER, COLLECTOR20</Text>
        </View>

        {/* Summary */}
        <View style={s.summary}>
          <Text style={s.summaryTitle}>Resumo do Pedido</Text>
          <View style={s.sumRow}><Text style={s.sumL}>Subtotal</Text><Text style={s.sumR}>{fmtPrice(sub())}</Text></View>
          {disc() > 0 && <View style={s.sumRow}><Text style={[s.sumL,{color:C.gold}]}>Desconto ({discount}%)</Text><Text style={[s.sumR,{color:C.gold}]}>-{fmtPrice(disc())}</Text></View>}
          <View style={s.sumRow}><Text style={s.sumL}>Frete</Text><Text style={[s.sumR,{color:C.text3}]}>Calculado no checkout</Text></View>
          <View style={s.totalRow}>
            <Text style={s.totalL}>Total</Text>
            <Text style={s.totalR}>{fmtPrice(total())}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={s.cta}>
        <TouchableOpacity style={s.ctaBtn} onPress={() => router.push('/checkout')}>
          <Text style={s.ctaBtnText}>Finalizar Compra</Text>
          <Text style={s.ctaBtnPrice}>{fmtPrice(total())}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  wrap:{ flex:1, backgroundColor:C.black },
  empty:{ flex:1, alignItems:'center', justifyContent:'center', padding:32, backgroundColor:C.black },
  emptyTitle:{ color:C.cream, fontSize:22, fontWeight:'700', marginTop:16 },
  emptySub:{ color:C.text2, fontSize:14, textAlign:'center', marginTop:8, lineHeight:22 },
  emptyBtn:{ marginTop:24, backgroundColor:C.gold, paddingHorizontal:32, paddingVertical:14, borderRadius:R.xxl },
  emptyBtnText:{ color:C.black, fontWeight:'700', fontSize:15 },
  header:{ flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingHorizontal:16, paddingVertical:12, borderBottomWidth:1, borderBottomColor:C.border },
  backBtn:{ flexDirection:'row', alignItems:'center', gap:4 },
  backBtnText:{ color:C.gold, fontSize:14, fontWeight:'500' },
  clearText:{ color:C.red, fontSize:13 },
  item:{ flexDirection:'row', padding:14, gap:12, alignItems:'flex-start' },
  cover:{ width:80, height:80, borderRadius:R.md, backgroundColor:C.s2 },
  info:{ flex:1 },
  itemTitle:{ color:C.cream, fontSize:14, fontWeight:'500', lineHeight:20 },
  itemArtist:{ color:C.text2, fontSize:12, marginTop:2 },
  itemMeta:{ flexDirection:'row', gap:6, marginTop:5 },
  fmtBadge:{ backgroundColor:C.s3, paddingHorizontal:6, paddingVertical:2, borderRadius:3 },
  fmtText:{ color:C.gold, fontSize:10, fontWeight:'600' },
  condText:{ color:C.text3, fontSize:10, alignSelf:'center' },
  itemFoot:{ flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop:8 },
  itemPrice:{ color:C.cream, fontSize:17, fontWeight:'700' },
  qtyCtrl:{ flexDirection:'row', alignItems:'center', backgroundColor:C.s2, borderRadius:R.md, overflow:'hidden' },
  qtyBtn:{ padding:8, backgroundColor:C.s3 },
  qtyN:{ color:C.cream, fontSize:14, fontWeight:'500', paddingHorizontal:12 },
  removeBtn:{ padding:6 },
  sep:{ height:1, backgroundColor:C.border, marginHorizontal:16 },
  couponSec:{ margin:16 },
  couponLabel:{ color:C.text3, fontSize:11, letterSpacing:.5, textTransform:'uppercase', marginBottom:8 },
  couponRow:{ flexDirection:'row', gap:8 },
  couponInput:{ flex:1, backgroundColor:C.s2, borderRadius:R.md, paddingHorizontal:14, paddingVertical:10, color:C.cream, fontSize:14, borderWidth:1, borderColor:C.border2 },
  couponBtn:{ backgroundColor:C.gold, paddingHorizontal:18, borderRadius:R.md, justifyContent:'center' },
  couponBtnText:{ color:C.black, fontWeight:'700', fontSize:14 },
  couponApplied:{ flexDirection:'row', alignItems:'center', gap:8, backgroundColor:C.goldBg, padding:12, borderRadius:R.md, borderWidth:1, borderColor:'rgba(200,169,110,.25)' },
  couponCode:{ color:C.gold, fontWeight:'700', flex:1 },
  couponDisc:{ color:C.gold, fontWeight:'700' },
  couponMsg:{ fontSize:12, marginTop:6 },
  couponHint:{ color:C.text3, fontSize:11, marginTop:8, fontStyle:'italic' },
  summary:{ backgroundColor:C.s1, borderRadius:R.lg, padding:16, margin:16, borderWidth:1, borderColor:C.border },
  summaryTitle:{ color:C.cream, fontSize:16, fontWeight:'700', marginBottom:12 },
  sumRow:{ flexDirection:'row', justifyContent:'space-between', marginBottom:10 },
  sumL:{ color:C.text2, fontSize:14 }, sumR:{ color:C.cream, fontSize:14 },
  totalRow:{ flexDirection:'row', justifyContent:'space-between', borderTopWidth:1, borderTopColor:C.border, paddingTop:12, marginTop:4 },
  totalL:{ color:C.cream, fontSize:18, fontWeight:'700' },
  totalR:{ color:C.gold, fontSize:22, fontWeight:'700' },
  cta:{ position:'absolute', bottom:0, left:0, right:0, padding:16, paddingBottom:34, backgroundColor:C.black, borderTopWidth:1, borderTopColor:C.border },
  ctaBtn:{ backgroundColor:C.gold, borderRadius:R.lg, padding:16, flexDirection:'row', justifyContent:'space-between', alignItems:'center' },
  ctaBtnText:{ color:C.black, fontSize:16, fontWeight:'700' },
  ctaBtnPrice:{ color:C.black, fontSize:16, fontWeight:'700' },
});
