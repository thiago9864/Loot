import React from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, FlatList } from 'react-native';
import { Fonts, Colors } from '../assets/Resources';
import DateHelper from '../utils/DateHelper';
import { MaterialIcons } from '@expo/vector-icons'

export default class CustomDatePicker extends React.Component {

    constructor(props) {
        super(props);

        this.dateFormat = 'DD/MM/YYYY';//Formato brasileiro
        this.dataReferencia = DateHelper.dateWithStringAndFormat(this.props.value, this.dateFormat);
        if (this.dataReferencia == null) {
            this.dataReferencia = new Date();
        }

        this.state = {
            dia: DateHelper.getMonthDayInDate(this.dataReferencia),
            mes: DateHelper.getMonthInDate(this.dataReferencia),
            ano: DateHelper.getYearInDate(this.dataReferencia),
            horizontal: this.props.horizontal != null ? this.props.horizontal : false,
            dimension: null
        }
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

    render() {
        if (this.state.dimension == null) {
            return <View onLayout={event => { this.setState({ dimension: event.nativeEvent.layout }) }} />
        }

        let numItens = 9;
        let numEspacosExtra = Math.floor(numItens / 2) - 1;
        let Style = this.state.horizontal ? StyleHor : StyleVer;
        let itemWidth = this.state.dimension.width / numItens;

        const nomeMeses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

        let dias = [];
        let meses = [];
        let anos = [];

        let anoAtual = DateHelper.getYearInDate(new Date());
        let numDiasMes = DateHelper.getNumberOfDaysInMonth(this.dataReferencia);

        //gera espacos iniciais
        for (let d = 0; d < numEspacosExtra; d++) {
            dias.push({ id: d, valor: '', label: '' });
            meses.push({ id: d, valor: '', label: '' });
            anos.push({ id: d, valor: '', label: '' });
        }

        //gera dataset de anos
        for (let i = 0; i <= anoAtual - 1950; i++) {
            anos.push({ 
                id: i + numEspacosExtra, 
                valor: anoAtual - i, 
                label: (anoAtual - i).toString()
            });
        }

        //gera dataset de meses
        for (let i = 0; i < nomeMeses.length; i++) {
            meses.push({ 
                id: i + numEspacosExtra, 
                valor: i, 
                label: nomeMeses[i]
            });
        }

        //gera dataset de dias
        for (let d = 1; d <= numDiasMes; d++) {
            dias.push({ 
                id: d + numEspacosExtra, 
                valor: d,
                label: d.toString()
            });
        }

        //gera espacos finais
        for (let d = 0; d < numEspacosExtra; d++) {
            dias.push({ id: d + numDiasMes + numEspacosExtra + 1, valor: '', label: '' });
            meses.push({ id: d + nomeMeses.length + numEspacosExtra, valor: '', label: '' });
            anos.push({ id: d + anoAtual - 1950 + numEspacosExtra + 1, valor: '', label: '' });
        }

        //console.log('meses:',meses);

        return (
            <View style={[Style.container, this.props.style]}>
                <Text style={Style.titulo}>{this.props.titulo}</Text>
                <View style={{paddingHorizontal: 16}}>
                    <View style={Style.linha} />
                </View>
                <View style={Style.containerListas}>
                    <View style={[Style.selecionado, { width: itemWidth }]} />
                    <Lista
                        dataset={dias}
                        horizontal={this.state.horizontal}
                        itemWidth={itemWidth}
                        numItens={numItens}
                        valorSelecionado={item => this.updateData(item.valor, this.state.mes, this.state.ano)}
                        valor={this.state.dia}
                    />
                    <Lista
                        dataset={meses}
                        horizontal={this.state.horizontal}
                        itemWidth={itemWidth}
                        numItens={numItens}
                        valorSelecionado={item => this.updateData(this.state.dia, item.valor, this.state.ano)}
                        valor={this.state.mes}
                    />
                    <Lista
                        dataset={anos}
                        horizontal={this.state.horizontal}
                        itemWidth={itemWidth}
                        numItens={numItens}
                        valorSelecionado={item => this.updateData(this.state.dia, this.state.mes, item.valor)}
                        valor={this.state.ano}
                    />
                </View>
            </View>
        );
    }
}

class Lista extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            valor: props.valor
        }
        
        this.handleInitialValue(props);

        this.viewabilityConfig = {
            waitForInteraction: true,
            viewAreaCoveragePercentThreshold: 95
        }
        this.handleViewableItemsChanged = this.handleViewableItemsChanged.bind(this)
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps != this.props) {
            this.handleInitialValue(nextProps);
        }
        return true;
    }

    flatListScrollError = (info) => {
        console.log('flatListScrollError:',info);
    }

    handleInitialValue = (props) => {
        this.indiceNoArray = -1;
        this.setMoveList=true;
        //console.log(props.dataset);
        for(let i=0; i<props.dataset.length; i++){
            if(parseInt(props.dataset[i].valor) == parseInt(props.valor)){
                this.indiceNoArray = i;
                this.indiceSel = props.dataset[i].id;
                break;
            }
        }

        
        //console.log('valor:', props.valor,'indiceNoArray:',this.indiceNoArray);
    }

    onLayout = (e) => {
        if (this.flatList && this.setMoveList && this.indiceNoArray > -1) {
            //console.log('scrollToIndex:',this.indiceNoArray)
            this.flatList.scrollToIndex({ 
                animated: true, 
                index: this.indiceNoArray, 
                viewOffset: 0, 
                viewPosition: 0.5 
            });
            this.setMoveList=false;
        }
    }

    handleViewableItemsChanged(info) {
        //console.log(info);
        /*let t = '';
        for (let i in info.viewableItems){
            let viewableItem = info.viewableItems[i];
            t += viewableItem.index + ' ';
        }
        console.log(t);*/
        
        let posicaoSel = Math.floor(this.props.numItens / 2) - 1;
        let elementoSel = info.viewableItems[posicaoSel];

        //console.log('item sel:', elementoSel.item);

        this.indiceSel = elementoSel.item.id;

        if (this.props.valorSelecionado) {
            this.props.valorSelecionado(elementoSel.item);
        }
    }

    render() {

        let Style = this.props.horizontal ? StyleHor : StyleVer;

        return (
            <View style={Style.containerLista}>
                <View style={[Style.setaContainer, { width: this.props.itemWidth }]}>
                    <MaterialIcons name={'keyboard-arrow-left'} size={24} color={'#ccc'} />
                </View>
                <FlatList
                    data={this.props.dataset}
                    ref={ref => { this.flatList = ref; }}
                    onScrollToIndexFailed={(e) => { this.flatListScrollError(e) }}
                    keyExtractor={item => item.id.toString()}
                    style={Style.flatList}
                    scrollEnabled={true}
                    horizontal={this.props.horizontal}
                    snapToInterval={this.props.itemWidth}
                    decelerationRate={"fast"}
                    onViewableItemsChanged={this.handleViewableItemsChanged}
                    viewabilityConfig={this.viewabilityConfig}
                    onLayout={this.onLayout}
                    renderItem={({ item }) => (
                        ////////////
                        <View style={[Style.itemContainer, { width: this.props.itemWidth }]}>
                            <View style={item.id == this.indiceSel ? Style.itemContainerSelection : null} />
                            <Text style={[Style.itemText, item.id == this.indiceSel ? Style.itemTextSelection : null]}>{item.label}</Text>
                        </View>
                        ////////////
                    )}
                    getItemLayout={(data, index) => (
                        {length: this.props.itemWidth, offset: this.props.itemWidth * index, index}
                    )}
                />
                <View style={[Style.setaContainer, { width: this.props.itemWidth }]}>
                    <MaterialIcons name={'keyboard-arrow-right'} size={24} color={'#ccc'} />
                </View>
            </View>
        );

    }
}

const StyleHor = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: '#fff',
    },
    titulo: {
        fontSize: 18,
        fontFamily: Fonts.openSansRegular,
        color: '#000',
        textAlign: 'center'
    },
    linha: {
        width: '100%',
        height: 1,
        backgroundColor: Colors.colorPrimary,
        marginBottom: 8,
    },
    selecionado: {
        position: 'absolute',
        height: 40 * 3,
        backgroundColor: Colors.colorPrimary,
        alignSelf: 'center',
        borderRadius: 8
    },
    containerListas: {

    },

    /* Controle Lista */

    containerLista: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#ffffff00',
    },
    flatList: {
        height: 40,
        backgroundColor: '#ffffff00',
    },
    setaContainer: {
        height: 40,
        /*borderColor: '#000',
        borderWidth: 1,*/
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    itemContainer: {
        height: 40,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        padding: 0,
        backgroundColor: '#ffffff00',
        /*borderColor: '#000',
        borderWidth: 1*/
    },
    itemContainerSelection: {
        position: 'absolute',
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    itemText: {
        fontSize: 14,
        fontFamily: Fonts.robotoRegular,
        color: '#aaa',
    },
    itemTextSelection: {
        fontFamily: Fonts.robotoBold,
        color: '#fff',
    },
});

const StyleVer = StyleSheet.create({

});

