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

import "./App.css";

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

  return (
    <>
      <CssBaseline />

      <Box className={`app ${isDay ? "day-mode" : "night-mode"}`}>
        <Container maxWidth="sm" className="app-container">
          <motion.div
            className="app-header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h4"
              component="h1"
              className="app-title"
            >
              Reloj Global Interactivo
            </Typography>

            <Typography
              variant="subtitle1"
              className="app-subtitle"
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
