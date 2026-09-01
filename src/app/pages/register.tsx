import { useRouter } from 'expo-router';
import {useState} from 'react';
import { Text, StyleSheet,TouchableOpacity, TextInput} from 'react-native';
import { GradientContainer } from '@/src/components/pagesTemplate/GradientContainer'; 

export default function Register() {
    // Menerapkan konsep 'state' untuk mengingat input pengguna. 
    // State ini akan selalu diperbarui secara real-time setiap kali ada perubahan pada kolom input.
    const [nama,setNama] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    
    // Fungsi ini dieksekusi saat tombol 'Daftar' ditekan. 
    // Saat ini, fungsinya menangkap data dari state dan menampilkannya di terminal (console.log).
    const handleRegister =() => {
        console.log('Nama yang didaftarkan ',{nama, email,password});
    }
    const router = useRouter();
    const navLogin =() => {
        router.push('/(tabs)')}

    // StyleSheet digunakan untuk mendefinisikan tampilan komponen.
    // Catatan kecil: Penempatan 'styles' di dalam fungsi utama (Register) bisa membuatnya 
    // di-render ulang terus-menerus. Nantinya, ini lebih ideal diletakkan di luar fungsi utama.
    const styles = StyleSheet.create({
    container: {
        flex: 1, // Menginstruksikan wadah (View) untuk memenuhi seluruh area layar
        justifyContent: 'center', // Memposisikan konten ke tengah secara vertikal
        alignItems: 'center', // Memposisikan konten ke tengah secara horizontal
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom : 24,
        textAlign: 'center'
    },
    input:{
        backgroundColor : '#fff',
        padding : 14,
        borderRadius: 10,
        marginBottom: 10,
        borderWidth :1,
        borderColor :'#ddd'
    },
    buton:{ 
        backgroundColor: '#007bff',
        padding: 14,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    });

    return (
        // <View> adalah wadah utama komponen, bertindak seperti <div> di pengembangan web.
        <GradientContainer>
            <Text style={styles.title}>Daftarkan Akun</Text>
            
            {/* TextInput pertama menerapkan 'controlled input'. 
                'value' mengambil nilai dari state 'nama', dan 
                'onChangeText' memperbarui state 'nama' setiap kali huruf diketik. */}
            <TextInput 
            style = {styles.input}
            placeholder="Nama Lengkap"
            value={nama}
            onChangeText={setNama}
            />
            
            {/* TextInput untuk Email */}
            <TextInput 
            style = {styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            />
            
            {/* TextInput untuk Password. 
                Properti 'secureTextEntry' ditambahkan agar karakter yang diketik
                disamarkan menjadi titik-titik demi keamanan. */}
            <TextInput 
            style = {styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            />
            
            {/* TouchableOpacity bertindak sebagai tombol interaktif. 
                Properti 'onPress' akan memanggil fungsi 'handleRegister' saat tombol ditekan. */}
            <TouchableOpacity style={styles.buton} onPress={handleRegister}>
                <Text style={styles.buttonText}>Daftar</Text>
            </TouchableOpacity>
                <Text>{"\n"}</Text>
            <Text>Sudah punya akun? kembali ke halaman login</Text>
            <TouchableOpacity style={styles.buton} onPress={navLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </GradientContainer>

    );
}