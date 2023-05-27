import React, { useEffect, useContext, useState } from 'react';
import { View, Text, Image, TextInput, Alert } from 'react-native';

import { launchImageLibrary } from 'react-native-image-picker';

import 'firebase/compat/database'
import { updatePassword, updateProfile } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { getDatabase, ref, onValue, update } from "firebase/database";

import { AuthContext } from '../../context/AuthContext';
import { useGaleriaPhotos } from '../../hooks/useGaleriaPhotos';
import { useForm } from '../../hooks/useForm';

import { Boton } from '../../components/Boton';
import { styles } from '../../theme/appTheme';

export const EditarPerfilScreen = () => {

    const db = getDatabase();
    const { user } = useContext( AuthContext );
    const displayName = (user?.displayName) ? user.displayName : 'Anonimo';
    const { cloudinaryUpload } = useGaleriaPhotos();
    const [ photoURL, setPhotoURL ] = useState('');

    const { nombre, contraseña, instrumento, onChange } = useForm({
        nombre: displayName,
        contraseña: '',
        instrumento: ''
    });

    const takePhotoFromGalery = () => {
        launchImageLibrary({
            mediaType: 'photo',
            quality: 0.7
        }, (resp) => {
            if ( resp.didCancel ) return;
            if ( !resp.assets?.[0].uri ) return;

            const uri = resp.assets[0].uri;
            const type = resp.assets[0].type;
            const name = resp.assets[0].fileName;

            const source = { uri, type, name }

            // cloudinaryUpload(source, displayName );
            cloudinaryUpload( source );

        });
    }

    const submit = () => {

        if (contraseña !== '') {
            updatePassword(auth.currentUser as any, contraseña).then(() => {
                    // Update successful.
                    Alert.alert( 'Contraseña', 'Ha sido actualizada', [{
                        text: 'Ok',
                    }]);
                }).catch((error) => {
                    Alert.alert( 'Error', 'Ha habido un error', [{
                        text: 'Ok',
                    }]);
                });
        };

        if ( auth.currentUser !== null) {
            onValue(ref(db, `images/${ displayName }`), (snapshot) => {
                const data = snapshot.val();
                
                setPhotoURL(data);
            });

            updateProfile(auth.currentUser!, {
                displayName: nombre, 
                photoURL,
            })
        }
        
        if ( instrumento !== null ) {
            update(ref(db, `instrumentos/${ displayName }`), {
                instrumento,
            });
        }
        
    }

    useEffect(() => {
        onValue(ref(db, `instrumentos/${ displayName }`), (snapshot) => {
            const { instrumento } = snapshot.val();

            onChange(instrumento, 'instrumento')
        });
    }, [])

        
    return (
        <View style={{ 
            ...styles.globalMargin ,
            marginHorizontal: 50,
        }}>
            <View style={ styles.avatarContainer }>
                <Image
                source={ require('../../img/EroCras4.jpg') }
                style={ styles.perfilImage }
                />
            </View>

            <View>
                <Text style={ styles.menuTexto }>Nombre:</Text>
                <TextInput 
                    style={{
                        height: 35,
                        marginTop: 3,
                        marginBottom: 10,
                        borderWidth: 1,
                        padding: 5,
                        fontSize: 16
                    }}
                    value={ nombre }
                    onChangeText={text => onChange(text, 'nombre')}
                    placeholder="Nombre" 
                    placeholderTextColor={ 'lightgray' } 
                />
            </View>

            <View>
                <Text style={ styles.menuTexto }>Contraseña:</Text>
                <TextInput 
                    style={{
                        height: 35,
                        marginTop: 3,
                        marginBottom: 10,
                        borderWidth: 1,
                        padding: 5,
                        fontSize: 16
                    }}
                    value={ contraseña }
                    onChangeText={text => onChange(text, 'contraseña')}
                    placeholder="Nueva Contraseña" 
                    placeholderTextColor={ 'lightgray' } 
                />
            </View>

            <View>
                <Text style={ styles.menuTexto }>Instrumento:</Text>
                <TextInput 
                    style={{
                        height: 35,
                        marginTop: 3,
                        marginBottom: 10,
                        borderWidth: 1,
                        padding: 5,
                        fontSize: 16
                    }}
                    value={ instrumento }
                    onChangeText={text => onChange(text, 'instrumento')}
                    placeholder="Instrumento" 
                    placeholderTextColor={ 'lightgray' } 
                />
            </View>

            <View style={{ flexDirection: 'row' }}>
                <Text style={ styles.menuTexto }>Foto de Perfil:</Text>
                <Boton 
                    botonTexto="Agrega foto"
                    accion={ takePhotoFromGalery }
                />
            </View>

            <View style={{ alignSelf: 'center', marginTop: 20 }}>
                <Boton 
                    botonTexto="Guardar Cambios"
                    accion={ () => submit() }
                />
            </View>
        </View>
    )
}