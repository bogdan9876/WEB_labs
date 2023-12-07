import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ErrorValid from '../ErrorValid/errorValid';
import './register.css';

const Register = () => {
  const navigate = useNavigate();

  const initialValues = {
    username: '',
    email: '',
    password: '',
    retypePassword: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required').min(10, 'Password must be at least 10 characters'),
    retypePassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password'),
  });

  const handleRegister = (values) => {
    localStorage.setItem('registeredUser', values.email);
    localStorage.setItem('registeredPassword', values.password);
    navigate('/home');
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
      >
        <Form className='register-container2'>
          <div className="field-container">
            <Field className="register-input" type="text" name="username" placeholder="Username" />
            <ErrorMessage name="username" component={ErrorValid} />
          </div>
          <div className="field-container">
            <Field className="register-input" type="text" name="email" placeholder="Email" />
            <ErrorMessage name="email" component={ErrorValid} />
          </div>
          <div className="field-container">
            <Field className="register-input" type="password" name="password" placeholder="Password" />
            <ErrorMessage name="password" component={ErrorValid} />
          </div>
          <div className="field-container">
            <Field className="register-input" type="password" name="retypePassword" placeholder="Retype Password" />
            <ErrorMessage name="retypePassword" component={ErrorValid} />
          </div>
          <button className="register-button" type="submit">Register</button>
        </Form>
      </Formik>
      <p className='register-text'>Already a member? <span onClick={() => navigate('/')}>Login</span></p>
    </div>
  );
};

export default Register;
