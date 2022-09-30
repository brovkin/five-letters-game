import React, { FC, InputHTMLAttributes } from 'react';
import { ControllerProps, useController } from 'react-hook-form';
import cn from 'classnames';
import './FormText.scss';

interface FormTextProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  control: ControllerProps['control'];
  rules?: ControllerProps['rules'];
  defaultValue?: string;
  className?: string;
  label: string;
}

const FormText: FC<FormTextProps> = ({
  control,
  name,
  label,
  rules,
  defaultValue,
  className,
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
    <div className="form-textarea">
      {label ? (
        <div className="form-textarea__title">
          {label}
          {isRequired ? <sup className="form-textarea__required">*</sup> : null}
        </div>
      ) : null}
      <div className="form-textarea__value-wrapper">
        <textarea
          ref={ref}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={cn('form-textarea__value', className)}
          {...props}
        />
      </div>
    </div>
  );
};

export default FormText;
