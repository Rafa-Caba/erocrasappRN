import React, { useEffect, useContext, useState } from 'react';
import { View, Text, Image, TextInput, Alert, TouchableOpacity, Keyboard } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../../context/AuthContext';
import { useGaleriaPhotos } from '../../hooks/useGaleriaPhotos';
import { useForm } from '../../hooks/useForm';
import 'firebase/compat/database'
import { updatePassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../../utils/firebase';
import { ref, onValue, update } from "firebase/database";
import { launchImageLibrary } from 'react-native-image-picker';

import { styles } from '../../theme/appTheme';

interface Props extends StackScreenProps<any, any> {}

export const EditarPerfilScreen = ({ navigation }: Props) => {

    const { user } = useContext( AuthContext );
    const [ photoURL, setPhotoURL ] = useState('');
    const { cloudinaryUpload } = useGaleriaPhotos();
    const displayName = user?.displayName!;

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

    const submit = async() => {
        // Actualizando contraseña
        if (contraseña !== '') {
            updatePassword(auth.currentUser as any, contraseña)
                .then(() => {
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

        // Actualizando PhotoURL y Nombre
        if ( auth.currentUser !== null) {

            if ( displayName ) {
                try {
                    onValue(ref(db, `images_integrantes/${ displayName }`), async (snapshot) => {
                        const photoURL = snapshot.val();

                        setPhotoURL(photoURL)

                        await updateProfile(auth.currentUser!, {
                            displayName: nombre, 
                            photoURL: photoURL,
                        })
                    })                    
                } catch (error) {
                    Alert.alert('Error:', 'Hubo un error al subir la foto', [{ text: 'Ok', }])
                }
            }        

        }
        
        // Actualizando Instrumento
        if ( instrumento !== null ) {
            await update(ref(db, `instrumentos/${ displayName }`), {
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
        if ( user?.photoURL ) setPhotoURL(user?.photoURL);

    }, [])

    return (
        <View style={{ flex: 1 }}>
            <View style={{ 
                ...styles.globalMargin ,
                marginHorizontal: 50,
                marginVertical: 3,
                
            }}>
                <View style={ styles.avatarContainer }>
                    {
                        <Image
                            source={{ 
                                uri: photoURL
                                    ? photoURL 
                                    : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png' }}
                            style={{ ...styles.perfilImage, marginBottom: 10 }}
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
                        value={ nombre.split('_').join(' ') }
                        onChangeText={text => onChange(text.replace(/ /g, '_'), 'nombre')}
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
                    flexWrap: 'wrap'
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

                    <TouchableOpacity
                        style={{
                            backgroundColor: '#AC75FF',
                            width: 135,
                            height: 35,
                            marginTop: 20,
                            borderRadius: 25,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        onPress={ submit }
                    >
                        <Text style={{ fontWeight: '700', fontSize: 15, color: 'white' }}>Guardar Cambios</Text>
                    </TouchableOpacity>
                </View>

                {/* <View style={{ marginVertical: 20, paddingVertical: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#AC75FF',
                            width: 135,
                            height: 35,
                            borderRadius: 15,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        onPress={ submit }
                    >
                        <Text style={{ fontWeight: '700', fontSize: 15, color: 'white' }}>Guardar Cambios</Text>
                    </TouchableOpacity> 
                </View> */}
            </View>
        </View>
    )
}