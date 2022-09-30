import React, { FC } from 'react';
import FilledLetters from '@components/FilledLetters';
import LetterGrid from '@components/LetterGrid';
import Logo from '@components/Logo';
import WinnerWords from '@components/WinnerWords';
import { useAppSelector } from '@app/hooks';
import './App.scss';

const App: FC = () => {
  const searchWord = useAppSelector((state) => state.grid.searchWord);
  const winnerWords = useAppSelector((state) => state.grid.winnerWords);

  return (
    <div className="app">
      <div className="app__wrapper">
        <Logo />
        <WinnerWords winnerWords={winnerWords} />
        <FilledLetters />
        <div className="app__hidden-word">Загаданное слово: {searchWord}</div>
        <LetterGrid />
      </div>
    </div>
  );
};

export default App;
