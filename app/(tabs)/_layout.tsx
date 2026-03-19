import { Tabs, router } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { C, R } from '../src/theme';
import { useCart } from '../src/store';

function CartBtn() {
  const n = useCart(s => s.count());
  return (
    <TouchableOpacity style={s.cartBtn} onPress={() => router.push('/cart')}>
      <Ionicons name="bag-outline" size={24} color={C.cream} />
      {n > 0 && <View style={s.badge}><Text style={s.badgeText}>{n > 9 ? '9+' : n}</Text></View>}
    </TouchableOpacity>
  );
}

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      tabBarStyle: s.bar, tabBarActiveTintColor: C.gold, tabBarInactiveTintColor: C.text3,
      tabBarLabelStyle: s.label,
      headerStyle: s.hdr, headerTintColor: C.cream, headerTitleStyle: s.hdrTitle,
      headerRight: () => <CartBtn />, headerRightContainerStyle: { paddingRight: 16 },
    }}>
      <Tabs.Screen name="index" options={{ title:'VinylVerse', tabBarLabel:'Home', tabBarIcon:({color,size}) => <Ionicons name="home-outline" size={size} color={color} /> }} />
      <Tabs.Screen name="discover" options={{ title:'Descobrir', tabBarIcon:({color,size}) => <Ionicons name="compass-outline" size={size} color={color} /> }} />
      <Tabs.Screen name="marketplace" options={{ title:'Loja', tabBarIcon:({color,size}) => <Ionicons name="storefront-outline" size={size} color={color} /> }} />
      <Tabs.Screen name="collection" options={{ title:'Coleção', tabBarIcon:({color,size}) => <Ionicons name="albums-outline" size={size} color={color} /> }} />
      <Tabs.Screen name="profile" options={{ title:'Perfil', tabBarIcon:({color,size}) => <Ionicons name="person-outline" size={size} color={color} /> }} />
    </Tabs>
  );
}

const s = StyleSheet.create({
  bar: { backgroundColor:'#111', borderTopColor:C.border, borderTopWidth:1, height:60, paddingBottom:8, paddingTop:4 },
  label: { fontSize:10, fontWeight:'500' },
  hdr: { backgroundColor:C.black, shadowColor:'transparent', elevation:0, borderBottomColor:C.border, borderBottomWidth:1 },
  hdrTitle: { color:C.cream, fontSize:20, fontWeight:'700', letterSpacing:.3 },
  cartBtn: { position:'relative', padding:4 },
  badge: { position:'absolute', top:0, right:0, backgroundColor:C.gold, borderRadius:8, minWidth:16, height:16, alignItems:'center', justifyContent:'center', paddingHorizontal:3 },
  badgeText: { color:C.black, fontSize:9, fontWeight:'700' },
});
