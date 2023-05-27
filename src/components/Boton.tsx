import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from '../theme/appTheme';

interface Props {
    botonTexto: string;
    accion: () => void;
}

export const Boton = ( { botonTexto, accion }: Props ) => {
    return (
        <TouchableOpacity 
            style={{
                backgroundColor: '#AC75FF',
                width: 140,
                height: 35,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center'
            }}
            activeOpacity={ 0.6 }
            onPress={ accion }
        >
            <Text style={{ 
                ...styles.title, 
                textAlign: 'center', 
                fontSize: 16,
                color: '#fff',
                top: 3
            }}>
                { botonTexto }
            </Text>
        </TouchableOpacity>
    )
}
