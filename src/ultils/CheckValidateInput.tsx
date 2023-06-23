export const checkValidatePhone = (phone: string, allowEmpty = false) => {
  if (phone === '' && !allowEmpty) {
    return { message: 'This is required.' };
  }
  if (phone && (!Number(phone) || phone.length < 9 || phone.length > 11)) {
    return { message: 'Incorrect phone number' };
  }
  return null;
};

export const checkValidateEmail = (email: string, allowEmpty = false) => {
  if (email === '' && !allowEmpty) {
    return { message: 'This is required.' };
  }
  if (
    email &&
    !email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    )
  ) {
    return { message: 'Invalid email address' };
  }
  return null;
};

export const checkValidatePassword = (password: string, allowEmpty = false) => {
  if (password === '' && !allowEmpty) {
    return { message: 'This is required.' };
  }
  return null;
};

export const checkValidateRetypePassword = (
  password: string,
  retypePassword: string,
  allowEmpty = false,
) => {
  if (retypePassword === '' && !allowEmpty) {
    return { message: 'This is required.' };
  }

  if (password !== retypePassword) {
    return { message: 'Password & Confirm Password do not match' };
  }
  return null;
};

export const checkValidateStringField = (
  fieldValue: string,
  allowEmpty = false,
) => {
  if (fieldValue === '' && !allowEmpty) {
    return { message: 'This is required.' };
  }
  return null;
};
