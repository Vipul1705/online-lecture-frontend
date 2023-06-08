import React from "react";
import Form from "react-bootstrap/Form";
import { Controller } from "react-hook-form";
import Col from "react-bootstrap/Col";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import { Tooltip } from "@mui/material";

const ControllerInput = ({
  name,
  type,
  placeholder,
  control,
  label,
  as,
  rows,
  defaultValue,
  disabled,
  tooltipTitle,
  style,
  mandatory,
}) => {
  return (
    <Form.Group as={Col} controlId={name} style={style}>
      <Form.Label>
        {label} {mandatory && <span style={{ color: "red" }}>*</span>}
        {tooltipTitle && (
          <Tooltip title={tooltipTitle} placement="right">
            <InfoIcon />
          </Tooltip>
        )}
      </Form.Label>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <>
            <Form.Control
              type={type}
              placeholder={placeholder}
              as={as}
              rows={rows}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              isInvalid={!!error}
              disabled={disabled}
            />
            <Form.Control.Feedback type="invalid">
              {error?.message}
            </Form.Control.Feedback>
          </>
        )}
      />
    </Form.Group>
  );
};

export default ControllerInput;
