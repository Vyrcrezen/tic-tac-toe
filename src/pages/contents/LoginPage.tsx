import TextField from "@mui/material/TextField";
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import React from "react";
import { useSubmit } from "react-router-dom";
import Button from "@mui/material/Button";
import { useAppDispatch } from "../../global/redux/hooks";
import { setLoggedUser } from "../../features/auth/redux/reducers/slices/userAuthSlice";
import validateLogin from "../../features/auth/util/validateLogin";
import UsernameNotFoundError from "../../features/auth/errors/UsernameNotFoundError";
import IncorrectPasswordError from "../../features/auth/errors/IncorrectPasswordError";

export default function LoginPage() {

    const submit = useSubmit();
    const dispatch = useAppDispatch();

    return (
        <div className='container d-flex flex-column mt-4'>
            <div className="m-auto rounded p-3 vy-secondary vy-lone-backdrop">
                <h3>Login</h3>
                <Formik
                    initialValues={{
                        username: '',
                        password: '',
                    }}
                    validationSchema={Yup.object({
                        username: Yup.string().required('Required'),
                        password: Yup.string().required('Required'),
                    })}
                    onSubmit={(values, action) => {                   
                        validateLogin(values)
                        .then(() => {
                            dispatch(setLoggedUser(values.username));
                            submit(values, { method: 'POST' });
                        })
                        .catch((err) => {
                            if (err instanceof UsernameNotFoundError) action.setFieldError('username', err.message);
                            else if (err instanceof IncorrectPasswordError) action.setFieldError('password', err.message);
                            else action.setFieldError('username', "Something went wrong.");
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
                                        label='Username'
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
                                        label='Password'
                                        type='password'
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.password && Boolean(formik.errors.password)}
                                        helperText={formik.touched.password && formik.errors.password}
                                    />
                                    <Button
                                        className='w-auto'
                                        variant='contained'
                                        color='primary'
                                        type='submit'
                                        >
                                        Login
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