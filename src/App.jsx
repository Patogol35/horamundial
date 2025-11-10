import React, { useEffect, useState } from "react";
import {
  CssBaseline,
  Container,
  Typography,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import { motion } from "framer-motion";
import { WbSunny, NightsStay, Brightness4 } from "@mui/icons-material";
import WorldClock from "./WorldClock";

export default function App() {
  const [isDay, setIsDay] = useState(true);
  const [autoMode, setAutoMode] = useState(true);

  // Verifica automáticamente la hora local para el modo automático
  useEffect(() => {
    if (!autoMode) return;

    const checkDay = () => {
      const hour = new Date().getHours();
      setIsDay(hour >= 6 && hour < 18);
    };
    checkDay();
    const interval = setInterval(checkDay, 60 * 1000);
    return () => clearInterval(interval);
  }, [autoMode]);

  // Cambiar manualmente el modo
  const toggleTheme = () => {
    setAutoMode(false);
    setIsDay(!isDay);
  };

  const background = isDay
    ? "linear-gradient(135deg, #a1c4fd, #c2e9fb)"
    : "linear-gradient(135deg, #0f2027, #203a43, #2c5364)";

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          background,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          transition: "all 1s ease-in-out",
          p: 3,
          position: "relative",
        }}
      >
        {/* Botón modo día/noche manual */}
        <Tooltip
          title={
            autoMode
              ? "Modo automático (click para cambiar manualmente)"
              : "Modo manual (click para alternar)"
          }
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              background: "rgba(255,255,255,0.2)",
              borderRadius: "50%",
              padding: "8px",
              backdropFilter: "blur(6px)",
            }}
          >
            <IconButton color="inherit" onClick={toggleTheme}>
              {isDay ? (
                <WbSunny sx={{ color: "#FFD700", fontSize: 30 }} />
              ) : (
                <NightsStay sx={{ color: "#B0E0E6", fontSize: 30 }} />
              )}
            </IconButton>
          </motion.div>
        </Tooltip>

        <Container maxWidth="sm">
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: isDay ? "#0D47A1" : "#fff",
              textShadow: isDay
                ? "0px 0px 6px rgba(255,255,255,0.4)"
                : "0px 0px 12px rgba(0,0,0,0.7)",
              letterSpacing: 1,
              mb: 5,
              transition: "color 1s ease",
            }}
          >
            🌎 Reloj Mundial Interactivo
          </Typography>

          <WorldClock forcedTheme={isDay ? "day" : "night"} />
        </Container>

        {!autoMode && (
          <Typography
            variant="body2"
            sx={{
              position: "absolute",
              bottom: 15,
              opacity: 0.7,
              color: isDay ? "#0D47A1" : "#fff",
              fontSize: 13,
            }}
          >
            🌗 Modo manual activado
          </Typography>
        )}
      </Box>
    </>
  );
}
