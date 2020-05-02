import React from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, FlatList } from 'react-native';
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
            ano: DateHelper.getYearInDate(this.dataReferencia),
            horizontal : this.props.horizontal != null ? this.props.horizontal : false
        }
    }

    componentDidMount(){
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

        if (d != null && m != null && a != null) {
            //data pode ser validada
            let dateValidar = new Date(a, m, d);
            if (dateValidar) {
                let validDateString = DateHelper.stringWithDateAndFormat(dateValidar, this.dateFormat);
                
                if (this.props.onSelectDate) {
                    this.props.onSelectDate(validDateString);
                }
            }
        } 
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
        
        return (
            <View style={[{ flexDirection: 'column' }, DatePickerStyle.container, this.props.style]}>
                <View style={this.state.horizontal ? DatePickerStyle.dateListsHor : DatePickerStyle.dateListsVer}>
                    <FlatList
                        data={dias}
                        ref={ref => { this.flatListDia = ref; }}
                        onScrollToIndexFailed={(e)=>{console.log(e)}}
                        keyExtractor={item => item.toString()}
                        style={this.state.horizontal ? DatePickerStyle.flatListHor : DatePickerStyle.flatListVer}
                        scrollEnabled={true}
                        horizontal={this.state.horizontal}
                        renderItem={({ item }) => (
                            ////////////
                            <TouchableWithoutFeedback onPress={() => { this.updateData(item, this.state.mes, this.state.ano); }}>
                                <View style={this.state.horizontal ? DatePickerStyle.itemContainerHor : DatePickerStyle.itemContainerVer}>
                                    <View style={item == this.state.dia ? DatePickerStyle.itemContainerSelection : null} />
                                    <Text style={[DatePickerStyle.itemText, item == this.state.dia ? DatePickerStyle.itemTextSelection : null]}>{item}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            ////////////
                        )}
                    />
                    <View style={this.state.horizontal ? DatePickerStyle.linhaDivisorHor : DatePickerStyle.linhaDivisorVer} />
                    <FlatList
                        data={meses}
                        ref={ref => { this.flatListMes = ref; }}
                        onScrollToIndexFailed={(e)=>{console.log(e)}}
                        keyExtractor={item => item.id.toString()}
                        style={this.state.horizontal ? DatePickerStyle.flatListHor : DatePickerStyle.flatListVer}
                        scrollEnabled={true}
                        horizontal={this.state.horizontal}
                        renderItem={({ item }) => (
                            ////////////
                            <TouchableWithoutFeedback onPress={() => { this.updateData(this.state.dia, item.id, this.state.ano); }}>
                                <View style={this.state.horizontal ? DatePickerStyle.itemContainerHor : DatePickerStyle.itemContainerVer}>
                                    <View style={item.id == this.state.mes ? DatePickerStyle.itemContainerSelection : null} />
                                    <Text style={[DatePickerStyle.itemText, item.id == this.state.mes ? DatePickerStyle.itemTextSelection : null]}>{item.nome}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            ////////////
                        )}
                    />
                    <View style={this.state.horizontal ? DatePickerStyle.linhaDivisorHor : DatePickerStyle.linhaDivisorVer} />
                    <FlatList
                        data={anos}
                        ref={ref => { this.flatListAno = ref; }}
                        onScrollToIndexFailed={(e)=>{console.log(e)}}
                        keyExtractor={item => item.toString()}
                        style={this.state.horizontal ? DatePickerStyle.flatListHor : DatePickerStyle.flatListVer}
                        scrollEnabled={true}
                        horizontal={this.state.horizontal}
                        renderItem={({ item }) => (
                            ////////////
                            <TouchableWithoutFeedback onPress={() => { this.updateData(this.state.dia, this.state.mes, item); }}>
                                <View style={this.state.horizontal ? DatePickerStyle.itemContainerHor : DatePickerStyle.itemContainerVer}>
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
    container: {
        marginHorizontal: 16,
        borderColor: Colors.verdeBorda,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: Colors.verde2
    },  
    dateListsVer: {
        flexDirection: 'row',
    },
    dateListsHor: {
        flexDirection: 'column',
    },
    flatListVer: {
        width: 80,
        height: 120,
    },
    flatListHor: {
        width: '100%',
        height: 50,
    },
    itemContainerVert: {
        width: 80,
        height: 40,
        paddingHorizontal: 8,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    itemContainerHor: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        padding: 0
    },
    itemContainerSelection: {
        position: 'absolute',
        width: 40,
        height: 40,
        backgroundColor: Colors.white,
        borderRadius: 20,
    },
    itemText: {
        fontSize: 14,
        fontFamily: Fonts.robotoMedium,
        color: Colors.white,
    },
    itemTextSelection: {
        color: Colors.verdeBorda,
    },
    linhaDivisorVer: {
        width: 1,
        height: '100%',
        backgroundColor: Colors.verde1
    },
    linhaDivisorHor: {
        width: '100%',
        height: 1,
        backgroundColor: Colors.verdeBorda
    }
});
