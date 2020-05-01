import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { IndicesNavegacao } from "../navigation/IndicesNavegacao";

const VisaoGeralScreen = (props) => {
    let onPressListaGastos = () => {
        props.navigation.navigate(IndicesNavegacao.listaGastos)
    }
    return (
        <View style={styles.container}>
            <Text>Tela de cadastro</Text>
            <Button title={'Lista de Gastos'} onPress={onPressListaGastos}/>
        </View>
    );
};

VisaoGeralScreen.navigationOptions = () => {
    return {
        title: "Visão Geral",
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default VisaoGeralScreen;
