import { Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import css from './LoginForm.module.css';
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { selectAuthError } from '../../redux/auth/selectors';
import { apiLogin } from "../../redux/auth/operations";

const validationParams = Yup.object().shape({
    password: Yup.string()
      .min(8, "Too Short!")
      .max(50, "Too Long!")
        .required("Required"),
    email: Yup.string()
        .email('Enter a valid email!')
        .required('Email is required'),
    });

function LoginForm() {
    const dispatch = useDispatch();
    const error = useSelector(selectAuthError);

    const initialValues = {
        email: '',
        password: '',
    };

    const handleSubmit = (values, actions) => {
        dispatch(apiLogin(values));
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

                <button className={css.logInBtn} type="submit">
                    Log in
                </button>
                {error && <ErrorMessage />}
            </Form>
        </Formik>
    );

}
    
export default LoginForm;