import React, { ButtonHTMLAttributes, FC, Ref, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import cn from 'classnames';
import './Button.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  clickHandler?: () => void;
  children?: JSX.Element | React.ReactNode;
  mode?: 'primary' | 'outline' | 'icon';
  icon?: JSX.Element | React.ReactNode;
  disabled?: boolean;
  tooltip?: string;
  type?: 'submit' | 'button' | 'reset';
  size?: 'sm' | 'md';
  ref?: Ref<HTMLButtonElement>;
}

const Button: FC<ButtonProps> = ({
  children,
  clickHandler,
  className,
  mode = 'primary',
  type = 'button',
  icon,
  tooltip,
  disabled,
  size = 'md',
  ref,
  ...props
}) => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const isIcon = mode === 'icon';
  const isButton = mode === 'primary' || mode === 'outline';

  return (
    <button
      className={cn('ui-button', mode, size, className, {
        disabled,
      })}
      onClick={clickHandler}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      type={type}
      ref={ref}
      {...props}
    >
      {isButton && icon}
      {isIcon ? icon : children}
      {tooltip ? (
        <CSSTransition
          in={showTooltip}
          timeout={100}
          classNames="tooltip-animation"
        >
          <div className="ui-button__tooltip">{tooltip}</div>
        </CSSTransition>
      ) : null}
    </button>
  );
};

export default Button;
