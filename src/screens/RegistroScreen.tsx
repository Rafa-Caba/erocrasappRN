import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Image, TextInput, Text, TouchableOpacity, Alert, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';
import { useForm } from '../hooks/useForm';

import 'firebase/compat/database'
import { db } from '../utils/firebase';
import { ref, onValue } from "firebase/database";

interface Props extends StackScreenProps<any, any> {}

export const RegistroScreen = ({ navigation }: Props) => {

    const { signUp, errorMessage, removeError } = useContext(AuthContext);
    const { email, password, username, instrumento, photoURL, onChange } = useForm({
        email: '',
        password: '',
        username: '',
        instrumento: '',
        photoURL: '',
    });

    useEffect(() => {
        if ( errorMessage.length === 0 ) return;

        Alert.alert( 'Login Incorrecto', errorMessage, [{
            text: 'Ok',
            onPress: () => removeError,
        }]);
    }, [ errorMessage ])

    const onLogin = () => {
        signUp({ email, password, username, instrumento });
        Keyboard.dismiss();
    }

    useEffect(() => {
        // Obteniendo Foto de Perfil
        onValue(ref(db, 'images_start/EroCras4_kmaf0u'), (snapshot) => {
            const data = snapshot.val();
            
            onChange(data, 'photoURL');
        });
    }, [])

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
                        placeholder='Nombre de Usuario'
                        value={ username }
                        style={{ 
                            color: '#000', 
                            backgroundColor:'#d1b3ff', 
                            fontSize: 20, 
                            paddingLeft: 10,
                            marginBottom: 10,
                            width: 250,
                            alignSelf: 'center'
                        }} 
                        onChangeText={text => onChange(text, 'username')}
                    />

                    <TextInput
                        placeholder='Correo electronico'
                        value={email}
                        style={{ 
                            color: '#000', 
                            backgroundColor:'#d1b3ff', 
                            fontSize: 20, 
                            paddingLeft: 10,
                            marginBottom: 10,
                            width: 250,
                            alignSelf: 'center'
                        }} 
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onChangeText={text => onChange(text, 'email')}
                    />

                    <TextInput
                        placeholder='Contraseña'
                        value={password}
                        style={{ 
                            color: '#000', 
                            backgroundColor:'#d1b3ff', 
                            fontSize: 20, 
                            paddingLeft: 10,
                            marginBottom: 10,
                            width: 250,
                            alignSelf: 'center'
                        }} 
                        // keyboardType="visible-password"
                        onChangeText={text => onChange(text, 'password')}
                        secureTextEntry
                    />

                    <TextInput
                        placeholder='Instrumento'
                        value={ instrumento }
                        style={{ 
                            color: '#000', 
                            backgroundColor:'#d1b3ff', 
                            fontSize: 20, 
                            paddingLeft: 10,
                            marginBottom: 10,
                            width: 250,
                            alignSelf: 'center'
                        }} 
                        onChangeText={text => onChange(text, 'instrumento')}
                    />

                    <View style={{ height: 150, justifyContent: 'space-between' }}>
                        <TouchableOpacity 
                            style={ styles.btnLogin } 
                            activeOpacity={ 0.6 }
                            onPress={ onLogin }
                            >
                            <Text style={ styles.btnLoginText }>Registrarse</Text>
                        </TouchableOpacity>

                        {/* iniciar Sesion */}
                        <TouchableOpacity
                            onPress={ () => navigation.navigate('LoginScreen') }
                            activeOpacity={ 0.7 }
                            style={{ ...styles.btnLogin, width: 140, height: 40 }}
                        >
                            <Text style={{ ...styles.btnLoginText, fontWeight: '400' }}>Iniciar Sesion</Text>
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
        top: 50,
        marginHorizontal: 50,
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 30,
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



