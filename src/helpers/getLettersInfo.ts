import { LetterOrder, LetterOtherOrder } from '@features/gridSlice';
import isEmpty from '@helpers/isEmpty';

export const getLettersInfo = (searchWord: string, letters: string[]) => {
  const splitSearchWord = searchWord.split('');

  const lettersArray: LetterOrder[] = [];

  // первая итерация на правильные буквы в правильном порядке

  const restSearchLetters: LetterOrder[] = [];
  const wrongLetters: LetterOrder[] = [];

  splitSearchWord.forEach((searchWordLetter, index) => {
    let fillWord = {};
    if (searchWordLetter === letters[index]) {
      fillWord = {
        number: index + 1,
        letter: searchWordLetter,
        isRight: true,
      };
    } else {
      restSearchLetters.push({
        number: index + 1,
        letter: searchWordLetter,
      });
      wrongLetters.push({
        number: index + 1,
        letter: letters[index],
        ...(!splitSearchWord.includes(letters[index]) && { isMiss: true }), // добавляем совсем не правильные буквы
      });
    }

    if (!isEmpty(fillWord)) {
      lettersArray.push(fillWord as LetterOrder);
    }
  });

  // вторая итерация на правильные буквы но в неправильном порядке

  wrongLetters.forEach((wrongObj: LetterOtherOrder) => {
    let fillWord = {};

    const { number: wrongNumber, letter: wrongLetter } = wrongObj;

    restSearchLetters.forEach((obj: LetterOrder) => {
      const { letter } = obj;

      if (letter === wrongLetter) {
        fillWord = {
          number: wrongNumber,
          letter,
          isOtherOrder: true,
        };
      }

      if (wrongObj.isMiss) {
        fillWord = {
          number: wrongNumber,
          letter: wrongLetter,
          isMiss: true,
        };
      }
    });

    lettersArray.push(fillWord as LetterOrder);
  });

  return lettersArray;
};
