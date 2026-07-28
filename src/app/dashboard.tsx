import { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useRouter } from "expo-router";
import  PrimaryButton from "@/src/components/buttons/ButtonPrimary/ButtonPrimary";

export default function mainDashboard() {
    const [heartRate, setHeartRate] = useState(75);
    const [spo2, setSpo2] = useState(98);
    const [history, setHistory] = useState([75, 76, 74, 78, 75, 77]);
    const router = useRouter();
    const navLogin =() => {
        router.push('/(tabs)')}

    useEffect(() => {
        const interval = setInterval(() => {
            const newValue = Math.floor(60 + Math.random() * 40); // angka acak 60-100
            setHeartRate(newValue);
            setHistory((prev) => [...prev.slice(-9), newValue]); // simpan 10 data terakhir
        }, 2000);

        return () => clearInterval(interval); // bersihkan interval saat halaman ditutup
    }, []);

    const styles = StyleSheet.create({
        botton:{
           backgroundColor: '#2563eb',
            padding:"auto",
            borderRadius:16,
            alignItems:"center",
            marginBottom:16
        },
        buttontext:{
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 16,
        },
       
        container: {
            flex: 1,
            padding: 16,
            backgroundColor: '#f5f5f5',
        },
        title: {
            fontSize: 22,
            fontWeight: 'bold',
            marginBottom: 16,
        },
        cardRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 24,
        },
        card: {
            backgroundColor: '#fff',
            padding: 16,
            borderRadius: 12,
            width: '48%',
            alignItems: 'center',
        },
        cardLabel: {
            fontSize: 14,
            color: '#666',
        },
        cardValue: {
            fontSize: 24,
            fontWeight: 'bold',
            color: '#2563eb',
            marginTop: 4,
        },
        chartTitle: {
            fontSize: 16,
            fontWeight: '600',
            marginBottom: 12,
        },
    });

    return (
         <ScrollView style={styles.container}>
      <Text style={styles.title}>Dashboard Monitoring</Text>

      <View style={styles.cardRow}>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Detak Jantung</Text>
          <Text style={styles.cardValue}>{heartRate} bpm</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>SpO2</Text>
          <Text style={styles.cardValue}>{spo2}%</Text>
        </View>
      </View>

      <Text style={styles.chartTitle}>Tren Detak Jantung</Text>
      <LineChart
        data={{
          labels: history.map((_, i) => `${i}`),
          datasets: [{ data: history }],
        }}
        width={Dimensions.get('window').width - 32}
        height={200}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
          labelColor: () => '#333',
        }}
        bezier
        style={{ borderRadius: 12 }}
      />
       <PrimaryButton title="Login" onPress={navLogin}></PrimaryButton>
    </ScrollView>
    );
}