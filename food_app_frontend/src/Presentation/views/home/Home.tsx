import React, { useState, useEffect } from 'react'
import { Image, Text, TextInput, View, StyleSheet, TouchableOpacity, ToastAndroid, Alert } from 'react-native';
import { RoundedButton } from '../../components/RoundedButton';
import { useNavigation } from '@react-navigation/native';
import { RegisterScreen } from '../Register/Register';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App';
import useViewModel from './ViewModel';
import styles from './Styles';
import { CustomTextInput } from '../../components/CustomTextInput';

interface Props extends StackScreenProps<RootStackParamList, 'HomeScreen'>{};

export const HomeScreen = ({navigation, route}: Props) => {

    const { email, password, errorMessage, onChange, login, user } = useViewModel();

    useEffect(() => {
        if (errorMessage !== '') {
            Alert.alert(errorMessage);
        }
    }, [errorMessage])

    useEffect(() => {

        if (user?.id !== null && user?.id !== undefined) {
            navigation.replace('ProfileInfoScreen');
        }
    }, [user])
    
    

    return (
    <View style={styles.container}>
        
        <Image // Background Image
        source={ require('../../../../assets/chef.jpg') }
        style={ styles.imageBackground } 
        />

        <View style= { styles.logoContainer }>  
        
        <Image
            source= { require('../../../../assets/logo.png') }
            style= { styles.logoImage }
        />

        <Text style= { styles.logoText}>FOOD APP</Text>  

        </View>

        <View style={ styles.form } >

        <Text style= { styles.formText }>INGRESAR</Text>

        <CustomTextInput
            image={ require('../../../../assets/email.png') }
            placeholder='Correo electrónico'
            keyboardType='email-address'
            property='email'
            onChangeText={ onChange }
            value={ email }

        />

<CustomTextInput
            image={ require('../../../../assets/password.png') }
            placeholder='Contraseña'
            keyboardType='default'
            property='password'
            onChangeText={ onChange }
            value={ password }
            secureTextEntry={ true }

        />

        <View style= {{ marginTop: 30 }}>

            <RoundedButton text='ENTRAR' onPress= { () => { login()} }/>

        </View>

        <View style= { styles.formRegister }>
            <Text>No tienes cuenta?</Text>

            <TouchableOpacity onPress={ () => navigation.navigate('RegisterScreen') }>
            <Text style= { styles.formRegisterText }>Registrate</Text>
            </TouchableOpacity>

        </View>

        </View>

    </View>
      );
}