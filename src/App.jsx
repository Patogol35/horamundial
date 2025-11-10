import React, { useEffect, useState } from "react";
import { CssBaseline, Container, Typography, Box, IconButton } from "@mui/material";
import { WbSunny, NightsStay } from "@mui/icons-material";
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

  const toggleMode = () => setIsDay(!isDay);

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          width: "100vw",
          background: isDay
            ? "linear-gradient(135deg, #8ec5fc, #e0c3fc)"
            : "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          transition: "all 1s ease-in-out",
          overflowX: "hidden",
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
                ? "0px 0px 6px rgba(255,255,255,0.6)"
                : "0px 0px 10px rgba(0,0,0,0.8)",
              letterSpacing: 1,
              mb: 3,
              transition: "color 1s ease",
            }}
          >
            🌎 Reloj Mundial Interactivo
          </Typography>

          <IconButton
            onClick={toggleMode}
            sx={{
              color: "#fff",
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(8px)",
              borderRadius: "50%",
              mb: 3,
              "&:hover": {
                background: "rgba(255,255,255,0.3)",
              },
              transition: "all 0.3s ease",
            }}
          >
            {isDay ? (
              <NightsStay sx={{ fontSize: 30, color: "#fff" }} />
            ) : (
              <WbSunny sx={{ fontSize: 30, color: "#fff" }} />
            )}
          </IconButton>

          <WorldClock isDay={isDay} />
        </Container>
      </Box>
    </>
  );
}
