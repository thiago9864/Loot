import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import Global from "../Global";

const CadastroScreen = (props) => {

    let onPressSalvar = () => {
        Global.getInstance().setLogado(true);
        Global.getInstance().updateObserverUsuario();
    }
    return (
        <View style={styles.container}>
            <Text>Tela de cadastro</Text>
            <Button title={'Salvar'} onPress={onPressSalvar}/>
        </View>
    );
};

CadastroScreen.navigationOptions = () => {
    return {
        title: "Cadastro",
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

export default CadastroScreen;
