import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-validation/build/form';
import PropTypes from 'prop-types';
import Loader from './loader';
import  Select  from 'react-select';
import { programs } from '../constants';

const AddBill=({
    showNewBillModal,
    setShowNewBillModal,
    addNewBill,
    updateLoading,
    form,
    onChangeNewBill
})=>{

    return(
    <Modal show={showNewBillModal} size='sm'>
        <Modal.Header className='text-primary'>
          <Modal.Title>Select washing programs</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form ref={form}>

                <Select
                defaultValue={"Programs"} 
                isMulti
                name="programs"
                className="basic-multi-select"
                classNamePrefix="select"
                options={programs}
                onChange={onChangeNewBill}
                isSearchable={true}
                ></Select>

                <Modal.Footer>
                <div className='form-group'>
                {updateLoading ? (
                  <Loader></Loader>
                ) : (
                  <button
                    className='btn btn-primary'
                    onClick={e => {
                      addNewBill();
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
                    setShowNewBillModal(false);
                    e.preventDefault();
                    
                  }}
                >
                  Cancel
                </button>
              </div> 
                </Modal.Footer>
                </Form>
        </Modal.Body>
    </Modal>
    );

}

AddBill.propTypes={
    customerDetails:PropTypes.object,
    showNewBillModal:PropTypes.bool,
    setShowNewBillModal: PropTypes.func,
    editNewCustomer:PropTypes.func,
    updateLoading:PropTypes.bool,
    form:PropTypes.object,
    onChangeNewBill:PropTypes.func

}


export default AddBill;