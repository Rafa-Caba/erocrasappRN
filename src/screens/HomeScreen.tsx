import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getDatabase, onValue, ref } from 'firebase/database';
import { AuthContext } from '../context/AuthContext';
import { Noticia } from '../components/noticias/Noticia';

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
  
  const [noticias, setNoticias] = useState<Noticias[]>([])
  const [ photoURL, setPhotoURL ] = useState('');
  const { user } = useContext(AuthContext);
  const inserts = useSafeAreaInsets();  
  const db = getDatabase();
  const usuario = user?.displayName?.split('_')[0];

  useEffect(() => {
    // Obteniendo Avisos
    onValue(ref(db, "noticias"), (snapshot) => {
      const data = snapshot.val();
      
      if ( data !== null ) setNoticias(data);
    });
  }, []);

  useEffect(() => {
    // Obteniendo Foto de Perfil
    if ( user?.photoURL ) setPhotoURL(user?.photoURL);
  }, [])
  
  const aNoticiaForm = () => {
    navigation.navigate('NoticiaFormScreen');
  }
  
  return (
    <View style={{ ...styles.globalMargin, marginTop: inserts.top + 10, flex: 1 }}>
      <View style={{  
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10,
        marginTop: 5,
        marginBottom: 10,
      }}>
        <Text style={{ ...styles.title, fontSize: 28 }}>{`¡Hola, ${usuario}!`}</Text>
        { 
          <Image
            source={{ 
                uri: photoURL
                    ? photoURL 
                    : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png' }}
            style={{ ...styles.perfilImage, marginBottom: 10, width: 80, height: 80 }}
          />
        }
      </View>

      <View style={{  
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 10,
      }}>
        <Text style={{ 
          fontSize: 22, 
          fontWeight: '600', 
          marginLeft: 5, 
          marginVertical: 2,
        }}>
          Avisos:
        </Text>
        <TouchableOpacity
          activeOpacity={ 0.7 }
          style={{ 
              backgroundColor: '#AC75FF',
              width: 120,
              height: 30,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center' 
          }}
          onPress={ () => aNoticiaForm() }
        >
          <Text style={{
              ...styles.title,
              textAlign: 'center', 
              fontSize: 14,
              color: '#fff',
              top: 3,
          }}>
              Agregar Aviso
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        { noticias &&
          map(noticias, (noticia, index: number) => (
            <Noticia key={index} noticia={ noticia } />
          ))
        }
      </ScrollView>
    </View>
  ) 
}