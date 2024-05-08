import dayjs from "dayjs";

export const dateValidation = (date: string) => {
  const enteredDate = dayjs(date);
  const currentDate = dayjs();

  if (currentDate.isBefore(enteredDate)) {
    return true;
  } else {
    return false;
  }
};
