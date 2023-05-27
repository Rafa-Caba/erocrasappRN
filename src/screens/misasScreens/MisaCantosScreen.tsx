import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Boton } from '../../components/Boton';
import { styles } from '../../theme/appTheme';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, onValue} from "firebase/database";
import 'firebase/compat/database'
import { StackScreenProps } from '@react-navigation/stack';
import { Canto } from '../../components/misas/Canto';
import { map } from 'lodash';

interface Canto {
  tituloCanto: string;
  letraCanto: string;
} 

interface Props extends StackScreenProps<any, any> {}

export const MisaCantosScreen = ({ route }: Props) => {
  const { nombreMisa } = route.params as any;
  const db = getDatabase();
  const navigation = useNavigation<any>();
  const [cantos, setCantos] = useState<Canto[]>([])

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
    <View style={{ ...styles.globalMargin, flex: 1 }}>
      <View style={{  
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 30
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={ () => navigation.navigate('ListaMisasScreen') }>
            <Icon name='chevron-back-outline' size={30} />
          </TouchableOpacity>
          <Text style={{ ...styles.title, fontSize: 28, marginLeft: 5 }}>Misa { nombreMisa }</Text>
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

/*
<TouchableOpacity 
  style={{ 
    backgroundColor: '#fff'
  }}
  key={ index }
  activeOpacity={ 0.6 }
  // onPress={ () => navigation.navigate('CantoScreen', { canto })}
>
  <Text style={ styles.title }>{ canto.titulo }</Text>
  <Text>
    {
      JSON.stringify( canto, null, 3 )
    }
  </Text>
</TouchableOpacity>

 */
/*<Canto key={index} canto={ canto } />*/

/*
const guardarCanto = ( comment: string ) => {
  firebase
    .database()
    .ref("noticias/comments")
    .push({ tituloCanto, letraCanto });
}
*/
