import React from 'react';
import { View, 
  Text, Image, Dimensions,
  ScrollView, TouchableOpacity 
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useGaleriaPhotos } from '../../hooks/useGaleriaPhotos';
import Carousel from 'react-native-snap-carousel';
import { map } from 'lodash';
import { LoadingScreen } from '../LoadingScreen';
import { Foto } from '../../components/Foto';
import { Boton } from '../../components/Boton';
import { styles } from '../../theme/appTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const windowWidth = Dimensions.get('window').width;

interface Props extends StackScreenProps<any, any> {}

export const GaleriaScreen = ({ navigation }: Props) => {

  const { imageURLs, takePhotoFromGalery } = useGaleriaPhotos();
  const { top } = useSafeAreaInsets();

  if ( !imageURLs ) {
    return <LoadingScreen />
  }
  
  return (
    <View style={{ ...styles.globalMargin, marginTop: top + 10, flex: 1 }}>
      <View style={{  
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10,
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ ...styles.title, fontSize: 28, marginLeft: 5 }}>Galeria</Text>
        </View>

        <Boton botonTexto="Agregar Imagen" accion={ takePhotoFromGalery } />
      </View>

      <>
        { imageURLs && (
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
                renderItem={ ({ item, index }) => <Foto uri={ item } key={ index } /> }
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
            top: 230,
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
                    { imageURL &&
                      <Image 
                        source={{ uri: imageURL }} 
                        style={{ width: windowWidth / 5, height: 80, marginHorizontal: 4, marginVertical: 3 }}  
                      />
                    }
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
