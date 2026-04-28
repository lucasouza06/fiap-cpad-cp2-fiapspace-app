import { Stack } from "expo-router";
import { useState, createContext } from "react";

export const EventosContext = createContext(null);

export default function RootLayout() {
  const [eventos, setEventos] = useState([]);
  const [usuario, setUsuario] = useState({ 
    nome: '', 
    matricula: '', 
    email: '', 
    foto: null 
  });

  return (
    <EventosContext.Provider value={{ eventos, setEventos, usuario, setUsuario }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" /> 
        <Stack.Screen name="(tabs)" />
      </Stack>
    </EventosContext.Provider>
  );
}