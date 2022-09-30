import React, { FC, InputHTMLAttributes } from 'react';
import { ControllerProps, useController } from 'react-hook-form';
import './FormInput.scss';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  control: ControllerProps['control'];
  name: string;
  rules?: ControllerProps['rules'];
  defaultValue?: string;
  label: string;
  onMount?: 'focus' | 'select';
}

const FormInput: FC<FormInputProps> = ({
  control,
  name,
  label,
  rules,
  defaultValue,
  ...props
}) => {
  const isRequired = rules?.required;
  const {
    field: { onChange, onBlur, value, ref },
  } = useController({
    name,
    control,
    rules,
    defaultValue: defaultValue || '',
  });

  return (
    <div className="form-input">
      {label ? (
        <div className="form-input__title">
          {label}
          {isRequired ? <sup className="form-input__required">*</sup> : null}
        </div>
      ) : null}
      <div className="form-input__value-wrapper">
        <input
          ref={ref}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className="form-input__value-input"
          {...props}
        />
      </div>
    </div>
  );
};

export default FormInput;
