import { useState } from "react";
import { Autocomplete, TextField, Box, Button } from "@mui/material";
import moment from "moment-timezone";

export default function CitySelector({ onAddCity }) {
  const allZones = moment.tz.names();
  const [selectedZone, setSelectedZone] = useState("");

  const handleAdd = () => {
    if (!selectedZone) return;
    const cityName = selectedZone.split("/").pop().replace(/_/g, " ");
    onAddCity({ name: cityName, timezone: selectedZone });
    setSelectedZone("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 2,
        mb: 4,
        flexWrap: "wrap",
      }}
    >
      <Autocomplete
        options={allZones}
        sx={{ width: 300 }}
        value={selectedZone}
        onChange={(e, newValue) => setSelectedZone(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Buscar ciudad"
            variant="outlined"
            size="small"
            sx={{ bgcolor: "white", borderRadius: 2 }}
          />
        )}
      />
      <Button
        variant="contained"
        onClick={handleAdd}
        sx={{
          borderRadius: 2,
          textTransform: "none",
          fontWeight: "bold",
        }}
      >
        Agregar
      </Button>
    </Box>
  );
}
