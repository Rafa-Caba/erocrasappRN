import React from 'react'
import { View, Text } from 'react-native';
import { styles } from '../../theme/appTheme';
import { Mensaje } from './Mensaje';

export const ListaMensajes = () => {
  return (
    <View>
        <Text style={ styles.title }>Mensajes</Text>

        <View>
            <Mensaje autor='Alan Piña' mensaje='Hola muchachos a ensayar!!!' />
            <Mensaje autor='Carito Dominguez' mensaje='No podre ir, perdon!' />
            <Mensaje autor='Rafael Cabanillas' mensaje='Muy bien. ahi nos vemos' />
        </View>
    </View>
  )
}
