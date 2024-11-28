import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import SaveIcon from '@mui/icons-material/Save';
import Stack from '@mui/material/Stack';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ open, handleClose }) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Registre sua tarefa
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
          <Box sx={{ width: 500, maxWidth: "100%" }}>
            <TextField sx={{ marginY: '20px'}} fullWidth label="Título da tarefa" id="titulo-tarefa" />
            <TextField sx={{ width: '120px', marginBottom: '20px', marginRight: '20px'}} id="data" label="Data" variant="outlined" />
            <TextField sx={{ width: '120px', marginBottom: '20px', marginRight: '20px'}} id="outlined-basic" label="Horas entrada" variant="outlined" />
            <TextField sx={{ width: '120px', marginBottom: '20px'}} id="outlined-basic" label="Horas saída" variant="outlined" />
          </Box>
        </Box>
        
      <Stack direction="row" spacing={2}>
      <LoadingButton loading variant="outlined">
        Submit
      </LoadingButton>
      </Stack>
      </Modal>
    </div>
  );
}
