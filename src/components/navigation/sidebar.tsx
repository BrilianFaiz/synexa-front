import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import { usePathname, useRouter } from "expo-router";
import { useAuth } from "@/src/context/authContext";

interface MenuItem {
  label: string;
  route:
    | "/dashboard"
    | "/monitoring"
    | "/devices"
    | "/risk-alerts"
    | "/profile";
}

const menuItems: MenuItem[] = [
  {
    label: "Dashboard",
    route: "/dashboard",
  },
  {
    label: "Monitoring",
    route: "/monitoring",
  },
  {
    label: "Devices",
    route: "/devices",
  },
  {
    label: "Risk Alerts",
    route: "/risk-alerts",
  },
  {
    label: "Profile",
    route: "/profile",
  },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const { user, logout } = useAuth();

  return (
    <View style={styles.sidebar}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>
          SYNEXA
        </Text>

        <Text style={styles.subtitle}>
          Patient Monitoring
        </Text>
      </View>

      {/* User */}
      <View style={styles.userSection}>
        <Text style={styles.userName}>
          {user?.name}
        </Text>

        <Text style={styles.userEmail}>
          {user?.email}
        </Text>
      </View>

      {/* Menu */}
      <View style={styles.menu}>
        {menuItems.map((item) => {
          const isActive =
            pathname === item.route;

          return (
            <Pressable
              key={item.route}
              onPress={() => router.push(item.route)}
              style={[
                styles.menuItem,
                isActive && styles.menuItemActive,
              ]}
            >
              <Text
                style={[
                  styles.menuText,
                  isActive && styles.menuTextActive,
                ]}
              >
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Logout */}
      <Pressable
        onPress={logout}
        style={styles.logoutButton}
      >
        <Text style={styles.logoutText}>
          Logout
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 240,
    height: "100%",
    padding: 20,
    backgroundColor: "#ffffff",
    borderRightWidth: 1,
    borderRightColor: "#e5e7eb",
  },

  header: {
    marginBottom: 30,
  },

  logo: {
    fontSize: 24,
    fontWeight: "800",
  },

  subtitle: {
    marginTop: 4,
    fontSize: 12,
    color: "#6b7280",
  },

  userSection: {
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },

  userName: {
    fontSize: 16,
    fontWeight: "600",
  },

  userEmail: {
    marginTop: 4,
    fontSize: 12,
    color: "#6b7280",
  },

  menu: {
    marginTop: 20,
    gap: 8,
  },

  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
  },

  menuItemActive: {
    backgroundColor: "#e5e7eb",
  },

  menuText: {
    fontSize: 15,
    color: "#374151",
  },

  menuTextActive: {
    fontWeight: "700",
    color: "#111827",
  },

  logoutButton: {
    marginTop: "auto",
    paddingVertical: 12,
    paddingHorizontal: 14,
  },

  logoutText: {
    fontSize: 15,
    fontWeight: "600",
  },
});