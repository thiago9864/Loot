import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import SegmentedControlTab from 'react-native-segmented-control-tab';
import Global from "../Global";
import { Colors, Fonts } from '../assets/Resources';

const InputValue = ({ state, setState }) => {

    const styles = StyleSheet.create({
        section: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            marginTop: 25,
            marginBottom: 10,
            paddingTop: 20,
            paddingBottom: 20
        },
        icon: {
            padding: 10,
        },
        input: {
            flex: 1,
            paddingTop: 5,
            paddingRight: 15,
            paddingBottom: 5,
            paddingLeft: 0,
            backgroundColor: '#ffff',
            color: '#424242',
            fontFamily: Fonts.robotoRegular,
            fontSize: 40
        }
    })

    return (
        <View style={styles.section}>
            <Icon style={styles.icon} name="coin" size={55} color={"#FFDF00"} />
            <TextInput
                style={styles.input}
                placeholder="Valor"
                underlineColorAndroid="transparent"
                keyboardType="numeric"
                onChangeText={inputValue => setState({ ...state, value: inputValue })}
            />
        </View>
    )

}

const AddDespRendaScreen = () => {

    const [despesa, setDespesa] = useState(
        {
            value: 0,
            description: "",
            type: 0
        })

    const styles = StyleSheet.create({
        input: {
            flex: 1,
            paddingTop: 15,
            paddingRight: 15,
            paddingBottom: 15,
            paddingLeft: 15,
            backgroundColor: '#dcdcdc',
            color: '#505050',
            fontFamily: "Roboto",
            fontSize: 20,
        },
        tabStyle: {
            padding: 10,
            fontSize: 30,
            height: 50,
            borderColor: Colors.colorPrimary,
        },
        activeTabStyle: {
            padding: 10,
            fontSize: 30,
            height: 50,
            borderColor: Colors.colorPrimary,
            backgroundColor: Colors.colorPrimary
        }
    })

    return (
        <ScrollView>
            <InputValue state={despesa} setState={setDespesa} />

            <TextInput
                placeholder="Descrição"
                placeholderTextColor="#d3d3d3"
                underlineColorAndroid="transparent"
                style={styles.input}
                onChangeText={text => setDespesa({ ...despesa, description: text })}>
            </TextInput>

            <SegmentedControlTab
                values={['Despesa', 'Renda']}
                tabsContainerStyle={{ margin: 10, marginTop: 20 }}
                tabStyle={styles.tabStyle}
                activeTabStyle={styles.activeTabStyle}
                tabTextStyle={{ color: Colors.colorPrimary }}
                selectedIndex={despesa.type}
                onTabPress={value => { setDespesa({ ...despesa, type: value }) }}
            />

            <Icon.Button
                name="plus-circle-outline"
                backgroundColor="#ffff"
                size={50}
                color="#d3d3d3"
                onPress={() => { console.log(despesa) }}
            />
        </ScrollView>
    )
};

AddDespRendaScreen.navigationOptions = () => {
    return {
        title: "Adicionar Despesa ou Renda",
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        fontWeight: "bold",
        fontSize: 30,
        color: "#fb5b5a",
        marginBottom: 40
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
    logoutBtn: {
        backgroundColor: 'grey',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        position: "absolute",
        bottom: 0
    },
});

export default AddDespRendaScreen;
