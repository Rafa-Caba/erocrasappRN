import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image,  } from 'react-native';
import { ref, onValue } from 'firebase/database';
import 'firebase/compat/database'
import { AuthContext } from '../../context/AuthContext';
import { db } from '../../utils/firebase';
import { styles } from '../../theme/appTheme';
import { ScrollView } from 'react-native-gesture-handler';

export const PerfilScreen = () => {
  
  const { user } = useContext( AuthContext );
  const [ instrumento, setInstrumento ] = useState('');
  const username = user?.displayName ? user?.displayName : 'Anonimo';
  const photoURL = user?.photoURL ? user?.photoURL : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';

  useEffect(() => {
    // Obteniendo Instrumento
    onValue(ref(db, `instrumentos/${ username }`), (snapshot) => {
      const { instrumento } = snapshot.val();

      setInstrumento(instrumento);
    });
  }, [])

  return (
    <ScrollView 
      showsVerticalScrollIndicator={ false } 
      style={{ ...styles.globalMargin, marginHorizontal: 20 }}
    >
      <View style={{ marginBottom: 50 }}>
        <View style={ styles.avatarContainer }>
          {  
            <Image 
              source={{ 
                uri: photoURL
              }} 
              style={{
                width: 150,
                height: 150,
                marginBottom: 50,
                alignSelf: 'center',
                borderRadius: 50,
              }} 
            />
          }
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text style={ styles.menuTexto }>Nombre:</Text>
          <Text style={ styles.title }>{ username.split('_').join(' ') }</Text>
        </View>

        <View>
          <Text style={ styles.menuTexto }>Instrumento:</Text>
          <Text style={ styles.title }>{ instrumento }</Text>
        </View>
      </View>
    </ScrollView>
  )
}


