import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';

import { Noticia } from '../components/noticias/Noticia';
import { Boton } from '../components/Boton';
import { AuthContext } from '../context/AuthContext';
import { getDatabase, onValue, ref } from 'firebase/database';

import { styles } from '../theme/appTheme';
import { map } from 'lodash';

interface Noticias {
  post: string;
  time: string;
  rawTime: string;
  autor: string;
} 

// interface Props extends StackScreenProps<any, any> {}
interface Props extends DrawerScreenProps<any, any> {}

export const HomeScreen = ({ navigation }: Props ) => {
    
  const { user } = useContext(AuthContext);

  const usuario = user?.displayName;
  const db = getDatabase();
  const [noticias, setNoticias] = useState<Noticias[]>([])

  useEffect(() => {
    onValue(ref(db, "noticias"), (snapshot) => {
      const data = snapshot.val();
      setNoticias(data);
    });
  }, []);
  
  const aNoticiaForm = () => {
    navigation.navigate('NoticiaFormScreen');
  }
  
  return (
    <View style={{ ...styles.globalMargin, marginVertical: 5, flex: 1 }}>
      <View style={{  
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 25,
        marginBottom: 10,
      }}>
        <Text style={{ ...styles.title, fontSize: 28 }}>{`¡Hola, ${usuario}!`}</Text>
        <Boton botonTexto="Agregar Aviso" accion={() => aNoticiaForm() } />
      </View>

      <Text style={{ 
        fontSize: 22, 
        fontWeight: '500', 
        marginHorizontal: 10, 
        marginVertical: 2,
      }}>
        Avisos:
      </Text>

      <ScrollView>
        { map(noticias, (noticia, index: number) => (
            <Noticia key={index} noticia={ noticia } />
          ))
        }
      </ScrollView>
    </View>
  ) 
}