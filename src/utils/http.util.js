import { GENERIC_HEADERS } from "../config/vars";
import { showAPIResponseToastMessage } from "./toast-message.util";

const generateHeaders = (headers) => {
  return Object.keys(headers).reduce((acc, key) => {
    acc.append(key, headers[key]);
    return acc;
  }, new Headers());
};

const fetchResource = async (url, method, data, headers) => {
  const fetchHeaders = generateHeaders(headers);
  const urlResponse = await fetch(url, {
    method: method,
    headers: fetchHeaders,
    ...(data ? { body: JSON.stringify(data) } : {})
  });

  const parsed = await urlResponse.json();
  showAPIResponseToastMessage(parsed);
  return parsed;
};

export const getResource = async (url, headers = GENERIC_HEADERS) => {
  return fetchResource(url, 'GET', null, headers);
};

export const postResource = async (url, data, headers = GENERIC_HEADERS) => {
  return fetchResource(url, 'POST', data, headers);
};
