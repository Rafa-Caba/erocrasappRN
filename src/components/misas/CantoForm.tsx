import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Alert, Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import firebase from '../../utils/firebase';
import 'firebase/compat/database';

interface Alerta {
    error: string;
    mensaje: string;
}

const CantoForm = ({ nombreMisa }: any ) => {
    const [tituloCanto, setTituloCanto] = useState('');
    const [letraCanto, setLetraCanto] = useState('');
    const navigation = useNavigation<any>();
    const { top } = useSafeAreaInsets();

    const showAlert = ({ error, mensaje }: Alerta) => {
        Alert.alert(
            error,
            mensaje,
            [],
            { cancelable: true, },
        );
    }

    const onSubmit = () => {      
        if (tituloCanto === '') {
            showAlert({ error: 'Error:', mensaje: 'Por favor llene los campos' });
        } else {
            firebase
                .database()
                .ref(`cantos/${nombreMisa.replace(/ /g, '_')}`)
                .push({ tituloCanto, letraCanto });

            navigation.navigate('MisaCantosScreen', { nombreMisa });
        }
    }

    return (
        <ScrollView>
            <View style={{ ...styles2.container, marginTop: top + 50 }}>
                <TextInput
                    placeholder='Titulo'
                    value={tituloCanto}
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
                    onChangeText={text => setTituloCanto(text)}
                />
                <TextInput
                    placeholder='Letra'
                    value={letraCanto}
                    editable
                    multiline={ true }
                    style={{ 
                        color: '#000', 
                        borderColor: '#000',
                        borderWidth: 1,
                        fontSize: 20, 
                        paddingLeft: 10,
                        marginBottom: 15,
                        width: 300,
                        minHeight: 200,
                        maxHeight: 250,
                        alignSelf: 'center',
                        textAlignVertical: 'top',
                    }} 
                    onChangeText={text => setLetraCanto(text)}
                />

                <TouchableOpacity
                    style={ styles2.btnPostear } 
                    activeOpacity={ 0.6 }
                    onPress={ onSubmit }
                >
                    <Text style={ styles2.btnLoginText }>Guardar Canto</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>   
    )
}

const styles2 = StyleSheet.create({
    container: {
      flex: 1,
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

export default CantoForm;
