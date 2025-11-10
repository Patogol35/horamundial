import React, { useEffect, useState } from "react";
import { CssBaseline, Container, Typography, Box, IconButton, Stack } from "@mui/material";
import { WbSunny, NightsStay, Public } from "@mui/icons-material";
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

  // Fondo blanco limpio
  const background = "#ffffff";

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
          {/* Título con icono del mundo y autor */}
          <Stack direction="column" alignItems="center" spacing={1}>
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                color: "#0D47A1",
                textShadow: "0px 0px 6px rgba(0,0,0,0.1)",
                letterSpacing: 1,
                mb: 1,
              }}
            >
              <Public sx={{ fontSize: 40, mr: 1, verticalAlign: "middle" }} />{" "}
              Reloj Mundial Interactivo
            </Typography>

            {/* Autor */}
            <Typography
              variant="subtitle1"
              sx={{
                color: "#444",
                fontStyle: "italic",
                fontWeight: 500,
                mt: -1,
              }}
            >
              Creado por Jorge Patricio Santamaría Cherrez
            </Typography>
          </Stack>

          {/* Botón modo día/noche */}
          <IconButton
            onClick={() => setIsDay((prev) => !prev)}
            sx={{
              mt: 3,
              mb: 3,
              color: "#fff",
              bgcolor: "rgba(0,0,0,0.6)",
              "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
            }}
          >
            {isDay ? <WbSunny sx={{ fontSize: 40, color: "#fff" }} /> : <NightsStay sx={{ fontSize: 40, color: "#fff" }} />}
          </IconButton>

          <WorldClock />
        </Container>
      </Box>
    </>
  );
}
