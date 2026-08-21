import React, { useEffect, useState } from "react";
import {
  CssBaseline,
  Container,
  Typography,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";

import WorldClock from "./WorldClock";
import ModeToggle from "./components/ModeToggle";

export default function App() {
  const [isDay, setIsDay] = useState(false);

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

  return (
    <>
      <CssBaseline />

      <Box
        sx={{
          width: "100vw",
          minHeight: "100vh",
          overflowX: "hidden",
          overflowY: "auto",
          background: backgroundColor,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          transition: "all 1s ease-in-out",
          p: { xs: 2, md: 3 },
          boxSizing: "border-box",
          m: 0,
        }}
      >
        <Container
          maxWidth="sm"
          sx={{ px: { xs: 2, md: 0 } }}
        >
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
              Creado por{" "}
              <strong>
                Jorge Patricio Santamaría Cherrez
              </strong>
            </Typography>

            <ModeToggle
              isDay={isDay}
              onToggle={() => setIsDay(!isDay)}
            />
          </motion.div>

          <WorldClock />
        </Container>
      </Box>
    </>
  );
}
