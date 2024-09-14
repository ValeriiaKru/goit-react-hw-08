import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./RegistrationForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthError } from "../../redux/auth/selectors";
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
                        <span className={css.label}>Name</span>
                        <Field
                            className={css.input}
                            type="text"
                            name="name"
                            placeholder='Jon Snow'
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
                            placeholder='your@email.com'
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
                            placeholder='eXamplepswrd016$'
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

                    <button className={css.signUpBtn} type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Signing Up..." : "Sign Up"}
                    </button>
                </Form>
            )}
        </Formik>
    );
}

export default RegistrationForm;
