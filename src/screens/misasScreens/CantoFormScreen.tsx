import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { MisaCantosStackParams } from '../../navigator/MisaCantosNavigator';
import CantoForm from '../../components/misas/CantoForm';
import { styles } from '../../theme/appTheme';

interface Props extends StackScreenProps<MisaCantosStackParams, 'CantoFormScreen'>{};

const CantoFormScreen = ({ route, navigation }: Props) => {
    const { nombreMisa } = route.params;    
    const { top } = useSafeAreaInsets();

    return (
        <View style={{ marginTop: top }}>
            <View style={{ 
                flexDirection: 'row', 
                alignItems: 'center', 
                position: 'absolute', 
                zIndex: 999, 
                paddingTop: top,
                backgroundColor: 'white',
                width: '100%',
            }}>
                <TouchableOpacity onPress={ () => navigation.navigate('MisaCantosScreen', { nombreMisa }) }>
                    <Icon name='chevron-back-outline' size={30} />
                </TouchableOpacity>
                <Text style={{ ...styles, fontSize: 28, marginLeft: 15 }}>Agregar Canto</Text>
            </View>
            <CantoForm nombreMisa={ nombreMisa } />
        </View>
    )
}

export default CantoFormScreen;