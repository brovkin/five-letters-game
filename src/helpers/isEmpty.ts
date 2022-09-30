const isEmpty = <T>(value: T): boolean => {
  if (typeof value === 'object') {
    for (const i in value) {
      if (value[i]) return false;
    }

    return true;
  }

  if (Array.isArray(value)) {
    return !value.length;
  }

  return true;
};

export default isEmpty;
