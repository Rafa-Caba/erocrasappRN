import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import 'firebase/compat/database'
import { db } from '../../utils/firebase';
import { ref, onValue } from "firebase/database";
import { styles } from '../../theme/appTheme';

interface Props {
  mensaje: {
    username: string,
    text: string,
    time: string,
  };
  name: string;
}

export const Mensaje = ({ mensaje: { username, text, time }, name }: Props) => {

  const [ otherPhoto, setOtherPhoto ] = useState('');
  const soyYo = name === username;

  const condicionalStyle = {
    container: {
      justifyContent: soyYo ? 'flex-end' : 'flex-start',
      alignItems: 'center',
    },
    viewMensaje: {
      backgroundColor: soyYo ? '#fff' : '#ac75ff',
    },
    autor: {
      color: soyYo ? '#000' : '#fff',
      // textAlign: soyYo ? 'right' : 'left',
      textAlign: soyYo ? 'right' : 'left',
    },
    mensaje: {
      color: soyYo ? '#000' : '#fff',
      // textAlign: soyYo ? 'right' : 'left',
      textAlign: soyYo ? 'left' : 'left',
    },
  }

  useEffect(() => {
    onValue(ref(db, `images_integrantes/${ username }`), (snapshot) => {
      const photoURL = snapshot.val();

      setOtherPhoto(photoURL);
    });
  }, [])
  
  return (
    <View style={[ styles2.container, condicionalStyle.container as any ]}>
      { !soyYo && (
        <View style={{ ...styles2.letterView }}>
          {
            <Image
              source={{ uri: otherPhoto 
                ? otherPhoto 
                : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
              }}
              style={{ ...styles.perfilImage, marginBottom: 15, width: 35, height: 35 }}
            />
          }
        </View>
      )}
      <View style={[ styles2.viewMensaje, condicionalStyle.viewMensaje ]}>
        <Text style={{ ...condicionalStyle.autor as any, paddingHorizontal: 5, paddingTop: 5, fontWeight: '800', fontSize: 13 }}>{ soyYo ? 'Yo mero' : username.split('_')[0] }</Text>
        <Text style={[ styles2.mensaje, condicionalStyle.mensaje as any ]}>{ text }</Text>
        <Text style={[ styles2.time, soyYo ? styles2.timeLeft : styles2.timeRight ]}>{ time }</Text>
      </View>
    </View>
  )
}


const styles2 = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 5,
    alignItems: 'center',
  },
  letterView: {
    height: 35,
    width: 35,
    borderRadius: 100,
    alignItems: 'baseline',
    justifyContent: 'center',
    marginRight: 10,
  },
  imagemUser: {
    height: 35,
    width: 35,
    borderRadius: 100,

  },
  viewMensaje: {
    borderRadius: 10,
    minHeight: 35,
    minWidth: '40%',
    maxWidth: '80%'
  },
  mensaje: {
    paddingHorizontal: 5,
    paddingBottom: 25,
    fontSize: 15
  },
  time: {
    fontSize: 10,
    position: 'absolute',
    bottom: 5,
  },
  timeRight: {
    right: 8,
    color: '#fff',
  },
  timeLeft: {
    left: 8,
    color: 'grey'
  },
})
