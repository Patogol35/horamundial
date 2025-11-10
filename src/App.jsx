import React, { useEffect, useState } from "react";
import {
  CssBaseline,
  Container,
  Typography,
  Box,
  IconButton,
  Stack,
} from "@mui/material";
import { WbSunny, NightsStay, Public } from "@mui/icons-material";
import WorldClock from "./WorldClock";

export default function App() {
  const [isGlobalDay, setIsGlobalDay] = useState(true);

  useEffect(() => {
    const checkDay = () => {
      const hour = new Date().getHours();
      setIsGlobalDay(hour >= 6 && hour < 18);
    };
    checkDay();
    const interval = setInterval(checkDay, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => setIsGlobalDay((prev) => !prev);

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          overflowX: "hidden",
          background: isGlobalDay
            ? "linear-gradient(135deg, #fefefe, #f4f6f8)"
            : "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          transition: "all 0.8s ease-in-out",
          p: 3,
        }}
      >
        <Container maxWidth="sm">
          <Stack direction="column" alignItems="center" spacing={1}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                color: isGlobalDay ? "#0D47A1" : "#ffffff",
                textShadow: isGlobalDay
                  ? "0px 0px 4px rgba(0,0,0,0.15)"
                  : "0px 0px 6px rgba(255,255,255,0.4)",
                letterSpacing: 1,
                mb: 1,
                transition: "color 0.5s ease",
              }}
            >
              <Public sx={{ fontSize: 36, mr: 1, verticalAlign: "middle" }} />{" "}
              Reloj Mundial Interactivo
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{
                color: isGlobalDay ? "#333" : "#ddd",
                fontStyle: "italic",
                fontWeight: 500,
                mt: -1,
                transition: "color 0.5s ease",
              }}
            >
              Creado por Jorge Patricio Santamaría Cherrez
            </Typography>
          </Stack>

          <IconButton
            onClick={toggleTheme}
            sx={{
              mt: 3,
              mb: 3,
              color: "#fff",
              bgcolor: "rgba(0,0,0,0.6)",
              "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
              transition: "all 0.5s ease",
            }}
          >
            {isGlobalDay ? (
              <NightsStay sx={{ fontSize: 36, color: "#fff" }} />
            ) : (
              <WbSunny sx={{ fontSize: 36, color: "#fff" }} />
            )}
          </IconButton>

          <WorldClock isGlobalDay={isGlobalDay} />
        </Container>
      </Box>
    </>
  );
}
