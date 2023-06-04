import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  comment: {
    username: string,
    text: string,
    time2: string,
  };
  name: string;
}

const Comment = ({ comment: { username, text, time2 }, name }: Props) => {

  // username = quien se logueo a la app
  const soyYo = name === username;
  
  return (
    <View style={ styles.container }>
      <View style={ styles.viewComment}>
        <Text style={ styles.autor }>{ soyYo ? 'Yo' : username.split('_').join(' ') }</Text>
        <Text style={ styles.mensaje }>- { text }</Text>
        <Text style={ styles.time }>{ time2 }</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 4,
    alignItems: 'center',
    marginHorizontal: 8,
    paddingHorizontal: 10,
    justifyContent: 'center',
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
  viewComment: {
    backgroundColor: '#fff',
    minHeight: 35,
    paddingHorizontal: 15,
    paddingVertical: 2,
    minWidth: '80%',
    maxWidth: '90%',
  },
  autor: {
    paddingTop: 5,
    paddingLeft: 5,
    fontSize: 15,
    fontWeight: '500',
  },
  mensaje: {
    padding: 5,
    paddingBottom: 22,
    fontSize: 14,
    fontStyle: 'italic'
  },
  time: {
    fontSize: 10,
    position: 'absolute',
    bottom: 5,
    right: 5,
    paddingRight: 5,
    alignSelf: 'flex-end'
  },
})

export default Comment;