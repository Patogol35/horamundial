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
import { AccessTime, WbSunny, DarkMode } from "@mui/icons-material";

const cities = [
  { name: "Quito", timezone: "America/Guayaquil" },
  { name: "Londres", timezone: "Europe/London" },
  { name: "Nueva York", timezone: "America/New_York" },
  { name: "Tokio", timezone: "Asia/Tokyo" },
  { name: "Sídney", timezone: "Australia/Sydney" },
  { name: "Madrid", timezone: "Europe/Madrid" },
  { name: "París", timezone: "Europe/Paris" },
  { name: "Los Ángeles", timezone: "America/Los_Angeles" },
  { name: "Ciudad de México", timezone: "America/Mexico_City" },
  { name: "Buenos Aires", timezone: "America/Argentina/Buenos_Aires" },
  { name: "Toronto", timezone: "America/Toronto" },
  { name: "Roma", timezone: "Europe/Rome" },
];

export default function WorldClock({ isGlobalDay }) {
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

  const gradient = isDay
    ? "linear-gradient(135deg, #e3f2fd, #bbdefb)"
    : "linear-gradient(135deg, #141e30, #243b55)";
  const textColor = isDay ? "#0b2545" : "#ffffff";
  const iconColor = isDay ? "#FFD700" : "#ffffff"; // 🌞 dorado / 🌙 blanco

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
              ? "rgba(255,255,255,0.85)"
              : "rgba(255,255,255,0.1)",
            backdropFilter: "blur(12px)",
            borderRadius: 4,
            color: textColor,
            boxShadow: "0 4px 25px rgba(0,0,0,0.3)",
          }}
        >
          <CardContent sx={{ textAlign: "center" }}>
            {/* Ícono día/noche animado */}
            <motion.div
              animate={{
                rotate: isDay ? 0 : 180,
                y: [0, -5, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              {isDay ? (
                <WbSunny sx={{ fontSize: 60, color: iconColor }} />
              ) : (
                <DarkMode sx={{ fontSize: 60, color: iconColor }} />
              )}
            </motion.div>

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
              label={isDay ? "☀️ Día" : "🌙 Noche"}
              sx={{
                bgcolor: isDay
                  ? "rgba(255,255,255,0.6)"
                  : "rgba(0,0,0,0.3)",
                color: textColor,
                mb: 2,
                fontWeight: "bold",
              }}
            />

            <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
              <InputLabel
                sx={{
                  color: textColor,
                  "&.Mui-focused": { color: textColor },
                  fontWeight: "bold",
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
                    ? "rgba(255,255,255,0.95)"
                    : "rgba(255,255,255,0.1)",
                  borderRadius: 2,
                  fontWeight: "bold",
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "black",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black",
                  },
                  ".MuiSvgIcon-root": { color: textColor },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: isDay ? "#fff" : "#333",
                      color: isDay ? "#000" : "#fff",
                      borderRadius: 2,
                      boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                    },
                  },
                }}
              >
                {cities.map((city) => (
                  <MenuItem
                    key={city.name}
                    value={city.name}
                    sx={{
                      color: isDay ? "#000" : "#fff",
                      fontWeight: "bold",
                      "&:hover": {
                        bgcolor: isDay
                          ? "rgba(0,0,0,0.1)"
                          : "rgba(255,255,255,0.2)",
                      },
                    }}
                  >
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
