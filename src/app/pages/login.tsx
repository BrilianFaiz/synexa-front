import { Alert, TextInput } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

import SecondaryButton from "@/src/components/buttons/SecondaryButton/ButtonSecondary";
import { login } from "@/src/services/authService";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
  if (!email.trim() || !password.trim()) {
    Alert.alert(
      "Login Gagal",
      "Email dan password wajib diisi."
    );
    return;
  }

  if (!email.includes("@")) {
    Alert.alert(
      "Login Gagal",
      "Format email tidak valid."
    );
    return;
  }

  setIsLoading(true);

  try {
    const response = await login({
      email,
      password,
    });

    console.log("LOGIN:", response);

    Alert.alert(
      "Login Berhasil",
      `Selamat datang, ${response.user.name}!`,
      [
        {
          text: "OK",
          onPress: () => router.replace("/dashboard"),
        },
      ]
    );

  } catch (error: any) {
    console.error("LOGIN ERROR:", error);

    if (error.status === 422) {
      Alert.alert(
        "Data Tidak Valid",
        error.message
      );
      return;
    }

    if (error.status === 401) {
      Alert.alert(
        "Login Gagal",
        "Email atau password salah."
      );
      return;
    }

    Alert.alert(
      "Login Gagal",
      "Terjadi kesalahan. Silakan coba lagi."
    );

  } finally {
    setIsLoading(false);
  }
};

  return (
    <>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <SecondaryButton
        onPress={handleLogin}
        title={isLoading ? "Loading..." : "Login"}
        isLoading={isLoading}
      />

      <SecondaryButton
        onPress={() => router.push("/pages/register")}
        title="Belum Punya akun? Register"
        disabled={isLoading}
      />
    </>
  );
}