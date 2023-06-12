import TextField from "@mui/material/TextField";
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import React from "react";
import { Link, useSubmit } from "react-router-dom";
import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "../../../../global/redux/hooks";
import validateLogin from "../../util/validateLogin";
import { setLoggedUser } from "../../redux/reducers/slices/userAuthSlice";
import UsernameNotFoundError from "../../errors/UsernameNotFoundError";
import IncorrectPasswordError from "../../errors/IncorrectPasswordError";

/**
 * Uses Formik and Yup to handle and validate form data
 * @returns a login form with a background
 */
export default function LoginForm() {

    const submit = useSubmit();
    const dispatch = useAppDispatch();

    const {common: locale, error} = useAppSelector(state => state.localization.data.auth);

    return (
        <div className='container d-flex flex-column mt-4'>
            <div className="m-auto rounded p-3 vy-secondary vy-lone-backdrop">
                <h3>{locale.login}</h3>
                <Formik
                    initialValues={{
                        username: '',
                        password: '',
                    }}
                    validationSchema={Yup.object({
                        username: Yup.string().required(error.required).min(3, error.usernameLength).max(16, error.usernameLength),
                        password: Yup.string().required(error.required).min(8, error.passwordLength).max(32, error.passwordLength),
                    })}
                    onSubmit={(values, action) => {  
                        // Once the user submits the form, validate the values with this function
                        validateLogin(values)
                        .then(() => {
                            // Update locally the logged username
                            dispatch(setLoggedUser(values.username));
                            // Let React Router take over. Ideally, would send the data to the server for authentication
                            submit(values, { method: 'POST' });
                        })
                        .catch((err) => {
                            // If there was an error, display the error in the appropriate input field
                            if (err instanceof UsernameNotFoundError) action.setFieldError('username', err.message);
                            else if (err instanceof IncorrectPasswordError) action.setFieldError('password', err.message);
                            else action.setFieldError('username', error.unkownError);
                            
                            action.setSubmitting(false);
                        });
                    }}
                >
                    {
                        formik => (
                            <>
                                <Form className="d-flex w-100 flex-column justify-content-center align-items-center mt-2 p-2 pb-2 rounded vy-on-surface-text">
                                    <TextField
                                        className='mb-4'
                                        fullWidth
                                        name='username'
                                        label={locale.username}
                                        value={formik.values.username}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.username && Boolean(formik.errors.username)}
                                        helperText={formik.touched.username && formik.errors.username}
                                    />
                                    <TextField
                                        className='mb-4'
                                        fullWidth
                                        name='password'
                                        label={locale.password}
                                        type='password'
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.password && Boolean(formik.errors.password)}
                                        helperText={formik.touched.password && formik.errors.password}
                                    />
                                    <Link
                                    className="my-2"
                                        to={'/register'}
                                    >
                                        {locale.register}
                                    </Link>
                                    <Button
                                        className='w-auto'
                                        variant='contained'
                                        color='primary'
                                        type='submit'
                                        disabled={formik.isSubmitting}
                                        >
                                        {locale.login}
                                    </Button>
                                </Form>
                            </>
                        )
                    }
                </Formik>
            </div>
        </div>
    );
}
