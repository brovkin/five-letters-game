import React, { FC, FormEvent } from 'react';
import cn from 'classnames';
import ConfettiCongrats from '@components/ConfettiCongrats';
import Word from '@components/Word';
import Button from '@components/ui/Button';
import {
  acceptWord,
  clearWord,
  nextWord,
  restart,
  setWrongWord,
} from '@features/gridSlice';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { AMOUNT_WORDS } from '@constants';
import dict from '../../data/words.json';
import './LetterGrid.scss';

const LetterGrid: FC = () => {
  const attempt = useAppSelector((state) => state.grid.attempt);
  const letters = useAppSelector((state) => state.grid.letters);
  const wrongLanguage = useAppSelector((state) => state.grid.wrongLanguage);
  const wrongWord = useAppSelector((state) => state.grid.wrongWord);
  const isWin = useAppSelector((state) => state.grid.isWin);
  const searchWord = useAppSelector((state) => state.grid.searchWord);
  const isFailed = useAppSelector((state) => state.grid.isFailed);
  const dispatch = useAppDispatch();

  const { availableDict } = dict;

  const handleAcceptWord = () => {
    const word = letters.join('');

    const isExistWord = !!availableDict.find((item) => item === word);
    if (!isExistWord) {
      dispatch(setWrongWord(word));
      dispatch(clearWord());
    } else {
      dispatch(acceptWord({ word }));
    }
  };

  const handleNextWord = () => dispatch(nextWord());

  const handleRestart = () => dispatch(restart());

  const WORDS = Array.from({ length: AMOUNT_WORDS }, (_, i) => i + 1);

  const acceptButtonIsDisabled = letters.length < 5;

  const submitHandleForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isWin) {
      return handleNextWord();
    }

    if (isFailed) {
      return handleRestart();
    }

    return handleAcceptWord();
  };

  return (
    <form className="grid" onSubmit={submitHandleForm}>
      <ConfettiCongrats isWin={isWin} />
      <div className="grid__message-wrapper">
        <div
          className={cn('grid__message', {
            visible: isWin || isFailed || wrongWord || wrongLanguage,
          })}
        >
          {!wrongWord || !isWin || !isFailed ? <>&nbsp;</> : null}
          {isWin ? (
            <span className="grid__message-success">
              Поздравляем! Вы отгадали слово!
            </span>
          ) : null}

          {isFailed ? (
            <span className="grid__message-success">
              К сожалению, вы не отгадали слово <b>{searchWord}</b>. Попробуйте
              еще раз :)
            </span>
          ) : null}

          {wrongWord ? (
            <span className="grid__message-error">
              Слово <b>{wrongWord}</b> не подходит
            </span>
          ) : null}

          {wrongLanguage ? (
            <span className="grid__message-error">
              Принимаются только <b>русские</b> буквы
            </span>
          ) : null}
        </div>
      </div>
      <div className="grid__words">
        {WORDS.map((item: number, i: number) => {
          return (
            <Word key={i} wordNumber={i + 1} isActiveWord={attempt === i + 1} />
          );
        })}
      </div>
      <div className="grid__buttons">
        {isFailed ? <Button type="submit">Начать заново</Button> : null}
        {isWin ? <Button type="submit">Следующее слово</Button> : null}

        {!isFailed && !isWin ? (
          <Button type="submit" disabled={acceptButtonIsDisabled}>
            Принять слово
          </Button>
        ) : null}
      </div>
    </form>
  );
};

export default LetterGrid;
