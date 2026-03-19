import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { C, R } from '../src/theme';
import { useAuth } from '../src/store';

export default function Register() {
  const [f, setF] = useState({ email: '', user: '', pass: '', conf: '' });
  const [show, setShow] = useState(false);
  const [err, setErr] = useState('');
  const { register, loading } = useAuth();
  const up = (k: string, v: string) => setF(x => ({ ...x, [k]: v }));

  const go = async () => {
    setErr('');
    if (f.pass !== f.conf) return setErr('Senhas não coincidem');
    const r = await register(f.email, f.pass, f.user);
    if (r.ok) router.replace('/(tabs)');
    else setErr(r.err ?? 'Erro');
  };

  return (
    <KeyboardAvoidingView style={s.wrap} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={s.inner} keyboardShouldPersistTaps="handled">
        <TouchableOpacity style={s.back} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color={C.cream} />
          <Text style={s.backText}>Voltar</Text>
        </TouchableOpacity>
        <Text style={s.title}>Criar conta</Text>
        <Text style={s.sub}>Junte-se à comunidade VinylVerse</Text>

        <View style={s.form}>
          {[
            { k:'email', ph:'Email', ico:'mail-outline', kb:'email-address' as any, cap:'none' as any },
            { k:'user',  ph:'Username', ico:'at-outline', kb:'default' as any, cap:'none' as any },
          ].map(({k,ph,ico,kb,cap}) => (
            <View key={k} style={s.field}>
              <Ionicons name={ico as any} size={18} color={C.text3} style={s.fIco} />
              <TextInput style={s.fInput} placeholder={ph} placeholderTextColor={C.text3} value={(f as any)[k]} onChangeText={v => up(k,v)} keyboardType={kb} autoCapitalize={cap} />
            </View>
          ))}
          <View style={s.field}>
            <Ionicons name="lock-closed-outline" size={18} color={C.text3} style={s.fIco} />
            <TextInput style={[s.fInput,{flex:1}]} placeholder="Senha (mín. 6 chars)" placeholderTextColor={C.text3} value={f.pass} onChangeText={v=>up('pass',v)} secureTextEntry={!show} />
            <TouchableOpacity onPress={() => setShow(!show)}><Ionicons name={show?'eye-off-outline':'eye-outline'} size={18} color={C.text3} /></TouchableOpacity>
          </View>
          <View style={s.field}>
            <Ionicons name="lock-closed-outline" size={18} color={C.text3} style={s.fIco} />
            <TextInput style={s.fInput} placeholder="Confirmar senha" placeholderTextColor={C.text3} value={f.conf} onChangeText={v=>up('conf',v)} secureTextEntry={!show} />
          </View>
          {err ? <Text style={s.err}>{err}</Text> : null}
          <TouchableOpacity style={[s.btn, loading && {opacity:.7}]} onPress={go} disabled={loading}>
            {loading ? <ActivityIndicator color={C.black} /> : <Text style={s.btnText}>Criar Conta</Text>}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
            <Text style={s.switch}>Já tem conta? <Text style={{ color: C.gold }}>Entrar</Text></Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  wrap: { flex:1, backgroundColor:C.black },
  inner: { padding:24, paddingTop:52 },
  back: { flexDirection:'row', alignItems:'center', gap:4, marginBottom:28 },
  backText: { color:C.cream, fontSize:15 },
  title: { color:C.cream, fontSize:28, fontWeight:'700', marginBottom:6 },
  sub: { color:C.text3, fontSize:14, marginBottom:20 },
  form: { gap:12 },
  field: { flexDirection:'row', alignItems:'center', backgroundColor:C.s2, borderRadius:R.lg, paddingHorizontal:14, borderWidth:1, borderColor:C.border2 },
  fIco: { marginRight:10 },
  fInput: { flex:1, color:C.cream, fontSize:15, paddingVertical:14 },
  err: { color:C.red, fontSize:13, textAlign:'center' },
  btn: { backgroundColor:C.gold, padding:16, borderRadius:R.xxl, alignItems:'center' },
  btnText: { color:C.black, fontWeight:'700', fontSize:16 },
  switch: { color:C.text2, fontSize:14, textAlign:'center', padding:8 },
});
