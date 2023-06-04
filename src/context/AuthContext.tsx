import React, { createContext, useEffect, useReducer, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    updateProfile, signOut, onAuthStateChanged 
} from "firebase/auth";

import 'firebase/compat/database'
import { auth, db } from '../utils/firebase';
import { ref, set } from "firebase/database";

import { AuthState, authReducer } from './authReducer';
import { LoginData, RegisterData, Usuario } from '../interfaces/appInterfaces';

type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    signUp: ({ username, email, password, instrumento }: RegisterData) => void; 
    signIn: ({ email, password }: LoginData) => void; 
    logOut: () => void; 
    removeError: () => void;
}

// Valor inicial del State global
const authInitialState: AuthState = {
    status: 'checking',
    token: null,
    user: null,
    errorMessage: '',
}

export const AuthContext = createContext({} as AuthContextProps);


export const AuthProvider = ({ children }: any) => {

    const [ state, dispatch ] = useReducer( authReducer, authInitialState );

    // Verificacion si hay token y si es valido
    const checkToken = async () => {

        const token = await AsyncStorage.getItem( 'token' );

        if ( !token ) return dispatch({ type: 'notAuthenticated' });

        onAuthStateChanged( auth, async (user) => {
            if (user) {
                dispatch({
                    type: 'signUp',
                    payload: {
                        token: token,
                        user
                    }
                });
                
                // Token se actualiza despues del chequeo.
                await AsyncStorage.setItem( 'token', token );
            } else {
                dispatch({ type: 'notAuthenticated' });
            }
        })
        
        // token y usuario se actulizan
        dispatch({
            type: 'signUp',
            payload: {
                token: token,
                user: auth.currentUser!
            }
        });
    }

    const signIn = async ({ email, password }: LoginData ) => {
        try {
            
            const userFB = (await signInWithEmailAndPassword(auth, email, password)).user;

            dispatch({
                type: 'signUp',
                payload: {
                    token: userFB.uid,
                    user: userFB,
                }
            });

            await AsyncStorage.setItem( 'token', userFB.uid );

        } catch (error: any) {
            dispatch({
                type: 'addError',
                payload: 'Revise la informacion'
            })
        }
    };


    const signUp = async ({ email, password, username, instrumento = 'Voz' }: RegisterData) => {

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            const token = userCredential.user.uid;

            const photoURL = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';
            // Actualizamos el DisplayName e imagen de perfil del usuario
            await updateProfile( userCredential.user, { 
                displayName: username.replace(/ /g, '_'),
                photoURL,
            })

            // Guardamos el default imagen
            set(ref(db, `images_integrantes/${ username.replace(/ /g, '_') }`), {
                photoURL,
            });

            // Guardamos el Instrumento
            set(ref(db, `instrumentos/${ username.replace(/ /g, '_') }`), {
                instrumento,
            });

            dispatch({
                type: 'signUp',
                payload: {
                    token,
                    user: userCredential.user,
                }
            });

            await AsyncStorage.setItem( 'token', token );

        } catch (error: any) {
            dispatch({
                type: 'addError',
                payload: 'Revise la informacion'
            })
        }
    }

    const logOut = async () => {
        try {
            await signOut(auth);
            
            // Se remove el token de la memoria del telefone
            await AsyncStorage.removeItem( 'token' );
            
            dispatch({ type: 'logout' });

        } catch ( error: any ) {
            dispatch({
                type: 'addError',
                payload: 'Hubo un error, intenta de nuevo.'
            });
        }
    }

    const removeError = () => {
        dispatch({ type: 'removeError' });
    }

    useEffect(() => {
        checkToken();
    }, []);

    return (
        <AuthContext.Provider value={{
            ...state,
            signUp,
            signIn,
            logOut,
            removeError,
        }}>
            { children }
        </AuthContext.Provider>
    )
}
