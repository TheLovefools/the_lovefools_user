import React, { forwardRef } from 'react';
import ReactSelect from 'react-select';

const Select = ({
  placeholder,
  options,
  isInvalid = false,
  errorMessage = '',
  label = '',
  handleInputChange,
  ...rest
}) => {
  return (
    <div>
      {label && (
       <label
       style={{ color: '#fff' }}
       className={`text-small ${rest.isDisabled && 'opacity-disabled'}`}
     >
       {label}
     </label>
      )}
      <div className={`${label && 'mt-1.5'}`}>
        <ReactSelect
          placeholder={placeholder}
          onInputChange={handleInputChange}
          options={options}
          // menuPlacement='auto'
          styles={{
            menu: (provided) => ({
              ...provided,
              zIndex: 9999,
              background:'#fff',
            }),
            control: () => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background:'#fff',
              fontSize:'0.8rem',
              height:'45px',
              borderRadius:'50px'
            }),
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          }}
          // menuPosition='fixed'
          classNames={{
            control: (state) => {
              const defaultClassName =
                'rounded-small border-2 border-default-200 hover:border-default-400';
              const disabledClassName = state.isDisabled && 'opacity-disabled';
              const focusedClassName =
                state.isFocused && 'border-default-foreground';

              const errorClassName = isInvalid && '!border-danger';

              return `${defaultClassName} ${errorClassName} ${disabledClassName} ${focusedClassName}`;
            },
            indicatorSeparator: () => 'hidden',
            menuList: () => 'scrollBar rounded-small',
            option: (state) => {
              const defaultClassName = 'text-tiny hover:bg-white-800';
              const focusedClassName = state.isFocused && '!bg-white-800';
              const selectedClassName = state.isSelected && '!bg-white-800';

              return `${defaultClassName} ${focusedClassName} ${selectedClassName}`;
            },
          }}
          {...rest}
        />
        {isInvalid && errorMessage && (
          <div
            className='p-1 text-tiny text-danger'
            role='alert'>
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default Select;
