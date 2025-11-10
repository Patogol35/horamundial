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

  // Fondo más contrastado y sin espacio blanco lateral
  const background = isDay
    ? "linear-gradient(135deg, #b3e5fc, #e1f5fe)"
    : "linear-gradient(135deg, #0f2027, #203a43, #2c5364)";

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          overflowX: "hidden",
          background,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          transition: "all 1s ease-in-out",
          p: 3,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: isDay ? "#0D47A1" : "#fff",
              textShadow: isDay
                ? "0px 0px 4px rgba(0,0,0,0.2)"
                : "0px 0px 10px rgba(0,0,0,0.7)",
              letterSpacing: 1,
              mb: 4,
              transition: "color 0.5s ease",
            }}
          >
            🌎 Reloj Mundial Interactivo
          </Typography>

          {/* Botón modo día/noche */}
          <IconButton
            onClick={() => setIsDay((prev) => !prev)}
            sx={{
              mb: 3,
              color: "#fff",
              bgcolor: "rgba(255,255,255,0.1)",
              "&:hover": { bgcolor: "rgba(255,255,255,0.25)" },
            }}
          >
            {isDay ? <WbSunny sx={{ fontSize: 40 }} /> : <NightsStay sx={{ fontSize: 40 }} />}
          </IconButton>

          <WorldClock forceDay={isDay} />
        </Container>
      </Box>
    </>
  );
}
