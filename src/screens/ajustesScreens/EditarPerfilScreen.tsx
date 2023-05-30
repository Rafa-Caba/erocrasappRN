import React, { useEffect, useContext, useState } from 'react';
import { View, Text, Image, TextInput, Alert, KeyboardAvoidingView, Platform, TouchableOpacity, Keyboard } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useGaleriaPhotos } from '../../hooks/useGaleriaPhotos';
import { useForm } from '../../hooks/useForm';
import { AuthContext } from '../../context/AuthContext';
import 'firebase/compat/database'
import { updatePassword, updateProfile } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { getDatabase, ref, onValue, update } from "firebase/database";
import { launchImageLibrary } from 'react-native-image-picker';

import { Boton } from '../../components/Boton';
import { styles } from '../../theme/appTheme';

interface Props extends StackScreenProps<any, any> {}

export const EditarPerfilScreen = ({ navigation }: Props) => {

    const [ photoURL, setPhotoURL ] = useState('');
    const { cloudinaryUpload } = useGaleriaPhotos();
    const { user } = useContext( AuthContext );
    const db = getDatabase();
    const displayName = (user?.displayName) ? user.displayName : 'Anonimo';

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
            cloudinaryUpload( source, displayName );

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

            if ( displayName ) {
                onValue(ref(db, `images/integrantes/${ displayName }`), (snapshot) => {
                    const { photoURL } = snapshot.val();
                    
                    if (photoURL) setPhotoURL(photoURL);
                });

                update(ref(db, `images/integrantes/${ displayName }`), {
                    photoURL,
                });

                updateProfile(auth.currentUser!, {
                    displayName: nombre, 
                    photoURL,
                })
            }        

        }
        
        if ( instrumento !== null ) {
            update(ref(db, `instrumentos/${ displayName }`), {
                instrumento,
            });
        }
        Keyboard.dismiss();
        navigation.pop();
    }

    useEffect(() => {
        // Obteniendo Instrumento
        onValue(ref(db, `instrumentos/${ displayName }`), (snapshot) => {
            const { instrumento } = snapshot.val();

            onChange(instrumento, 'instrumento')
        });
    }, [])

    useEffect(() => {
        // Obteniendo Foto de Perfil
        onValue(ref(db, `images/integrantes/${ displayName }`), (snapshot) => {
            const { photoURL } = snapshot.val();
            
            if (photoURL ) setPhotoURL(photoURL);
        });
    }, [])

    return (
        <View style={{ flex: 1}}>
            <KeyboardAvoidingView
                behavior={ (Platform.OS) === 'ios' ? 'padding' : 'height' }
            >
                <View style={{ 
                    ...styles.globalMargin ,
                    marginHorizontal: 50,
                    marginTop: 3,
                }}>
                    <View style={ styles.avatarContainer }>
                        {
                            <Image
                                source={{ 
                                    uri: photoURL
                                        ? photoURL 
                                        : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png' }}
                                style={{ ...styles.perfilImage, marginBottom: 15 }}
                            />
                        }
                    </View>

                    <View>
                        <Text style={ styles.menuTexto }>Nombre:</Text>
                        <TextInput 
                            style={{
                                height: 35,
                                marginTop: 2,
                                marginBottom: 6,
                                borderWidth: 1,
                                paddingVertical: 5,
                                paddingHorizontal: 8,
                                fontSize: 16,
                                fontWeight: '500'
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
                                marginTop: 2,
                                marginBottom: 6,
                                borderWidth: 1,
                                paddingVertical: 5,
                                paddingHorizontal: 8,
                                fontSize: 16,
                                fontWeight: '500'
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
                                marginTop: 2,
                                marginBottom: 6,
                                borderWidth: 1,
                                paddingVertical: 5,
                                paddingHorizontal: 8,
                                fontSize: 16,
                                fontWeight: '500'
                            }}
                            value={ instrumento }
                            onChangeText={text => onChange(text, 'instrumento')}
                            placeholder="Instrumento" 
                            placeholderTextColor={ 'lightgray' } 
                        />
                    </View>

                    <View style={{ 
                        flexDirection: 'row', 
                        alignItems: 'baseline',
                        justifyContent: 'center',
                        marginVertical: 10,
                    }}>
                        <Text style={{
                            fontSize: 17,
                            marginRight: 20,
                        }}>
                            Foto de Perfil:
                        </Text>
                        <TouchableOpacity
                            activeOpacity={ 0.7 }
                            style={{ 
                                backgroundColor: '#AC75FF',
                                width: 120,
                                height: 30,
                                borderRadius: 15,
                                justifyContent: 'center',
                                alignItems: 'center' 
                            }}
                            onPress={ takePhotoFromGalery }
                        >
                            <Text style={{
                                ...styles.title,
                                textAlign: 'center', 
                                fontSize: 14,
                                color: '#fff',
                                top: 3,
                            }}>
                                Seleccionar foto
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ alignSelf: 'center', marginTop: 10 }}>
                        <Boton 
                            botonTexto="Guardar Cambios"
                            accion={ () => submit() }
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}