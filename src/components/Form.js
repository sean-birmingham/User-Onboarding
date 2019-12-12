import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';

const SignUpForm = ({ values, errors, touched }) => {
  //   console.log('errors', errors);
  //   console.log('touched', touched);
  return (
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
        <Field type='text' name='email' placeholder='Enter your password' />
        {touched.email && errors && <p>{errors.password}</p>}
      </label>
      <label>
        Terms of Service
        <Field type='checkbox' name='terms' />
      </label>
      <button type='submit'>Submit</button>
    </Form>
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
    password: Yup.string().required('Please enter a password'),
    terms: Yup.boolean()
  })
})(SignUpForm);

export default FormikForm;
