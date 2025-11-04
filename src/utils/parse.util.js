import CSV from 'papaparse';
import { getFileTemplate, fieldValidators } from './field-validators.util';
import { ALLOW_UNKNOWN_PARAMS } from '../config/vars';

export const parseJson = (string) => {
  try {
    return JSON.parse(string);
  } catch {
    return string;
  }
};

const isEmptyArray = (arr) => {
  return Array.isArray(arr) && arr.length === 0;
};

const isEmptyObject = (object) => {
  return object === null || (typeof object === 'object' && Object.keys(object).length === 0);
};

export const removeEmpty = (object, removeEmptyObject = false) => {
  if (Array.isArray(object)) {
    return object
      .map((item) => {
        return removeEmpty(item, removeEmptyObject);
      })
      .filter((item) => {
        return typeof item !== 'undefined' && !isEmptyArray(item) && !isEmptyObject(item);
      });
  }
  if (typeof object === 'object' && object !== null) {
    return Object.keys(object).reduce((acc, item) => {
      if (object[item] && typeof object[item] !== 'boolean' && typeof object[item] !== 'number') {
        acc[item] = removeEmpty(object[item], removeEmptyObject);
        if (removeEmptyObject && typeof acc[item] === 'object' && Object.keys(acc[item]).length === 0) {
          delete acc[item];
        }
      } else if (typeof object[item] === 'boolean' || typeof object[item] === 'number') {
        acc[item] = object[item];
      }
      return acc;
    }, {});
  }
  return object;
};

export const formatDate = (timestamp) => {
  const date = timestamp ? new Date(timestamp) : new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

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
            const { error } = fieldValidators?.[key]?.(result?.[key]) || { isValid: ALLOW_UNKNOWN_PARAMS, error: ALLOW_UNKNOWN_PARAMS ? false : `Invalid field ${key}` };
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
        console.error('Error parsing CSV:', error);
        reject(error);
      }
    });
  });
};

export const convertNumberToString = (num) => {
  if (num === null || num === undefined) return 'NA';
  if (num < 1000) return `$${Number(num).toFixed(2)}`;

  const units = [
    { value: 1e9, suffix: 'B' },
    { value: 1e6, suffix: 'M' },
    { value: 1e3, suffix: 'k' },
  ];

  for (let unit of units) {
    if (num >= unit.value) {
      const formatted = (num / unit.value).toFixed(2);
      // Remove trailing zeros (e.g., 1.00 -> 1)
      return `$${formatted.replace(/\.00$/, '').replace(/(\.\d)0$/, '$1')}${unit.suffix}`;
    }
  }
}