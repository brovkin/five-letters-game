import { createSlice } from '@reduxjs/toolkit';
import { getLettersInfo } from '@helpers/getLettersInfo';
import { AMOUNT_WORDS } from '@constants';
import wordsData from '../data/words.json';

export type WinnerWordsType = string[];

export type LetterOrder = {
  number: number;
  letter: string;
  isOtherOrder?: boolean;
  isRight?: boolean;
  isMiss?: boolean;
};

export type LetterOtherOrder = Omit<LetterOrder, 'isRight'>;
export type LetterRightOrder = Omit<LetterOrder, 'isOtherOrder'>;

type FilledWord = {
  word: string;
  filled: boolean;
  letters: LetterOrder[];
};

interface State {
  words: FilledWord[];
  attempt: number;
  letters: string[];
  start: boolean;
  activeLetter: number;
  searchWord: string;
  winnerWords: WinnerWordsType;
  clearWord: boolean;
  wrongLanguage: boolean;
  wrongWord: string | null;
  isWin: boolean;
  isFailed: boolean;
  wordsCounter: number;
  filledLetters: any;
}

const filteredSearchWord = (winnerWords: WinnerWordsType): string => {
  const filtered = searchWords.filter((word) => !winnerWords.includes(word));
  return filtered[Math.floor(Math.random() * filtered.length)]; // word
};

const searchWords = wordsData.availableDict;

const initialState: State = {
  words: [],
  attempt: 1,
  letters: [],
  start: true,
  activeLetter: 1,
  searchWord: searchWords[Math.floor(Math.random() * searchWords.length)],
  winnerWords: [],
  clearWord: false,
  wrongLanguage: false,
  wrongWord: null,
  isWin: false,
  isFailed: false,
  wordsCounter: 0,
  filledLetters: [],
};

export const gridSlice = createSlice({
  name: 'grid',
  initialState,
  reducers: {
    setActiveLetter: (state, action) => {
      const { activeLetter } = action.payload;
      state.activeLetter = activeLetter;
    },
    setWrongLanguage: (state, action) => {
      state.wrongLanguage = action.payload;
      state.wrongWord = null;
    },
    setWrongWord: (state, action) => {
      state.wrongWord = action.payload;
      state.wrongLanguage = false;
    },
    fillingWord: (state, action) => {
      const { number, letter } = action.payload;
      state.wrongLanguage = false;
      state.wrongWord = null;
      state.letters[number - 1] = letter;
      state.clearWord = false;
      state.start = false;
    },
    clearWord: (state) => {
      state.letters = [];
      state.activeLetter = 1;
      state.clearWord = true;
    },
    acceptWord: (state, action) => {
      const { word } = action.payload;
      const { searchWord, letters } = state;
      const lettersArray = getLettersInfo(searchWord, letters);
      state.filledLetters = [...state.filledLetters, ...lettersArray];
      state.words.push({ word, filled: true, letters: lettersArray });
      if (word === searchWord) {
        state.isWin = true;
        state.winnerWords.push(state.searchWord);
      } else if (state.attempt === AMOUNT_WORDS) {
        state.isFailed = true;
      } else {
        state.attempt += 1;
        state.activeLetter = 1;
        state.letters = [];
      }
    },
    nextWord: (state) => {
      state.attempt = 1;
      state.activeLetter = 1;
      state.letters = [];
      state.words = [];
      state.start = true;
      state.isWin = false;
      state.searchWord = filteredSearchWord(state.winnerWords);
    },
    restart: (state) => {
      state.attempt = 1;
      state.activeLetter = 1;
      state.letters = [];
      state.words = [];
      state.start = true;
      state.isWin = false;
      state.isFailed = false;
      state.filledLetters = [];
    },
  },
});

export const {
  setActiveLetter,
  setWrongLanguage,
  setWrongWord,
  fillingWord,
  acceptWord,
  clearWord,
  nextWord,
  restart,
} = gridSlice.actions;

export default gridSlice.reducer;
