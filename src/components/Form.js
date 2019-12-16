import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import styled from 'styled-components';

const Submit = styled.button`
  background: #a7333f;
  color: #fff;
  padding: 10px 20px;
  border: none;
  font-size: 16px;
`;

const UserCard = styled.div`
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.12),
    0 2px 5px 1px rgba(0, 0, 0, 0.24);
  background: #525252;
  width: 500px;
  margin: 10px auto;
  padding: 10px 0;
`;

const SignUpForm = ({ values, errors, touched, status }) => {
  //   console.log('errors', errors);
  //   console.log('touched', touched);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log('status has changed', status);
    status && setUsers(users => [...users, status]);
  }, [status]);

  return (
    <div>
      <Form className='signup-container'>
        <h2>Sign Up</h2>
        <label>
          Name
          <br />
          <Field
            className='input'
            type='text'
            name='name'
            placeholder='Enter your name'
          />
          {touched.name && errors && <p>{errors.name}</p>}
        </label>
        <label>
          Email
          <br />
          <Field
            className='input'
            type='text'
            name='email'
            placeholder='Enter your email'
          />
          {touched.email && errors && <p>{errors.email}</p>}
        </label>
        <label>
          Password
          <br />
          <Field
            className='input'
            type='text'
            name='password'
            placeholder='Enter your password'
          />
          {touched.password && errors && <p>{errors.password}</p>}
        </label>
        <label className='checkbox-container'>
          Terms of Service
          <Field
            className='checkbox'
            type='checkbox'
            name='terms'
            checked={values.terms}
          />
        </label>
        <Submit type='submit'>Submit</Submit>
      </Form>
      {users.map(user => {
        return (
          <UserCard key={user.id}>
            <h3>Name:</h3>
            <p>{user.name}</p>
            <h3>Email:</h3>
            <p>{user.email}</p>
          </UserCard>
        );
      })}
    </div>
  );
};

const FormikForm = withFormik({
  mapPropsToValues(props) {
    return {
      name: props.name || '',
      email: props.email || '',
      password: props.password || '',
      terms: props.terms || false
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required('Please enter your name'),
    email: Yup.string().required('Please enter your email'),
    password: Yup.string()
      .min(6)
      .required('Please enter a password'),
    terms: Yup.boolean()
  }),
  handleSubmit(values, { setStatus, resetForm }) {
    console.log('submitting', values);
    axios
      .post('https://reqres.in/api/users', values)
      .then(res => {
        console.log('success', res);
        setStatus(res.data);
        resetForm();
      })
      .catch(err => console.log(err.response));
  }
})(SignUpForm);

export default FormikForm;
