import { MonitoringData } from "@/src/types/monitoring";

const mockMonitoring: MonitoringData = {
  heartRate: 200,

  spo2: 97,

  sound: false,

  acceleration: {
    x: 0.12,
    y: 0.34,
    z: 0.98,
  },

  gyroscope: {
    x: 0.01,
    y: 0.02,
    z: 0.03,
  },

  timestamp: Date.now(),
};

export async function getMonitoring(): Promise<MonitoringData> {
  return mockMonitoring;
}