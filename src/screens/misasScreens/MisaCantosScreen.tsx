import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import 'firebase/compat/database'
import { getDatabase, ref, onValue} from "firebase/database";
import Icon from 'react-native-vector-icons/Ionicons';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
    <View style={{ ...styles.globalMargin, marginTop: insets.top, flex: 1 }}>
      <View style={{  
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={ () => navigation.pop() }>
            <Icon name='chevron-back-outline' size={ 35 } />
          </TouchableOpacity>
          <Text style={{ ...styles.title, fontSize: 24, marginLeft: 5, marginBottom: 0 }}>Misa { nombreMisa }</Text>
        </View>
        <TouchableOpacity
          onPress={ aCantoForm }
          activeOpacity={ 0.7 }
          style={{
            backgroundColor: '#AC75FF',
            width: 128,
            height: 35,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text
            style={{
              textAlign: 'center', 
              fontSize: 16,
              color: '#fff',
              fontWeight: 'bold',
            }}
          >
            Agregar Canto
          </Text>
        </TouchableOpacity>
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
