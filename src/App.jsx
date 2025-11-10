import React from "react";
import { CssBaseline, Container, Typography, Box } from "@mui/material";
import WorldClock from "./WorldClock";

export default function App() {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
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
              color: "white",
              textShadow: "0px 0px 12px rgba(0,0,0,0.7)",
              letterSpacing: 1,
              mb: 5,
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
