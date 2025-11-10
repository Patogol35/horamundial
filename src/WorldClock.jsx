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

export default function WorldClock({ isDay }) {
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [time, setTime] = useState("");
  const [isDayInCity, setIsDayInCity] = useState(true);

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
      setIsDayInCity(hourInCity >= 6 && hourInCity < 18);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, [selectedCity]);

  const gradient = isDayInCity
    ? "linear-gradient(135deg, #5b86e5, #36d1dc)"
    : "linear-gradient(135deg, #232526, #414345)";
  const iconColor = isDayInCity ? "#FFD700" : "#B0E0E6";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{ width: "100%" }}
    >
      <Box
        sx={{
          background: gradient,
          borderRadius: 4,
          boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
          p: { xs: 2, sm: 3 },
          maxWidth: 420,
          mx: "auto",
          transition: "background 1s ease",
        }}
      >
        <Card
          sx={{
            background: "rgba(255,255,255,0.12)",
            backdropFilter: "blur(15px)",
            borderRadius: 4,
            color: "#fff",
            boxShadow: "0 4px 25px rgba(0,0,0,0.4)",
          }}
        >
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: isDayInCity ? 0 : 180 }}
              transition={{ duration: 1 }}
            >
              {isDayInCity ? (
                <WbSunny sx={{ fontSize: 60, color: iconColor }} />
              ) : (
                <NightsStay sx={{ fontSize: 60, color: iconColor }} />
              )}
            </motion.div>

            <Typography
              variant="h4"
              sx={{
                mt: 2,
                mb: 1,
                fontWeight: "bold",
                letterSpacing: 0.5,
                color: "#fff",
                fontSize: { xs: "1.8rem", sm: "2rem" },
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
                fontSize: { xs: "1.3rem", sm: "1.6rem" },
              }}
            >
              <AccessTime sx={{ mr: 1 }} /> {time}
            </Typography>

            <Chip
              label={isDayInCity ? "☀️ Día" : "🌙 Noche"}
              sx={{
                bgcolor: isDayInCity
                  ? "rgba(255,255,255,0.25)"
                  : "rgba(0,0,0,0.4)",
                color: "#fff",
                mb: 2,
                fontWeight: "bold",
              }}
            />

            {/* ✅ Label “Ciudad” arreglado */}
            <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
              <InputLabel
                shrink // 🔥 mantiene el label visible arriba
                sx={{
                  color: "#fff",
                  fontWeight: "bold",
                  backgroundColor: "rgba(0,0,0,0.3)",
                  px: 0.8,
                  borderRadius: 1,
                  transform: "translate(14px, -6px) scale(0.85)",
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
                  color: "#fff",
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.6)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#fff",
                  },
                  ".MuiSvgIcon-root": { color: "#fff" },
                  fontSize: { xs: "1rem", sm: "1.1rem" },
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
