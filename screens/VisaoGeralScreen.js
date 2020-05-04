import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableNativeFeedback } from "react-native";
import { IndicesNavegacao } from "../navigation/IndicesNavegacao";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { FlatList } from "react-native-gesture-handler";
import { ProgressCircle, StackedBarChart } from 'react-native-svg-charts'

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

const geraDadosCategoria = (categorias, gastos) => {

    let categoryData = {}

    // inicializando dados de cada categoria
    Object.entries(categorias).forEach(([key, value]) => {
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

const Categoria = ({ categoria, gastos, navigation }) => {

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

    const categoriaAttr = {
        casa: {
            title: "Casa",
            backgroundColor: "#E76F5166",
            color: "#E76F51"
        },
        educacao: {
            title: "Educação",
            backgroundColor: "#2A9D8F66",
            color: "#2A9D8F"
        },
        transporte: {
            title: "Transporte",
            backgroundColor: "#26465366",
            color: "#264653"
        },
        lazer: {
            title: "Lazer",
            backgroundColor: "#E9C46A66",
            color: "#E9C46A"
        },
        alimentacao: {
            title: "Alimentação",
            backgroundColor: "#F4A26166",
            color: "#F4A261"
        }
    }

    const percentage = parseFloat(categoria.gasto) / parseFloat(categoria.renda);
    const categoryProps = categoriaAttr[categoria.categoria];
    
    const params = {
        categoria : categoria,
        categoryProps: categoryProps,
        gastos : gastos
    }

    return (
        <TouchableNativeFeedback onPress={() => navigation.navigate(IndicesNavegacao.listaGastos, params)}>

            <View style={{ ...styles.item, backgroundColor: categoryProps.backgroundColor }}>
                <ProgressCircle
                    style={styles.chart}
                    progress={percentage}
                    progressColor={categoryProps.color} />

                <Text style={styles.categoria}>{categoryProps.title}</Text>
                <Text style={styles.gasto}>
                    <Text style={{ fontWeight: "bold" }}>$ {categoria.gasto.toFixed(2)} </Text>
                    / $ {categoria.renda.toFixed(2)}
                </Text>
            </View>

        </TouchableNativeFeedback>
    )
}

const BarraDeGastos = ({ gastos }) => {

    const categorias = ["casa", "educacao", "transporte", "lazer", "alimentacao", "rendaRestante"]
    const colors = ["#E76F51", "#2A9D8F", "#264653", "#E9C46A", "#F4A261", "#ffff"]
    let valores = { rendaRestante: 0.0 }

    gastos.map(item => {
        if (!(item.categoria in valores)) {
            valores[item.categoria] = item.gasto // gasto de cada categoria
            valores["rendaRestante"] += item.renda - item.gasto // renda restante de cada categoria
        } else {
            valores["rendaRestante"] -= item.gasto
            valores[item.categoria] += item.gasto 
        }
    })

    return (
        <View style={{ flex: 1, margin: 10}}>

            <StackedBarChart
                style={{ height: 40 }}
                keys={categorias}
                colors={colors}
                data={[valores]}
                showGrid={false}
                horizontal={true}
            />
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
        renda: 2600.00,
        categorias: {
            casa: 2000.00,
            educacao: 150.00,
            transporte: 150.00,
            lazer: 120.00,
            alimentacao: 400.00
        }
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
            valor: 800.00,
            descricao: "Aluguel",
            tipo: 0,
            categoria: "casa",
            data: "05-02-2020"
        },
        {
            valor: 100.00,
            descricao: "Coach (Samuel)",
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
            valor: 18.00,
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
        },
        {
            valor: 700.00,
            descricao: "Aluguel",
            tipo: 0,
            categoria: "casa",
            data: "05-02-2020"
        },
        {
            valor: 150.00,
            descricao: "Condomínio",
            tipo: 0,
            categoria: "casa",
            data: "05-02-2020"
        },
        {
            valor: 99.00,
            descricao: "Internet",
            tipo: 0,
            categoria: "casa",
            data: "05-02-2020"
        },
    ]

    let onPressListaGastos = () => {
        props.navigation.navigate(IndicesNavegacao.listaGastos)
    }

    return (
        <View style={styles.container}>

            <ScrollView>

                <BarraDeGastos gastos={geraDadosCategoria(userData.categorias, data)} />

                {/* Aba de Renda */}
                <View style={{ flex: 1 }}>
                    <View style={styles.flatlist}>
                        <Text style={{ marginLeft: 10 }}>Rendas</Text>

                        <View style={styles.lineStyle} />

                        {showRenda ?
                            (<Icon.Button
                                name='angle-up' color="black" backgroundColor='#ffff' onPress={ShowHideRenda} />)
                            : (<Icon.Button
                                name='angle-down' color="black" backgroundColor='#ffff' onPress={ShowHideRenda} />)
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

                        <View style={{ ...styles.lineStyle, width: "65.8%" }} />

                        {showGastos ?
                            (<Icon.Button
                                name='angle-up' color="black" backgroundColor='#ffff' onPress={ShowHideGastos} />)
                            : (<Icon.Button
                                name='angle-down' color="black" backgroundColor='#ffff' onPress={ShowHideGastos} />)
                        }
                    </View>

                    {showGastos ? (
                        <FlatList
                            data={geraDadosCategoria(userData.categorias, data)}
                            renderItem={({ item }) =>
                                <Categoria
                                    categoria={item}
                                    // filtrando gastos por categoria
                                    gastos={data.filter((gasto) => {
                                        if (gasto.categoria == item.categoria)
                                            return gasto
                                    })}
                                    navigation={props.navigation} />}
                            keyExtractor={({ item, index }) => index}
                        />
                    ) : null}
                </View>
            </ScrollView>
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
