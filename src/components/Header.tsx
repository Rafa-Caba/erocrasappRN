import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, StatusBar } from 'react-native';

const Header = () => {
    return (
        <SafeAreaView>
            <StatusBar />
            <View style={ styles.eroCrasTop }>
                <Text style={ styles.eroCrasTopTitle }>EroCras App</Text>
                <Image 
                    source={ require('./../img/EroCras4.jpg') }
                    style={ styles.eroCrasTopImage }
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    eroCrasTop: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '97%',
        height: 50,
        backgroundColor: '#AC75FF',
        paddingHorizontal: 10,
        marginTop: 6,
        marginHorizontal: 7
    },
    eroCrasTopTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center',
    },
    eroCrasTopImage: {
        width: 38, 
        height: 38,
        alignSelf: 'center',
    },
});

export default Header