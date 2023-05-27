import React, { useEffect, useState } from 'react';
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

  const soyYo = name === username;
  
  return (
    <View style={ styles.container }>
      <View style={ styles.viewComment}>
        <Text style={ styles.autor }>{ name }</Text>
        <Text style={ styles.mensaje }>- { text }</Text>
        <Text style={ styles.time }>{ time2 }</Text>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 5,
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
    //borderRadius: 15,
    minHeight: 35,
    paddingHorizontal: 15,
    paddingVertical: 5,
    minWidth: '80%',
    maxWidth: '90%',
  },
  autor: {
    paddingTop: 5,
    paddingLeft: 5,
    fontSize: 18
  },
  mensaje: {
    padding: 5,
    paddingBottom: 25,
    fontSize: 16,
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