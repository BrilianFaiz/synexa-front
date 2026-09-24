import {
  ScrollView,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";

import VitalCard from "@/src/components/monitoring/vitalcard";
import SoundCard from "@/src/components/monitoring/SoundCard";
import MotionCard from "@/src/components/monitoring/MotionCard";
import { getMonitoring } from "@/src/services/monitoringService";
import { MonitoringData } from "@/src/types/monitoring";

export default function MonitoringScreen() {
  const [monitoring, setMonitoring] =
    useState<MonitoringData | null>(null);

  useEffect(() => {
    loadMonitoring();
  }, []);

  async function loadMonitoring() {
    const data = await getMonitoring();
    setMonitoring(data);
  }

  if (!monitoring) {
    return null;
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Monitoring</Text>

        <Text style={styles.subtitle}>
          Real-time patient monitoring
        </Text>
      </View>

      {/* Device Status */}
      <View style={styles.statusCard}>
        <View style={styles.statusDot} />

        <View>
          <Text style={styles.statusTitle}>
            Device Connected
          </Text>

          <Text style={styles.statusSubtitle}>
            Synexa Device 001
          </Text>
        </View>
      </View>

      {/* Vital Signs */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Vital Signs
        </Text>

        <View style={styles.vitalRow}>
          <VitalCard
            title="Heart Rate"
            value={monitoring.heartRate}
            unit="BPM"
            icon="❤️"
          />

          <VitalCard
            title="SpO₂"
            value={monitoring.spo2}
            unit="%"
            icon="🫁"
          />
        </View>
      </View>

      {/* Sound */}
      <View style={styles.section}>
        <SoundCard detected={monitoring.sound} />
      </View>

      {/* Motion */}
      <View style={styles.section}>
        <MotionCard
          acceleration={monitoring.acceleration}
          gyroscope={monitoring.gyroscope}
        />
      </View>

      {/* Last Update */}
      <Text style={styles.lastUpdate}>
        Last update:{" "}
        {new Date(monitoring.timestamp).toLocaleTimeString()}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 80,
    gap: 20,
  },

  header: {
    marginBottom: 10,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
  },

  subtitle: {
    marginTop: 5,
    color: "#666666",
  },

  statusCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 18,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    elevation: 3,
  },

  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "green",
  },

  statusTitle: {
    fontSize: 16,
    fontWeight: "600",
  },

  statusSubtitle: {
    marginTop: 3,
    color: "#666666",
  },

  section: {
    gap: 12,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
  },

  vitalRow: {
    flexDirection: "row",
    gap: 16,
    flexWrap: "wrap",
  },

  lastUpdate: {
    textAlign: "right",
    color: "#777777",
    fontSize: 12,
  },
});