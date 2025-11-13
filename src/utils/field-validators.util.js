import { ALLOW_UNKNOWN_PARAMS, TEMPLATES } from "../config/vars";

export const getFileTemplate = (columns) => {
  const knownFields = Object.values(TEMPLATES).flatMap(item => item.FIELDS);
  const templateString = columns.filter(column => knownFields.includes(column)).sort().join('__');
  const templateType = Object.keys(TEMPLATES).find(templateName => {
    const templateSortedFields = TEMPLATES[templateName].FIELDS.sort().join('__');
    return ALLOW_UNKNOWN_PARAMS ? (templateSortedFields.includes(templateString) || templateString.includes(templateSortedFields)) : templateSortedFields === templateString;
  });

  return { name: templateType, isValid: !!(templateType) };
}

const genericStringValidator = (value) => {
  return { isValid: true, value: value };
};

const genericNumberValidator = (value) => {
  return { isValid: true, value: parseFloat(value) };
};

export const genericDateValidator = (value) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (regex.test(value) || value instanceof Date) {
    const [year, month, date] = value.split('-').map(item => parseInt(item));
    return { isValid: true, value: (new Date(year, month, date)).getTime() };
  }
  return { isValid: false, error: 'date must be a valid date (YYYY-MM-DD)' };
};

export const fieldValidators = Object.values(TEMPLATES)
  .flatMap(template =>
    template.FIELDS.map((item, index) => {
      return {
        fieldName: item,
        fieldType: template.TYPES[index]
      }
    })).reduce((acc, { fieldName, fieldType }) => {
      acc[fieldName] = fieldType === 'date' ? genericDateValidator : fieldType === 'number' ? genericNumberValidator : genericStringValidator
      return acc;
    }, {});
