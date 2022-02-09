import axios from '../clients/axios';

import { API_URL } from '../config';
import { programs } from '../constants';
export const customers = () => {
  return axios.get(API_URL + '/customers').then(response => {
    return response.data.customers;
  });
};

export const deleteCustomer = id => {
  return axios.delete(API_URL + '/customers/' + id).then(response => {
    return response;
  });
};

export const editCustomer = (id, customer) => {
  return axios.patch(API_URL + '/customers/' + id, {
    customer,
  });
};
export const addCustomer = (email,firstName,lastName,visits) => {
  return axios
    .post(API_URL + '/customers', {
     email,
     firstName,
     lastName,
     visits
    })
    .then(response => {
      return response;
    });
};
export const addBill = (programs,price,id)=>{
  return axios
    .post(API_URL + '/bills', {
     programs,
     price,
     id
    })
    .then(response => {
      return response;
    });
}
