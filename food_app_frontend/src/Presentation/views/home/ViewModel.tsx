import React, { useEffect, useState } from 'react'
import { LoginAuthUseCase } from '../../../Domain/useCases/auth/LoginAuth';
import { SaveUserLocalUseCase } from '../../../Domain/useCases/userLocal/SaveUserLocal';
import { GetUserLocalUseCase } from '../../../Domain/useCases/userLocal/GetUserLocal';
import { useUserLocal } from '../../hooks/useUserLocal';

const HomeViewModel = () => {
    const [errorMessage, seterrorMessage] = useState('');
    const [values, setValues] = useState({
        email:'',
        password: '',
    });

    const { user, getUserSession } = useUserLocal();
    console.log('USUARIO DE SESION : ' + JSON.stringify(user));
    


    const onChange = (property: string, value: any) => {
        setValues({ ...values, [property]: value });
    }
    
    const login = async () => {
        if (isValidForm()) {
            const response = await LoginAuthUseCase(values.email, values.password);
            console.log('RESPONSE: ' + JSON.stringify(response));
            if (!response.success) {
                seterrorMessage(response.message);    
            }
            else {
                await SaveUserLocalUseCase(response.data);
                getUserSession();
            }
        }
    }

    const isValidForm = (): boolean => {
        if (values.email === '') {
            seterrorMessage('Ingresa el correo electrónico.');
            return false;
        }

        if (values.password === '') {
            seterrorMessage('Ingresa la contraseña.');
            return false;
        }

        return true;
    }

    return {
        ...values,
        user,
        onChange,
        login,
        errorMessage
        }
    }

export default HomeViewModel

