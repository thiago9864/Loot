import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { IndicesNavegacao } from './IndicesNavegacao';
import { MaterialIcons } from '@expo/vector-icons';

import VisaoGeralScreen from '../screens/VisaoGeralScreen';
import AddDespRendaScreen from '../screens/AddDespRendaScreen';
import MapaScreen from '../screens/MapaScreen';
import LoginScreen from '../screens/LoginScreen';
import CadastroScreen from '../screens/CadastroScreen';
import ListaGastosScreen from '../screens/ListaGastosScreen';

import { Colors, Fonts } from '../assets/Resources';
import Global from '../Global';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const defaultStackNavigationOptions = {
    headerStyle: { backgroundColor: Colors.colorPrimary },
    headerTintColor: Colors.white,
    headerTitleStyle: { fontFamily: Fonts.openSansRegular },
    headerBackTitleStyle: { fontFamily: Fonts.openSansRegular },
}

const noBarStackNavigationOptions = {
    headerStyle: { backgroundColor: Colors.colorPrimary },
    headerTintColor: Colors.white,
    headerTitleStyle: { fontFamily: Fonts.openSansRegular },
    headerBackTitleStyle: { fontFamily: Fonts.openSansRegular },
    headerShown: false
}

function VisaoGeralStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name={IndicesNavegacao.visaoGeral} component={VisaoGeralScreen} options={noBarStackNavigationOptions} />
            <Stack.Screen name={IndicesNavegacao.listaGastos} component={ListaGastosScreen} options={defaultStackNavigationOptions} />
        </Stack.Navigator>
    );
}

function CustomTabBar({ state, descriptors, navigation }) {
    return (
        <View style={{ flexDirection: 'row' }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                let icone = '';

                if (route.name == IndicesNavegacao.visaoGeralStack) {
                    icone = 'map';
                } else if (route.name == IndicesNavegacao.addDespesaRenda) {
                    icone = 'add';
                } else if (route.name == IndicesNavegacao.mapa) {
                    icone = 'list';
                }

                return (
                    <TouchableOpacity
                        key={icone}
                        accessibilityRole="button"
                        accessibilityStates={isFocused ? ['selected'] : []}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ flex: 1 }}
                    >
                        <View style={NavStyle.tabItem}>
                            <MaterialIcons name={icone} size={32} color={Colors.white} />
                            <View style={[NavStyle.marcador, { opacity: isFocused ? 1 : 0 }]} />
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

export default function Navegacao() {

    const [logado, setLogado] = useState(false);

    // Similar ao componentDidMount e componentDidUpdate:
    useEffect(() => {
        Global.getInstance().addObserverUsuario('navegacao', (usuario) => {
            setLogado(Global.getInstance().isLogado());
        })
        return function cleanup() {
            Global.getInstance().removeObserverUsuario('navegacao');
        }
    });

    if (!logado) {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name={IndicesNavegacao.login} component={LoginScreen} options={defaultStackNavigationOptions} />
                    <Stack.Screen name={IndicesNavegacao.cadastro} component={CadastroScreen} options={defaultStackNavigationOptions} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }

    return (
        <NavigationContainer>
            <Tab.Navigator tabBar={props => <CustomTabBar {...props} />} initialRouteName={IndicesNavegacao.addDespesaRenda}>
                <Tab.Screen name={IndicesNavegacao.visaoGeralStack} component={VisaoGeralStack} />
                <Tab.Screen name={IndicesNavegacao.addDespesaRenda} component={AddDespRendaScreen} />
                <Tab.Screen name={IndicesNavegacao.mapa} component={MapaScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const NavStyle = StyleSheet.create({
    tabItem: {
        width: '100%',
        height: 80,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: Colors.colorPrimary
    },
    marcador: {
        position: 'absolute',
        width: 65,
        height: 65,
        backgroundColor: Colors.transparent,
        borderColor: Colors.white,
        borderWidth: 8,
        borderRadius: 65 / 2
    },
});
