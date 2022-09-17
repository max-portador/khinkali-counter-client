import React, {useEffect, useState} from 'react';
import * as yup from 'yup';
import {Button, Dialog, Grid, TextField, Typography} from "@mui/material";
import {useTypedSelectors} from "../../hooks/useTypedSelectors";
import {shallowEqual} from 'react-redux'
import {useActions} from "../../hooks/useActions";
import {useFormik} from "formik";

const validationSchema = yup.object({
    email: yup
        .string()
        .required('Email is required'),
    password: yup
        .string()
        .min(4, 'Password should be of minimum 4 characters length')
        .required('Password is required'),
});


const AuthDialog = () => {
    const {user, isAuth} = useTypedSelectors(state => state.auth, shallowEqual)
    const {login, logout} = useActions()
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if (isAuth) {
            setIsOpen(false)
        }
    }, [isAuth])

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values: Values, formikHelpers) => {
            const {email, password} = values
            login( {email, password})

            if (!isAuth) {
                formikHelpers.setSubmitting(false)
                formikHelpers.setErrors({password: 'wrong email ', email: 'or wrong password'})
            }
        },
    });

    return (
        <>
            <Dialog maxWidth='xl'
                    open={isOpen}
                    onClose={() => setIsOpen(false)}

            >
                <form onSubmit={formik.handleSubmit}>
                    <Grid container p={4} gap={1} width={400}
                          direction={'column'}
                          alignItems='center'
                    >
                        <Typography color={'primary'} variant='h5'>Вход </Typography>
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField
                            fullWidth
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                        <Button variant='contained' type="submit">
                            Отправить
                        </Button>
                    </Grid>
                </form>
            </Dialog>
                {
                    isAuth
                        ? <Grid container alignSelf='center' alignItems='center' justifyContent='end'>
                            <UserLabel user={user}/>
                        <AuthButton label={'Logout'} onClick={() => {
                            logout({user})
                        }}/>
                    </Grid>
                    : <AuthButton label={'Login'} onClick={() => { setIsOpen(true)}}/>
                }
        </>
    )
};

export default AuthDialog;

const AuthButton = (props) => {
    return <Button variant={'contained'}
                   {...props}
                   sx={{
                       backgroundColor: 'white',
                       color: '#333',
                       position: 'fixed',
                       right: 120,
                       width: 120,
                       '&:hover': {
                           backgroundColor: 'grey !important',
                           color: '#fff'
                       },
                   }}>
        {props.label}
    </Button>
}

function UserLabel({user}){
    return <Typography
        variant={'h6'}
        sx={{
            padding: '2px 10px',
            borderRadius: 4,
            backgroundColor: '#ccc',
            right: 280,
            position: 'fixed',
            textDecoration: 'hasDunderPages',
            color: '#000',
        }}>
        👤 {user.name}
    </Typography>
}


interface Values {
    email: string;
    password: string;
}