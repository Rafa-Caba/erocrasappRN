import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Input = ({ sendMensaje }: any ) => {

    const [mensaje, setMensaje] = useState('');

    const onSubmit = () => {
        if (mensaje.length > 0) {
            sendMensaje(mensaje);
            setMensaje('');
        }
    }

    return (
        <View style={ styles.container }>
            <View style={ styles.itemInput }>
                <TextInput 
                    style={ styles.input }
                    placeholder="Mensaje..."
                    placeholderTextColor="rgba(255,255,255,.6)"
                    autoCapitalize="sentences"
                    multiline
                    value={ mensaje }
                    onChange={ (e) => setMensaje(e.nativeEvent.text) }
                />

                <TouchableOpacity 
                    style={ styles.iconSend } 
                    onPress={ onSubmit }
                >
                    <Icon 
                        name="send" 
                        color="#fff"
                        size={30} 
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#ac75ff',
        paddingBottom: Platform.OS === "ios" ? 20 : 0,
        paddingHorizontal: 5,
        paddingVertical: 5,
    },
    itemInput: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 5
    },
    input: {
        color: '#fff',
        width: 350,
        backgroundColor: '#9d5cff',
        fontSize: 18, 
        paddingLeft: 10 ,
    },
    iconSend: {
        width: 100,
        marginHorizontal: 10
    },
});
export default Input;