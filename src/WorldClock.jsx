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
} from "@mui/material";
import {
  AccessTime,
  WbSunny,
  NightsStay,
  Public,
} from "@mui/icons-material";

const cities = [
  { name: "Nueva York", timezone: "America/New_York" },
  { name: "Londres", timezone: "Europe/London" },
  { name: "Tokio", timezone: "Asia/Tokyo" },
  { name: "Sídney", timezone: "Australia/Sydney" },
  { name: "Quito", timezone: "America/Guayaquil" },
  { name: "Madrid", timezone: "Europe/Madrid" },
];

const WorldClock = () => {
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

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 400,
        textAlign: "center",
        background: isDay
          ? "linear-gradient(135deg, #87CEEB 0%, #FFD700 100%)"
          : "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
        borderRadius: 4,
        boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
        p: 3,
        transition: "all 0.5s ease",
      }}
    >
      <Card
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(8px)",
          borderRadius: 4,
          color: "#fff",
          boxShadow: "none",
        }}
      >
        <CardContent>
          {isDay ? (
            <WbSunny sx={{ fontSize: 50, color: "#FFD700" }} />
          ) : (
            <NightsStay sx={{ fontSize: 50, color: "#B0E0E6" }} />
          )}
          <Typography variant="h4" sx={{ mt: 2, mb: 1, fontWeight: "bold" }}>
            {selectedCity.name}
          </Typography>
          <Typography variant="h5" sx={{ mb: 2 }}>
            <AccessTime sx={{ verticalAlign: "middle", mr: 1 }} />
            {time}
          </Typography>

          <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
            <InputLabel sx={{ color: "#fff" }}>
              <Public sx={{ mr: 1, verticalAlign: "middle" }} />
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
                  borderColor: "rgba(255,255,255,0.7)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#fff",
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
  );
};

export default WorldClock;
