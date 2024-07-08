import React from "react";
import { Modal, Box, Typography, Grid, Button } from "@mui/material";

const ImageModal = ({ open, onClose, images, handleImageSelect }) => (
  <Modal open={open} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-description">
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "70vw",
        height: "65vh",
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        overflowY: "auto",
      }}
    >
      <Typography id="modal-title" variant="h6" component="h2">
        Select Image
      </Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {images.map((image, index) => (
          <Grid item xs={4} key={index}>
            <div className="modal-image-container">
              <img
                src={`images/${image.src}`}
                alt={`Image ${index + 1}`}
                className="image"
                onClick={() => handleImageSelect(`images/${image.src}`, image.description)}
              />
              <Typography variant="body2" sx={{ mt: 1, textAlign: "center" }}>
                {image.description}
              </Typography>
              <button onClick={() => handleImageSelect(`images/${image.src}`, image.description)} className="edit-image-btn">
                Upload
              </button>
            </div>
          </Grid>
        ))}
      </Grid>
      <Button onClick={onClose} sx={{ mt: 2 }} variant="contained">
        Close
      </Button>
    </Box>
  </Modal>
);

export default ImageModal;
