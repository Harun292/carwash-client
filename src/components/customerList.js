import React from 'react';
import '../assets/scss/customerList.scss';
import Customer from '../components/customer';
import Loader from './loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tooltip from '@material-ui/core/Tooltip';
import {
  faCaretDown,
  faCaretUp,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

const CustomerList = ({
  loading,
  showDeletePopup,
  setShowDeletePopup,
  customerId,
  deleteLoading,
  triggerCustomerDelete,
  deleteCustomerById,
  customersArray,
  errorLoading,
  getCustomers,
  triggerCustomerEdit,
  setCustomerDetails,
  setShowAddCustomerModal,
  sortCustomers,
  sortVariations,
  handleSearchChange,
  triggerNewBill,
  triggerOpenBills
}) => {
  if (loading) {
    return <Loader className='loader'></Loader>;
  }
  if (errorLoading) {
    return (
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Error loading customers. Please try again.</p>
        </Modal.Body>

        <Modal.Footer>
          <button
            className='btn-primary'
            onClick={() => {
              getCustomers();
            }}
          >
            Try again
          </button>
        </Modal.Footer>
      </Modal.Dialog>
    );
  }
  return (
    <div>
      <ToastContainer
        position='bottom-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
      <Modal show={showDeletePopup}>
        <Modal.Header>
          <Modal.Title>Delete customer</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Are you sure you want to delete this customer?</p>
        </Modal.Body>

        <Modal.Footer>
          {deleteLoading ? (
            <Loader></Loader>
          ) : (
            <button
              className='btn-danger'
              onClick={async () => {
                await deleteCustomerById(customerId);
              }}
            >
              Delete
            </button>
          )}
          <button
            className='btn-primary'
            onClick={() => {
              setShowDeletePopup(false);
            }}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
      <table className='table text-center table-striped table-hover table-dark Table'>
        <thead className='thead-light'>
          <tr>
            <th colSpan='1'>Customers</th>
            <th colSpan='3'>
              <input
                placeholder='Search..'
                className='pl-1'
                onChange={handleSearchChange}
              ></input>
            </th>
            <th colSpan='1'>
              <Tooltip title='Create Customer' placement='bottom' arrow>
                <div
                  onClick={() => {
                    setShowAddCustomerModal(true);
                  }}
                  style={{ cursor: 'pointer' }}
                  className='rounded p-1 btn-secondary'
                >
                  <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                </div>
              </Tooltip>
            </th>
          </tr>
          <tr className='hover'>
            <th
              scope='col'
              onClick={() => {
                sortCustomers('firstName');
              }}
              style={{ cursor: 'pointer' }}
            >
              <Tooltip title='Click to sort' placement='bot'>
                <div>
                  First name{' '}
                  {sortVariations[0].sortType === 'ascending' && (
                    <FontAwesomeIcon icon={faCaretDown} />
                  )}
                  {sortVariations[0].sortType === 'descending' && (
                    <FontAwesomeIcon icon={faCaretUp} />
                  )}
                </div>
              </Tooltip>
            </th>
            <th
              scope='col'
              onClick={() => {
                sortCustomers('lastName');
              }}
              style={{ cursor: 'pointer' }} 
            >
                <Tooltip title='Click to sort' placement='bot'>
                <div>
                  Last name{' '}
                  {sortVariations[1].sortType === 'ascending' && (
                    <FontAwesomeIcon icon={faCaretDown} />
                  )}
                  {sortVariations[1].sortType === 'descending' && (
                    <FontAwesomeIcon icon={faCaretUp} />
                  )}
                </div>
              </Tooltip>
            </th>
            <th>Email</th>
            <th>Visits</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {customersArray.map(item => (
            <Customer
              key={item.id}
              id={item.id}
              firstName={item.firstName}
              lastName={item.lastName}
              email={item.email}
              visits={item.visits}
              triggerCustomerDelete={triggerCustomerDelete}
              triggerCustomerEdit={triggerCustomerEdit}
              setCustomerDetails={setCustomerDetails}
              triggerNewBill={triggerNewBill}
              triggerOpenBills={triggerOpenBills}
            ></Customer>
          ))}
        </tbody>
      </table>
      {customersArray.length === 0 && (
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>List empty</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>You have no customers.</p>
          </Modal.Body>
        </Modal.Dialog>
      )}
    </div>
  );
};

CustomerList.propTypes = {
  loading: PropTypes.bool,
  showDeletePopup: PropTypes.bool,
  setShowDeletePopup: PropTypes.func,
  customerId: PropTypes.number,
  deleteLoading: PropTypes.bool,
  triggerCustomerDelete: PropTypes.func,
  deleteCustomerById: PropTypes.func,
  customersArray: PropTypes.array,
  getCustomers: PropTypes.func,
  errorLoading: PropTypes.bool,
  triggerCustomerEdit: PropTypes.func,
  setCustomerDetails: PropTypes.func,
  sortCustomers: PropTypes.func,
  sortVariations: PropTypes.array,
  handleSearchChange: PropTypes.func,
  setShowAddCustomerModal: PropTypes.func,
  setShowNewBillModal: PropTypes.func,
  triggerNewBill:PropTypes.func,
  triggerOpenBills:PropTypes.func
};
export default CustomerList;
