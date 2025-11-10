import React, { useEffect, useState } from "react";
import { CssBaseline, Container, Typography, Box, IconButton } from "@mui/material";
import { WbSunny, NightsStay, LightMode, DarkMode } from "@mui/icons-material";
import { motion } from "framer-motion";

// --- Lista de ciudades ---
const cities = [
  { name: "Quito", timezone: "America/Guayaquil" },
  { name: "Nueva York", timezone: "America/New_York" },
  { name: "Londres", timezone: "Europe/London" },
  { name: "Tokio", timezone: "Asia/Tokyo" },
  { name: "Sídney", timezone: "Australia/Sydney" },
  { name: "París", timezone: "Europe/Paris" },
  { name: "Los Ángeles", timezone: "America/Los_Angeles" },
  { name: "Buenos Aires", timezone: "America/Argentina/Buenos_Aires" },
  { name: "Ciudad de México", timezone: "America/Mexico_City" },
  { name: "Toronto", timezone: "America/Toronto" },
  { name: "Madrid", timezone: "Europe/Madrid" },
  { name: "Berlín", timezone: "Europe/Berlin" },
];

// --- Componente de Reloj Individual ---
function CityClock({ name, timezone }) {
  const [time, setTime] = useState(new Date());
  const hour = time.toLocaleString("en-US", { hour: "2-digit", hour12: false, timeZone: timezone });
  const isDay = hour >= 6 && hour < 18;

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        background: isDay ? "#e3f2fd" : "#0d1b2a",
        color: isDay ? "#0d47a1" : "#ffffff",
        borderRadius: 3,
        p: 2,
        m: 1,
        minWidth: 220,
        boxShadow: isDay
          ? "0 4px 8px rgba(0,0,0,0.1)"
          : "0 4px 8px rgba(255,255,255,0.1)",
        textAlign: "center",
        transition: "all 0.6s ease",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        {name}
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: 700 }}>
        {time.toLocaleTimeString("es-ES", { timeZone: timezone })}
      </Typography>
      <Box sx={{ mt: 1 }}>
        {isDay ? (
          <WbSunny sx={{ color: "#ffb300", fontSize: 28 }} />
        ) : (
          <NightsStay sx={{ color: "#90caf9", fontSize: 28 }} />
        )}
      </Box>
    </Box>
  );
}

// --- Componente Principal ---
export default function App() {
  const [isDayMode, setIsDayMode] = useState(true);

  // Detectar día/noche global
  useEffect(() => {
    const hour = new Date().getHours();
    setIsDayMode(hour >= 6 && hour < 18);
  }, []);

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: isDayMode ? "#ffffff" : "#0f2027",
          color: isDayMode ? "#0D47A1" : "#ffffff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          transition: "all 0.8s ease",
          p: 3,
          overflowX: "hidden", // ✅ evita el espacio blanco lateral
        }}
      >
        <Container maxWidth="lg" sx={{ overflowX: "hidden" }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 1,
                letterSpacing: 0.5,
                color: isDayMode ? "#0D47A1" : "#fff",
              }}
            >
              🌎 Reloj Mundial Interactivo
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 500 }}>
              Creado por <strong>Jorge Patricio Santamaría Cherrez</strong>
            </Typography>

            <IconButton
              onClick={() => setIsDayMode(!isDayMode)}
              sx={{
                mb: 4,
                bgcolor: isDayMode ? "#1976d2" : "#333",
                color: "#fff",
                borderRadius: "50%",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                "&:hover": { bgcolor: isDayMode ? "#1565c0" : "#444" },
              }}
            >
              {isDayMode ? <LightMode /> : <DarkMode />}
            </IconButton>
          </motion.div>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              maxWidth: "100%",
            }}
          >
            {cities.map((c) => (
              <CityClock key={c.name} name={c.name} timezone={c.timezone} />
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
}
