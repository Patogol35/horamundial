import { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";

import {
  formatTime,
  isDaytime,
} from "../utils/timeUtils";

export default function ClockCard({ city, timezone }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const localTime = formatTime(time, timezone);
  const isDay = isDaytime(time, timezone);

  const bgColor = isDay ? "#E3F2FD" : "#1A237E";
  const textColor = isDay ? "#0D47A1" : "#BBDEFB";

  return (
    <motion.div
      whileHover={{
        scale: 1.05,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
      }}
    >
      <Card
        sx={{
          bgcolor: bgColor,
          color: textColor,
          borderRadius: "20px",
          boxShadow: 4,
          textAlign: "center",
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            gutterBottom
          >
            {city}
          </Typography>

          <Typography
            variant="h3"
            fontWeight="bold"
          >
            {localTime}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              mt: 1,
            }}
          >
            {isDay ? "☀️ Día" : "🌙 Noche"}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
}
