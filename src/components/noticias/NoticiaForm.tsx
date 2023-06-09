import React, { useContext } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Alert, Text, ScrollView, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import moment from 'moment';
import firebase from '../../utils/firebase';
import 'firebase/compat/database'
import { useNavigation } from '@react-navigation/native';
import { useForm } from '../../hooks/useForm';
import { AuthContext } from '../../context/AuthContext';

interface Alerta {
    error: string;
    mensaje: string;
}

const NoticiaForm = () => {
    const { user } = useContext(AuthContext);
    const navigation = useNavigation();
    const { post, onChange } = useForm({
        post: ''
    });
    const autor = user?.displayName;

    const showAlert = ({ error, mensaje }: Alerta) => {
        Alert.alert(
            error,
            mensaje,
            [],
            { cancelable: true, },
        );
    }

    const onSubmit = () => {
        const time = moment().format("DD MMM YYYY hh:mm a");
      
        if (post === '') {
            showAlert({ error: 'Error:', mensaje: 'Por favor escriba su aviso' });
        } else {
            firebase
                .database()
                .ref("avisos")
                .push({ autor, post, time, rawTime: moment().format('x') });  

            navigation.goBack();
        }

        Keyboard.dismiss();
    }

    return (
        <View>
            <TextInput
                placeholder='Aviso'
                value={post}
                style={{ 
                    color: '#000', 
                    borderColor: '#000',
                    borderWidth: 1,
                    fontSize: 20, 
                    paddingLeft: 10,
                    marginBottom: 15,
                    width: 300,
                    height: 200,
                    alignSelf: 'center',
                    textAlignVertical: 'top'
                }} 
                multiline
                onChangeText={text => onChange(text, 'post')}
                />
            <View>
                <TouchableOpacity
                    style={ styles.btnPostear } 
                    activeOpacity={ 0.6 }
                    onPress={ onSubmit }
                    >
                    <Text style={ styles.btnLoginText }>Postear Aviso</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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

export default NoticiaForm;