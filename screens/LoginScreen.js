import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { IndicesNavegacao } from "../navigation/IndicesNavegacao";

const LoginScreen = (props) => {
    return (
        <View style={styles.container}>
            <Text>Tela de login</Text>
            <Button title={'Cadastro'} onPress={() => props.navigation.navigate(IndicesNavegacao.cadastro)}/>
        </View>
    );
};

LoginScreen.navigationOptions = () => {
    return {
        title: "Login",
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

export default LoginScreen;
