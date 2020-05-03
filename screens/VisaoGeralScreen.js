import React, { useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { IndicesNavegacao } from "../navigation/IndicesNavegacao";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { FlatList } from "react-native-gesture-handler";
import { ProgressCircle } from 'react-native-svg-charts'

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
            <Text style={styles.valor}>$ {item.valor}</Text>
        </View>
    )
}

const geraDadosCategoria = (userData, gastos) => {

    let categoryData = {}

    // inicializando dados de cada categoria
    Object.entries(userData).forEach(([key, value]) => {
        categoryData[key] = { renda: value, gasto: 0.0 }
    })

    // atribuindo valor de cada item a sua respectiva categoria
    gastos.map(item => {
        if (item.tipo === 0) {
            categoryData[item.categoria].gasto += item.valor
        }
    })

    // reorganizando dict para uma lista de dicts
    let categoryArray = []
    Object.entries(categoryData).forEach(([key, value]) => {
        categoryArray.push({ ...value, categoria: key })
    })

    return categoryArray
}

const Categoria = ({ item }) => {

    const styles = StyleSheet.create({
        item: {
            flex: 1,
            flexDirection: "row",
            backgroundColor: '#F0F0F0',
            paddingTop: 10,
            paddingBottom: 10,
            marginVertical: 8,
            alignItems: "center"
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
        }
    })

    const percentage = parseFloat(item.gasto) / parseFloat(item.renda)

    return (
        <View style={styles.item}>
            <ProgressCircle
                style={styles.chart}
                progress={percentage}
                progressColor={'rgb(134, 65, 244)'} />

            <Text style={styles.categoria}>{item.categoria}</Text>
            <Text style={styles.gasto}>
                $ {item.gasto} /
                <Text style={{ fontWeight: "bold" }}> $ {item.renda}</Text>
            </Text>
        </View>
    )
}

const VisaoGeralScreen = (props) => {

    const [showRenda, setShowRenda] = useState(true)
    const [showGastos, setShowGastos] = useState(true)

    const ShowHideRenda = () => {
        if (showRenda == true) {
            setShowRenda(false)
        } else {
            setShowRenda(true)
        }
    }

    const ShowHideGastos = () => {
        if (showGastos == true) {
            setShowGastos(false)
        } else {
            setShowGastos(true)
        }
    }

    const userData = {
        casa: 900.00,
        educacao: 150.00,
        transporte: 150.00,
        lazer: 100.00,
        alimentacao: 400.00
    }

    const data = [
        {
            valor: 80.00,
            descricao: "Conta de Luz",
            tipo: 0,
            categoria: "casa",
            data: "05-02-2020"
        },
        {
            valor: 100.00,
            descricao: "Coach",
            tipo: 0,
            categoria: "educacao",
            data: "05-02-2020"
        },
        {
            valor: 100.00,
            descricao: "Japones do Cleber",
            tipo: 0,
            categoria: "alimentacao",
            data: "05-02-2020"
        },
        {
            valor: 85.50,
            descricao: "Mais uma Skin da Lux",
            tipo: 0,
            categoria: "lazer",
            data: "05-02-2020"
        },
        {
            valor: 84.50,
            descricao: "Uber",
            tipo: 0,
            categoria: "transporte",
            data: "05-02-2020"
        },
        {
            valor: 1800.00,
            descricao: "Bilhetes de Jogo do Bicho",
            tipo: 0,
            categoria: "lazer",
            data: "05-02-2020"
        },
        {
            valor: 800.00,
            descricao: "Jogo do Bicho",
            tipo: 1,
            categoria: "outros",
            data: "05-02-2020"
        },
        {
            valor: 1800.00,
            descricao: "Agiota",
            tipo: 1,
            categoria: "outros",
            data: "05-02-2020"
        }
    ]

    let onPressListaGastos = () => {
        props.navigation.navigate(IndicesNavegacao.listaGastos)
    }

    return (
        <View style={styles.container}>
            <View style={{ alignItems: "center" }}>
                <Text>Tela de cadastro</Text>
                <Button title={'Lista de Gastos'} onPress={onPressListaGastos} />
            </View>

            {/* Aba de Renda */}
            <View style={{ flex: 1 }}>
                <View style={styles.flatlist}>
                    <Text style={{ marginLeft: 10 }}>Renda</Text>

                    <View style={styles.lineStyle} />

                    {showRenda ?
                        (<Icon.Button name='angle-up' color="black" backgroundColor='#ffff' onPress={ShowHideRenda} />)
                        : (<Icon.Button name='angle-down' color="black" backgroundColor='#ffff' onPress={ShowHideRenda} />)
                    }
                </View>

                {showRenda ? (
                    <FlatList
                        data={data}
                        renderItem={({ item }) => {
                            if (item.tipo === 1) {
                                return <ItemRenda item={item} />
                            }
                        }}
                        keyExtractor={({ item, index }) => index}
                    />
                ) : null}
            </View>

            {/* Aba de Despesas */}
            <View style={{ flex: 2 }}>
                <View style={styles.flatlist}>
                    <Text style={{ marginLeft: 10 }}>Despesas</Text>

                    <View style={{ ...styles.lineStyle, width: "64%" }} />

                    {showGastos ?
                        (<Icon.Button name='angle-up' color="black" backgroundColor='#ffff' onPress={ShowHideGastos} />)
                        : (<Icon.Button name='angle-down' color="black" backgroundColor='#ffff' onPress={ShowHideGastos} />)
                    }
                </View>

                {showGastos ? (
                    <FlatList
                        data={geraDadosCategoria(userData, data)}
                        renderItem={({ item }) => <Categoria item={item} />}
                        keyExtractor={({ item, index }) => index}
                    />
                ) : null}
            </View>
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
        justifyContent: "center",
        marginTop: 25
    },
    flatlist: {
        flexDirection: "row",
        alignItems: "center",
        alignItems: "center"
    },
    lineStyle: {
        backgroundColor: '#A2A2A2',
        height: 1,
        width: "70%",
        margin: 10
    }
});

export default VisaoGeralScreen;
