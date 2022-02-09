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
import Loader from '../components/loader';
import { required } from '../validations/customerValidation';

const EditCustomer = ({
  customerDetails,
  showEditCustomerModal,
  setShowEditCustomerModal,
  editNewCustomer,
  onChangeEditCustomerFirstName,
  onChangeEditCustomerLastName,
  onChangeEditCustomerEmail,
  form,
  updateLoading,
  setAllEditFieldsEmpty,
  setAllFieldsEmpty,
}) => {
  return (
    <Modal show={showEditCustomerModal} size='sm'>
      <Modal.Header className='text-primary'>
        <Modal.Title>Edit customer</Modal.Title>
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
                onChange={onChangeEditCustomerFirstName}
                validations={[required,validateFirtsName]}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='lastname'>Last name</label>
              <Input
                type='text'
                className='form-control'
                name='lastname'
                value={customerDetails.lastName}
                onChange={onChangeEditCustomerLastName}
                validations={[required,validateLastName]}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='email'>Email</label>
              <Input
                type='text'
                className='form-control'
                name='email'
                value={customerDetails.email}
                onChange={onChangeEditCustomerEmail}
                validations={[required,validateEmail]}
              />
            </div>
            <Modal.Footer>
              <div className='form-group'>
                {updateLoading ? (
                  <Loader></Loader>
                ) : (
                  <button
                    className='btn-primary'
                    onClick={async e => {
                      await editNewCustomer();
                      e.preventDefault();
                    }}
                  >
                    Edit
                  </button>
                )}
              </div>
              <div className='form-group'>
                <button
                  className='btn-info'
                  onClick={e => {
                    setShowEditCustomerModal(false);
                    setAllFieldsEmpty();
                    setAllEditFieldsEmpty();
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

EditCustomer.propTypes = {
  customerDetails: PropTypes.object,
  showEditCustomerModal: PropTypes.bool,
  setShowEditCustomerModal: PropTypes.func,
  editNewCustomer: PropTypes.func,
  onChangeEditCustomerFirstName: PropTypes.func,
  onChangeEditCustomerLastName: PropTypes.func,
  onChangeEditEmail: PropTypes.func,
  form: PropTypes.elementType,
  updateLoading: PropTypes.bool,
  setAllEditFieldsEmpty: PropTypes.func,
  setAllFieldsEmpty: PropTypes.func,
};

export default EditCustomer;
