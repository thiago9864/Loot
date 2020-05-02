import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { IndicesNavegacao } from "../navigation/IndicesNavegacao";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const LoginScreen = (props) => {
    return (
        <View style={styles.container}>

            <View style={styles.btn}>
                <Icon.Button
                    name="google"
                    backgroundColor="#DB4437"
                    borderRadius={10}
                    onPress={() => props.navigation.navigate(IndicesNavegacao.cadastro)}
                >
                    Login with Google
                </Icon.Button>
            </View>

            <View style={styles.btn}>
                <Icon.Button
                    name="facebook"
                    backgroundColor="#3b5998"
                    borderRadius={10}
                    onPress={() => props.navigation.navigate(IndicesNavegacao.cadastro)}
                >
                    Login with Facebook
                </Icon.Button>
            </View>

            <View style={styles.btn}>
                <Icon.Button
                    name="twitter"
                    backgroundColor="#1DA1F2"
                    borderRadius={10}
                    onPress={() => props.navigation.navigate(IndicesNavegacao.cadastro)}
                >
                    Login with Twitter
                </Icon.Button>
            </View>
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
    btn: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: 220
    },
    googleLoginBtn: {
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginHorizontal: 10,
        marginTop: 5,
        marginBottom: 5
    },
    fbLoginBtn: {
        backgroundColor: '#4267b2',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 10
    },
    twitterLoginBtn: {
        backgroundColor: '#1DA1F2',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 10
    },
});

export default LoginScreen;
