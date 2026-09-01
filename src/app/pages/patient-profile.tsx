import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
  Platform,
} from "react-native";

import { useState } from "react";
import { useRouter } from "expo-router";

import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import { GradientContainer } from "@/src/components/pagesTemplate/GradientContainer";
import { createPatientProfile } from "@/src/services/patientProfileService";
import { useAuth } from "@/src/context/authContext";

export default function PatientProfile() {
  const router = useRouter();
  const { refreshUser } = useAuth();

  // =========================
  // STATE
  // =========================

  const [dateOfBirth, setDateOfBirth] =
    useState<Date | null>(null);

  const [showDobPicker, setShowDobPicker] =
    useState(false);

  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [strokeHistory, setStrokeHistory] =
    useState(false);

  const [strokeDate, setStrokeDate] =
    useState<Date | null>(null);

  const [showStrokePicker, setShowStrokePicker] =
    useState(false);

  const [notes, setNotes] = useState("");

  const [isLoading, setIsLoading] =
    useState(false);

  // =========================
  // FORMAT DATE
  // =========================

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();

    const month = String(
      date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      date.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // =========================
  // DATE OF BIRTH PICKER
  // =========================

  const handleDobChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    // Android:
    // picker langsung ditutup setelah memilih/batal
    if (Platform.OS === "android") {
      setShowDobPicker(false);
    }

    // iOS:
    // picker tetap terbuka
    if (Platform.OS === "ios") {
      setShowDobPicker(true);
    }

    if (selectedDate) {
      setDateOfBirth(selectedDate);
    }
  };

  // =========================
  // STROKE DATE PICKER
  // =========================

  const handleStrokeDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    if (Platform.OS === "android") {
      setShowStrokePicker(false);
    }

    if (Platform.OS === "ios") {
      setShowStrokePicker(true);
    }

    if (selectedDate) {
      setStrokeDate(selectedDate);
    }
  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async () => {
    // Validasi data wajib
    if (!dateOfBirth || !gender || !phone) {
      Alert.alert(
        "Data Belum Lengkap",
        "Tanggal lahir, jenis kelamin, dan nomor HP wajib diisi."
      );

      return;
    }

    // Kalau memiliki riwayat stroke,
    // tanggal stroke wajib diisi
    if (strokeHistory && !strokeDate) {
      Alert.alert(
        "Data Belum Lengkap",
        "Tanggal stroke wajib diisi."
      );

      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        date_of_birth: formatDate(dateOfBirth),

        gender,

        phone,

        address,

        stroke_history: strokeHistory,

        stroke_date:
          strokeHistory && strokeDate
            ? formatDate(strokeDate)
            : null,

        notes,
      };

      console.log(
        "PATIENT PROFILE PAYLOAD:",
        payload
      );

      await createPatientProfile(payload);

      // Refresh data user + patient profile
      await refreshUser();

      Alert.alert(
        "Profil Berhasil",
        "Data profil pasien berhasil disimpan.",
        [
          {
            text: "OK",
            onPress: () =>
              router.replace("/dashboard"),
          },
        ]
      );
    } catch (error: any) {
      console.error(
        "PATIENT PROFILE ERROR:",
        error
      );

      if (error.status === 422) {
        Alert.alert(
          "Data Tidak Valid",
          error.message
        );

        return;
      }

      if (error.status === 409) {
        Alert.alert(
          "Profil Sudah Ada",
          "Patient profile sudah tersedia."
        );

        return;
      }

      Alert.alert(
        "Gagal",
        "Terjadi kesalahan saat menyimpan profil."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // =========================
  // UI
  // =========================

  return (
    <GradientContainer>
      <Text style={styles.title}>
        Profil Pasien
      </Text>

      {/* =========================
          TANGGAL LAHIR
          ========================= */}

      <Text style={styles.label}>
        Tanggal Lahir
      </Text>

      <TouchableOpacity
        style={styles.dateSelector}
        onPress={() => setShowDobPicker(true)}
      >
        <Text
          style={
            dateOfBirth
              ? styles.dateText
              : styles.placeholderText
          }
        >
          {dateOfBirth
            ? dateOfBirth.toLocaleDateString(
                "id-ID",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }
              )
            : "Pilih Tanggal Lahir"}
        </Text>
      </TouchableOpacity>

      {showDobPicker && (
        <DateTimePicker
          value={
            dateOfBirth ||
            new Date(2000, 0, 1)
          }
          mode="date"
          display={
            Platform.OS === "ios"
              ? "spinner"
              : "default"
          }
          maximumDate={new Date()}
          onChange={handleDobChange}
        />
      )}

      {/* =========================
          JENIS KELAMIN
          ========================= */}

      <Text style={styles.label}>
        Jenis Kelamin
      </Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={[
            styles.option,
            gender === "male" &&
              styles.optionActive,
          ]}
          onPress={() =>
            setGender("male")
          }
        >
          <Text
            style={
              gender === "male"
                ? styles.optionActiveText
                : undefined
            }
          >
            Laki-laki
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.option,
            gender === "female" &&
              styles.optionActive,
          ]}
          onPress={() =>
            setGender("female")
          }
        >
          <Text
            style={
              gender === "female"
                ? styles.optionActiveText
                : undefined
            }
          >
            Perempuan
          </Text>
        </TouchableOpacity>
      </View>

      {/* =========================
          NOMOR HP
          ========================= */}

      <TextInput
        style={styles.input}
        placeholder="Nomor HP"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      {/* =========================
          ALAMAT
          ========================= */}

      <TextInput
        style={styles.input}
        placeholder="Alamat"
        value={address}
        onChangeText={setAddress}
        multiline
      />

      {/* =========================
          RIWAYAT STROKE
          ========================= */}

      <Text style={styles.label}>
        Apakah memiliki riwayat stroke?
      </Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={[
            styles.option,
            !strokeHistory &&
              styles.optionActive,
          ]}
          onPress={() => {
            setStrokeHistory(false);

            // Reset tanggal stroke
            setStrokeDate(null);
          }}
        >
          <Text
            style={
              !strokeHistory
                ? styles.optionActiveText
                : undefined
            }
          >
            Tidak
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.option,
            strokeHistory &&
              styles.optionActive,
          ]}
          onPress={() =>
            setStrokeHistory(true)
          }
        >
          <Text
            style={
              strokeHistory
                ? styles.optionActiveText
                : undefined
            }
          >
            Ya
          </Text>
        </TouchableOpacity>
      </View>

      {/* =========================
          TANGGAL STROKE
          ========================= */}

      {strokeHistory && (
        <>
          <Text style={styles.label}>
            Tanggal Terjadinya Stroke
          </Text>

          <TouchableOpacity
            style={styles.dateSelector}
            onPress={() =>
              setShowStrokePicker(true)
            }
          >
            <Text
              style={
                strokeDate
                  ? styles.dateText
                  : styles.placeholderText
              }
            >
              {strokeDate
                ? strokeDate.toLocaleDateString(
                    "id-ID",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  )
                : "Pilih Tanggal Stroke"}
            </Text>
          </TouchableOpacity>

          {showStrokePicker && (
            <DateTimePicker
              value={
                strokeDate ||
                new Date()
              }
              mode="date"
              display={
                Platform.OS === "ios"
                  ? "spinner"
                  : "default"
              }
              maximumDate={new Date()}
              onChange={
                handleStrokeDateChange
              }
            />
          )}
        </>
      )}

      {/* =========================
          CATATAN
          ========================= */}

      <TextInput
        style={[
          styles.input,
          styles.notes,
        ]}
        placeholder="Catatan tambahan (opsional)"
        value={notes}
        onChangeText={setNotes}
        multiline
      />

      {/* =========================
          SUBMIT
          ========================= */}

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading
            ? "Menyimpan..."
            : "Simpan Profil"}
        </Text>
      </TouchableOpacity>
    </GradientContainer>
  );
}

// =========================
// STYLES
// =========================

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
  },

  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  dateSelector: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
  },

  dateText: {
    color: "#000",
    fontSize: 15,
  },

  placeholderText: {
    color: "#9ca3af",
    fontSize: 15,
  },

  notes: {
    minHeight: 90,
    textAlignVertical: "top",
  },

  row: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 14,
  },

  option: {
    flex: 1,
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  optionActive: {
    borderColor: "#2563eb",
    backgroundColor: "#dbeafe",
  },

  optionActiveText: {
    color: "#2563eb",
    fontWeight: "600",
  },

  button: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});