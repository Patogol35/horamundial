import React from "react";
import { IconButton } from "@mui/material";
import {
  WbSunny,
  NightsStay,
} from "@mui/icons-material";

export default function ModeToggle({
  isDay,
  onToggle,
}) {
  return (
    <IconButton
      onClick={onToggle}
      className={`mode-toggle ${
        isDay ? "day" : "night"
      }`}
      aria-label="Cambiar modo"
    >
      <span className="mode-toggle-icon">
        {isDay ? (
          <NightsStay />
        ) : (
          <WbSunny />
        )}
      </span>
    </IconButton>
  );
}
