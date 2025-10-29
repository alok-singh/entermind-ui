import { CLIENT_ID } from "../config/vars";
import { fieldValidators } from "./field-validators.util";

export const createTemplateRequestBody = (data) => {
  const { rows, columns } = data;
  const requestDataList = rows.reduce((acc, row) => {
    const arrayElement = columns.reduce((cellAcc, key, index) => {
      const { value } = fieldValidators[key](row[index]) || {};
      if (value !== "") {
        cellAcc[key] = value;
      }
      return cellAcc;
    }, {});
    acc.push(arrayElement);
    return acc;
  }, []);
  return {
    client: CLIENT_ID,
    data: requestDataList
  }
};