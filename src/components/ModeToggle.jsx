import { IconButton } from "@mui/material";
import { WbSunny, NightsStay } from "@mui/icons-material";

export default function ModeToggle({ isDay, onToggle }) {
  return (
    <IconButton
      onClick={onToggle}
      sx={{
        mb: 2,
        bgcolor: isDay ? "#1976d2" : "#333",
        color: "#ffffff",
        borderRadius: "50%",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        "&:hover": {
          bgcolor: isDay ? "#1565c0" : "#444",
        },
      }}
    >
      {isDay ? <NightsStay /> : <WbSunny />}
    </IconButton>
  );
}
