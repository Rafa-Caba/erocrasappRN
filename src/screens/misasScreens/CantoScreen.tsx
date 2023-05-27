import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { MisaCantosStackParams } from '../../navigator/MisaCantosNavigator';

interface Props extends StackScreenProps<MisaCantosStackParams, 'CantoScreen'>{};

export const CantoScreen = ({ route }: Props) => {

    const { tituloCanto, letraCanto } = route.params

    return (
        <View style={{ margin: 10 }}>
            <Text style={ styles.title }>{ tituloCanto }</Text>
            <ScrollView><Text style={ styles.texto }>{ letraCanto }</Text></ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: 25,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    texto: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
    },
});