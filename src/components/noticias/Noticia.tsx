import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Noticia {
  post: string;
  time: string;
  autor: string;
}

interface Props {
  noticia: Noticia;
}

export const Noticia = ({ noticia: { post, time, autor } }: Props) => {

  const navigation = useNavigation<any>();

  return (
    <>
      { time && autor && post &&
        <TouchableOpacity 
          style={{ 
            ...styles2.noticiaContainer,
            marginBottom: 10,
            paddingHorizontal: 25
          }}
          onPress={() => navigation.navigate( 'NoticiaScreen', { time, post, autor } as any )}
          activeOpacity={ 0.6 }
        >
          <Text style={ styles2.time }>{ time } </Text>
          <Text style={ styles2.title }>{ autor.split('_').join(' ') }</Text>
          <Text style={ styles2.texto }>{ post }</Text>
        </TouchableOpacity>
      }
    </>
  )
}

const styles2 = StyleSheet.create({
  noticiaContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(177,140,254, 0.5)',
    borderRadius: 30,
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 10
  },
  time: {
    fontSize: 14,
    alignSelf: 'flex-end',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  texto: {
    fontSize: 19,
    marginBottom: 5
  }
});
