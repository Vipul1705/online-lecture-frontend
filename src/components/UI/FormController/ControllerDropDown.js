import React from "react";
import { Controller } from "react-hook-form";
import Form from "react-bootstrap/Form";

const ControllerDropDown = ({
  name,
  control,
  column,
  label,
  prevData,
  style,
  options = [],
  masters = [],
  items = [],
  masterLabelPath = "",
  masterValuePath = "",
  mandatory,
}) => {
  const hasMasters = masters.length > 0;
  const hasOptions = options.length > 0;
  return (
    <Form.Group className="mb-3" controlId={name} style={style}>
      <Form.Label>
        {label}
        {mandatory && <span style={{ color: "red" }}>*</span>}
      </Form.Label>
      <Controller
        control={control}
        defaultValue=""
        name={name}
        render={({
          field: { onChange, value, onBlur },
          fieldState: { error },
        }) => (
          <>
            <Form.Select
              value={value}
              // onClick={() => props.fetchMasters(column)}
              onChange={onChange}
              onBlur={onBlur}
              isInvalid={!!error}
            >
              {prevData ? (
                <option value={prevData}>{prevData}</option>
              ) : (
                (hasMasters || items) && <option value="">Choose...</option>
              )}

              {masters?.map((master, index) => (
                <option key={index} value={master}>
                  {master}
                </option>
              ))}
              {options?.map((item, index) => {
                const columnName = Object.keys(item)[1];
                const columnValue = item[columnName];
                return (
                  <option key={index} value={item}>
                    {columnValue}
                  </option>
                );
              })}
            </Form.Select>

            <Form.Control.Feedback type="invalid">
              {error?.message}
            </Form.Control.Feedback>
          </>
        )}
      />
    </Form.Group>
  );
};

export default ControllerDropDown;
