import { TimeInput } from '@nextui-org/react';

const DateTimePicker = ({
  isRequired = false,
  isInvalid,
  errorMessage,
  onChange,
  label = '',
  showTimePicker = false,
  value,
  width = 'w-80',
  ...rest
}) => {
  return (
    <div className={`flex ${width} flex-row gap-4 mb-3`}  style={{borderRadius:'13px'}}>
      <TimeInput
      labelProps={{
        style:{color:'#fff !important'}
      }}
        label={label}
        variant='bordered'
        className='bg-white-800'
        hideTimeZone
        showMonthAndYearPickers
        value={value}
        labelPlacement='outside'
        isRequired={isRequired}
        isInvalid={isInvalid}
        errorMessage={errorMessage}
        onChange={(time) => {
          if (onChange) {
            if (time) onChange(time);
          }
        }}
        {...rest}
      />
    </div>
  );
};

export default DateTimePicker;
