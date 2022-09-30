import React, { FC } from 'react';
import { ControllerProps, useController } from 'react-hook-form';
import './Switch.scss';

interface SwitchProps {
  name: string;
  control: ControllerProps['control'];
  rules?: ControllerProps['rules'];
  defaultValue?: boolean;
  label: string;
}

const Switch: FC<SwitchProps> = ({
  name,
  control,
  label,
  rules,
  defaultValue,
}) => {
  const {
    field: { onChange, onBlur, value, ref },
  } = useController({
    name,
    control,
    rules,
    defaultValue: defaultValue || false,
  });

  return (
    <div className="switch">
      <div className="switch__wrapper">
        {label ? <div className="switch__title">{label}</div> : null}
        <label className="switch__value">
          <input
            type="checkbox"
            className="switch__real-checkbox"
            ref={ref}
            checked={value}
            onChange={onChange}
            onBlur={onBlur}
          />
          <div className="switch__input">
            <div className="switch__indicator" />
          </div>
        </label>
      </div>
    </div>
  );
};

export default Switch;
