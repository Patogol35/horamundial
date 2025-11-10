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
          position: "relative",
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
        {/* Fondo animado */}
        <Box
          className={isDay ? "clouds-bg" : "stars-bg"}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
            overflow: "hidden",
            pointerEvents: "none",
          }}
        />

        <Container
          maxWidth="sm"
          disableGutters
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            zIndex: 2,
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

      {/* Animaciones CSS */}
      <style>
        {`
          /* ---- Fondo con nubes (día) ---- */
          .clouds-bg {
            background: url('https://i.imgur.com/44xQb1r.png') repeat-x;
            animation: moveClouds 60s linear infinite;
            opacity: 0.15;
          }

          @keyframes moveClouds {
            from { background-position: 0 0; }
            to { background-position: -1000px 0; }
          }

          /* ---- Fondo con estrellas (noche) ---- */
          .stars-bg {
            background: url('https://i.imgur.com/9aKp2GQ.png') repeat;
            animation: twinkle 6s ease-in-out infinite alternate;
            opacity: 0.25;
          }

          @keyframes twinkle {
            0% { opacity: 0.15; transform: scale(1); }
            100% { opacity: 0.35; transform: scale(1.02); }
          }

          body {
            margin: 0;
            overflow-x: hidden;
          }
        `}
      </style>
    </>
  );
}
