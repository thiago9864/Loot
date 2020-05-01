import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import Global from "../Global";

const AddDespRendaScreen = (props) => {
    let onPressSair = () => {
        Global.getInstance().setLogado(false);
        Global.getInstance().updateObserverUsuario();
    }
    return (
        <View style={styles.container}>
            <Text>Tela de cadastro de despesas e rendas</Text>
            <Button title={'Sair'} onPress={onPressSair}/>
        </View>
    )
};

AddDespRendaScreen.navigationOptions = () => {
    return {
        title: "Adicionar Despesa ou Renda",
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

export default AddDespRendaScreen;