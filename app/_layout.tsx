import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform, View } from 'react-native';
import { C } from './src/theme';

const isWeb = Platform.OS === 'web';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#000' }}>
      <SafeAreaProvider>
        <StatusBar style="light" backgroundColor={C.black} />
        <View style={isWeb ? {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000',
        } : { flex: 1 }}>
          <View style={isWeb ? {
            width: 390,
            height: '100%',
            maxHeight: 844,
            overflow: 'hidden',
            position: 'relative',
          } as any : { flex: 1 }}>
            <Stack screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: C.black },
              animation: isWeb ? 'none' : 'slide_from_right',
            }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="(auth)" />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="product/[id]" />
              <Stack.Screen name="cart" options={{ presentation: isWeb ? 'card' : 'modal' }} />
              <Stack.Screen name="checkout" />
              <Stack.Screen name="done" />
            </Stack>
          </View>
        </View>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
