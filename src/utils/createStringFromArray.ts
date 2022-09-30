const createStringFromArray = (array: (string | number)[]) => {
  return array.reduce((acc, item) => {
    acc += item.toString();
    return acc;
  });
};

export default createStringFromArray;
