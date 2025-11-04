import { getResource } from '../../utils/http.util';
import { GET_TRANSACTIONS_URL } from '../../config/vars';

export const fetchUploadHistory = async () => {
  const result = await getResource(GET_TRANSACTIONS_URL);
  return (
    result?.response?.data?.map?.((item) => {
      const { date, type, id } = item;
      return [date, type, id];
    }) || []
  );
};