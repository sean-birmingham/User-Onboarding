import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

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
      <Form>
        <label>
          Name
          <Field type='text' name='name' placeholder='Enter your name' />
          {touched.name && errors && <p>{errors.name}</p>}
        </label>
        <label>
          Email
          <Field type='text' name='email' placeholder='Enter your email' />
          {touched.email && errors && <p>{errors.email}</p>}
        </label>
        <label>
          Password
          <Field
            type='text'
            name='password'
            placeholder='Enter your password'
          />
          {touched.email && errors && <p>{errors.password}</p>}
        </label>
        <label>
          Terms of Service
          <Field type='checkbox' name='terms' checked={values.terms} />
        </label>
        <button type='submit'>Submit</button>
      </Form>
      {users.map(user => {
        return (
          <div key={user.id}>
            <h3>Name:</h3>
            <p>{user.name}</p>
            <h3>Email:</h3>
            <p>{user.email}</p>
          </div>
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
