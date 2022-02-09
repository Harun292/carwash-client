import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faReceipt } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { Tooltip } from '@material-ui/core';
const Customer = ({
  id,
  firstName,
  lastName,
  email,
  visits,
  triggerCustomerDelete,
  triggerCustomerEdit,
  setCustomerDetails,
  triggerNewBill,
  triggerOpenBills,
}) => {
  return (
    <Tooltip title="Click to show bills!" placement="left">
    <tr>
      <td className='column1 pointer' onClick={()=>{triggerOpenBills(id)}}>{firstName}</td>
      <td className='column2 pointer' onClick={()=>{triggerOpenBills(id)}}>{lastName}</td>
      <td className='column3 pointer' onClick={()=>{triggerOpenBills(id)}}>{email}</td>
      <td className='column4 pointer' onClick={()=>{triggerOpenBills(id)}}>{visits}</td>
      <td style={{ width: '12%' }}>
        <FontAwesomeIcon
          icon={faEdit}
          onClick={() => {
            setCustomerDetails({
              firstName: firstName,
              lastName: lastName,
              email: email,
              visits: visits,
            });
            triggerCustomerEdit(id);
          }}
          style={{ cursor: 'pointer' }}
          className='mr-4'
        />

        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => {
            triggerCustomerDelete(id);
          }}
          style={{ cursor: 'pointer' }}
          className='mr-4'
        />
        <FontAwesomeIcon
          icon={faReceipt}
          onClick={() => {
            triggerNewBill(id);
          }}
          style={{ cursor: 'pointer' }}
          className='mr-4'
        />
      </td>
    </tr>
    </Tooltip>
  );
};

Customer.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  visits:PropTypes.number,
  id: PropTypes.number,
  triggerExpenseDelete: PropTypes.func,
  triggerExpenseEdit: PropTypes.func,
  setExpenseDetails: PropTypes.func,
  categoryId: PropTypes.number,
  triggerNewBill:PropTypes.func,
  triggerOpenBills: PropTypes.func
};

export default Customer;
