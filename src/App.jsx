import React, { useState } from "react";
import {
  CssBaseline,
  Container,
  Typography,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import { WbSunny, NightsStay } from "@mui/icons-material";
import { motion } from "framer-motion";
import WorldClock from "./WorldClock";

export default function App() {
  const [isDay, setIsDay] = useState(false); // Quito de noche por defecto

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
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
        }}
      >
        <Container maxWidth="sm">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 4,
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
              🌎 Reloj Mundial
            </Typography>

            <Tooltip title={isDay ? "Cambiar a modo noche" : "Cambiar a modo día"}>
              <IconButton
                onClick={() => setIsDay(!isDay)}
                sx={{
                  color: isDay ? "#FFD700" : "#B0E0E6",
                  transition: "transform 0.5s ease",
                  "&:hover": {
                    transform: "rotate(25deg) scale(1.2)",
                  },
                }}
              >
                {isDay ? <WbSunny fontSize="large" /> : <NightsStay fontSize="large" />}
              </IconButton>
            </Tooltip>
          </Box>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <WorldClock isDay={isDay} />
          </motion.div>
        </Container>
      </Box>
    </>
  );
}
