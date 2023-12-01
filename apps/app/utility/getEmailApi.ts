export const getEmailApi = (email: string) => {
  const RESEND_DEV_KEYS = JSON.parse(process.env.RESEND_DEV_KEYS) || [];
  //   console.log('RESEND_DEV_KEYS', RESEND_DEV_KEYS);
  //   console.log('typeof RESEND_DEV_KEYS', typeof RESEND_DEV_KEYS);
  //   console.log('index test for array', RESEND_DEV_KEYS[0]);
  //   console.log('index test for email inside array', RESEND_DEV_KEYS[0][0]);
  //   console.log('index test for api inside array', RESEND_DEV_KEYS[0][1]);

  const emails = RESEND_DEV_KEYS.map((item) => item[0]);
  if (emails.includes(email)) {
    return RESEND_DEV_KEYS[emails.indexOf(email)][1];
  }
  return process.env.RESEND_API_KEY;
};
