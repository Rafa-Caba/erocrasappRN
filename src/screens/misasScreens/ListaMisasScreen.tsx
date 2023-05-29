import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import { Boton } from '../../components/Boton';
import { Misa } from '../../components/misas/Misa';
import { getDatabase, onValue, ref } from 'firebase/database';
import { StackScreenProps } from '@react-navigation/stack';

import { styles } from '../../theme/appTheme';
import { map } from 'lodash';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Misas {
  autorMisa: string;
  nombreMisa: string;
  time: string
}

interface Props extends StackScreenProps<any, any> {}

export const ListaMisasScreen = ({ navigation }: Props) => {
  const db = getDatabase();
  const [misas, setMisas] = useState<Misas[]>([])
  const insets = useSafeAreaInsets();

  useEffect(() => {
    onValue(ref(db, `misas`), (snapshot) => {
      const data = snapshot.val();
      setMisas(data);
    });
  }, []);

  const aMisaForm = () => {
    navigation.navigate('MisaFormScreen');
  }

  return (
    <View style={{ marginHorizontal: 10, marginTop: insets.top - 10, flex: 1, }}>
      <View style={{  
        marginTop: 30, 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Text style={{ ...styles.title, fontSize: 28 }}>Misas</Text>
        <Boton botonTexto="Agregar Misa" accion={ () => aMisaForm() } />
      </View>

      <View style={{ marginVertical: 10, padding: 10 }}>
        <ScrollView>
          { map(misas, (misa, index: number) => (
              <Misa key={index} misa={ misa } />
            ))
          }
        </ScrollView>
      </View>
    </View>
  )
}
