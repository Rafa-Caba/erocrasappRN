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

export const Misa = ({ misa }: Props) => {
  
  const navigation = useNavigation<any>();
  const { autorMisa, nombreMisa } = Object.values(misa)[0]


  return (
    <TouchableOpacity 
      style={{ 
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 2,
        justifyContent: 'space-between',
        height: 90,
        marginBottom: 10
      }}
      onPress={ () => navigation.navigate( 'MisaCantosScreen', { nombreMisa } ) }
      activeOpacity={ 0.6 }
    >
      <Text style={{ ...styles.title, marginBottom: 0, textAlign: 'center', fontWeight: '500' }}>Misa { nombreMisa }</Text>
      <Text style={{ ...styles.texto, textAlign: 'center', fontStyle: 'italic' }}>{ autorMisa } </Text>
    </TouchableOpacity>
  )
}
