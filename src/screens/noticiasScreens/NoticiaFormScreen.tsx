import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import NoticiaForm from '../../components/noticias/NoticiaForm';

const NoticiaFormScreen = () => {
  return (
    <View style={{ flex: 1, marginTop: 30 }}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={ false }>
        <KeyboardAvoidingView
          style={{ flex: 1,  }}
          behavior={ (Platform.OS) === 'ios' ? 'padding' : 'height' }
        >
          <NoticiaForm /> 
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  )
}

export default NoticiaFormScreen;