import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from 'yup';
import css from './LoginForm.module.css';
import { useDispatch, useSelector } from "react-redux";
import { selectAuthError } from '../../redux/auth/selectors';
import { apiLogin } from '../../redux/auth/operations';

const validationParams = Yup.object().shape({
    password: Yup.string()
        .min(8, "Too Short!")
        .max(50, "Too Long!")
        .required("Password is required"),
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
        actions.setSubmitting(false);  
        actions.resetForm();
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationParams}
        >
            {({ isSubmitting }) => (
                <Form className={css.formContainer}>
          
                    <label className={css.container}>
                        <span className={css.label}>Email</span>
                        <Field
                            className={css.input}
                            type="text"
                            name="email"
                            placeholder='your@email.com'
                        />
                  
                        <ErrorMessage
                            className={css.errorMessage}
                            name="email"
                            component="span"
                            placeholder='eXamplepswrd016$'
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

                  
                    {error && (
                        <div className={css.generalError}>
                            Something went wrong. Please try again later!
                        </div>
                    )}

                    
                    <button className={css.logInBtn} type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Logging in..." : "Log in"}
                    </button>
                </Form>
            )}
        </Formik>
    );
}

export default LoginForm;
