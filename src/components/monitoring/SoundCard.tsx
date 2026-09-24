import { View, Text, StyleSheet } from "react-native";

interface SoundCardProps {
  detected: boolean;
}

export default function SoundCard({ detected }: SoundCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Sound</Text>

      <Text style={styles.status}>
        {detected ? "🔊 Detected" : "🔇 Quiet"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    elevation: 3,
  },

  title: {
    fontSize: 15,
    color: "#666666",
    marginBottom: 10,
  },

  status: {
    fontSize: 22,
    fontWeight: "600",
  },
});