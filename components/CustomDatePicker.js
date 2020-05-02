import React from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import { Fonts, Colors } from '../assets/Resources';
import DateHelper from '../utils/DateHelper';

export default class CustomDatePicker extends React.Component {

    constructor(props) {
        super(props);

        this.dateFormat = 'DD/MM/YYYY';//Formato brasileiro
        this.dataReferencia = DateHelper.dateWithStringAndFormat(this.props.value, this.dateFormat);
        if(this.dataReferencia == null){
            this.dataReferencia = new Date();
        }

        this.state = {
            dia: DateHelper.getMonthDayInDate(this.dataReferencia),
            mes: DateHelper.getMonthInDate(this.dataReferencia),
            ano: DateHelper.getYearInDate(this.dataReferencia)
        }
    }

    componentDidMount(){
        console.log('componentDidMount');
        console.log(this.state.mes);
        setTimeout(()=>{
            if(this.flatListDia){
                this.flatListDia.scrollToIndex({animated: true, index: this.state.dia-1, viewOffset: 0, viewPosition: 0.5});
            }
            if(this.flatListMes){
                this.flatListMes.scrollToIndex({animated: true, index: this.state.mes, viewOffset: 0, viewPosition: 0.5});
            }
            if(this.flatListAno){
                let anoAtual = DateHelper.getYearInDate(new Date());
                this.flatListAno.scrollToIndex({animated: true, index: anoAtual-this.state.ano, viewOffset: 0, viewPosition: 0.5});
            }
        },500);
    }

    updateData = (d, m, a) => {
        this.setState({
            dia: d,
            mes: m,
            ano: a
        });
    }

    render(){

        let meses = [
            { id: 0, nome: 'Jan' },
            { id: 1, nome: 'Fev' },
            { id: 2, nome: 'Mar' },
            { id: 3, nome: 'Abr' },
            { id: 4, nome: 'Mai' },
            { id: 5, nome: 'Jun' },
            { id: 6, nome: 'Jul' },
            { id: 7, nome: 'Ago' },
            { id: 8, nome: 'Set' },
            { id: 9, nome: 'Out' },
            { id: 10, nome: 'Nov' },
            { id: 11, nome: 'Dez' }
        ];
        let dias = [];
        let anos = [];
    
        let anoAtual = DateHelper.getYearInDate(new Date());
    
        for (let a = anoAtual; a >= 1950; a--) {
            anos.push(a);
        }
    
        for (let d = 1; d <= DateHelper.getNumberOfDaysInMonth(this.dataReferencia); d++) {
            dias.push(d);
        }
        console.log(this.props);
        return (
            <View style={[{ flexDirection: 'row' }, this.props.style]}>
                <View style={DatePickerStyle.dateLists}>
                    <FlatList
                        data={dias}
                        ref={ref => { this.flatListDia = ref; }}
                        onScrollToIndexFailed={(e)=>{console.log(e)}}
                        keyExtractor={item => item.toString()}
                        style={DatePickerStyle.flatList}
                        scrollEnabled={true}
                        horizontal={false}
                        renderItem={({ item }) => (
                            ////////////
                            <TouchableWithoutFeedback onPress={() => { this.updateData(item, this.state.mes, this.state.ano); }}>
                                <View style={DatePickerStyle.itemContainer}>
                                    <View style={item == this.state.dia ? DatePickerStyle.itemContainerSelection : null} />
                                    <Text style={[DatePickerStyle.itemText, item == this.state.dia ? DatePickerStyle.itemTextSelection : null]}>{item}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            ////////////
                        )}
                    />
                    <View style={DatePickerStyle.linhaDivisor} />
                    <FlatList
                        data={meses}
                        ref={ref => { this.flatListMes = ref; }}
                        onScrollToIndexFailed={(e)=>{console.log(e)}}
                        keyExtractor={item => item.id.toString()}
                        style={DatePickerStyle.flatList}
                        scrollEnabled={true}
                        horizontal={false}
                        renderItem={({ item }) => (
                            ////////////
                            <TouchableWithoutFeedback onPress={() => { this.updateData(this.state.dia, item.id, this.state.ano); }}>
                                <View style={DatePickerStyle.itemContainer}>
                                    <View style={item.id == this.state.mes ? DatePickerStyle.itemContainerSelection : null} />
                                    <Text style={[DatePickerStyle.itemText, item.id == this.state.mes ? DatePickerStyle.itemTextSelection : null]}>{item.nome}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            ////////////
                        )}
                    />
                    <View style={DatePickerStyle.linhaDivisor} />
                    <FlatList
                        data={anos}
                        ref={ref => { this.flatListAno = ref; }}
                        onScrollToIndexFailed={(e)=>{console.log(e)}}
                        keyExtractor={item => item.toString()}
                        style={DatePickerStyle.flatList}
                        scrollEnabled={true}
                        horizontal={false}
                        renderItem={({ item }) => (
                            ////////////
                            <TouchableWithoutFeedback onPress={() => { this.updateData(this.state.dia, this.state.mes, item); }}>
                                <View style={DatePickerStyle.itemContainer}>
                                    <View style={item == this.state.ano ? DatePickerStyle.itemContainerSelection : null} />
                                    <Text style={[DatePickerStyle.itemText, item == this.state.ano ? DatePickerStyle.itemTextSelection : null]}>{item}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            ////////////
                        )}
                    />
                </View>
            </View>
        )
    }
}

const DatePickerStyle = StyleSheet.create({
    dateLists: {
        flexDirection: 'row',
    },
    flatList: {
        width: 80,
        height: 120,
    },
    itemContainer: {
        width: 80,
        height: 40,
        paddingHorizontal: 8,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    itemContainerSelection: {
        position: 'absolute',
        width: 40,
        height: 40,
        backgroundColor: Colors.verde1,
        borderRadius: 8,
    },
    itemText: {
        fontSize: 14,
        fontFamily: Fonts.openSansRegular,
        color: Colors.black,
    },
    itemTextSelection: {
        color: Colors.white,
    },
    linhaDivisor: {
        width: 1,
        height: '100%',
        backgroundColor: Colors.azul2
    }
});

//export default CustomDatePicker;