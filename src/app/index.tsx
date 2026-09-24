import { Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";

import SecondaryButton from "@/src/components/buttons/SecondaryButton/ButtonSecondary";
import { GradientContainer } from "@/src/components/pagesTemplate/GradientContainer";
import { useAuth } from "@/src/context/authContext";

export default function HomeScreen() {
  const router = useRouter();

  const {
    isLoading,
    isAuthenticated,
    patientProfile,
  } = useAuth();

useEffect(() => {
  if (isLoading) {
    return;
  }

  if (!isAuthenticated) {
    return;
  }

  if (!patientProfile) {
    router.replace("/pages/patient-profile");
    return;
  }

  router.replace("/dashboard");
}, [isLoading, isAuthenticated, patientProfile]);

  if (isLoading) {
    return null;
  }

  return (
    <GradientContainer>
      <Text style={styles.title}>
        Monitor Pasien Pasca-Stroke
      </Text>

      <SecondaryButton
        title="Login"
        onPress={() => router.push("/pages/login")}
      />

      <SecondaryButton
        title="Register"
        onPress={() => router.push("/pages/register")}
      />
    </GradientContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
});