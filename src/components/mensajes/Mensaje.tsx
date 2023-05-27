import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import letterColors from '../../utils/letterColors';

interface Props {
  mensaje: {
    username: string,
    text: string,
    time: string,
  };
  name: string;
}

const Mensaje = ({ mensaje: { username, text, time }, name }: Props) => {

  const soyYo = name === username;
  const [bgColorLetter, setBgColorLetter] = useState(null);

  const condicionalStyle = {
    container: {
      justifyContent: soyYo ? 'flex-end' : 'flex-start',
    },
    viewMensaje: {
      backgroundColor: soyYo ? '#fff' : '#ac75ff',
    },
    mensaje: {
      color: soyYo ? '#000' : '#fff',
      textAlign: soyYo ? 'right' : 'left',
    },
  }

  useEffect(() => {
    const char = username.trim()[0].toUpperCase();
    const indexLetter = char.charCodeAt(0) - 65;
    setBgColorLetter(letterColors[indexLetter] as any);
  }, [])
  

  return (
    <View style={[ styles.container, condicionalStyle.container as any ]}>
      { !soyYo && (
        <View style={{ ...styles.letterView, backgroundColor: `rgb(${bgColorLetter})` }}>
          <Text style={ styles.letter }>
            { username.substring(0, 1) }
          </Text>
        </View>
      )}
      <View style={[ styles.viewMensaje, condicionalStyle.viewMensaje ]}>
        <Text style={[ styles.mensaje, condicionalStyle.mensaje as any ]}>{ text }</Text>
        <Text style={[ styles.time, soyYo ? styles.timeLeft : styles.timeRight ]}>{ time }</Text>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 5,
    alignItems: 'center',
  },
  letterView: {
    height: 35,
    width: 35,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    backgroundColor: '#F00'
  },
  letter: {
    fontSize: 18,
    color: '#fff',
    textTransform: 'uppercase',
  },
  viewMensaje: {
    borderRadius: 10,
    minHeight: 35,
    minWidth: '40%',
    maxWidth: '80%'
  },
  mensaje: {
    padding: 5,
    paddingBottom: 25,
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

export default Mensaje;