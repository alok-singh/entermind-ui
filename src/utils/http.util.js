import { GENERIC_HEADERS } from "../config/vars";
import { showAPIResponseToastMessage } from "./toast-message.util";

const generateHeaders = (headers) => {
  return Object.keys(headers).reduce((acc, key) => {
    acc.append(key, headers[key]);
    return acc;
  }, new Headers());
};

const fetchResource = async (url, method, data, headers) => {
  try {
    const fetchHeaders = generateHeaders(headers);
    const urlResponse = await fetch(url, {
      method: method,
      headers: fetchHeaders,
      ...(data ? { body: JSON.stringify(data) } : {})
    });

    const result = await urlResponse.json();
    showAPIResponseToastMessage(result);
    return result;
  } catch (error) {
    const result = {
      response: {
        errors: [{
          errorTitle: error.message,
          errorDescription: error.toString()
        }]
      }
    }
    showAPIResponseToastMessage(result);
    return result;
  }
};

export const uploadPdf = async (url, files, fileType) => {
  try {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`file-${index}`, file);
    })

    const response = await fetch(`${url}&fileType=${fileType}`, {
      method: "POST",
      body: formData
    });

    const result = await response.json();
    showAPIResponseToastMessage(result);
    return result;
  } catch (error) {
    const result = {
      response: {
        errors: [{
          errorTitle: error.message,
          errorDescription: error.toString()
        }]
      }
    }
    showAPIResponseToastMessage(result);
    return result;
  }
};


export const getResource = async (url, headers = GENERIC_HEADERS) => {
  return fetchResource(url, 'GET', null, headers);
};

export const postResource = async (url, data, headers = GENERIC_HEADERS) => {
  return fetchResource(url, 'POST', data, headers);
};
