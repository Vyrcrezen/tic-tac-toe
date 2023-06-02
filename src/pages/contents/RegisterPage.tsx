import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Formik, Form, FormikConsumer } from 'formik';
import React from 'react';
import { useSubmit } from 'react-router-dom';
import * as Yup from 'yup';
import validateRegister from '../../features/auth/util/validateRegister';
import UsernameAlreadyRegisteredError from '../../features/auth/errors/UsernameAlreadyRegisteredError';
import EmailAlreadyInUse from '../../features/auth/errors/EmailAlreadyInUse';
import registerNewUser from '../../features/auth/util/registerNewUser';
import { useAppSelector } from '../../global/redux/hooks';

export default function RegisterPage() {

    const submit = useSubmit();
    const {common: locale, error} = useAppSelector(state => state.localization.data.auth);

    return (
        <div className='container d-flex flex-column mt-4'>
            <div className="m-auto rounded p-3 vy-secondary vy-lone-backdrop">
                <h3>{locale.register}</h3>
                <Formik
                    initialValues={{
                        username: '',
                        email: '',
                        password: '',
                        rePassword: ''
                    }}
                    validationSchema={Yup.object({
                        username: Yup.string().required(error.required),
                        email: Yup.string().email(error.invalidEmail).required(error.required),
                        password: Yup.string().required(error.required),
                        rePassword: Yup.string().oneOf([Yup.ref('password'), undefined], error.passwordsMustMatch).required(error.required)
                    })}
                    onSubmit={(values, action) => {

                        validateRegister(values)
                        .then(() => registerNewUser(values))
                        .then(() => submit(values, { method: 'POST' }))
                        .catch((err) => {
                            if (err instanceof UsernameAlreadyRegisteredError) action.setFieldError('username', err.message);
                            else if (err instanceof EmailAlreadyInUse) action.setFieldError('email', err.message);
                            else action.setFieldError('username', error.unkownError);
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
                                        name='email'
                                        label={locale.email}
                                        type='email'
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}
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
                                    <TextField
                                        className='mb-4'
                                        fullWidth
                                        name='rePassword'
                                        label={locale.rePassword}
                                        type='password'
                                        value={formik.values.rePassword}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.rePassword && Boolean(formik.errors.rePassword)}
                                        helperText={formik.touched.rePassword && formik.errors.rePassword}
                                    />
                                    <Button
                                        className='w-auto'
                                        variant='contained'
                                        color='primary'
                                        type='submit'
                                        disabled={formik.isSubmitting}
                                        >
                                        {locale.register}
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