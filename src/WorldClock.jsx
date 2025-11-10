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
import { AccessTime } from "@mui/icons-material";

const cities = [
  { name: "Quito", timezone: "America/Guayaquil" },
  { name: "Londres", timezone: "Europe/London" },
  { name: "Nueva York", timezone: "America/New_York" },
  { name: "Tokio", timezone: "Asia/Tokyo" },
  { name: "Sídney", timezone: "Australia/Sydney" },
  { name: "Madrid", timezone: "Europe/Madrid" },
  { name: "Los Ángeles", timezone: "America/Los_Angeles" },
  { name: "Toronto", timezone: "America/Toronto" },
  { name: "Buenos Aires", timezone: "America/Argentina/Buenos_Aires" },
  { name: "París", timezone: "Europe/Paris" },
];

export default function WorldClock({ forceDay }) {
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

  const dayState = forceDay ? true : isDay;

  const gradient = dayState
    ? "linear-gradient(135deg, #cfd9df, #e2ebf0)"
    : "linear-gradient(135deg, #232526, #414345)";

  const textColor = dayState ? "#1b2735" : "#fff";

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
          boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
          p: 3,
          maxWidth: 420,
          mx: "auto",
          transition: "background 1s ease",
        }}
      >
        <Card
          sx={{
            background: dayState
              ? "rgba(255,255,255,0.6)"
              : "rgba(255,255,255,0.1)",
            backdropFilter: "blur(12px)",
            borderRadius: 4,
            color: textColor,
            boxShadow: "0 4px 25px rgba(0,0,0,0.3)",
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              sx={{
                mt: 1,
                mb: 1,
                fontWeight: "bold",
                color: textColor,
                textAlign: "center",
              }}
            >
              {selectedCity.name}
            </Typography>

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

            <Chip
              label={dayState ? "☀️ Día" : "🌙 Noche"}
              sx={{
                bgcolor: dayState ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.3)",
                color: textColor,
                mb: 2,
                fontWeight: "bold",
              }}
            />

            {/* Selector mejorado */}
            <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
              <InputLabel
                shrink
                sx={{
                  color: textColor,
                  fontWeight: "bold",
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
                  bgcolor: dayState
                    ? "rgba(255,255,255,0.9)"
                    : "rgba(255,255,255,0.15)",
                  borderRadius: 2,
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.4)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.7)",
                  },
                  ".MuiSvgIcon-root": { color: textColor },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderWidth: "2px",
                  },
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
