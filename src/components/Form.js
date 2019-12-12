import React from 'react';
import { withFormik, Form, Field } from 'formik';

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
    return {};
  }
})(SignUpForm);

export default FormikForm;
