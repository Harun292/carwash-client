import React, { useState, useEffect, useRef } from 'react';
import CustomerList from '../components/customerList';
import { notify } from '../util/notify';
import {
  customers,
  deleteCustomer,
  editCustomer,
  addCustomer,
  addBill
} from '../services/dataService';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { customerFieldsValidateOk } from '../validations/customerValidation';
import EditCustomer from '../components/editCustomer';
import AddCustomer from '../components/addCustomer';
import AddBill from '../components/addBill';
import ShowBills from '../components/showBills';
const Home = () => {
  const form = useRef();

  const [customersArray, setCustomersArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [customerId, setCustomerId] = useState();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [errorLoading, setErrorLoading] = useState(false);
  const [showEditCustomerModal, setShowEditCustomerModal] = useState(false);
  const [editedCustomerDetails, setEditedCustomerDetails] = useState({
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    visits: undefined,
  });
  const [showNewBillModal,setShowNewBillModal]=useState(false);
  const [updateLoading, setUpdateLoading] = useState();
  const [customerDetails, setCustomerDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    visits: '',
  });
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [sortVariations, setSortVariations] = useState([
    { sortBy: 'firstName', sortType: 'none' },
    { sortBy: 'lastName', sortType: 'none' }
  ]);
  const [customersArrayCopy, setCustomersArrayCopy] = useState([]);
  const [newBill,setNewBill]=useState([]);
  const [showBillsModal,setShowBillsModal]=useState(false);
  const triggerNewBill=id=>{
    setCustomerId(id);
    setShowNewBillModal(true);
  }
  const addNewCustomer = async () => {
    form.current.validateAll();
    if (customerFieldsValidateOk()) {
      setAddLoading(true);
      addCustomer(
        customerDetails.email,
        customerDetails.firstName,
        customerDetails.lastName,
        0
      )
        .then(response => {
          notify(response.data.message, 'success');
          getCustomers();
          setAddLoading(false);
          setShowAddCustomerModal(false);
          setAllFieldsEmpty();
        })
        .catch(error => {
          setAddLoading(false);
          setShowAddCustomerModal(false);
          notify(error.message, 'error');
          setAllFieldsEmpty();
        });
    }
  };

  const setAllFieldsEmpty = () => {
    setCustomerDetails({
    firstName: '',
    lastName: '',
    email: '',
    });
  };

  const setAllEditFieldsEmpty = () => {
    setEditedCustomerDetails({
        firstName: undefined,
        lastName: undefined,
        email: undefined,
    });
  };

  const onChangeCustomerFirstName = e => {
    const firstName = e.target.value;
    setCustomerDetails({ ...customerDetails, firstName });
  };
  const onChangeCustomerLastName = e => {
    const lastName = e.target.value;
    setCustomerDetails({ ...customerDetails, lastName });
  };
  const onChangeCustomerEmail = e => {
    const email = e.target.value;
    setCustomerDetails({ ...customerDetails, email });
  };

  const editNewCustomer = async () => {
    form.current.validateAll();
    if (customerFieldsValidateOk()) {
      if (Object.values(editedCustomerDetails).every(el => el === undefined)) {
        notify('Nothing to update', 'warning');
        setShowEditCustomerModal(false);
      } else {
        setUpdateLoading(true);
        editCustomer(customerId, editedCustomerDetails)
          .then(response => {
            notify(
              'Customer ' + response.data.customer.firstName + ' sucessfully updated',
              'success'
            );
            getCustomers();
            setUpdateLoading(false);
            setShowEditCustomerModal(false);
            setAllFieldsEmpty();
            setAllEditFieldsEmpty();
          })
          .catch(error => {
            setShowEditCustomerModal(false);
            setUpdateLoading(false);
            notify(error.message, 'error');
            setAllFieldsEmpty();
            setAllEditFieldsEmpty();
          });
      }
    }
  };

  const onChangeEditCustomerFirstName = e => {
    const firstName = e.target.value;
    setCustomerDetails({ ...customerDetails, firstName });
    if (firstName === '') {
      setEditedCustomerDetails({ ...editedCustomerDetails, undefined });
    } else {
      setEditedCustomerDetails({ ...editedCustomerDetails, firstName });
    }
  };
  const onChangeEditCustomerLastName = e => {
    const lastName = e.target.value;
    setCustomerDetails({ ...customerDetails, lastName });
    if (lastName === '') {
      setEditedCustomerDetails({ ...editedCustomerDetails, undefined });
    } else {
      setEditedCustomerDetails({ ...editedCustomerDetails, lastName });
    }
  };
  const onChangeEditCustomerEmail = e => {
    const email = e.target.value;
    setCustomerDetails({ ...customerDetails, email });
    if (email === '') {
      setEditedCustomerDetails({ ...editedCustomerDetails, undefined });
    } else {
      setEditedCustomerDetails({ ...editedCustomerDetails, email });
    }
  };
  const handleSearchChange = e => {
    let newCustomerList = [];
    if (e.target.value !== '') {
      newCustomerList = customersArrayCopy.filter(item => {
        const lcFN = item.firstName.toLowerCase();
        const lcLN = item.lastName.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lcFN.includes(filter)||lcLN.includes(filter);
      });
    } else {
      newCustomerList = customersArrayCopy;
    }
    setCustomersArray(newCustomerList);
  };

  const getCustomers = async () => {
    setLoading(true);
    try {
      const data = await customers();
      setCustomersArray(data);
      setLoading(false);
      setErrorLoading(false);
      setCustomersArrayCopy(data);
    } catch (error) {
      setErrorLoading(true);
      setLoading(false);
    }
  };

  const triggerCustomerEdit = id => {
    setCustomerId(id);
    setShowEditCustomerModal(true);
  };
  const setSortVariation = sortBy => {
    let variations = sortVariations;
    variations.forEach(variation => {
      if (variation.sortBy === sortBy) {
        if (variation.sortType === 'none') {
          variation.sortType = 'ascending';
        } else if (variation.sortType === 'ascending') {
          variation.sortType = 'descending';
        } else if (variation.sortType === 'descending') {
          variation.sortType = 'ascending';
        }
      } else {
        variation.sortType = 'none';
      }
    });
    setSortVariations(variations);
  };

  const sortCustomers = sortBy => {
    setSortVariation(sortBy);
    let variation = sortVariations.find(item => item.sortBy === sortBy);
    let sortedCustomers = [...customersArray];
    console.log(sortedCustomers)
    sortedCustomers.sort((a, b) => {
      let itemA, itemB;
        itemA = a[variation.sortBy].toLowerCase();
        itemB = b[variation.sortBy].toLowerCase(); 
      if (variation.sortType === 'ascending') {
        if (itemA < itemB) {
          return -1;
        }
        if (itemA > itemB) {
          return 1;
        }
        return 0;
      } else {
        if (itemA < itemB) {
          return 1;
        }
        if (itemA > itemB) {
          return -1;
        }
        return 0;
      }
    });
    setCustomersArray(sortedCustomers);
  };
 

  const triggerCustomerDelete = id => {
    setCustomerId(id);
    setShowDeletePopup(true);
  };

  const deleteCustomerById = async id => {
    const newList = customersArray.filter(item => item.id !== id);
    const newListCopy = customersArrayCopy.filter(item => item.id !== id);
    setDeleteLoading(true);
    deleteCustomer(id)
      .then(response => {
        notify(response.data, 'success');
        setDeleteLoading(false);
        setCustomersArray(newList);
        setCustomersArrayCopy(newListCopy);
        setShowDeletePopup(false);
      })
      .catch(error => {
        notify(error.message, 'error');
        setDeleteLoading(false);
        setShowDeletePopup(false);
      });
  };
  const addNewBill=async()=>{
    if(newBill.length===0){
      notify('Nothing to update', 'warning');
    }else{
      setUpdateLoading(true);
      let customer=customersArray.find(cust=>cust.id===customerId);
      let programs="",price=0;
      newBill.forEach(element => {
        programs+=element["value"]+" ";
        price+=element["price"];
      });
      customer.visits+=1;
      if(customer.visits%10===0){
        notify("Customer "+customer.firstName+'has a 10% discount!','success');
        price-=price*0.1;
        console.log(price);
      }
      await editCustomer(customerId,customer).then(getCustomers());
      addBill(programs,price,customerId)
      .then(response => {
        notify(response.data.message, 'success');
        setUpdateLoading(false);
        setShowNewBillModal(false);
        getCustomers();
      })
      .catch(error => {
        notify(error.message, 'error');
        setShowNewBillModal(false);
        setUpdateLoading(false);
      });

    }
    
  }
  const triggerOpenBills =(id)=>{
    setCustomerId(id);
    setShowBillsModal(true);
  }

  const onChangeNewBill = e =>{
    setNewBill(e);
  }

  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <div>

        {
          showBillsModal&&(
            <ShowBills
            showBillsModal={showBillsModal}
            setShowBillsModal={setShowBillsModal}
            customerBills={customersArray.find(cust=>cust.id===customerId)}
            ></ShowBills>
          )
        }
      {showNewBillModal&& (
        <AddBill
        showNewBillModal={showNewBillModal}
        setShowNewBillModal={setShowNewBillModal}
        addNewBill={addNewBill}
        updateLoading={updateLoading}
        form={form}
        onChangeNewBill={onChangeNewBill}
        ></AddBill>
      )
      }
      {showEditCustomerModal && (
        <EditCustomer
          customerDetails={customerDetails}
          showEditCustomerModal={showEditCustomerModal}
          setShowEditCustomerModal={setShowEditCustomerModal}
          editNewCustomer={editNewCustomer}
          updateLoading={updateLoading}
          form={form}
          onChangeEditCustomerFirstName={onChangeEditCustomerFirstName}
          onChangeEditCustomerLastName={onChangeEditCustomerLastName}
          onChangeEditCustomerEmail={onChangeEditCustomerEmail}
          setAllEditFieldsEmpty={setAllEditFieldsEmpty}
          setAllFieldsEmpty={setAllFieldsEmpty}
        ></EditCustomer>
      )}

      {showAddCustomerModal && (
        <AddCustomer
          customerDetails={customerDetails}
          showAddCustomerModal={showAddCustomerModal}
          setShowAddCustomerModal={setShowAddCustomerModal}
          addNewCustomer={addNewCustomer}
          onChangeCustomerFirstName={onChangeCustomerFirstName}
          onChangeCustomerLastName={onChangeCustomerLastName}
          onChangeCustomerEmail={onChangeCustomerEmail}
          form={form}
          addLoading={addLoading}
          setAllFieldsEmpty={setAllFieldsEmpty}
        ></AddCustomer>
      )}
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
      <CustomerList
        loading={loading}
        showDeletePopup={showDeletePopup}
        setShowDeletePopup={setShowDeletePopup}
        customerId={customerId}
        deleteLoading={deleteLoading}
        triggerCustomerDelete={triggerCustomerDelete}
        deleteCustomerById={deleteCustomerById}
        customersArray={customersArray}
        errorLoading={errorLoading}
        getCustomers={getCustomers}
        customerDetails={customerDetails}
        showAddCustomerModal={showAddCustomerModal}
        setShowAddCustomerModal={setShowAddCustomerModal}
        addNewCustomer={addNewCustomer}
        showEditCustomerModal={showEditCustomerModal}
        setShowEditCustomerModal={setShowEditCustomerModal}
        editNewCustomer={editNewCustomer}
        form={form}
        triggerCustomerEdit={triggerCustomerEdit}
        setCustomerDetails={setCustomerDetails}
        sortCustomers={sortCustomers}
        sortVariations={sortVariations}
        handleSearchChange={handleSearchChange}
        updateLoading={updateLoading}
        addLoading={addLoading}
        setAllFieldsEmpty={setAllFieldsEmpty}
        showNewBillModal={showNewBillModal}
        setShowNewBillModal={setShowNewBillModal}
        triggerNewBill={triggerNewBill}
        triggerOpenBills={triggerOpenBills}
      ></CustomerList>
    </div>
  );
};
Home.propTypes = {};

export default Home;
