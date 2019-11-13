import React, { Component } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import params from './params'
import Header from './components/Header'
import LevelSelection from './screens/LevelSelection'
import MineField from './components/MinedField'
import { 
          createMinedBoard, 
          cloneBoard,
          openField,
          hadExplosion,
          wonGame,
          showMines,
          invertFlag,
          flagsUsed
        } from './functions';

export default class App extends Component {
  
  constructor(props){
    super(props)
    this.state = this.createState()
  }

  minesAmount = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return Math.ceil(cols * rows * params.difficultLevel)
  }

  createState = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount() 
      return {
        board: createMinedBoard(rows, cols, this.minesAmount()),
        won: false,
        lost: false,
        showLevelSelection: false
      }
  }
  onOpenField = (row, column) => {
    const board = cloneBoard(this.state.board)
    openField(board, row, column)
    const lost = hadExplosion(board)
    const won = wonGame(board)

    if(lost){
      showMines(board)
      Alert.alert('Perdeeeeeu!', 'Não foi dessa vez, tente novamente!!', 
      [ 
        {
          text: 'Tentar Novamente!',
          onPress:() => this.setState(this.createState()),
          style: '',
        },
        {text: 'Voltar', onPress: this.createState}
      ])
    }
    if (won){
      Alert.alert('Voce venceu!', 'Parabéns! Tente novamente em um nível mais difícil clicando na bandeira do Topo.',
      [
        {
          text: 'Jogar Novamente!',
          onPress:() => this.setState(this.createState()),
          style: '',
        },
        {text: 'Voltar', onPress: this.createState}
      ])
    }
    this.setState({board, lost, won})
  }

  onSelectField =  (row, column) => {
    const board = cloneBoard(this.state.board)
    invertFlag(board, row, column)
    const won = wonGame(board)

    if(won){
      Alert.alert('Voce venceu!', 'Parabéns! Tente novamente em um nível mais difícil clicando na bandeira do Topo.',
      [
        {
          text: 'Jogar Novamente!',
          onPress:() => this.setState(this.createState()),
          style: '',
        },
        {text: 'Voltar', onPress: this.createState}
      ])
    }
    this.setState({board, won})
  }

  onLevelSelected = level => {
    params.difficultLevel = level
    this.setState(this.createState())
  }

  render (){
    return (
        <View style={styles.Container}>
          <LevelSelection isVisible={this.state.showLevelSelection}
                          onLevelSelected={this.onLevelSelected}
                          onCancel={() => this.setState({showLevelSelection: false})}/>
          <Header flagsLeft={this.minesAmount() - flagsUsed(this.state.board)}
                  onNewGame={() => this.setState(this.createState())}
                  onFlagPress={() => this.setState({ showLevelSelection: true})}/>
          {/* <Text style={styles.welcome}>Bem vindo ao Mines!!!</Text> */}
          {/* <Text style={styles.instructions}>Tamanho da grade: {params.getRowsAmount()}x{params.getColumnsAmount()} </Text> */}
          <View style={styles.board}>
            <MineField board={this.state.board}
                       onOpenField={this.onOpenField}
                       onSelectField={this.onSelectField}/>
          </View>

        </View>
      
    )
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 25
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#AAA'
  }
});

