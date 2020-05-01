import React from "react";
import { StyleSheet, View, Text } from "react-native";

const MapaScreen = (props) => {
    return (
        <View style={styles.container}>
            <Text>Tela do mapa</Text>
        </View>
    );
};

MapaScreen.navigationOptions = () => {
    return {
        title: "Mapa",
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

export default MapaScreen;
