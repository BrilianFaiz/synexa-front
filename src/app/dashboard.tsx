import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";

import { LineChart } from "react-native-chart-kit";
import PrimaryButton from "@/src/components/buttons/ButtonPrimary/ButtonPrimary";

import { GradientContainer } from "@/src/components/pagesTemplate/GradientContainer";
import AuthGuard from "@/src/components/auth/authGuard";
import { useAuth } from "@/src/context/authContext";

export default function MainDashboard() {
  const [heartRate, setHeartRate] = useState(75);
  const [spo2, setSpo2] = useState(98);
  const [history, setHistory] = useState([
    75,
    76,
    74,
    78,
    75,
    77,
  ]);

  const { logout } = useAuth();

  useEffect(() => {
    const interval = setInterval(() => {
      const newValue = Math.floor(60 + Math.random() * 40);

      setHeartRate(newValue);

      setHistory((prev) => [
        ...prev.slice(-9),
        newValue,
      ]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthGuard>
      <GradientContainer>
        <ScrollView>
          <Text style={styles.title}>
            Dashboard Monitoring
          </Text>

          <View style={styles.cardRow}>
            <View style={styles.card}>
              <Text style={styles.cardLabel}>
                Detak Jantung
              </Text>

              <Text style={styles.cardValue}>
                {heartRate} bpm
              </Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardLabel}>
                SpO2
              </Text>

              <Text style={styles.cardValue}>
                {spo2}%
              </Text>
            </View>
          </View>

          <Text style={styles.chartTitle}>
            Tren Detak Jantung
          </Text>

          <LineChart
            data={{
              labels: history.map((_, i) => `${i}`),
              datasets: [
                {
                  data: history,
                },
              ],
            }}
            width={Dimensions.get("window").width - 32}
            height={200}
            chartConfig={{
              backgroundColor: "#fff",
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              decimalPlaces: 0,
              color: (opacity = 1) =>
                `rgba(37, 99, 235, ${opacity})`,
              labelColor: () => "#333",
            }}
            bezier
            style={{
              borderRadius: 12,
            }}
          />

          <PrimaryButton
            title="Logout"
            onPress={logout}
          />
        </ScrollView>
      </GradientContainer>
    </AuthGuard>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },

  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    width: "48%",
    alignItems: "center",
  },

  cardLabel: {
    fontSize: 14,
    color: "#666",
  },

  cardValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2563eb",
    marginTop: 4,
  },

  chartTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
});