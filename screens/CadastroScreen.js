import React from "react";
import { StyleSheet, View, Text, Button, TextInput, ScrollView } from "react-native";
import { Colors, Fonts } from '../assets/Resources';
import Global from "../Global";

import { withFormik } from 'formik';

const onPressSalvar = (values) => {
    console.log(values)
    Global.getInstance().setLogado(true);
    Global.getInstance().updateObserverUsuario();
}

const Categoria = (props) => {
    return (
        <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: "center" }}>
            <Text style={{ flex: 3 }}>{props.title}</Text>
            <TextInput
                underlineColorAndroid="transparent"
                style={{ ...styles.input, flex: 5 }}
                keyboardType="numeric"
                onChangeText={props.callback}>
            </TextInput>
        </View>
    )
}

const CadastroScreen = (props) => {

    return (
        <ScrollView style={styles.container}>

            <View style={styles.section}>

                <Text style={{ ...styles.text }}>Nome:</Text>
                <TextInput
                    underlineColorAndroid="transparent"
                    style={styles.input}
                    onChangeText={text => props.setFieldValue('nome', text)}>
                </TextInput>

                <Text style={styles.text}>E-mail:</Text>
                <TextInput
                    underlineColorAndroid="transparent"
                    style={styles.input}
                    onChangeText={text => props.setFieldValue('email', text)}>
                </TextInput>

                <Text style={styles.text}>Qual é a sua renda mensal?</Text>
                <TextInput
                    underlineColorAndroid="transparent"
                    style={styles.input}
                    keyboardType="numeric"
                    onChangeText={value => props.setFieldValue('renda', value)}>
                </TextInput>

                <Text style={styles.text}>Qual é a sua renda mensal para as seguintes categorias:</Text>

                <Categoria title="Casa:" callback={value => props.setFieldValue('casa', value)} />

                <Categoria title="Educação:" callback={value => props.setFieldValue('educacao', value)} />

                <Categoria title="Alimentação:" callback={value => props.setFieldValue('alimentacao', value)} />

                <Categoria title="Transporte:" callback={value => props.setFieldValue('transporte', value)} />

                <Categoria title="Lazer:" callback={value => props.setFieldValue('lazer', value)} />

                <View style={styles.section}>
                    <Button
                        color={Colors.colorPrimary}
                        title={'Começar a usar'}
                        onPress={props.handleSubmit} />
                </View>
            </View>
        </ScrollView>

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
        flexDirection: "column"
    },
    section: {
        backgroundColor: '#fff',
        marginBottom: 10,
        marginLeft: 25,
        marginRight: 25,
        paddingTop: 20,
        paddingBottom: 20
    },
    text: {
        marginTop: 10
    },
    input: {
        padding: 10,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 10,
        backgroundColor: '#F0F0F0',
        color: '#505050',
        fontFamily: Fonts.robotoRegular,
        fontSize: 15
    }
});

export default withFormik({
    mapPropsToValues: () => ({
        nome: '',
        email: '', 
        renda: 0.0,
        casa: 0.0,
        educacao: 0.0,
        alimentacao: 0.0,
        transporte: 0.0,
        lazer: 0.0
    }),

    handleSubmit: (values) => {
        onPressSalvar(values)
    }
})(CadastroScreen);
