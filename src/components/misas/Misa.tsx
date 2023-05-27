import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../theme/appTheme';

interface Misa {
  autorMisa: string;
  nombreMisa: string;
  time: string;
}

interface Props {
  misa: Misa;
}

export const Misa = ({ misa: { autorMisa, nombreMisa }}: Props) => {

  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity 
      style={{ 
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 2,
        justifyContent: 'space-between',
        height: 100,
        marginBottom: 10
      }}
      onPress={ () => navigation.navigate( 'MisaCantosScreen', { nombreMisa } ) }
      activeOpacity={ 0.6 }
    >
      <Text style={{ ...styles.title, textAlign: 'center', fontWeight: '500' }}>Misa { nombreMisa }</Text>
      <Text style={{ ...styles.texto, textAlign: 'center' }}>{ autorMisa } </Text>
    </TouchableOpacity>
  )
}
