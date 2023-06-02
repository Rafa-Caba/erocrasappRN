import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Platform, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const widthScreen = Dimensions.get('screen').width;

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
        paddingBottom: Platform.OS === "ios" ? 10 : 0,
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
        width: '88%',// widthScreen - 55,
        backgroundColor: '#9d5cff',
        fontSize: 18, 
        paddingLeft: 10 ,
    },
    iconSend: {
        width: '14%',
        marginHorizontal: 10
    },
});
export default Input;