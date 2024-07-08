import React from "react";
import { Modal, Box, Typography, TextField, IconButton, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";


const FilterModal = ({
  open,
  onClose,
  filters,
  handleFilterChange,
  handleAddFilter,
  handleRemoveFilter,
  handleSaveFilters,
}) => (
  <Modal open={open} onClose={onClose} aria-labelledby="filter-modal-title" aria-describedby="filter-modal-description">
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "40%",
        maxHeight: "80vh",
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        overflowY: "auto",
      }}
    >
      <Typography id="filter-modal-title" variant="h6" component="h2">
        Add Filters
      </Typography>
      <Box sx={{ maxHeight: "60vh", overflowY: "auto", mt: 2 }}>
        {filters.map((filter) => (
          <Box key={filter.id} sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <TextField
              label="Filter"
              variant="outlined"
              value={filter.value}
              onChange={(e) => handleFilterChange(filter.id, e.target.value)}
              fullWidth
            />
            <IconButton color="secondary" onClick={() => handleRemoveFilter(filter.id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      </Box>
      <Button onClick={handleAddFilter} sx={{ mt: 2 }} variant="outlined" startIcon={<AddIcon />}>
        Add Filter
      </Button>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
        <Button onClick={onClose} sx={{ mr: 2 }}>
          Cancel
        </Button>
        <Button onClick={handleSaveFilters} variant="contained" color="primary">
          Save
        </Button>
      </Box>
    </Box>
  </Modal>
);

export default FilterModal;
