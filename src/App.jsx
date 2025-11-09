import React from "react";
import WorldClock from "./WorldClock";
import { CssBaseline, Container, Typography } from "@mui/material";

export default function App() {
  return (
    <>
      <CssBaseline />
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#fff",
            textShadow: "0px 0px 10px rgba(0,0,0,0.5)",
            mb: 4,
          }}
        >
          🌍 Reloj Mundial Interactivo
        </Typography>
        <WorldClock />
      </Container>
    </>
  );
}

