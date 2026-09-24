import { useState } from "react";
import {
  View,
  Pressable,
  Text,
  StyleSheet,
} from "react-native";
import { Stack } from "expo-router";

import Sidebar from "@/src/components/navigation/sidebar";

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <View style={styles.container}>

      {isSidebarOpen && <Sidebar />}

      <View style={styles.content}>

        {/* Tombol buka/tutup sidebar */}
        <Pressable
          style={styles.menuButton}
          onPress={() => setIsSidebarOpen((prev) => !prev)}
        >
          <Text style={styles.menuIcon}>☰</Text>
        </Pressable>

        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },

  content: {
    flex: 1,
  },

  menuButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 10,

    width: 45,
    height: 45,
    borderRadius: 8,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#ffffff",
    elevation: 4,
  },

  menuIcon: {
    fontSize: 24,
  },
});