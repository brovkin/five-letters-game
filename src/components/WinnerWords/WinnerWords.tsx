import React, { FC } from 'react';
import cn from 'classnames';
import { WinnerWordsType } from '@features/gridSlice';
import useHover from '@hooks/useHover';
import './WinnerWords.scss';

type WinnerWordsProps = {
  winnerWords: WinnerWordsType;
};

const WinnerWords: FC<WinnerWordsProps> = ({ winnerWords }) => {
  const [counterRef, openPopup] = useHover<HTMLDivElement>();

  const renderWords = () => {
    const splitted = winnerWords.map((word) => {
      return word.split('');
    });

    return splitted.map((word, index) => {
      return (
        <ul key={index} className="winner-words__word">
          {word.map((letter, index) => (
            <li key={index} className="winner-words__letter">
              {letter}
            </li>
          ))}
        </ul>
      );
    });
  };
  return (
    <div
      ref={counterRef}
      className={cn('winner-words', {
        active: openPopup && winnerWords.length,
      })}
    >
      <div className="winner-words__counter">
        Отгадано слов: {winnerWords.length}
      </div>
      {openPopup && winnerWords.length ? (
        <div className={cn('winner-words__popup', {})}>{renderWords()}</div>
      ) : null}
    </div>
  );
};

export default WinnerWords;
