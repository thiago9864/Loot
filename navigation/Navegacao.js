import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { IndicesNavegacao } from './IndicesNavegacao';

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
            <Tab.Navigator initialRouteName={IndicesNavegacao.addDespesaRenda}>
                <Tab.Screen name={IndicesNavegacao.visaoGeralStack} component={VisaoGeralStack} />
                <Tab.Screen name={IndicesNavegacao.addDespesaRenda} component={AddDespRendaScreen} />
                <Tab.Screen name={IndicesNavegacao.mapa} component={MapaScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}