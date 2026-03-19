import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { C, R } from '../src/theme';
import { useAuth } from '../src/store';

export default function Login() {
  const [email, setEmail] = useState('demo@vinylverse.app');
  const [pass, setPass] = useState('demo123');
  const [show, setShow] = useState(false);
  const [err, setErr] = useState('');
  const { login, loginSpotify, guest, loading } = useAuth();

  const go = async () => {
    setErr('');
    const r = await login(email, pass);
    if (r.ok) router.replace('/(tabs)');
    else setErr(r.err ?? 'Erro');
  };

  return (
    <KeyboardAvoidingView style={s.wrap} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={s.inner} keyboardShouldPersistTaps="handled">
        <View style={s.logo}>
          <View style={s.disc}><View style={s.discDot} /></View>
          <Text style={s.logoText}>VinylVerse</Text>
          <Text style={s.logoSub}>Sua coleção, sua história</Text>
        </View>

        <View style={s.demoBanner}>
          <Ionicons name="flask-outline" size={14} color={C.gold} />
          <Text style={s.demoText}>Demo — qualquer email + senha (mín. 6 chars)</Text>
        </View>

        <View style={s.form}>
          <View style={s.field}>
            <Ionicons name="mail-outline" size={18} color={C.text3} style={s.fIco} />
            <TextInput style={s.fInput} placeholder="Email" placeholderTextColor={C.text3} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
          </View>
          <View style={s.field}>
            <Ionicons name="lock-closed-outline" size={18} color={C.text3} style={s.fIco} />
            <TextInput style={[s.fInput, { flex: 1 }]} placeholder="Senha" placeholderTextColor={C.text3} value={pass} onChangeText={setPass} secureTextEntry={!show} />
            <TouchableOpacity onPress={() => setShow(!show)} style={{ padding: 4 }}>
              <Ionicons name={show ? 'eye-off-outline' : 'eye-outline'} size={18} color={C.text3} />
            </TouchableOpacity>
          </View>
          {err ? <Text style={s.err}>{err}</Text> : null}
          <TouchableOpacity style={[s.btn, loading && { opacity: .7 }]} onPress={go} disabled={loading}>
            {loading ? <ActivityIndicator color={C.black} /> : <Text style={s.btnText}>Entrar</Text>}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
            <Text style={s.switch}>Não tem conta? <Text style={{ color: C.gold }}>Criar conta</Text></Text>
          </TouchableOpacity>
        </View>

        <View style={s.orRow}><View style={s.orLine} /><Text style={s.orText}>ou</Text><View style={s.orLine} /></View>

        <TouchableOpacity style={s.spotify} onPress={async () => { await loginSpotify(); router.replace('/(tabs)'); }}>
          <Text style={s.spotifyText}>🎵 Entrar com Spotify</Text>
          <Text style={s.spotifyMock}>(simulado)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.guestBtn} onPress={() => { guest(); router.replace('/(tabs)'); }}>
          <Ionicons name="eye-outline" size={16} color={C.text2} />
          <Text style={s.guestText}>Explorar como Visitante</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: C.black },
  inner: { padding: 24, paddingTop: 60 },
  logo: { alignItems: 'center', marginBottom: 28 },
  disc: { width: 64, height: 64, borderRadius: 32, borderWidth: 2, borderColor: C.gold, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  discDot: { width: 14, height: 14, borderRadius: 7, backgroundColor: C.gold },
  logoText: { color: C.cream, fontSize: 30, fontWeight: '700', letterSpacing: 1 },
  logoSub: { color: C.text3, fontSize: 14, marginTop: 4 },
  demoBanner: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: C.goldBg, padding: 12, borderRadius: R.md, marginBottom: 20, borderWidth: 1, borderColor: 'rgba(200,169,110,0.2)' },
  demoText: { color: C.gold, fontSize: 12, flex: 1 },
  form: { gap: 12 },
  field: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.s2, borderRadius: R.lg, paddingHorizontal: 14, borderWidth: 1, borderColor: C.border2 },
  fIco: { marginRight: 10 },
  fInput: { flex: 1, color: C.cream, fontSize: 15, paddingVertical: 14 },
  err: { color: C.red, fontSize: 13, textAlign: 'center' },
  btn: { backgroundColor: C.gold, padding: 16, borderRadius: R.xxl, alignItems: 'center' },
  btnText: { color: C.black, fontWeight: '700', fontSize: 16 },
  switch: { color: C.text2, fontSize: 14, textAlign: 'center', padding: 8 },
  orRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 20, gap: 10 },
  orLine: { flex: 1, height: 1, backgroundColor: C.border },
  orText: { color: C.text3, fontSize: 13 },
  spotify: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, backgroundColor: '#1DB954', padding: 15, borderRadius: R.lg, marginBottom: 10 },
  spotifyText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  spotifyMock: { color: 'rgba(255,255,255,0.6)', fontSize: 12 },
  guestBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 15, borderRadius: R.lg, borderWidth: 1, borderColor: C.border2 },
  guestText: { color: C.text2, fontSize: 14 },
});
