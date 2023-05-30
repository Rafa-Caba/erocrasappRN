import React, { useContext } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Alert, Text } from 'react-native';
import moment from 'moment';
import firebase, { auth } from '../../utils/firebase';
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
            showAlert({ error: 'Error:', mensaje: 'Por favor escriba su noticia' });
        } else {
            firebase
                .database()
                .ref("noticias")
                .push({ autor, post, time, rawTime: moment().format('x') });  

            navigation.goBack();
        }
    }

    return (
        <View>
            <View style={styles.container}>
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
        </View>   
    )
}

const styles = StyleSheet.create({
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

export default NoticiaForm;

/**
                <TextInput
                    placeholder='Autor'
                    value={autor}
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
                    onChangeText={text => setAutor(text)}
                />Hola a todos esta es una noticia nueva
 */