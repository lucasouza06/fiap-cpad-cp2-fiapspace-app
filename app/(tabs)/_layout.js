import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { View, Text, Image } from "react-native";
import { EventosContext } from "../_layout"; 

function LogoTitle() {
  return (
    <View style={{ flexDirection: 'row' }}>
      <Text style={{ color: '#ED145B', fontSize: 22, fontWeight: '900' }}>
        FIAP<Text style={{ color: '#fff' }}>Space</Text>
      </Text>
    </View>
  );
}

export default function TabsLayout() {
  const { usuario } = useContext(EventosContext);

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: "#000", borderTopColor: "#1A1A1A", height: 65, paddingBottom: 10 },
        tabBarActiveTintColor: "#ed145b",
        tabBarInactiveTintColor: "#666",
        headerStyle: { backgroundColor: "#000" },
        headerTintColor: "#fff",
      }}
    >
      <Tabs.Screen name="home" options={{ title: "Início", headerTitle: () => <LogoTitle />, tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} /> }} />
      <Tabs.Screen name="eventos" options={{ title: "Agenda", tabBarIcon: ({ color, size }) => <Ionicons name="calendar" size={size} color={color} /> }} />
      <Tabs.Screen name="cadastro" options={{ title: "Novo Evento", tabBarIcon: ({ color, size }) => <Ionicons name="add-circle" size={size} color={color} /> }} />
      <Tabs.Screen name="perfil" options={{ 
          title: "Perfil",
          tabBarIcon: ({ color, size }) => (
            usuario.foto ? (
              <Image source={{ uri: usuario.foto }} style={{ width: size, height: size, borderRadius: size / 2, borderWidth: 1, borderColor: color }} />
            ) : (
              <Ionicons name="person" size={size} color={color} />
            )
          )
        }} 
      />
    </Tabs>
  );
}