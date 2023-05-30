import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image,  } from 'react-native';
import { ref, onValue, getDatabase } from 'firebase/database';
import 'firebase/compat/database'

import { AuthContext } from '../../context/AuthContext';
import { styles } from '../../theme/appTheme';

export const PerfilScreen = () => {
  
  const [ photoURL, setPhotoURL ] = useState('');
  const [ instrumento, setInstrumento ] = useState('');
  const { user } = useContext( AuthContext );
  const db = getDatabase();
  const username = user?.displayName ? user?.displayName : 'Anonimo';

  useEffect(() => {
    // Obteniendo Instrumento
    onValue(ref(db, `instrumentos/${ username }`), (snapshot) => {
        const { instrumento } = snapshot.val();

        setInstrumento(instrumento)
    });
  }, [])

  useEffect(() => {
    // Obteniendo Foto de Perfil        
    if ( user?.photoURL ) setPhotoURL(user?.photoURL);
  }, [])

  return (
    <View style={{ ...styles.globalMargin, marginHorizontal: 20 }}>
      <View style={ styles.avatarContainer }>
        {  
          <Image 
            source={{ 
              uri: photoURL
                ? photoURL 
                : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
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
        <Text style={ styles.title }>{ username }</Text>
      </View>

      <View>
        <Text style={ styles.menuTexto }>Instrumento:</Text>
        <Text style={ styles.title }>{ instrumento }</Text>
      </View>
    </View>
  )
}


