import { Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import css from './RegistrationForm.module.css';
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { selectAuthError } from '../../redux/auth/selectors';
import { apiRegister } from "../../redux/auth/operations";

const validationParams = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    password: Yup.string()
      .min(8, "Too Short!")
      .max(50, "Too Long!")
        .required("Required"),
    email: Yup.string()
        .email('Enter a valid email!')
        .required('Email is required'),
    });

function RegistrationForm() {
    const dispatch = useDispatch();
    const error = useSelector(selectAuthError);

    const initialValues = {
        name: '',
        email: '',
        password: '',
    };

    const handleSubmit = (values, actions) => {
        dispatch(apiRegister(values));
        actions.resetForm();
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationParams}
        >
            <Form className={css.formContainer}>
                <label className={css.container}>
                    <span className={css.label}>Name</span>
                    <Field
                        className={css.input}
                        type="text"
                        name="name"
                    />
                    <ErrorMessage
                        className={css.errorMessage}
                        name="name"
                        component="span"
                    />
                </label>

                <label className={css.container}>
                    <span className={css.label}>Email</span>
                    <Field
                        className={css.input}
                        type="text"
                        name="email"
                    />
                    <ErrorMessage
                        className={css.errorMessage}
                        name="email"
                        component="span"
                    />
                </label>

                <label className={css.container}>
                    <span className={css.label}>Password</span>
                    <Field
                        className={css.input}
                        type="password"
                        name="password"
                    />
                    <ErrorMessage
                        className={css.errorMessage}
                        name="password"
                        component="span"
                    />
                </label>

                <button className={css.signUpBtn} type="submit">
                    Sign Up
                </button>
                {error && <ErrorMessage />}
            </Form>
        </Formik>
    );

}

export default RegistrationForm;
    