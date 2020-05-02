import React, { useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { IndicesNavegacao } from "../navigation/IndicesNavegacao";
import Icon from 'react-native-vector-icons/FontAwesome5';
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
            <Text style={styles.valor}>$ {item.valor}</Text>
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

    const data = [
        {
            valor: 80.00,
            descricao: "Conta de Luz",
            tipo: 0,
            categoria: "casa",
            data: "05-02-2020"
        },
        {
            valor: 1800.00,
            descricao: "Bilhetes de Jogo do Bicho",
            tipo: 0,
            categoria: "educacao",
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
                    <Text style={{marginLeft: 10}}>Renda</Text>

                    <View style={styles.lineStyle}/>
                    
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

            {/* Aba de Gastos */}
            <View style={{ flex: 1 }}>
                <View style={styles.flatlist}>
                    <Text style={{marginLeft: 10}}>Gastos</Text>
                    
                    <View style={styles.lineStyle}/>

                    {showGastos ?
                        (<Icon.Button name='angle-up' color="black" backgroundColor='#ffff' onPress={ShowHideGastos} />)
                        : (<Icon.Button name='angle-down' color="black" backgroundColor='#ffff' onPress={ShowHideGastos} />)
                    }
                </View>

                {showGastos ? (
                    <FlatList
                        data={data}
                        renderItem={({ item }) => {
                            if (item.tipo === 0) {
                                return <ItemRenda item={item} />
                            }
                        }}
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
