import React, { createContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    updateProfile, signOut 
} from "firebase/auth";

import 'firebase/compat/database'
import { auth, db } from '../utils/firebase';
import { ref, set } from "firebase/database";

import { AuthState, authReducer } from './authReducer';
import { LoginData, RegisterData, Usuario } from '../interfaces/appInterfaces';

interface AuthContextProps {
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

const AuthContext = createContext({} as AuthContextProps);

const AuthProvider = ({ children }: any) => {

    const [ state, dispatch ] = useReducer( authReducer, authInitialState );

    useEffect(() => {
        checkToken();
    }, []);

    // Verificacion si hay token y si es valido
    const checkToken = async () => {
        // Se obtinen Token de la memoria del telefono
        const token = await AsyncStorage.getItem( 'token' );
        
        // No token, no autenticado
        if ( !token ) return dispatch({ type: 'notAuthenticated' });

        const authToken = await auth.currentUser?.getIdToken(true);

        if ( !authToken ) return dispatch({ type: 'notAuthenticated' });

        // Token se actualiza despues del chequeo.
        await AsyncStorage.setItem( 'token', authToken );
        
        // token y usuario se actulizan
        dispatch({
            type: 'signUp',
            payload: {
                token: authToken,
                user: auth.currentUser!
            }
        });
    }

    const signIn = async ({ email, password }: LoginData ) => {
        try {
            
            const userFB = (await signInWithEmailAndPassword(auth, email, password)).user;

            if ( userFB.displayName === null ) return dispatch({ type: 'notAuthenticated' });

            dispatch({
                type: 'signUp',
                payload: {
                    token: userFB.refreshToken,
                    user: userFB,
                }
            });

            await AsyncStorage.setItem( 'token', userFB.refreshToken );

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

            if ( userCredential === null ) return dispatch({ type: 'notAuthenticated' });

            const authToken = await userCredential.user.getIdToken(true);

            if ( auth.currentUser !== null ) {
                await updateProfile( auth.currentUser, { 
                    displayName: username.replace(/ /g, '_'),
                })

                set(ref(db, `instrumentos/${ username.replace(/ /g, '_') }`), {
                    instrumento,
                });
    
                dispatch({
                    type: 'signUp',
                    payload: {
                        token: authToken,
                        user: userCredential.user,
                    }
                });
            }

            await AsyncStorage.setItem( 'token', authToken );

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
};

export { AuthContext, AuthProvider };