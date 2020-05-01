import React from "react";
import { StyleSheet, View, Text } from "react-native";

const ListaGastosScreen = (props) => {
    return (
        <View style={styles.container}>
            <Text>Tela da lista de gastos de uma categoria</Text>
        </View>
    );
};

ListaGastosScreen.navigationOptions = () => {
    return {
        title: "Gastos",
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

export default ListaGastosScreen;
