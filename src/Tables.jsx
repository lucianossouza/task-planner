import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Stack } from "@mui/material";
import Button from "./Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function Row({ handleOpen, row }) {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            fjusty
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="center">{row.workingHours}</TableCell>
        <TableCell align="right">
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(row.totalAmount)}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Data</TableCell>
                    <TableCell align="center">Hora entrada</TableCell>
                    <TableCell align="center">Hora saída</TableCell>
                    <TableCell align="center">
                      Subtração entrada e saída
                    </TableCell>
                    <TableCell align="right">Valor total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => {
                    if (historyRow?.date) {
                      return (
                        <TableRow key={historyRow.date}>
                          <TableCell component="th" scope="row">
                            {
                              new Date(`${historyRow.date}T00:00:00`)
                                .toLocaleString("pt-BR")
                                .split(",")[0]
                            }
                          </TableCell>
                          <TableCell align="center">
                            {historyRow.timeStart}
                          </TableCell>
                          <TableCell align="center">
                            {historyRow.timeEnd}
                          </TableCell>
                          <TableCell align="center">
                            {historyRow.workingHours}
                          </TableCell>
                          <TableCell align="right">
                            {new Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(historyRow.totalAmount)}
                          </TableCell>
                        </TableRow>
                      );
                    }
                  })}
                </TableBody>
              </Table>
              <Stack
                marginTop={"12px"}
                flexDirection={"row"}
                justifyContent={"flex-end"}
              >
                <Button
                  onClick={() => {
                    handleOpen(row.id);
                  }}
                />
              </Stack>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  handleOpen: PropTypes.func.isRequired,
  row: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    workingHours: PropTypes.string.isRequired,
    totalAmount: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        workingHours: PropTypes.string.isRequired,
        totalAmount: PropTypes.number.isRequired,
        timeStart: PropTypes.string.isRequired,
        timeEnd: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default function CollapsibleTable({ data, handleOpen }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell width={"50px"} />
            <TableCell>Nome da tarefa</TableCell>
            <TableCell align="center">Horas trabalhadas</TableCell>
            <TableCell align="right">Valor total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <Row key={row.name} row={row} handleOpen={handleOpen} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

CollapsibleTable.propTypes = {
  handleOpen: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string.isRequired,
      workingHours: PropTypes.string.isRequired,
      totalAmount: PropTypes.number.isRequired,
      history: PropTypes.arrayOf(
        PropTypes.shape({
          workingHours: PropTypes.string.isRequired,
          totalAmount: PropTypes.number.isRequired,
          timeStart: PropTypes.string.isRequired,
          timeEnd: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
};
