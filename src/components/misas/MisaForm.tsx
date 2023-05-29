import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Alert, Text } from 'react-native';
import moment from 'moment';
import firebase, { auth } from '../../utils/firebase';
import 'firebase/compat/database'
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../theme/appTheme';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Alerta {
    error: string;
    mensaje: string;
}

const MisaForm = () => {
    const navigation = useNavigation<any>();
    const [ nombreMisa, setNombreMisa ] = useState('');
    const [ autorMisa, setAutorMisa ] = useState('');
    const insets = useSafeAreaInsets();

    const showAlert = ({ error, mensaje }: Alerta) => {
        Alert.alert(
            error,
            mensaje,
            [],
            { cancelable: true, },
        );
    }

    const onSubmit = () => {
        const time = moment().format("DD MMM YYYY");
      
        if (nombreMisa === '') {
            showAlert({ error: 'Error:', mensaje: 'Por favor llene los campos' });
        } else {
            firebase
                .database()
                .ref(`misas/${ nombreMisa }`)
                .push({ autorMisa, nombreMisa, time });   

            navigation.navigate('ListaMisasScreen');
        }
    }

    return (
        <View style={{ marginTop: insets.top }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                <TouchableOpacity onPress={ () => navigation.navigate('ListaMisasScreen') }>
                    <Icon name='chevron-back-outline' size={30} />
                </TouchableOpacity>
                <Text style={{ ...styles, fontSize: 28, marginLeft: 15 }}>Agregar Misa</Text>
            </View>
            <View style={styles2.container}>
                <TextInput
                    placeholder='Nombre Misa'
                    value={nombreMisa}
                    style={{ 
                        color: '#000', 
                        borderColor: '#000',
                        borderWidth: 1,
                        fontSize: 20, 
                        paddingLeft: 10,
                        marginBottom: 15,
                        width: 300,
                        height: 60,
                        alignSelf: 'center',
                    }} 
                    multiline
                    onChangeText={text => setNombreMisa(text)}
                />
                <TextInput
                    placeholder='Autor'
                    value={autorMisa}
                    style={{ 
                        color: '#000', 
                        borderColor: '#000',
                        borderWidth: 1,
                        fontSize: 20, 
                        paddingLeft: 10,
                        marginBottom: 15,
                        width: 300,
                        height: 60,
                        alignSelf: 'center'
                    }} 
                    onChangeText={text => setAutorMisa(text)}
                />

                <View>
                    <TouchableOpacity
                        style={ styles2.btnPostear } 
                        activeOpacity={ 0.6 }
                        onPress={ onSubmit }
                    >
                        <Text style={ styles2.btnLoginText }>Guardar Misa</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>   
    )
}

const styles2 = StyleSheet.create({
    container: {
      flex: 1,
      top: 50,
      marginHorizontal: 50,
    },
    logo: {
      width: 170,
      height: 170,
      marginBottom: 50,
      alignSelf: 'center',
    },
    btnPostear: {
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

export default MisaForm;
