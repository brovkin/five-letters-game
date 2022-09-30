import createStringFromArray from './createStringFromArray';

describe('Превращение массива элементов в строку', () => {
  test('Числа', () => {
    expect(createStringFromArray([1, 1, 1])).toEqual('111');
  });

  test('Строки', () => {
    expect(createStringFromArray(['3', '---', 'string'])).toEqual('3---string');
  });

  test('Числа и строки', () => {
    expect(createStringFromArray([3, 42, '-', 'string'])).toEqual('342-string');
  });
});
