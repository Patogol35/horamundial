import React, { useEffect, useState } from "react";
import {
  CssBaseline,
  Container,
  Typography,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Brightness4, Brightness7, AutoMode } from "@mui/icons-material";
import WorldClock from "./WorldClock";

export default function App() {
  const [isDay, setIsDay] = useState(true);
  const [mode, setMode] = useState("auto"); // "auto", "day", "night"

  useEffect(() => {
    const checkDay = () => {
      if (mode === "auto") {
        const hour = new Date().getHours();
        setIsDay(hour >= 6 && hour < 18);
      } else {
        setIsDay(mode === "day");
      }
    };
    checkDay();
    const interval = setInterval(checkDay, 60 * 1000);
    return () => clearInterval(interval);
  }, [mode]);

  const toggleMode = () => {
    if (mode === "auto") setMode("day");
    else if (mode === "day") setMode("night");
    else setMode("auto");
  };

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          width: "100vw",
          minHeight: "100vh",
          overflowX: "hidden",
          background: isDay
            ? "linear-gradient(135deg, #4facfe, #00f2fe)"
            : "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          transition: "background 1s ease-in-out",
          p: { xs: 2, sm: 3, md: 4 },
          boxSizing: "border-box",
        }}
      >
        <Container
          maxWidth="sm"
          disableGutters
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Botón de modo manual */}
          <Tooltip
            title={
              mode === "auto"
                ? "Modo automático (según hora)"
                : mode === "day"
                ? "Modo forzado: Día"
                : "Modo forzado: Noche"
            }
          >
            <IconButton
              onClick={toggleMode}
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
                color: isDay ? "#0D47A1" : "#fff",
                backgroundColor: isDay
                  ? "rgba(255,255,255,0.4)"
                  : "rgba(255,255,255,0.1)",
                backdropFilter: "blur(5px)",
                "&:hover": {
                  backgroundColor: isDay
                    ? "rgba(255,255,255,0.6)"
                    : "rgba(255,255,255,0.2)",
                },
              }}
            >
              {mode === "auto" ? (
                <AutoMode />
              ) : mode === "day" ? (
                <Brightness7 />
              ) : (
                <Brightness4 />
              )}
            </IconButton>
          </Tooltip>

          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 800,
              color: isDay ? "#08306b" : "#ffffff",
              textShadow: isDay
                ? "0 2px 4px rgba(255,255,255,0.5)"
                : "0 2px 6px rgba(0,0,0,0.8)",
              letterSpacing: 1,
              mb: { xs: 3, sm: 5 },
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              transition: "color 0.5s ease",
            }}
          >
            🌎 Reloj Mundial Interactivo
          </Typography>

          <WorldClock isDay={isDay} />
        </Container>
      </Box>
    </>
  );
}
