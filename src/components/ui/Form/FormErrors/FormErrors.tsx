import React, { FC } from 'react';
import { FieldError, FieldErrors } from 'react-hook-form';
import './FormErrors.scss';

interface Errors {
  [key: string]: string;
}

interface FormErrorsProps {
  errors: FieldErrors<FieldError>;
}

export const fields: Errors = {
  name: 'Имя',
  surname: 'Фамилия',
  email: 'E-mail',
  message: 'Сообщение',
  title: 'Название списка',
};

const FormErrors: FC<FormErrorsProps> = ({ errors }) => {
  const getMessage = (error: any) => {
    // Todo
    const type = error.type;
    switch (type) {
      case 'required':
        return 'Обязательное поле';
      case 'pattern':
        return error.message;
      default:
        return '';
    }
  };

  const renderErrors = () => {
    const object = Object.keys(errors);
    if (object?.length) {
      return object.map((key) => {
        if (key as string) {
          const message = getMessage((errors as any)[key]); // Todo
          return (
            <p key={key} className="form-errors__error">
              Ошибка в поле {fields[key]} - {message}
            </p>
          );
        }
      });
    }

    return null;
  };

  return <div className="form-errors">{renderErrors()}</div>;
};

export default FormErrors;
