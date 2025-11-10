import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  Chip,
} from "@mui/material";
import { motion } from "framer-motion";
import { AccessTime, WbSunny, NightsStay } from "@mui/icons-material";

const cities = [
  { name: "Quito", timezone: "America/Guayaquil" },
  { name: "Londres", timezone: "Europe/London" },
  { name: "Nueva York", timezone: "America/New_York" },
  { name: "Tokio", timezone: "Asia/Tokyo" },
  { name: "Sídney", timezone: "Australia/Sydney" },
  { name: "Madrid", timezone: "Europe/Madrid" },
];

export default function WorldClock() {
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [time, setTime] = useState("");
  const [isDay, setIsDay] = useState(true);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options = {
        timeZone: selectedCity.timezone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      const formatter = new Intl.DateTimeFormat([], options);
      setTime(formatter.format(now));

      const hourInCity = new Date(
        now.toLocaleString("en-US", { timeZone: selectedCity.timezone })
      ).getHours();
      setIsDay(hourInCity >= 6 && hourInCity < 18);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, [selectedCity]);

  // Fondo con más contraste y texto oscuro cuando es de día
  const gradient = isDay
    ? "linear-gradient(135deg, #a1c4fd, #c2e9fb)" // más contrastado y legible
    : "linear-gradient(135deg, #232526, #414345)";

  const textColor = isDay ? "#0b2545" : "#fff"; // texto oscuro de día

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      style={{ width: "100%" }}
    >
      <Box
        sx={{
          background: gradient,
          borderRadius: 4,
          boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
          p: 3,
          backdropFilter: "blur(10px)",
          maxWidth: 420,
          mx: "auto",
          transition: "background 1s ease",
        }}
      >
        <Card
          sx={{
            background: isDay
              ? "rgba(255,255,255,0.4)"
              : "rgba(255,255,255,0.15)",
            backdropFilter: "blur(12px)",
            borderRadius: 4,
            color: textColor,
            boxShadow: "0 4px 25px rgba(0,0,0,0.3)",
          }}
        >
          <CardContent>
            {/* Ícono día/noche */}
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: isDay ? 0 : 180 }}
              transition={{ duration: 1 }}
            >
              {isDay ? (
                <WbSunny sx={{ fontSize: 60, color: "#fff" }} />
              ) : (
                <NightsStay sx={{ fontSize: 60, color: "#fff" }} />
              )}
            </motion.div>

            {/* Ciudad */}
            <Typography
              variant="h4"
              sx={{
                mt: 2,
                mb: 1,
                fontWeight: "bold",
                letterSpacing: 0.5,
                color: textColor,
              }}
            >
              {selectedCity.name}
            </Typography>

            {/* Hora */}
            <Typography
              variant="h5"
              sx={{
                mb: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: textColor,
              }}
            >
              <AccessTime sx={{ mr: 1, color: textColor }} /> {time}
            </Typography>

            {/* Día/Noche */}
            <Chip
              label={isDay ? "☀️ Día" : "🌙 Noche"}
              sx={{
                bgcolor: isDay
                  ? "rgba(255,255,255,0.3)"
                  : "rgba(0,0,0,0.3)",
                color: textColor,
                mb: 2,
                fontWeight: "bold",
              }}
            />

            {/* Selector corregido y legible */}
            <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
              <InputLabel
                sx={{
                  color: textColor,
                  "&.Mui-focused": { color: textColor },
                }}
              >
                Ciudad
              </InputLabel>
              <Select
                value={selectedCity.name}
                label="Ciudad"
                onChange={(e) =>
                  setSelectedCity(
                    cities.find((city) => city.name === e.target.value)
                  )
                }
                sx={{
                  color: textColor,
                  bgcolor: isDay
                    ? "rgba(255,255,255,0.8)"
                    : "rgba(255,255,255,0.1)",
                  borderRadius: 2,
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.4)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.7)",
                  },
                  ".MuiSvgIcon-root": { color: textColor },
                }}
              >
                {cities.map((city) => (
                  <MenuItem key={city.name} value={city.name}>
                    {city.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </CardContent>
        </Card>
      </Box>
    </motion.div>
  );
}
