import * as React from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Stack from '@mui/material/Stack';
import BasicModal from './Modal';

export default function IconLabelButtons() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  return (
    <Stack direction="row" spacing={2} justifyContent={"flex-end"} width={"100%"}>
      <Button onClick={handleOpen} variant="outlined" startIcon={<AddCircleIcon />}>
        Criar registro
      </Button>
      <BasicModal open={open} handleClose={handleClose}/>
    </Stack>
  );
}
