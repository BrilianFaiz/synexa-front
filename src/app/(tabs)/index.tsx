import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import PrimaryButton from '@/src/components/buttons/ButtonPrimary/ButtonPrimary';
import SecondaryButton from '@/src/components/buttons/SecondaryButton/ButtonSecondary';

export default function HomeScreen() {
  const router = useRouter();
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 24,
      textAlign: 'center'
    },
    button: {
      backgroundColor: '#2563eb',
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
      marginBottom: 12,
    },
    buttonOutline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: '#2563eb',
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
    buttonTextOutline: {
      color: '#2563eb',
      fontWeight: 'bold',
      fontSize: 16,
    },

  })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monitor Pasien Pasca-Stroke</Text>

      <PrimaryButton
        title="Daftar Akun Baru"
        onPress={() => router.push('/register')}
      ></PrimaryButton>

      <SecondaryButton
        onPress={() => router.push('/login')}
        title='Sudah Punya Akun? Login'
      ></SecondaryButton>

      <PrimaryButton onPress={() => router.push('/dashboard')} title='Coba dashboard'></PrimaryButton>
    </View>
  );
}