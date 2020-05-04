import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { ProgressCircle } from "react-native-svg-charts";
import { Fonts } from "../assets/Resources";

const ItemRenda = ({ item }) => {

    const styles = StyleSheet.create({
        item: {
            flex: 1,
            flexDirection: "row",
            backgroundColor: '#ffffff00',
            paddingHorizontal: 0,
            marginVertical: 0,
            borderBottomColor: '#C7B4B4',
            borderBottomWidth: 1,
        },
        descricao: {
            flex: 2,
            paddingVertical: 8,
            paddingStart: 8,
            textAlign: "left",
            fontFamily: Fonts.openSansLight,
            fontSize: 16,
            borderRightColor: '#4A3D3D',
            borderRightWidth: 1,
        },
        valor: {
            flex: 1,
            paddingVertical: 8,
            paddingStart: 8,
            textAlign: "left",
            fontFamily: Fonts.openSansLight,
            fontSize: 16,
        },
        dia: {
            flex: 1,
            paddingVertical: 8,
            textAlign: "center",
            fontFamily: Fonts.openSansLight,
            fontSize: 16,
            borderRightColor: '#4A3D3D',
            borderRightWidth: 1,
        }
    })

    return (
        <View style={styles.item}>
            <Text style={styles.descricao}>{item.descricao}</Text>
            <Text style={styles.dia}>{item.data.split('-')[0]}</Text>
            <Text style={styles.valor}>$ {item.valor.toFixed(2)}</Text>
        </View>
    )
}

const ListaGastosScreen = (props) => {
    const params = props.route.params;
    const percentage = parseFloat(params.categoria.gasto) / parseFloat(params.categoria.renda);
    console.log('params',params)
    return (
        <View style={styles.container}>

            <View style={[styles.itemHeader, { backgroundColor: params.categoryProps.backgroundColor }]}>
                <ProgressCircle
                    style={styles.chart}
                    progress={percentage}
                    progressColor={params.categoryProps.color} />

                <Text style={styles.categoria}>{params.categoryProps.title}</Text>
                <Text style={styles.gasto}>
                    <Text style={{ fontWeight: "bold" }}>$ {params.categoria.gasto.toFixed(2)} </Text>
                    / $ {params.categoria.renda.toFixed(2)}
                </Text>
            </View>

            <View style={[styles.containerFlatlist]}>
                <View style={[styles.bgLista, { backgroundColor: params.categoryProps.backgroundColor }]} />
                <View style={styles.header}>
                    <Text style={styles.headerDesc}>Descrição</Text>
                    <Text style={styles.headerDia}>Dia</Text>
                    <Text style={styles.headerValor}>Valor</Text>
                </View>
                <FlatList
                    data={params.gastos}
                    renderItem={({ item }) => {
                        if (item.tipo === 0) {
                            return <ItemRenda item={item} />
                        }
                    }}
                    keyExtractor={({ item, index }) => index}
                />
            </View>
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
    /////
    containerFlatlist: {
        flex: 1,
        alignSelf: 'center',
        width: '95%',
        paddingHorizontal: 8,
    },
    bgLista: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        opacity: 0.5,
    },
    categoria: {
        flex: 2,
        textAlign: "left",
        fontSize: 18
    },
    gasto: {
        flex: 2,
        textAlign: "right",
        fontSize: 14,
        paddingRight: 10
    },
    chart: {
        flex: 1,
        alignItems: "baseline",
        height: 40
    },
    itemHeader: {
        flexDirection: "row",
        backgroundColor: '#F0F0F0',
        paddingTop: 10,
        paddingBottom: 10,
        marginVertical: 0,
        alignItems: "center",
        borderBottomColor: '#cdcdcd',
        borderBottomWidth: 1,
    },
    header: {
        flexDirection: "row",
    },
    headerDesc: {
        flex: 2,
        borderBottomColor: '#4A3D3D',
        borderBottomWidth: 1,
        borderRightColor: '#4A3D3D',
        borderRightWidth: 1,
        textAlign: 'left',
        paddingStart: 8,
        paddingVertical: 8,
        fontFamily: Fonts.openSansLight,
        fontSize: 16
    },
    headerDia: {
        flex: 1,
        borderBottomColor: '#4A3D3D',
        borderBottomWidth: 1,
        borderRightColor: '#4A3D3D',
        borderRightWidth: 1,
        textAlign: 'center',
        paddingVertical: 8,
        fontFamily: Fonts.openSansLight,
        fontSize: 16
    },
    headerValor: {
        flex: 1,
        borderBottomColor: '#4A3D3D',
        borderBottomWidth: 1,
        textAlign: 'left',
        paddingStart: 8,
        paddingVertical: 8,
        fontFamily: Fonts.openSansLight,
        fontSize: 16
    }
});

export default ListaGastosScreen;
