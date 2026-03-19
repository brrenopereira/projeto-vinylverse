import { Redirect } from 'expo-router';
import { useAuth } from './src/store';

export default function Index() {
  const user = useAuth(s => s.user);
  return <Redirect href={user ? '/(tabs)' : '/(auth)/login'} />;
}
