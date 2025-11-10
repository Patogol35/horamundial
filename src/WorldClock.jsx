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
  { name: "París", timezone: "Europe/Paris" },
  { name: "Los Ángeles", timezone: "America/Los_Angeles" },
  { name: "México DF", timezone: "America/Mexico_City" },
  { name: "Buenos Aires", timezone: "America/Argentina/Buenos_Aires" },
  { name: "Toronto", timezone: "America/Toronto" },
  { name: "Dubái", timezone: "Asia/Dubai" },
];

export default function WorldClock({ isDay }) {
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [time, setTime] = useState("");
  const [cityIsDay, setCityIsDay] = useState(true);

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
      setCityIsDay(hourInCity >= 6 && hourInCity < 18);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, [selectedCity]);

  const gradient = cityIsDay
    ? "linear-gradient(135deg, #a1c4fd, #c2e9fb)"
    : "linear-gradient(135deg, #232526, #414345)";

  const iconColor = "#FFD700";

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
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(12px)",
            borderRadius: 4,
            color: cityIsDay ? "#0D47A1" : "#fff",
            boxShadow: "0 4px 25px rgba(0,0,0,0.3)",
          }}
        >
          <CardContent>
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: cityIsDay ? 0 : 180 }}
              transition={{ duration: 1 }}
            >
              {cityIsDay ? (
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
              }}
            >
              <AccessTime sx={{ mr: 1 }} /> {time}
            </Typography>

            <Chip
              label={cityIsDay ? "☀️ Día" : "🌙 Noche"}
              sx={{
                bgcolor: cityIsDay
                  ? "rgba(255,255,255,0.2)"
                  : "rgba(0,0,0,0.3)",
                color: "#fff",
                mb: 2,
                fontWeight: "bold",
              }}
            />

            {/* --- Selector Mejorado --- */}
            <FormControl
              fullWidth
              variant="outlined"
              sx={{
                mt: 3,
                "& .MuiInputLabel-root": {
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "1rem",
                },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.12)",
                  backdropFilter: "blur(8px)",
                  "& fieldset": {
                    borderColor: "rgba(255,255,255,0.4)",
                  },
                  "&:hover fieldset": {
                    borderColor: "#fff",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#fff",
                    boxShadow: "0 0 8px rgba(255,255,255,0.4)",
                  },
                },
                "& .MuiSelect-icon": {
                  color: "#fff",
                },
                "& .MuiSelect-select": {
                  color: "#fff",
                  fontWeight: 500,
                  py: 1.2,
                },
              }}
            >
              <InputLabel>Ciudad</InputLabel>
              <Select
                value={selectedCity.name}
                label="Ciudad"
                onChange={(e) =>
                  setSelectedCity(
                    cities.find((city) => city.name === e.target.value)
                  )
                }
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
