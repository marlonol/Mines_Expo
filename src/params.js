import { Dimensions } from 'react-native'


const params = {
    blockSize: 30,
    borderSize: 5,
    fontSize: 15,
    headerRadio: 0.15, // Proporcao do painel superior da tela 
    difficultLevel: 0.05, 
    getColumnsAmount(){
        const width = Dimensions.get('window').width
        return Math.floor(width / this.blockSize)
    },
    getRowsAmount(){
        const totalHeight = Dimensions.get('window').height
        const boardHeight = totalHeight * (1 - this.headerRadio)
        return Math.floor(boardHeight / this.blockSize)
    }
}
export default params 
