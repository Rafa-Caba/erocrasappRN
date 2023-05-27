import React from 'react';
import { View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { MisaCantosStackParams } from '../../navigator/MisaCantosNavigator';
import CantoForm from '../../components/misas/CantoForm';

interface Props extends StackScreenProps<MisaCantosStackParams, 'CantoFormScreen'>{};

const CantoFormScreen = ({ route }: Props) => {
    const { nombreMisa } = route.params;    

    return (
        <View>
            <CantoForm nombreMisa={ nombreMisa } />
        </View>
    )
}

export default CantoFormScreen;