import React from 'react';
import validator from 'validator';
let firstNameOk = false, lastNameOk = false, emailOk=false;

export const required = value => {
    if (!value) {
      return (
        <div className='alert alert-danger' role='alert'>
          This field is required!
        </div>
      );
    }
  };

export const validateFirtsName = value => {
  if (value.length < 1 || value.length > 50) {
    firstNameOk = false;
    return (
      <div className='alert alert-danger' role='alert'>
        Name must be between 1 and 50 characters!
      </div>
    );
  } else {
    firstNameOk = true;
  }
};
export const validateLastName = value => {
    if (value.length < 1 || value.length > 50) {
      lastNameOk = false;
      return (
        <div className='alert alert-danger' role='alert'>
          Lastname must be between 1 and 50 characters!
        </div>
      );
    } else {
      lastNameOk = true;
    }
  };
export const validateEmail = value => {
  if (validator.isEmail(value)) {
    emailOk = true;
    
  } else {
    emailOk = false;
    return (
        <div className='alert alert-danger' role='alert'>
            Enter valid email!
        </div>
      );
    
  }
};

export const customerFieldsValidateOk = () => {
  return firstNameOk && lastNameOk&& emailOk;
};
