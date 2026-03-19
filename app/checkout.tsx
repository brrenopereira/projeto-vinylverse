import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { C, R } from './src/theme';
import { useCart } from './src/store';
import { SHIP_OPTS, fmtPrice } from './src/data';

type Step = 0 | 1 | 2;
const STEP_LABELS = ['Endereço', 'Envio', 'Pagamento'];
const PAY = [
  { id:'pix',    ico:'⚡', label:'PIX',              sub:'Pagamento instantâneo' },
  { id:'credit', ico:'💳', label:'Cartão de Crédito', sub:'Até 12x sem juros' },
  { id:'boleto', ico:'🧾', label:'Boleto Bancário',   sub:'Vence em 3 dias úteis' },
];

export default function Checkout() {
  const { items, sub, disc, total, discount, clear } = useCart();
  const [step, setStep] = useState<Step>(0);
  const [loading, setLoading] = useState(false);
  const [ship, setShip] = useState(SHIP_OPTS[0]);
  const [pay, setPay] = useState('pix');

  const grandTotal = total() + ship.price;

  const next = async () => {
    if (step < 2) { setStep((step + 1) as Step); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    clear();
    setLoading(false);
    router.replace('/done');
  };

  return (
    <View style={s.wrap}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom:100 }}>
        {/* Back */}
        <TouchableOpacity style={s.back} onPress={() => step === 0 ? router.back() : setStep((step - 1) as Step)}>
          <Ionicons name="chevron-back" size={18} color={C.text2} />
          <Text style={s.backText}>{step === 0 ? 'Voltar ao Carrinho' : 'Voltar'}</Text>
        </TouchableOpacity>

        {/* Steps */}
        <View style={s.steps}>
          {STEP_LABELS.map((l, i) => (
            <React.Fragment key={l}>
              <View style={s.stepItem}>
                <View style={[s.stepCirc, i <= step && s.stepCircOn, i < step && s.stepCircDone]}>
                  {i < step ? <Ionicons name="checkmark" size={13} color={C.black} /> : <Text style={[s.stepN, i===step && s.stepNOn]}>{i+1}</Text>}
                </View>
                <Text style={[s.stepL, i===step && s.stepLOn]}>{l}</Text>
              </View>
              {i < 2 && <View style={[s.stepLine, i < step && s.stepLineOn]} />}
            </React.Fragment>
          ))}
        </View>

        {/* ADDRESS */}
        {step === 0 && (
          <View style={s.sec}>
            <Text style={s.secTitle}>Endereço de Entrega</Text>
            {[['Nome completo','Ana Silva'],['CEP','01310-100'],['Rua / Av.','Av. Paulista'],['Número','1000'],['Complemento','Apto 42'],['Bairro','Bela Vista'],['Cidade','São Paulo']].map(([l,v]) => (
              <View key={l} style={s.fg}>
                <Text style={s.fgL}>{l}</Text>
                <TextInput style={s.fgIn} defaultValue={v} placeholderTextColor={C.text3} />
              </View>
            ))}
          </View>
        )}

        {/* SHIPPING */}
        {step === 1 && (
          <View style={s.sec}>
            <Text style={s.secTitle}>Método de Envio</Text>
            <View style={s.addrPreview}>
              <Ionicons name="location-outline" size={15} color={C.gold} />
              <Text style={s.addrText}>Av. Paulista, 1000 — São Paulo / SP</Text>
            </View>
            {SHIP_OPTS.map(o => (
              <TouchableOpacity key={o.id} style={[s.shipOpt, ship.id===o.id && s.shipOptOn]} onPress={() => setShip(o)}>
                <View style={[s.radio, ship.id===o.id && s.radioOn]}>
                  {ship.id===o.id && <View style={s.radioDot} />}
                </View>
                <View style={{ flex:1 }}>
                  <Text style={s.shipName}>{o.name}</Text>
                  <Text style={s.shipEta}>Entrega em {o.days} dias úteis</Text>
                </View>
                <Text style={s.shipPrice}>{fmtPrice(o.price)}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* PAYMENT */}
        {step === 2 && (
          <View style={s.sec}>
            <Text style={s.secTitle}>Forma de Pagamento</Text>
            <View style={s.demoBanner}>
              <Ionicons name="shield-checkmark-outline" size={15} color={C.gold} />
              <Text style={s.demoText}>Demo — nenhum pagamento real será processado</Text>
            </View>
            {PAY.map(p => (
              <TouchableOpacity key={p.id} style={[s.payOpt, pay===p.id && s.payOptOn]} onPress={() => setPay(p.id)}>
                <Text style={s.payIco}>{p.ico}</Text>
                <View style={{ flex:1 }}>
                  <Text style={s.payLabel}>{p.label}</Text>
                  <Text style={s.paySub}>{p.sub}</Text>
                </View>
                <View style={[s.radio, pay===p.id && s.radioOn]}>
                  {pay===p.id && <View style={s.radioDot} />}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Summary */}
        <View style={s.summary}>
          <Text style={s.summaryTitle}>Resumo</Text>
          <View style={s.sumRow}><Text style={s.sumL}>Produtos ({items.length})</Text><Text style={s.sumR}>{fmtPrice(sub())}</Text></View>
          {disc() > 0 && <View style={s.sumRow}><Text style={[s.sumL,{color:C.gold}]}>Desconto ({discount}%)</Text><Text style={[s.sumR,{color:C.gold}]}>-{fmtPrice(disc())}</Text></View>}
          <View style={s.sumRow}><Text style={s.sumL}>Frete ({ship.name})</Text><Text style={s.sumR}>{fmtPrice(ship.price)}</Text></View>
          <View style={s.totalRow}>
            <Text style={s.totalL}>Total</Text>
            <Text style={s.totalR}>{fmtPrice(grandTotal)}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={s.cta}>
        <TouchableOpacity style={[s.ctaBtn, loading && { opacity:.7 }]} onPress={next} disabled={loading}>
          {loading ? <ActivityIndicator color={C.black} /> : (
            <>
              {step === 2 && <Ionicons name="lock-closed" size={18} color={C.black} />}
              <Text style={s.ctaBtnText}>{step === 2 ? `Confirmar · ${fmtPrice(grandTotal)}` : 'Continuar'}</Text>
              {step < 2 && <Ionicons name="chevron-forward" size={18} color={C.black} />}
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  wrap:{ flex:1, backgroundColor:C.black },
  back:{ flexDirection:'row', alignItems:'center', gap:6, padding:16 },
  backText:{ color:C.text2, fontSize:14 },
  steps:{ flexDirection:'row', alignItems:'center', paddingHorizontal:16, marginBottom:20 },
  stepItem:{ alignItems:'center', gap:4 },
  stepCirc:{ width:28, height:28, borderRadius:14, backgroundColor:C.s2, borderWidth:1, borderColor:C.border2, alignItems:'center', justifyContent:'center' },
  stepCircOn:{ borderColor:C.gold },
  stepCircDone:{ backgroundColor:C.gold, borderColor:C.gold },
  stepN:{ color:C.text3, fontSize:12, fontWeight:'600' }, stepNOn:{ color:C.gold },
  stepL:{ color:C.text3, fontSize:10 }, stepLOn:{ color:C.gold },
  stepLine:{ flex:1, height:1, backgroundColor:C.border, marginHorizontal:6, marginBottom:16 },
  stepLineOn:{ backgroundColor:C.gold },
  sec:{ paddingHorizontal:16, marginBottom:20 },
  secTitle:{ color:C.cream, fontSize:18, fontWeight:'700', marginBottom:16 },
  fg:{ marginBottom:12 },
  fgL:{ color:C.text2, fontSize:12, marginBottom:5 },
  fgIn:{ backgroundColor:C.s2, borderRadius:R.md, padding:12, color:C.cream, fontSize:14, borderWidth:1, borderColor:C.border2 },
  addrPreview:{ flexDirection:'row', alignItems:'center', gap:8, backgroundColor:C.s1, padding:12, borderRadius:R.md, marginBottom:14, borderWidth:1, borderColor:C.border },
  addrText:{ color:C.text2, fontSize:13, flex:1 },
  shipOpt:{ flexDirection:'row', alignItems:'center', gap:12, padding:14, borderRadius:R.lg, borderWidth:1, borderColor:C.border2, marginBottom:8, backgroundColor:C.s1 },
  shipOptOn:{ borderColor:C.gold, backgroundColor:C.goldBg },
  radio:{ width:20, height:20, borderRadius:10, borderWidth:2, borderColor:C.border2, alignItems:'center', justifyContent:'center', flexShrink:0 },
  radioOn:{ borderColor:C.gold },
  radioDot:{ width:9, height:9, borderRadius:5, backgroundColor:C.gold },
  shipName:{ color:C.cream, fontSize:14, fontWeight:'500' },
  shipEta:{ color:C.text2, fontSize:12, marginTop:2 },
  shipPrice:{ color:C.gold, fontWeight:'600', fontSize:15 },
  demoBanner:{ flexDirection:'row', alignItems:'center', gap:8, backgroundColor:C.goldBg, padding:12, borderRadius:R.md, marginBottom:14, borderWidth:1, borderColor:'rgba(200,169,110,.25)' },
  demoText:{ color:C.gold, fontSize:12, flex:1 },
  payOpt:{ flexDirection:'row', alignItems:'center', gap:14, padding:16, borderRadius:R.lg, borderWidth:1, borderColor:C.border2, marginBottom:8, backgroundColor:C.s1 },
  payOptOn:{ borderColor:C.gold, backgroundColor:C.goldBg },
  payIco:{ fontSize:24 },
  payLabel:{ color:C.cream, fontSize:15, fontWeight:'500' },
  paySub:{ color:C.text2, fontSize:12, marginTop:2 },
  summary:{ backgroundColor:C.s1, borderRadius:R.lg, padding:16, marginHorizontal:16, borderWidth:1, borderColor:C.border },
  summaryTitle:{ color:C.cream, fontSize:16, fontWeight:'700', marginBottom:12 },
  sumRow:{ flexDirection:'row', justifyContent:'space-between', marginBottom:10 },
  sumL:{ color:C.text2, fontSize:14 }, sumR:{ color:C.cream, fontSize:14 },
  totalRow:{ flexDirection:'row', justifyContent:'space-between', borderTopWidth:1, borderTopColor:C.border, paddingTop:12, marginTop:4 },
  totalL:{ color:C.cream, fontSize:18, fontWeight:'700' },
  totalR:{ color:C.gold, fontSize:22, fontWeight:'700' },
  cta:{ position:'absolute', bottom:0, left:0, right:0, padding:16, paddingBottom:34, backgroundColor:C.black, borderTopWidth:1, borderTopColor:C.border },
  ctaBtn:{ flexDirection:'row', alignItems:'center', justifyContent:'center', gap:10, backgroundColor:C.gold, padding:16, borderRadius:R.lg },
  ctaBtnText:{ color:C.black, fontSize:16, fontWeight:'700' },
});
