import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { GradientContainer } from "@/src/components/pagesTemplate/GradientContainer";
import { register } from "@/src/services/authService";
import { useAuth } from "@/src/context/authContext";

export default function Register() {
  const router = useRouter();

  const { refreshUser } = useAuth();

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    // =========================
    // VALIDASI INPUT
    // =========================

    if (!nama.trim() || !email.trim() || !password.trim()) {
      Alert.alert(
        "Registrasi Gagal",
        "Nama, email, dan password wajib diisi."
      );
      return;
    }

    if (!email.includes("@")) {
      Alert.alert(
        "Registrasi Gagal",
        "Format email tidak valid."
      );
      return;
    }

    if (password.length < 8) {
      Alert.alert(
        "Registrasi Gagal",
        "Password minimal 8 karakter."
      );
      return;
    }

    setIsLoading(true);

    try {
      // =========================
      // REGISTER KE BACKEND
      // =========================

      const response = await register({
        name: nama,
        email,
        password,
      });

      console.log("REGISTER:", response);

      // =========================
      // UPDATE AUTH STATE
      // =========================

      await refreshUser();

      Alert.alert(
        "Registrasi Berhasil",
        `Selamat datang, ${response.user.name}!`,
        [
          {
            text: "OK",
            onPress: () => router.replace("/dashboard"),
          },
        ]
      );
    } catch (error: any) {
      console.error("REGISTER ERROR:", error);

      if (error.status === 422) {
        Alert.alert(
          "Data Tidak Valid",
          error.message
        );
        return;
      }

      if (error.status === 409) {
        Alert.alert(
          "Registrasi Gagal",
          "Email sudah terdaftar."
        );
        return;
      }

      Alert.alert(
        "Registrasi Gagal",
        "Terjadi kesalahan. Silakan coba lagi."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const navLogin = () => {
    router.push("/pages/login");
  };

  return (
    <GradientContainer>
      <Text style={styles.title}>
        Daftarkan Akun
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nama Lengkap"
        value={nama}
        onChangeText={setNama}
        editable={!isLoading}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        editable={!isLoading}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!isLoading}
      />

      <TouchableOpacity
        style={styles.buton}
        onPress={handleRegister}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? "Mendaftarkan..." : "Daftar"}
        </Text>
      </TouchableOpacity>

      <Text style={styles.loginText}>
        Sudah punya akun? Kembali ke halaman login
      </Text>

      <TouchableOpacity
        style={styles.buton}
        onPress={navLogin}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          Login
        </Text>
      </TouchableOpacity>
    </GradientContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },

  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  buton: {
    backgroundColor: "#007bff",
    padding: 14,
    alignItems: "center",
    marginTop: 10,
    borderRadius: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  loginText: {
    marginTop: 20,
    marginBottom: 5,
    textAlign: "center",
  },
});