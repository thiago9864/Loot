import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { AppLoading } from "expo";
import { useFonts } from "@use-expo/font";
import { FontMap } from './assets/Resources';
import Navegacao from './navigation/Navegacao';


export default function App() {
  const [fontsLoaded] = useFonts(FontMap);

  //mostra uma tela de loading se não tiver carregado as fontes
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Navegacao/>
  );
}