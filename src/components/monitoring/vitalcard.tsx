import { View, Text, StyleSheet } from "react-native";

interface VitalCardProps {
  title: string;
  value: number;
  unit: string;
  icon: string;
}

export default function VitalCard({
  title,
  value,
  unit,
  icon,
}: VitalCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.icon}>{icon}</Text>

      <Text style={styles.title}>{title}</Text>

      <View style={styles.valueContainer}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.unit}>{unit}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 160,
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    elevation: 3,
  },

  icon: {
    fontSize: 28,
    marginBottom: 10,
  },

  title: {
    fontSize: 15,
    color: "#666666",
    marginBottom: 8,
  },

  valueContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 6,
  },

  value: {
    fontSize: 32,
    fontWeight: "700",
  },

  unit: {
    fontSize: 14,
    color: "#666666",
  },
});