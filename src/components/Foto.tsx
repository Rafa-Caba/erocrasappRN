import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

interface Props {
    uri: string;
}

export const Foto = ({ uri }: Props) => {
    return (
        <View style={ styles.imageContainer }>
            {
                uri && (
                    <Image
                        source={{ uri }} 
                        style={ styles.image }
                    /> 

                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        borderRadius: 18,
    },
    imageContainer: {
        flex: 1,
        borderRadius: 18,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.24,
        shadowRadius: 7,

        elevation: 7,
    }
});