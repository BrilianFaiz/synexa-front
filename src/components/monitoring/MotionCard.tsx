import { View, Text, StyleSheet } from "react-native";

interface MotionCardProps {
  acceleration: {
    x: number;
    y: number;
    z: number;
  };

  gyroscope: {
    x: number;
    y: number;
    z: number;
  };
}

export default function MotionCard({
  acceleration,
  gyroscope,
}: MotionCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Motion</Text>

      <View style={styles.columns}>
        <View style={styles.column}>
          <Text style={styles.subtitle}>Acceleration</Text>

          <Text>X: {acceleration.x}</Text>
          <Text>Y: {acceleration.y}</Text>
          <Text>Z: {acceleration.z}</Text>
        </View>

        <View style={styles.column}>
          <Text style={styles.subtitle}>Gyroscope</Text>

          <Text>X: {gyroscope.x}</Text>
          <Text>Y: {gyroscope.y}</Text>
          <Text>Z: {gyroscope.z}</Text>
        </View>
      </View>
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
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 20,
  },

  columns: {
    flexDirection: "row",
    gap: 40,
  },

  column: {
    flex: 1,
  },

  subtitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 10,
  },
});