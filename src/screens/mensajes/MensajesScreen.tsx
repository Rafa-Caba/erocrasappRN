import React, { useEffect, useRef, useContext, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { map } from 'lodash';
import moment from 'moment';
import { Header } from '@rneui/base';

import 'firebase/compat/database'
import firebase from '../../utils/firebase';
import { getDatabase, ref, onValue} from "firebase/database";

import { AuthContext } from '../../context/AuthContext';
import Mensaje from '../../components/mensajes/Mensaje';
import Input from '../../components/mensajes/Input';

const MensajesScreen = () => {
  const { user } = useContext(AuthContext);

  const username = user?.displayName;

  const db = getDatabase();
  const [ mensajes, setMensajes ] = useState([])
  const scrollViewRef = useRef<ScrollView | null>(null);

  useEffect(() => {
    // Obteniendo todos los mensajes de la BD
    onValue(ref(db, 'chats'), (snapshot) => {
      const data = snapshot.val();
      setMensajes(data);
    });
  }, []);
  
  const sendMensaje = ( mensaje: string ) => {
    const time = moment().format("hh:mm a");

    firebase
      .database()
      .ref("chats")
      .push({ username, text: mensaje, time });
  }

  return (
    <>
      <View style={ styles.container }>
        <Header 
          containerStyle={{
            backgroundColor: '#fff',
          }}
          placement="left"
          centerComponent={{ text: 'Chat', style: { color: 'rgba(0,0,0,0.5)', fontSize: 22, fontWeight: 'bold' } }}
        />

        <ScrollView 
          style={ styles.chatView }
          ref={scrollViewRef}
          onContentSizeChange={() => {
              scrollViewRef?.current?.scrollToEnd({ animated: true });
          }}
        >
          { map(mensajes, (mensaje: any, index: number) => (
            <Mensaje key={index} mensaje={ mensaje } name={ username! } />
          ))}
        </ScrollView>

        <Input sendMensaje={ sendMensaje } />
      </View>
    </>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ddc7ff',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  chatView: {
    marginVertical: 15,
  },
})

export default MensajesScreen;