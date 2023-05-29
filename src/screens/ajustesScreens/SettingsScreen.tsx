import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Icon from 'react-native-vector-icons/Ionicons';

import { AuthContext } from '../../context/AuthContext';
import { styles } from '../../theme/appTheme';

interface Props extends StackScreenProps<any, any> {}

export const SettingsScreen = ({ navigation }: Props) => {

    const { logOut } = useContext(AuthContext);
    const inserts = useSafeAreaInsets();

    return (
        <View style={{ ...styles.globalMargin, flex: 1, marginHorizontal: 20, marginTop: inserts.top + 20 }}>
            <Text style={ styles.title }>Ajustes</Text>

            <View style={{
                flex: 1,
                marginVertical: 30,
            }}>
                <TouchableOpacity 
                    style={{ borderRadius: 15, marginVertical: 5, flexDirection: 'row', alignItems: 'center' }}
                    activeOpacity={ 0.4 }
                    onPress={ () => navigation.navigate( 'PerfilScreen' ) }
                >
                    <Icon name="person-sharp" size={35} color="black"  />
                    <Text style={{ 
                        ...styles.title,
                        marginLeft: 10, 
                        fontSize: 30,
                        color: '#000',
                        top: 3
                    }}>
                        Perfil
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={{ borderRadius: 15, marginVertical: 5, flexDirection: 'row', alignItems: 'center' }}
                    activeOpacity={ 0.4 }
                    onPress={ () => navigation.navigate( 'EditarPerfilScreen' ) }
                >
                    <Icon name="person-sharp" size={35} color="black"  />
                    <Text style={{ 
                        ...styles.title,
                        marginLeft: 10, 
                        fontSize: 30,
                        color: '#000',
                        top: 3
                    }}>
                        Editar Perfil
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={{ borderRadius: 15, marginVertical: 5, flexDirection: 'row', alignItems: 'center' }}
                    activeOpacity={ 0.4 }
                    onPress={ () => logOut() }
                >
                    <Icon name="exit-outline" size={35} color="black"  />
                    <Text style={{ 
                        ...styles.title,
                        marginLeft: 10, 
                        fontSize: 30,
                        color: '#000',
                        top: 3
                    }}>
                        Cerrar Sesión
                    </Text>
                </TouchableOpacity>
                <Icon name="musical-notes" size={150} color="rgba(0,0,0,.4)"  
                    style={{ alignSelf: 'center', marginTop: 60 }}
                />
            </View>


            <View style={{ marginBottom: 20, alignSelf: 'center' }}>
                <Text style={{ 
                    fontWeight: 'bold', 
                    textAlign: 'center' 
                }}>
                    Acerca de: 
                </Text>
                <Text style={{ 
                    fontWeight: 'bold', 
                    textAlign: 'center' 
                }}>
                    Rafael Cabanillas - 2023
                </Text>
            </View>
        </View>
    )
}
