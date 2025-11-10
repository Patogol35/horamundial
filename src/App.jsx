import React, { useEffect, useState } from "react";
import { CssBaseline, Container, Typography, Box } from "@mui/material";
import WorldClock from "./WorldClock";

export default function App() {
  const [isDay, setIsDay] = useState(true);

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
          width: "100vw",                // ✅ Garantiza cubrir todo el ancho de la ventana
          minHeight: "100vh",            // ✅ Cubre toda la altura visible
          overflowX: "hidden",           // ✅ Evita scrolls o desbordes laterales
          background: isDay
            ? "linear-gradient(135deg, #4facfe, #00f2fe)"
            : "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          transition: "all 1s ease-in-out",
          p: { xs: 2, sm: 3, md: 4 },
          boxSizing: "border-box",       // ✅ Evita que los paddings provoquen scroll lateral
        }}
      >
        <Container
          maxWidth="sm"
          disableGutters                     // ✅ Quita márgenes laterales que genera Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
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

          <WorldClock />
        </Container>
      </Box>
    </>
  );
}
