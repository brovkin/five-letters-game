import React, { FC } from 'react';
import cn from 'classnames';
import Letter from '@components/Letter';
import { fillingWord, setActiveLetter } from '@features/gridSlice';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import './Word.scss';

interface WordProps {
  wordNumber: number;
  isActiveWord: boolean;
}

const Word: FC<WordProps> = ({ wordNumber, isActiveWord }) => {
  const activeLetter = useAppSelector((state) => state.grid.activeLetter);
  const words = useAppSelector((state) => state.grid.words);
  const isStart = useAppSelector((state) => state.grid.start);
  const dispatch = useAppDispatch();
  const LETTERS = [1, 2, 3, 4, 5];

  const getNextLetter = (current: number) => {
    const next = current + 1;

    if (next > LETTERS.length) {
      return LETTERS[LETTERS.length - 1];
    }

    return next;
  };

  const setFilled = (number: number, letter: string) => {
    const nextLetter = getNextLetter(number);
    dispatch(setActiveLetter({ activeLetter: nextLetter }));
    dispatch(fillingWord({ number, letter }));
  };

  return (
    <div
      className={cn('word', {
        active: isActiveWord,
        accepted: wordNumber === words.length,
      })}
    >
      {LETTERS.map((item: number, i: number) => {
        return (
          <Letter
            key={i}
            number={i + 1}
            wordNumber={wordNumber}
            isActiveLetter={activeLetter === i + 1}
            isActiveWord={isActiveWord}
            setFilled={setFilled}
            isStart={isStart}
          />
        );
      })}
    </div>
  );
};

export default Word;
