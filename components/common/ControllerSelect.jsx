import React from "react";
import Select from "./Select";
import { useFormContext, Controller } from "react-hook-form";

const ControllerSelect = ({
  name,
  placeholder,
  options,
  multiple = false,
  handleInputChange,
  ...rest
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <Select
          placeholder={placeholder}
          options={options}
          isMulti={multiple}
          handleInputChange={handleInputChange}
          isInvalid={!!error}
          errorMessage={error?.message}
          value={value}
          onChange={(val) => onChange(val)}
          inputRef={ref}
          {...rest} 
        />
      )}
    />
  );
};

export default ControllerSelect;
