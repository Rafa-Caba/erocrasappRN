import React, { useEffect } from 'react';
import { View, 
  Text, Image, Dimensions,
  ScrollView, ActivityIndicator, 
  TouchableOpacity 
} from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';
import { map } from 'lodash';
import Carousel from 'react-native-snap-carousel';

import { useGaleriaPhotos } from '../../hooks/useGaleriaPhotos';
import { Foto } from '../../components/Foto';
import { Boton } from '../../components/Boton';
import { styles } from '../../theme/appTheme';

// import Icon from 'react-native-vector-icons/Ionicons';

const windowWidth = Dimensions.get('window').width;

interface Props extends StackScreenProps<any, any> {}

export const GaleriaScreen = ({ navigation }: Props) => {

  const { imageURLs, takePhotoFromGalery, getAllPhotos } = useGaleriaPhotos();

  useEffect(() => {
    getAllPhotos();
  }, [])
  

  return (
    <View style={{ ...styles.globalMargin, flex: 1 }}>
      <View style={{  
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 30,
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ ...styles.title, fontSize: 28, marginLeft: 5 }}>Galeria</Text>
        </View>

        <Boton botonTexto="Agregar Imagen" accion={ takePhotoFromGalery } />
      </View>

      <>
        { 
          imageURLs && (
            <View style={{ 
              position: 'absolute',
              top: 62,
              height: 220, 
              width: 250,
              marginVertical: 10,
              paddingVertical: 5,
              zIndex: 999,
              backgroundColor: 'rgba(255,255,255,0.8)',
              justifyContent: 'center',
            }}>
              <Carousel 
                data={ imageURLs }
                renderItem={ ({ item }) => <Foto uri={ item } /> }
                sliderWidth={ windowWidth }
                itemWidth={ 220 }
                layout={'stack'} 
                inactiveSlideOpacity={ 0.8 }
                layoutCardOffset={ 30 }
                enableSnap
                loop
              />
            </View>
          )
        }
        <ScrollView
          showsVerticalScrollIndicator={ false }
        >
          <View style={{ 
            justifyContent: 'center', 
            alignItems: 'center', 
            marginVertical: 10,
            top: 210,
          }}>
            <View style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginBottom: 210,
            }}>

              { imageURLs &&
                map(imageURLs, (imageURL: string, index: number) => (
                  <TouchableOpacity
                    key={ index }
                    activeOpacity={ 0.7 }
                    style={{

                    }}
                    onPress={ () => navigation.navigate('ImagenScreen', imageURL ) }
                  >
                    <Image 
                      source={{ uri: imageURL }} 
                      style={{ width: 90, height: 80, margin: 3 }}  
                    />
                  </TouchableOpacity>
                ))
              }
            </View>
          </View>
        </ScrollView>
      </>
    </View>
  )
}
