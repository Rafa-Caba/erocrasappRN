import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { GaleriaStackParams } from '../../navigator/GaleriaNavigator';

import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '../../theme/appTheme';

const widthScreen = Dimensions.get('screen').width - 40;

interface Props extends StackScreenProps<GaleriaStackParams, 'ImagenScreen'> {}

export const ImagenScreen = ({ route, navigation }: Props) => {

    const url = route.params as any;

    return (
        <SafeAreaView>
            <View style={{ 
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginTop: 30,
            }}>
                <TouchableOpacity
                    activeOpacity={ 0.7 }
                    style={{  }}
                    onPress={ () => navigation.pop() }
                >
                    <Icon 
                        name="chevron-back-outline" 
                        color="rgba(0,0,0,0.6)"
                        size={30} 
                        style={{ marginLeft: 10 }}
                    />
                </TouchableOpacity>
                
                <Text style={{ ...styles.title, fontSize: 28, marginRight: 60 }}>EroCras App</Text>
            </View>

            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: 50,
            }}>
                <Image 
                    source={{ uri: url }}
                    style={{ width: widthScreen, height: 350 }}
                />
            </View>
        </SafeAreaView>
    )
}
