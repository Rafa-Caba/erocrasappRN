import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, Switch } from 'react-native';
import { ref, onValue, getDatabase } from 'firebase/database';
import 'firebase/compat/database'
import { AuthContext } from '../../context/AuthContext';
import { styles } from '../../theme/appTheme';

export const PerfilScreen = () => {
  const { user } = useContext(AuthContext);
  console.log(user?.displayName)
  const [intrumento, setIntrumento] = useState(null);
  const db = getDatabase();

  useEffect(() => {
    onValue(ref(db, `instrumentos/${ user?.displayName }`), (snapshot) => {
        const data = snapshot.val();

        console.log(data);
    });
  }, [ user?.displayName ])

  return (
    <View style={ styles.globalMargin }>
      <View style={ styles.avatarContainer }>
        <Image
          source={ require('../../img/EroCras4.jpg') }
          style={ styles.perfilImage }
        />
      </View>

      <View>
        <Text style={ styles.menuTexto }>Nombre:</Text>
        <Text style={ styles.title }>Rafael Cabanillas</Text>
      </View>

      <View>
        <Text style={ styles.menuTexto }>Instrumento:</Text>
        <Text style={ styles.title }>Guitarra</Text>
      </View>
      
    </View>
  )
}
