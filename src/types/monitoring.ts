export interface MonitoringData {
  heartRate: number;
  spo2: number;
  sound: boolean;

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

  timestamp: number;
}