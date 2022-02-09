import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import PropTypes from 'prop-types';
import {
  validateFirtsName,
  validateLastName,
  validateEmail,
} from '../validations/customerValidation';
import Loader from './loader';

const AddCustomer = ({
  customerDetails,
  showAddCustomerModal,
  setShowAddCustomerModal,
  addNewCustomer,
  onChangeCustomerFirstName,
  onChangeCustomerLastName,
  onChangeCustomerEmail,
  form,
  addLoading,
  setAllFieldsEmpty,
}) => {
  return (
    <Modal show={showAddCustomerModal} size='sm'>
      <Modal.Header className='text-primary'>
        <Modal.Title>Create customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form ref={form}>
          <div>
            <div className='form-group'>
              <label htmlFor='firstname'>First name</label>
              <Input
                type='text'
                className='form-control'
                name='customerfirstname'
                value={customerDetails.firstName}
                onChange={onChangeCustomerFirstName}
                validations={[validateFirtsName]}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='lastname'>Last name</label>
              <Input
                type='text'
                className='form-control'
                name='lastname'
                value={customerDetails.lastName}
                onChange={onChangeCustomerLastName}
                validations={[validateLastName]}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='email'>Email</label>
              <Input
                type='text'
                className='form-control'
                name='email'
                value={customerDetails.email}
                onChange={onChangeCustomerEmail}
                validations={[validateEmail]}
              />
            </div>
            <Modal.Footer>
              <div className='form-group'>
                {addLoading ? (
                  <Loader></Loader>
                ) : (
                  <button
                    className='btn btn-primary'
                    onClick={e => {
                      addNewCustomer();
                      e.preventDefault();
                    }}
                  >
                    Save
                  </button>
                )}
              </div>
              <div className='form-group'>
                <button
                  className='btn btn-info'
                  onClick={e => {
                    setShowAddCustomerModal(false);
                    setAllFieldsEmpty();
                    e.preventDefault();
                  }}
                >
                  Cancel
                </button>
              </div>
            </Modal.Footer>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

AddCustomer.propTypes = {
  customerDetails: PropTypes.object,
  showAddCustomerModal: PropTypes.bool,
  setShowAddCustomerModal: PropTypes.func,
  addNewCustomer: PropTypes.func,
  onChangeCustomerFirstName: PropTypes.func,
  onChangeCustomerLastName: PropTypes.func,
  onChangeCustomerEmail: PropTypes.func,
  form: PropTypes.elementType,
  addLoading: PropTypes.bool,
  setAllFieldsEmpty: PropTypes.func,
};

export default AddCustomer;
