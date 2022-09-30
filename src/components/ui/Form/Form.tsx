import React, { FC, useState } from 'react';
import { FieldErrors } from 'react-hook-form';
import Button from '@components/ui/Button';
import FormErrors from '@components/ui/Form/FormErrors';
import isEmpty from '@helpers/isEmpty';
import { PRIVACY_POLICY_TEXT } from '@constants';
import './Form.scss';

interface FormProps {
  children: JSX.Element | React.ReactNode;
  errors: FieldErrors;
  close: () => void;
  cancel: () => void;
  onSubmit: any; // Todo
  submitText?: string;
  showPrivacyPolicy?: boolean;
  text?: string;
}

const Form: FC<FormProps> = ({
  children,
  errors,
  cancel,
  onSubmit,
  submitText = 'Изменить',
  text,
  showPrivacyPolicy = false,
}) => {
  const [privacyPolicy, setPrivacyPolicy] = useState<boolean>(false);
  const hasErrors = !isEmpty(errors);

  return (
    <form onSubmit={onSubmit} className="form">
      <p className="form__text">{text}</p>

      {children}

      <FormErrors errors={errors} />

      {showPrivacyPolicy ? (
        <div className="form__privacy-policy">
          Нажимая на кнопку «{submitText}», я даю&nbsp;
          <a href="#" rel="noreferrer" onClick={() => setPrivacyPolicy(true)}>
            согласие на обработку персональных данных
          </a>
          {privacyPolicy ? (
            <div className="form__privacy-policy-modal">
              {PRIVACY_POLICY_TEXT}

              <Button
                type="button"
                className="form__privacy-policy-modal-btn"
                clickHandler={() => setPrivacyPolicy(false)}
              >
                Закрыть
              </Button>
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="form__btn-wrapper">
        <Button
          className="form__btn-cancel cancel"
          type="reset"
          clickHandler={cancel}
        >
          Очистить
        </Button>

        <Button className="form__btn-submit" type="submit" disabled={hasErrors}>
          {submitText}
        </Button>
      </div>
    </form>
  );
};

export default Form;
