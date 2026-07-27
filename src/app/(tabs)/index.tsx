import { View, Text, TouchableOpacity,StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

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

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/register')}
      >
        <Text style={styles.buttonText}>Daftar Akun Baru</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.buttonOutline]}
        onPress={() => router.push('/login')}
      >
        <Text style={styles.buttonTextOutline}>Sudah Punya Akun? Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={()=>router.push('/dashboard')}>
        <Text style={styles.buttonText}>Coba dashboard</Text>
      </TouchableOpacity>
    </View>
    );
}