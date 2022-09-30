import React, { FC } from 'react';
import cn from 'classnames';
import { useAppSelector } from '@app/hooks';
import { RUSSIAN_ALPHABET } from '@constants';
import './FilledLetters.scss';

const FilledLetters: FC = () => {
  const alphabetSplit = RUSSIAN_ALPHABET.split('');
  const filledLetters = useAppSelector((state) => state.grid.filledLetters);

  const markedLetters: any = [];
  const existLetters: any = [];
  alphabetSplit.forEach((letter) => {
    let isFilled = false;
    filledLetters.forEach(
      ({ letter: filledLetter, isMiss, isOtherOrder, isRight }: any) => {
        if (letter === filledLetter && !existLetters.includes(letter)) {
          markedLetters.push({ letter, isMiss, isOtherOrder, isRight });
          existLetters.push(letter);
          isFilled = true;
        }
      }
    );

    if (!isFilled) {
      markedLetters.push({ letter });
    }
  });

  return (
    <div className="filled-letters">
      <ul className="filled-letters__alphabet">
        {markedLetters.map(({ letter, isMiss, isOtherOrder, isRight }: any) => (
          <li
            key={letter}
            className={cn('filled-letters__letter', {
              miss: isMiss,
              other: isOtherOrder,
              right: isRight,
            })}
          >
            {letter}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilledLetters;
