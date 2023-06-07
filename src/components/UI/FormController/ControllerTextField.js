import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

const ControllerTextField = ({ control, name, label, type }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, value, onBlur },
        fieldState: { error },
      }) => (
        <TextField
          type={type}
          label={label}
          onChange={onChange}
          onBlur={onBlur}
          error={!!error}
          helperText={error ? error?.message : " "}
        />
      )}
    />
  );
};

export default ControllerTextField;
