import CSV from 'papaparse';
import { getFileTemplate, fieldValidators } from './field-validators.util';

export const parseJson = (string) => {
  try {
    return JSON.parse(string);
  } catch {
    return string;
  }
};

export const parseCSVFile = (file) => {
  return new Promise((resolve, reject) => {
    CSV.parse(file, {
      header: true,
      complete: (results) => {
        // results.data will contain the parsed data as an array of objects
        // results.errors will contain any parsing errors
        // You can then set this data to your component's state

        // validate file format
        const fileTemplate = getFileTemplate(results.meta.fields);
        const customErrors = results.data.reduce((errorList, result, rowIndex) => {
          Object.keys(result).forEach((key) => {
            const { error } = fieldValidators?.[key]?.(result?.[key]) || { error: `Invalid field ${key}`};
            if (error) {
              errorList.push({ row: rowIndex, column: key, message: error });
            }
          });
          return errorList;
        }, []);

        results.errors.push(...customErrors);
        results.template = fileTemplate;
        resolve(results);
      },
      error: (error) => {
        console.error("Error parsing CSV:", error);
        reject(error);
      }
    });
  });
};