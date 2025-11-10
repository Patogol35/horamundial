import React, { useEffect, useState } from "react";
import { CssBaseline, Container, Typography, Box, IconButton } from "@mui/material";
import WorldClock from "./WorldClock";
import { WbSunny, NightsStay } from "@mui/icons-material";
import { motion } from "framer-motion";

export default function App() {
  const [isDay, setIsDay] = useState(false); // 🌙 inicia oscuro por defecto

  useEffect(() => {
    const checkDay = () => {
      const hour = new Date().getHours();
      setIsDay(hour >= 6 && hour < 18);
    };
    checkDay();
    const interval = setInterval(checkDay, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const backgroundColor = isDay ? "#ffffff" : "#0f2027";
  const textColor = isDay ? "#0D47A1" : "#ffffff";
  const iconColor = "#ffffff";

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          width: "100vw", // ocupa todo el ancho
          minHeight: "100vh",
          overflowX: "hidden", // evita scroll o espacio lateral
          overflowY: "auto",
          background: backgroundColor,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          transition: "all 1s ease-in-out",
          p: { xs: 2, md: 3 },
          boxSizing: "border-box", // evita acumulación de padding
          m: 0,
        }}
      >
        <Container maxWidth="sm" sx={{ px: { xs: 2, md: 0 } }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                color: textColor,
                textShadow: isDay
                  ? "0px 0px 6px rgba(0,0,0,0.15)"
                  : "0px 0px 10px rgba(255,255,255,0.3)",
                letterSpacing: 1,
                mb: 2,
                transition: "color 1s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}
            >
            Reloj Global Interactivo
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{
                color: isDay ? "#555" : "#ddd",
                mb: 4,
                fontWeight: 500,
              }}
            >
              Creado por <strong>Jorge Patricio Santamaría Cherrez</strong>
            </Typography>

            <IconButton
              onClick={() => setIsDay(!isDay)}
              sx={{
                mb: 2,
                bgcolor: isDay ? "#1976d2" : "#333",
                color: iconColor,
                borderRadius: "50%",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                "&:hover": {
                  bgcolor: isDay ? "#1565c0" : "#444",
                },
              }}
            >
              {isDay ? <WbSunny /> : <NightsStay />}
            </IconButton>
          </motion.div>

          <WorldClock isGlobalDay={isDay} />
        </Container>
      </Box>
    </>
  );
}
