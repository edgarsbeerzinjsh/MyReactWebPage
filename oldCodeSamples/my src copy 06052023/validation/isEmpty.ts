export const isEmpty = (value: string) => {
  return value === "";
};

export const errorMessageForIsEmpty = (value: string, field: string) => {
    if (isEmpty(value))
    {
      return `${field} is required!`
    };

    return "";
};