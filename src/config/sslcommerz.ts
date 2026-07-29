// eslint-disable-next-line @typescript-eslint/no-var-requires
const SSLCommerzPayment = require('sslcommerz-lts');

const store_id = process.env.SSLCOMMERZ_STORE_ID as string;
const store_passwd = process.env.SSLCOMMERZ_STORE_PASSWORD as string;
const is_live = process.env.SSLCOMMERZ_IS_LIVE === 'true';

export const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);