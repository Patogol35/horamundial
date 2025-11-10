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

  // Permitir cambiar manualmente
  const toggleTheme = () => setIsDay((prev) => !prev);

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          width: "100vw",
          overflow: "hidden",
          background: isDay
            ? "linear-gradient(135deg, #b3e5fc, #e1f5fe)" // Más claro y legible
            : "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          transition: "background 1s ease-in-out",
          p: 2,
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            px: { xs: 2, sm: 3 },
          }}
        >
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
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 700,
                color: isDay ? "#01579b" : "#fff",
                textShadow: isDay
                  ? "0 0 6px rgba(255,255,255,0.5)"
                  : "0 0 10px rgba(0,0,0,0.7)",
                letterSpacing: 1,
                transition: "color 1s ease",
              }}
            >
              🌎 Reloj Mundial Interactivo
            </Typography>

            <IconButton
              onClick={toggleTheme}
              sx={{
                color: isDay ? "#fdd835" : "#b0e0e6",
                fontSize: 36,
                transition: "color 0.5s ease",
              }}
            >
              {isDay ? <WbSunny /> : <NightsStay />}
            </IconButton>
          </Box>

          <WorldClock forceDay={isDay} />
        </Container>
      </Box>
    </>
  );
}
