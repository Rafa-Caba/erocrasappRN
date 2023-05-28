import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import moment from 'moment';
import { map } from 'lodash';

import 'firebase/compat/database'
import firebase from '../../utils/firebase';
import { getDatabase, ref, onValue} from "firebase/database";

import { HomeStackParams } from '../../navigator/HomeNavigator';
import { AuthContext } from '../../context/AuthContext';
import Comment from '../../components/noticias/Comment';
import ComentsInput from '../../components/noticias/ComentsInput';

interface Props extends StackScreenProps<HomeStackParams, 'NoticiaScreen'>{};

export const NoticiaScreen = ({ route }: Props) => {
  const { time, post, autor } = route.params;
  const { user } = useContext(AuthContext);
  const username = user?.displayName;

  const db = getDatabase();
  const [coments, setComments] = useState([])
  const scrollViewRef = useRef<ScrollView | null>(null);

  useEffect(() => {
    if (time === null) return;
    // Obteniendo todos los comments de la BD
    onValue(ref(db, `noticias/comments/${time.replace(/ /g, '_')}`), (snapshot) => {
      const data = snapshot.val();
      setComments(data);
    });
  }, []);
  

  const sendComment = ( comment: string ) => {
    const time2 = moment().format("DD MMM YYYY hh:mm a");

    firebase
      .database()
      .ref(`noticias/comments/${time.replace(/ /g, '_')}`)
      .push({ username, text: comment, time2 });
  }

  return (
    <>
      <View style={{ flex: 1 }}>
        <View style={ styles2.noticiaContainer }>
          <ScrollView>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 5 }}>
              <Text style={ styles2.time }>{time}</Text>
            </View>
            <Text style={ styles2.autor }>{ autor }</Text>
            <Text style={ styles2.post }>{ post }</Text>
          </ScrollView>
        </View>

        <View style={ styles2.container }>
          <Text style={ styles2.commentTitle }>Comentarios</Text>
          <ScrollView 
            style={ styles2.commentView }
            ref={scrollViewRef}
            onContentSizeChange={() => {
                scrollViewRef?.current?.scrollToEnd({ animated: true });
            }}
          >
            { coments &&
              map(coments, (comment: any, index: number) => (
                <Comment key={index} comment={ comment } name={ username! } />
              )) 
            }
          </ScrollView>

          <ComentsInput sendComment={ sendComment } />

        </View>
        </View>
    </>
  )
}

const styles2 = StyleSheet.create({
  noticiaContainer: { 
    flex: 2, 
    backgroundColor: '#944dff', 
    paddingHorizontal: 10 
  },
  time: {
    fontSize: 16,
    color: '#d1d1d1',
  },
  autor: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
    textAlign: 'center'
  },
  post: {
    fontSize: 18,
    marginBottom: 10,
    color: '#fff',
    textAlign: 'center'
  },
  container: {
    flex: 5,
    width: '100%',
    backgroundColor: '#ddc7ff',
    justifyContent: 'space-between',
  },
  commentView: {
    marginVertical: 15,
  },
  commentTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
    marginVertical: 5
  },
})
