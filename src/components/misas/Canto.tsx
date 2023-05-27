import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../theme/appTheme';

interface Canto {
  tituloCanto: string;
  letraCanto: string;
} 

interface Props {
  canto: Canto;
}

export const Canto = ({ canto: { tituloCanto, letraCanto }}: Props) => {

  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity 
      style={{ 
        backgroundColor: '#fff'
      }}
      activeOpacity={ 0.6 }
      onPress={ () => navigation.navigate('CantoScreen', { tituloCanto, letraCanto })}
    >
      <Text style={ styles.title }>{ tituloCanto }</Text>
    </TouchableOpacity>
  )
}
