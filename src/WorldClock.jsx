import React, { useEffect, useState } from "react";

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

import ClockIcon from "./components/ClockIcon";

import { cities } from "./data/cities";

import {
  formatTime,
  isDaytime,
} from "./utils/timeUtils";

import "./WorldClock.css";

export default function WorldClock() {
  const [selectedCity, setSelectedCity] =
    useState(cities[0]);

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const isDay = isDaytime(
    time,
    selectedCity.timezone
  );

  const currentTime = formatTime(
    time,
    selectedCity.timezone
  );

  const mode = isDay ? "day" : "night";

  const handleCityChange = (event) => {
    const city = cities.find(
      (item) =>
        item.name === event.target.value
    );

    if (city) {
      setSelectedCity(city);
    }
  };

  return (
    <motion.div
      className="world-clock"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <Box
        className={`world-clock-wrapper ${mode}`}
      >
        <Card
          className={`world-clock-card ${mode}`}
        >
          <CardContent className="clock-content">
            <ClockIcon isDay={isDay} />

            <Typography
              variant="h4"
              className="clock-title"
            >
              {selectedCity.name}
            </Typography>

            <Typography
              variant="h5"
              className="clock-time"
            >
              <AccessTime className="clock-time-icon" />
              {currentTime}
            </Typography>

            <Chip
              label={
                isDay
                  ? "☀️ Día"
                  : "🌙 Noche"
              }
              className={`clock-status ${mode}`}
            />

            <FormControl
              fullWidth
              variant="outlined"
              className={`city-select ${mode}`}
            >
              <InputLabel>
                Ciudad
              </InputLabel>

              <Select
                value={selectedCity.name}
                label="Ciudad"
                onChange={handleCityChange}
                MenuProps={{
                  PaperProps: {
                    className: `city-menu ${mode}`,
                  },
                }}
              >
                {cities.map((city) => (
                  <MenuItem
                    key={city.timezone}
                    value={city.name}
                    className={`city-option ${mode}`}
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
