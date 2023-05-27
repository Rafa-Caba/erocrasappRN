import React from 'react';
import { View, 
  Text, Image, 
  ScrollView, ActivityIndicator, 
  TouchableOpacity 
} from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';
import { map } from 'lodash';

import { useGaleriaPhotos } from '../../hooks/useGaleriaPhotos';
import { Boton } from '../../components/Boton';
import { styles } from '../../theme/appTheme';

// import Icon from 'react-native-vector-icons/Ionicons';
// import Carousel from 'react-native-snap-carousel';

interface Props extends StackScreenProps<any, any> {}

export const GaleriaScreen = ({ navigation }: Props) => {

  const { imageURLs, takePhotoFromGalery, loadingImages } = useGaleriaPhotos();

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

      <ScrollView>
        <View style={{ 
          justifyContent: 'center', 
          alignItems: 'center', 
          marginVertical: 10 
        }}>

          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>

            { 
              loadingImages ? (
                <ActivityIndicator 
                  size={ 50 }
                  color={ 'blue' }
                />
              ) : ( 
                imageURLs &&
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
                        style={{ width: 120, height: 120, margin: 3 }}  
                      />
                    </TouchableOpacity>
                  )) 
              )
            }
          </View>
        </View>
      </ScrollView>
    </View>
  )
}



// const myCld = new Cloudinary({
//   cloud: {
//     cloudName: 'dr6b4izzt',
//   },
// });

// const myImage = myCld.image('cld-sample-5').quality(auto());
// const myImage = myCld.image('').quality(auto());


{/*
  <View style={{ height: 440 }}>
    <Carousel 
      data={  }
      renderItem={ ({ item }: any) => <MoviePoster movie={ item } /> }
      sliderWidth={ windowWidth }
      itemWidth={ 300 }
      layout={'default'} 
      // layoutCardOffset={ 20 }
      inactiveSlideOpacity={ 0.9 }
      onSnapToItem={ index => getPosterColors( index ) }
    />
  </View>
*/}