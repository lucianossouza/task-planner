import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "./Button";
import Stack from "@mui/material/Stack";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

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

function subtractHours(firstHours, secondHours) {
  const [h1, m1] = firstHours.split(":").map(Number); 
  const [h2, m2] = secondHours.split(":").map(Number);

  const minutos1 = h1 * 60 + m1;
  const minutos2 = h2 * 60 + m2;

  const diferencaMinutos = Math.abs(minutos1 - minutos2);
  const differenceValue = diferencaMinutos / 60;

  const horas = Math.floor(diferencaMinutos / 60);
  const minutos = diferencaMinutos % 60;

  return {
    differenceValue,
    differenceText: `${horas}:${minutos.toString().padStart(2, "0")}`,
  };
}

function sumHours(firstHours, secondHours) {
  const [h1, m1] = firstHours.split(":").map(Number);
  const [h2, m2] = secondHours.split(":").map(Number);

  const minutes1 = h1 * 60 + m1;
  const minutes2 = h2 * 60 + m2;

  const totalMinutes = Math.abs(minutes1 + minutes2);

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours}:${minutes.toString().padStart(2, "0")}`;
}

function formatDate(date) {
  const split = date.split("/");
  const formatedDate = `${split[2]}-${split[1]}-${split[0]}`;

  return formatedDate;
}

export default function BasicModal({ open, handleClose, getData, registryID }) {
  const [selectedRegistry, setSelectedRegistry] = useState();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");

  const getSelectedRegistry = async () => {
    try {
      const response = await fetch(
        `https://674a75678680202966348afe.mockapi.io/task-planner/registry/${registryID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Erro: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      setSelectedRegistry(data);
      setTitle(data.name);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  const postData = async () => {
    try {
      const { differenceText, differenceValue } = subtractHours(
        timeStart,
        timeEnd
      );

      const response = await fetch(
        "https://674a75678680202966348afe.mockapi.io/task-planner/registry",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: title,
            workingHours: differenceText,
            totalAmount: 50 * differenceValue,
            history: [
              {
                date: formatDate(date),
                timeStart: timeStart,
                timeEnd: timeEnd,
                workingHours: differenceText,
                totalAmount: 50 * differenceValue,
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Erro: ${response.status} - ${response.statusText}`);
      }

      handleClose();
      setDate("");
      setTimeEnd("");
      setTimeStart("");
      setTitle("");
      getData();
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  const updateData = async () => {
    try {
      const { differenceText, differenceValue } = subtractHours(
        timeStart,
        timeEnd
      );

      const response = await fetch(
        `https://674a75678680202966348afe.mockapi.io/task-planner/registry/${registryID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...selectedRegistry,
            name: title,
            workingHours: sumHours(
              selectedRegistry.workingHours,
              differenceText
            ),
            totalAmount: 50 * differenceValue + selectedRegistry.totalAmount,
            history: [
              ...selectedRegistry.history,
              {
                date: formatDate(date),
                timeStart: timeStart,
                timeEnd: timeEnd,
                workingHours: differenceText,
                totalAmount: 50 * differenceValue,
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Erro: ${response.status} - ${response.statusText}`);
      }

      handleClose();
      getData();
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  useEffect(() => {
    if (registryID) {
      getSelectedRegistry();
    }
  }, [registryID]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack flexDirection={"column"} gap={"24px"} sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Registre sua tarefa
          </Typography>
          <Stack
            flexDirection={"column"}
            gap={"24px"}
            sx={{ width: 500, maxWidth: "100%" }}
          >
            <TextField
              fullWidth
              label="Título da tarefa"
              id="title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
            <TextField
              fullWidth
              id="date"
              label="Data"
              variant="outlined"
              value={date}
              onChange={(event) => {
                setDate(event.target.value);
              }}
            />
            <Stack flexDirection={"row"} gap={"16px"}>
              <TextField
                id="time-start"
                label="Horas entrada"
                variant="outlined"
                value={timeStart}
                onChange={(event) => {
                  setTimeStart(event.target.value);
                }}
              />
              <TextField
                id="time-end"
                label="Horas saída"
                variant="outlined"
                value={timeEnd}
                onChange={(event) => {
                  setTimeEnd(event.target.value);
                }}
              />
            </Stack>
          </Stack>
          <Stack
            marginTop={"16px"}
            direction="row"
            spacing={2}
            justifyContent={"flex-end"}
            width={"100%"}
          >
            <Button
              onClick={() => {
                if (registryID) {
                  updateData();
                } else {
                  postData();
                }
              }}
              label={"Salvar"}
            />
          </Stack>
        </Stack>
      </Modal>
    </div>
  );
}

BasicModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
  registryID: PropTypes.string,
};
