import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, Image, TextInput, Text, TouchableOpacity, Alert, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import 'firebase/compat/database'
import { db } from '../utils/firebase';
import { ref, onValue } from "firebase/database";

import { AuthContext } from '../context/AuthContext';
import { useForm } from '../hooks/useForm';


interface Props extends StackScreenProps<any, any> {}

export const LoginScreen = ({ navigation }: Props) => {

    const { signIn, errorMessage, removeError } = useContext(AuthContext);
    const [ photoURL, setPhotoURL ] = useState('');

    const { email, password, onChange } = useForm({
        email: '',
        password: '',
    });

    useEffect(() => {
        if ( errorMessage.length === 0 ) return;

        Alert.alert( 'Login Incorrecto', errorMessage, [{
            text: 'Ok',
            onPress: () => removeError,
        }]);
    }, [ errorMessage ])

    useEffect(() => {
        // Obteniendo Foto de Perfil
        onValue(ref(db, 'images/EroCras4_kmaf0u'), (snapshot) => {
            const data = snapshot.val();
            
            setPhotoURL(data);
        });
    }, [])
    
    const onLogin = () => {
        signIn({ email, password });
        Keyboard.dismiss();
    }

    return (
        <SafeAreaView style={ styles.container }>
            <View>
                {  
                    photoURL && (
                        <Image 
                            source={{ uri: photoURL }} 
                            resizeMode="contain"
                            style={ styles.logo } 
                            borderRadius={ 30 }
                        />
                    )
                }
                
            </View>

            <KeyboardAvoidingView
                style={{ flex: 1,  }}
                behavior={ (Platform.OS) === 'ios' ? 'padding' : 'height' }
            >
                <View>
                    <TextInput
                        placeholder='Correo electronico'
                        value={ email }
                        style={{ 
                            color: '#000', 
                            backgroundColor:'#d1b3ff', 
                            fontSize: 20, 
                            paddingLeft: 10,
                            marginBottom: 15,
                            width: 250,
                            alignSelf: 'center'
                        }} 
                        keyboardType="email-address"
                        onChangeText={text => onChange(text, 'email')}
                        />
                    <TextInput
                        placeholder='Contraseña'
                        value={ password }
                        style={{ 
                            color: '#000', 
                            backgroundColor:'#d1b3ff', 
                            fontSize: 20, 
                            paddingLeft: 10,
                            width: 250,
                            alignSelf: 'center'
                        }} 
                        onChangeText={text => onChange(text, 'password')}
                        secureTextEntry
                        />

                    <View style={{ height: 200, justifyContent: 'space-between' }}>
                        <TouchableOpacity 
                            style={ styles.btnLogin } 
                            activeOpacity={ 0.6 }
                            onPress={ onLogin }
                            >
                            <Text style={ styles.btnLoginText }>Iniciar Sesión</Text>
                        </TouchableOpacity>
                    
                        {/* Crear nueva cuenta */}
                        <TouchableOpacity
                            activeOpacity={ 0.7 }
                            onPress={ () => navigation.navigate('RegistroScreen') }
                            style={{ ...styles.btnLogin, width: 140, height: 40 }}
                        >
                            <Text style={{ ...styles.btnLoginText, fontWeight: '400' }}>Registrarse</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: 70,
        marginHorizontal: 50,
    },
    logo: {
        width: 130,
        height: 130,
        marginBottom: 50,
      alignSelf: 'center',
    },
    btnLogin: {
      marginTop: 20,
      backgroundColor: '#8B4BFF',
      width: 170,
      height: 50,
      borderRadius: 15,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center'
    },
    btnLoginText: {
      fontSize: 20,
      color: '#fff',
      textAlign: 'center',
    },
  });