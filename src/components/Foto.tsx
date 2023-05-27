import React from 'react';
import { View, Image } from 'react-native';

interface Props {
    uri: string;
}

export const Foto = ( { uri }: Props ) => {
    return (
        <View>
            {
                uri && (
                    <Image
                        // source={ require(uri) } 
                        style={{width: 370, height: 300}}  
                    /> 

                )
            }
        </View>
    )
}
