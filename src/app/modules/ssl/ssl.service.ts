import axios from 'axios';
import config from '../../../config';
import ApiError from '../../../errors/api.error';
import httpStatus from 'http-status';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const initPayment = async (payload: any) => {
  const data = {
    store_id: config.ssl.store_id,
    store_passwd: config.ssl.store_passwd,
    total_amount: payload.total_amount,
    currency: 'BDT',
    tran_id: payload.tran_id, // use unique tran_id for each api call
    success_url: 'http://localhost:3030/success',
    fail_url: 'http://localhost:3030/fail',
    cancel_url: 'http://localhost:3030/cancel',
    ipn_url: 'http://localhost:2000/test',
    product_name: 'course payment.',
    product_category: 'payment',
    product_profile: 'student',
    cus_name: payload.cus_name,
    cus_email: payload.cus_email,
    cus_add1: payload.cus_add1,
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: payload.cus_phone,
  };
  const response = await axios({
    method: 'post',
    url: config.ssl.url,
    data: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return response.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validate = async (data: any) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${config.ssl.url}?val_id=${data.val_id}&store_id=${config.ssl.store_id}&store_passwd=${config.ssl.store_passwd}&format=json`,
    });
    console.log(data.val_id);

    if (!response) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'payment validation failed');
    }

    return response.data;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'payment validation failed');
  }
};
export const SslService = {
  initPayment,
  validate,
};
