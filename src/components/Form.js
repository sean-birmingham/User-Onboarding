import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';

const SignUpForm = () => {
  return (
    <Form>
      <label>
        Name
        <Field type='text' name='name' placeholder='Enter your name' />
      </label>
      <label>
        Email
        <Field type='text' name='email' placeholder='Enter your email' />
      </label>
      <label>
        Password
        <Field type='text' name='email' placeholder='Enter your password' />
      </label>
      <label>
        Terms of Service
        <Field type='checkbox' name='terms of service' />
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
    name: Yup.string().required(),
    email: Yup.string().required(),
    password: Yup.string().required()
  })
})(SignUpForm);

export default FormikForm;
