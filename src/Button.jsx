import { Button as MUIButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PropTypes from "prop-types";

export default function Button({ onClick, label }) {
  return (
    <MUIButton
      sx={{ gap: "12px" }}
      onClick={onClick}
      variant={label ? "outlined" : "text"}
    >
      <AddCircleIcon />
      {label}
    </MUIButton>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string,
};
