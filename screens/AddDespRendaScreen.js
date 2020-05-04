import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button, ScrollView } from "react-native";
import SegmentedControlTab from 'react-native-segmented-control-tab';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors, Fonts } from '../assets/Resources';
import CustomDatePicker from "../components/CustomDatePicker";
import Global from "../Global";

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
            paddingRight: 10,
            paddingLeft: 10,
            color: '#424242',
            fontFamily: Fonts.robotoLight,
            fontSize: 45
        },
        input: {
            flex: 1,
            paddingTop: 5,
            paddingRight: 15,
            paddingBottom: 5,
            paddingLeft: 0,
            backgroundColor: '#ffff',
            color: '#424242',
            fontFamily: Fonts.robotoLight,
            fontSize: 40
        }
    })

    return (
        <View style={styles.section}>
            <Text style={styles.icon}>$</Text>
            <TextInput
                style={styles.input}
                placeholder="0.00"
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
            fontFamily: Fonts.robotoRegular,
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
        },
        labelData: {
            width: '100%',
            textAlign: 'center',
            paddingVertical: 3,
            color: Colors.black,
            fontFamily: Fonts.openSansRegular,
            fontSize: 20,
        }
    })

    return (
        <ScrollView>
            <InputValue state={despesa} setState={setDespesa} />

            <TextInput
                placeholder="Descrição"
                placeholderTextColor="#a9a9a9"
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

            <CustomDatePicker
                onSelectDate={(date) => { console.log('data:', date); }}
                titulo={"Data da Despesa"}
                value={null}//data no formato DD/MM/YYYY, se estiver nulo ele pega a data atual
                horizontal={true}
            />

            <Icon.Button
                name="plus"
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

export default AddDespRendaScreen;
