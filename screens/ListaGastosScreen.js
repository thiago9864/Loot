import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const ItemRenda = ({ item }) => {

    const styles = StyleSheet.create({
        item: {
            flex: 1,
            flexDirection: "row",
            backgroundColor: '#F0F0F0',
            padding: 20,
            marginVertical: 8,
        },
        descricao: {
            flex: 2,
            textAlign: "left",
            fontSize: 16
        },
        valor: {
            flex: 1,
            textAlign: "right",
            fontSize: 16
        }
    })

    return (
        <View style={styles.item}>
            <Text style={styles.descricao}>{item.descricao}</Text>
            <Text style={styles.valor}>$ {item.valor.toFixed(2)}</Text>
        </View>
    )
}

const ListaGastosScreen = (props) => {
    const gastos = props.route.params
    return (
        <View style={styles.container}>            
            <FlatList
                data={gastos}
                renderItem={({ item }) => {
                    if (item.tipo === 0) {
                        return <ItemRenda item={item} />
                    }
                }}
                keyExtractor={({ item, index }) => index}
            />
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
        justifyContent: "center",
    },
});

export default ListaGastosScreen;
