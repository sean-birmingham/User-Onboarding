import React from "react";
import { withFormik, Form, Field } from "formik";

const SignUpForm = () => {
    return (
        <Form>
        </Form>
    )
}

const FormikForm = withFormik({
    mapPropsToValues(props) {
        return {

        }
    }
})(SignUpForm);

export default FormikForm;