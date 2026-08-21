import { motion } from "framer-motion";
import {
  WbSunny,
  DarkMode,
} from "@mui/icons-material";

export default function ClockIcon({
  isDay,
  color,
}) {
  return (
    <motion.div
      className="clock-icon"
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
        <WbSunny
          sx={{
            fontSize: 60,
            color,
          }}
        />
      ) : (
        <DarkMode
          sx={{
            fontSize: 60,
            color,
          }}
        />
      )}
    </motion.div>
  );
}
