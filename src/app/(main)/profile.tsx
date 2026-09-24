import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
  Platform,
ScrollView
} from "react-native";

import { useState } from "react";

import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import { updatePatientProfile } from "@/src/services/patientProfileService";
import { useAuth } from "@/src/context/authContext";

export default function ProfileScreen() {
  const {
    user,
    patientProfile,
    refreshUser,
  } = useAuth();

  // =========================
  // STATE
  // =========================

  const [dateOfBirth, setDateOfBirth] =
    useState<Date | null>(
      patientProfile?.date_of_birth
        ? new Date(patientProfile.date_of_birth)
        : null
    );

  const [showDobPicker, setShowDobPicker] =
    useState(false);

  const [gender, setGender] =
    useState(patientProfile?.gender ?? "");

  const [phone, setPhone] =
    useState(patientProfile?.phone ?? "");

  const [address, setAddress] =
    useState(patientProfile?.address ?? "");

  const [strokeHistory, setStrokeHistory] =
    useState(
      patientProfile?.stroke_history ?? false
    );

  const [strokeDate, setStrokeDate] =
    useState<Date | null>(
      patientProfile?.stroke_date
        ? new Date(patientProfile.stroke_date)
        : null
    );

  const [showStrokePicker, setShowStrokePicker] =
    useState(false);

  const [notes, setNotes] =
    useState(patientProfile?.notes ?? "");

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
  // DATE OF BIRTH
  // =========================

  const handleDobChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    if (Platform.OS === "android") {
      setShowDobPicker(false);
    }

    if (selectedDate) {
      setDateOfBirth(selectedDate);
    }
  };

  // =========================
  // STROKE DATE
  // =========================

  const handleStrokeDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    if (Platform.OS === "android") {
      setShowStrokePicker(false);
    }

    if (selectedDate) {
      setStrokeDate(selectedDate);
    }
  };

  // =========================
  // SAVE
  // =========================

  const handleSave = async () => {
    if (!dateOfBirth || !gender || !phone) {
      Alert.alert(
        "Data Belum Lengkap",
        "Tanggal lahir, jenis kelamin, dan nomor HP wajib diisi."
      );

      return;
    }

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
        "UPDATE PATIENT PROFILE:",
        payload
      );

      await updatePatientProfile(payload);

      await refreshUser();

      Alert.alert(
        "Berhasil",
        "Profil berhasil diperbarui."
      );
    } catch (error: any) {
      console.error(
        "UPDATE PROFILE ERROR:",
        error
      );

      if (error.status === 422) {
        Alert.alert(
          "Data Tidak Valid",
          error.message
        );

        return;
      }

      Alert.alert(
        "Gagal",
        "Terjadi kesalahan saat memperbarui profil."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // =========================
  // UI
  // =========================

  return (
      <ScrollView
    contentContainerStyle={styles.container}
    showsVerticalScrollIndicator={false}
  >
    <View style={styles.container}>

      <Text style={styles.title}>
        Profile
      </Text>

      {/* =========================
          ACCOUNT
          ========================= */}

      <Text style={styles.sectionTitle}>
        Account
      </Text>

      <Text style={styles.label}>
        Nama
      </Text>

      <TextInput
        style={styles.input}
        value={user?.name ?? ""}
        editable={false}
      />

      <Text style={styles.label}>
        Email
      </Text>

      <TextInput
        style={styles.input}
        value={user?.email ?? ""}
        editable={false}
      />

      {/* =========================
          PATIENT
          ========================= */}

      <Text style={styles.sectionTitle}>
        Data Pasien
      </Text>

      {/* DOB */}

      <Text style={styles.label}>
        Tanggal Lahir
      </Text>

      <TouchableOpacity
        style={styles.dateSelector}
        onPress={() => setShowDobPicker(true)}
      >
        <Text>
          {dateOfBirth
            ? dateOfBirth.toLocaleDateString(
                "id-ID",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }
              )
            : "Pilih tanggal lahir"}
        </Text>
      </TouchableOpacity>

      {showDobPicker && (
        <DateTimePicker
          value={
            dateOfBirth ??
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

      {/* GENDER */}

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
          <Text>
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
          <Text>
            Perempuan
          </Text>
        </TouchableOpacity>
      </View>

      {/* PHONE */}

      <Text style={styles.label}>
        Nomor HP
      </Text>

      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      {/* ADDRESS */}

      <Text style={styles.label}>
        Alamat
      </Text>

      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        multiline
      />

      {/* STROKE */}

      <Text style={styles.label}>
        Riwayat Stroke
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
            setStrokeDate(null);
          }}
        >
          <Text>
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
          <Text>
            Ya
          </Text>
        </TouchableOpacity>
      </View>

      {/* STROKE DATE */}

      {strokeHistory && (
        <>
          <Text style={styles.label}>
            Tanggal Stroke
          </Text>

          <TouchableOpacity
            style={styles.dateSelector}
            onPress={() =>
              setShowStrokePicker(true)
            }
          >
            <Text>
              {strokeDate
                ? strokeDate.toLocaleDateString(
                    "id-ID",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  )
                : "Pilih tanggal stroke"}
            </Text>
          </TouchableOpacity>

          {showStrokePicker && (
            <DateTimePicker
              value={
                strokeDate ?? new Date()
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

      {/* NOTES */}

      <Text style={styles.label}>
        Catatan
      </Text>

      <TextInput
        style={[
          styles.input,
          styles.notes,
        ]}
        value={notes}
        onChangeText={setNotes}
        multiline
      />

      {/* SAVE */}

      <TouchableOpacity
        style={styles.button}
        onPress={handleSave}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading
            ? "Menyimpan..."
            : "Simpan Perubahan"}
        </Text>
      </TouchableOpacity>

    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
 container: {
  padding: 24,
},
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 14,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
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

  notes: {
    minHeight: 90,
    textAlignVertical: "top",
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