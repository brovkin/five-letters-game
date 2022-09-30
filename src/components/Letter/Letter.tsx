import React, {
  FC,
  KeyboardEvent,
  Ref,
  useEffect,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';
import {
  LetterOtherOrder,
  LetterRightOrder,
  setActiveLetter,
  setWrongLanguage,
} from '@features/gridSlice';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import './Letter.scss';

interface LetterProps {
  number: number;
  wordNumber: number;
  setFilled: (number: number, letter: string) => void;
  isActiveLetter: boolean;
  isActiveWord: boolean;
  isStart: boolean;
}

const Letter: FC<LetterProps> = ({
  number,
  wordNumber,
  setFilled,
  isActiveLetter,
  isActiveWord,
  isStart,
}) => {
  const [letter, setLetter] = useState<string>('');
  const ref: Ref<HTMLInputElement> = useRef(null);
  const clearWord = useAppSelector((state) => state.grid.clearWord);
  const words = useAppSelector((state) => state.grid.words);
  const isWin = useAppSelector((state) => state.grid.isWin);
  const acceptedLetters = words[wordNumber - 1]?.letters || {};
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isStart) {
      setLetter('');
    }
  }, [isStart]);

  useEffect(() => {
    // задаем focus
    if (isActiveLetter && isActiveWord) {
      ref?.current?.focus();
    }
  }, [isActiveLetter]);

  useEffect(() => {
    // очищаем focus
    if (isWin && isActiveWord) {
      // ref?.current?.blur();
    }
  }, [isWin]);

  useEffect(() => {
    if (clearWord && isActiveWord) {
      setLetter('');
    }
  }, [clearWord]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isRussianSymbol = /[а-яА-ЯЁё]/.test(value);
    if (value) {
      if (isRussianSymbol) {
        const upperCaseValue = value.toUpperCase();
        setLetter(upperCaseValue);
        setFilled(number, upperCaseValue);
      } else {
        dispatch(setWrongLanguage(true));
      }
    }
  };

  const handleChangeLetter = () => {
    dispatch(setActiveLetter({ activeLetter: number }));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const code = e.code;

    if (letter && isActiveLetter) {
      dispatch(setActiveLetter({ activeLetter: number + 1 }));
    }

    if (!isWin && code === 'Backspace') {
      setLetter('');
      dispatch(setActiveLetter({ activeLetter: number - 1 }));
    }

    if (code === 'Tab' || code === 'ArrowRight') {
      e.preventDefault();

      dispatch(
        setActiveLetter({ activeLetter: number === 5 ? 5 : number + 1 })
      );
    }

    if (code === 'ArrowLeft') {
      dispatch(
        setActiveLetter({ activeLetter: number === 1 ? 1 : number - 1 })
      );
    }
  };

  const isRight = () => {
    if (letter && acceptedLetters.length) {
      const find = acceptedLetters.find(
        ({
          number: acceptedNumber,
          letter: acceptedLetter,
          isRight,
        }: LetterRightOrder) =>
          acceptedLetter === letter && acceptedNumber === number && isRight
      );

      return !!find;
    }

    return false;
  };

  const isOtherOrder = () => {
    if (letter && acceptedLetters.length) {
      const find = acceptedLetters.find(
        ({
          number: acceptedNumber,
          letter: acceptedLetter,
          isOtherOrder,
        }: LetterOtherOrder) =>
          acceptedLetter === letter && acceptedNumber === number && isOtherOrder
      );

      return !!find;
    }

    return false;
  };

  return (
    <>
      <div
        className={cn('letter', {
          active: isActiveLetter,
          disabled: !isActiveWord && wordNumber > words.length,
          'right-letter': isRight(),
          'other-order-letter': isOtherOrder(),
        })}
        onClick={handleChangeLetter}
      >
        <input
          ref={ref}
          type="text"
          className="letter__input"
          value={letter}
          maxLength={1}
          onChange={handleInput}
          onFocus={() => !clearWord && ref?.current?.select()}
          onKeyDown={handleKeyDown}
        />
      </div>
    </>
  );
};

export default Letter;
