import React, { useEffect, useState } from "react";
import { CssBaseline, Container, Typography, Box, IconButton } from "@mui/material";
import { WbSunny, NightsStay } from "@mui/icons-material";
import WorldClock from "./WorldClock";

export default function App() {
  const [isDay, setIsDay] = useState(true);

  // Detecta si es día o noche según la hora local
  useEffect(() => {
    const checkDay = () => {
      const hour = new Date().getHours();
      setIsDay(hour >= 6 && hour < 18);
    };
    checkDay();
    const interval = setInterval(checkDay, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          background: isDay
            ? "linear-gradient(135deg, #6dd5fa, #ffffff)"
            : "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          transition: "all 1s ease-in-out",
          p: 3,
          overflowX: "hidden",
        }}
      >
        <Container maxWidth="sm">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              mb: 3,
            }}
          >
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 700,
                color: isDay ? "#0D47A1" : "#fff",
                textShadow: isDay
                  ? "0px 0px 6px rgba(255,255,255,0.4)"
                  : "0px 0px 12px rgba(0,0,0,0.7)",
                letterSpacing: 1,
                transition: "color 1s ease",
              }}
            >
              🌎 Reloj Mundial Interactivo
            </Typography>
            <IconButton
              sx={{
                color: isDay ? "#FFD700" : "#B0E0E6",
                fontSize: 36,
              }}
            >
              {isDay ? <WbSunny /> : <NightsStay />}
            </IconButton>
          </Box>
          <WorldClock />
        </Container>
      </Box>
    </>
  );
}
