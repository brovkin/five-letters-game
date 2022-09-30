import sum from './sum';

describe('Сложение двух чисел', () => {
  test('Положительные', () => {
    expect(sum(1, 2)).toBe(3);
  });

  test('Отрицательные', () => {
    expect(sum(-1, -3)).toBe(-4);
  });

  test('Положительные и отрицательные', () => {
    expect(sum(-1, 10)).toBe(9);
  });
});
