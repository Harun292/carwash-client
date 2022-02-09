import React from 'react';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import Bill from './bill'

const ShowBills=({
    showBillsModal,
    setShowBillsModal,
    customerBills
})=>{

    return(
    <Modal show={showBillsModal} size='lg'>
        <Modal.Header className='text-primary'>
          <Modal.Title>Bills</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {customerBills["bills"].length === 0 && (
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>List empty</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Customer doesn have bills.</p>
          </Modal.Body>
        </Modal.Dialog>
      )}
      {customerBills["bills"].length != 0 && (
       <div className='table-wrapper-scroll-y my-custom-scrollbar'>
        <table className='table text-center table-dark Table '>
            <thead>
                <tr>
                    <th>
                    Programs
                    </th>
                    <th>
                        Price
                    </th>
                    <th>
                        Date
                    </th>
                </tr>
            </thead>
            <tbody>
              
                {customerBills["bills"].map(item=>(
                        <Bill
                            programs={item.programs}
                            price={item.price}
                            date={item.createdAt.split("T")[0]}
                        ></Bill>
                ))}
            </tbody>


        </table>
        </div>)}
                <Modal.Footer>
              <div className='form-group'>
                <button
                  className='btn btn-info'
                  onClick={e => {
                    setShowBillsModal(false);
                  }}
                >
                  Cancel
                </button>
              </div> 
                </Modal.Footer>
        </Modal.Body>
    </Modal>
    );

}

ShowBills.propTypes={
    showBillsModal:PropTypes.bool,
    setShowBillsModal:PropTypes.func,
    customerBills:PropTypes.object
}


export default ShowBills;