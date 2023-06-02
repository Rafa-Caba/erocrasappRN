import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import 'firebase/compat/database'
import { getDatabase, ref, onValue} from "firebase/database";
import Icon from 'react-native-vector-icons/Ionicons';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Boton } from '../../components/Boton';
import { styles } from '../../theme/appTheme';
import { Canto } from '../../components/misas/Canto';
import { map } from 'lodash';

interface Canto {
  tituloCanto: string;
  letraCanto: string;
} 

interface Props extends StackScreenProps<any, any> {}

export const MisaCantosScreen = ({ route, navigation }: Props) => {

  const [cantos, setCantos] = useState<Canto[]>([])
  const insets = useSafeAreaInsets();
  const { nombreMisa } = route.params as any;
  const db = getDatabase();

  useEffect(() => {
    onValue(ref(db, `cantos/${nombreMisa.replace(/ /g, '_')}`), (snapshot) => {
      const data = snapshot.val();
      setCantos(data);
    })
  }, []);

  const aCantoForm = () => {
    navigation.navigate('CantoFormScreen', { nombreMisa });
  }

  return (
    <View style={{ ...styles.globalMargin, marginTop: insets.top - 10, flex: 1 }}>
      <View style={{  
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
          <TouchableOpacity onPress={ () => navigation.pop() }>
            <Icon name='chevron-back-outline' size={ 35 } />
          </TouchableOpacity>
          <Text style={{ ...styles.title, fontSize: 24, marginLeft: 5 }}>Misa { nombreMisa }</Text>
        </View>
        <Boton botonTexto="Agregar Canto" accion={ () => aCantoForm() } />
      </View>
  
      <View style={{ marginVertical: 10, padding: 10 }}>
        <ScrollView>
          { map(cantos, (canto, index: number) => (
              <Canto key={index} canto={ canto } />
            ))
          }
        </ScrollView>
      </View>
    </View>
  )
}
