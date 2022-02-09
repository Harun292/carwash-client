import React from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';
import Loader from '../components/loader';
import logo from '../assets/img/logo.png'

import 'react-toastify/dist/ReactToastify.css';
import {
  required,
  validEmail,
  vPassword,
} from '../validations/loginValidation';

const LoginForm = ({
  form,
  email,
  password,
  renderRedirect,
  onChangeEmail,
  onChangePassword,
  handleLogin,
  loading,
}) => {
  return (
    <div className='col-xl-12 text-center '>
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
      <div className='card card-container'>
        <img
          src={logo}
          alt='logo'
          className='logo-img-card'
        />

        <Form onSubmit={handleLogin} ref={form}>
          <div>
            <div className='form-group'>
              <label htmlFor='email'>Email</label>
              <Input
                type='text'
                className='form-control'
                name='email'
                value={email}
                onChange={onChangeEmail}
                validations={[required, validEmail]}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <Input
                type='password'
                className='form-control'
                name='password'
                value={password}
                onChange={onChangePassword}
                validations={[required, vPassword]}
              />
            </div>

            <div className='form-group'>
              {renderRedirect()}
              <button className='btn btn-primary btn-block'>Login</button>
              {loading && <Loader className='loader'></Loader>}
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  form: PropTypes.elementType,
  email: PropTypes.string,
  password: PropTypes.string,
  onChangeEmail: PropTypes.func,
  onChangePassword: PropTypes.func,
  renderRedirect: PropTypes.func,
  handleLogin: PropTypes.func,
  loading: PropTypes.bool,
};

export default LoginForm;
