import React, { useState, useEffect } from "react";
import { WbSunny, NightsStay } from "@mui/icons-material";
import { motion } from "framer-motion";

const WorldClock = ({ selectedCity }) => {
  const [time, setTime] = useState("");
  const [isDay, setIsDay] = useState(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const localTime = new Date(
        now.toLocaleString("en-US", { timeZone: selectedCity.timezone })
      );
      const hours = localTime.getHours().toString().padStart(2, "0");
      const minutes = localTime.getMinutes().toString().padStart(2, "0");
      const seconds = localTime.getSeconds().toString().padStart(2, "0");
      setTime(`${hours}:${minutes}:${seconds}`);
      setIsDay(localTime.getHours() >= 6 && localTime.getHours() < 18);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [selectedCity]);

  // Colores dinámicos
  const bgColor = isDay
    ? "linear-gradient(135deg, #cfe9ff, #e8f1ff)" // fondo día
    : "linear-gradient(135deg, #1a237e, #0d47a1)"; // fondo noche

  const textColor = isDay ? "#0d47a1" : "#fff"; // texto oscuro de día, claro de noche
  const iconColor = isDay ? "#fbc02d" : "#fff"; // sol dorado, luna blanca

  return (
    <motion.div
      className="world-clock"
      style={{
        background: bgColor,
        color: textColor,
        padding: "2rem",
        borderRadius: "20px",
        boxShadow: isDay
          ? "0 4px 15px rgba(0,0,0,0.1)"
          : "0 4px 15px rgba(0,0,0,0.5)",
        textAlign: "center",
        width: "280px",
        margin: "1rem auto",
        transition: "all 0.6s ease-in-out",
      }}
      whileHover={{ scale: 1.03 }}
    >
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: isDay ? 0 : 180 }}
        transition={{ duration: 1 }}
        style={{ marginBottom: "1rem" }}
      >
        {isDay ? (
          <WbSunny
            sx={{
              fontSize: 60,
              color: iconColor,
              filter: "drop-shadow(0 0 8px rgba(251,192,45,0.7))",
            }}
          />
        ) : (
          <NightsStay
            sx={{
              fontSize: 60,
              color: iconColor,
              filter: "drop-shadow(0 0 6px rgba(255,255,255,0.4))",
            }}
          />
        )}
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ fontWeight: "600", marginBottom: "0.5rem" }}
      >
        {selectedCity.name}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          letterSpacing: "1px",
        }}
      >
        {time}
      </motion.p>

      <motion.span
        style={{
          fontSize: "1rem",
          opacity: 0.8,
          marginTop: "0.5rem",
          display: "block",
        }}
      >
        {isDay ? "☀️ Día" : "🌙 Noche"}
      </motion.span>
    </motion.div>
  );
};

export default WorldClock;
