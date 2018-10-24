/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type  = {};
export default class App extends Component<> {
  constructor(){
    super()
   this.state={
     resultText:'',
     totalValue:''
   }
  }

  getNumberFromPanel(number){
    //console.log(number)
    switch(number){
      case 'C': this.setState({
                resultText:'',
                })
                
                break;
      case '=': if(this.validateText())
                {  
                this.caluclateExpression()
                }
                break;
      case 'C/E': this.setState({
                  resultText:'',
                  totalValue:''
                  })
                 break;
      case '+/-': let retext=this.state.resultText
                  let len= retext.length
                  retext=retext.slice(0,-1) + "-" + retext.charAt(len-1)
                  this.setState({
                    resultText: retext
                  })
                  break;

      default: this.setState({
              resultText:this.state.resultText+number          
    })
    }
  }

  operationSymbol(operator){
    let textLength= this.state.resultText.length
    switch(operator){
      case'Del':let text=this.state.resultText.split('')
                text.pop()
                this.setState({
                resultText:text.join('')
               }) 
               break
      case '+':
      case '-':
      case '/':
      case '*':
      if(this.state.resultText=="" || this.state.resultText.charAt(textLength-1)=='+'|this.state.resultText.charAt(textLength-1)=='-'|
      this.state.resultText.charAt(textLength-1)=='/'| this.state.resultText.charAt(textLength-1)=='*')return  
      this.setState({
        resultText:this.state.resultText+operator
      })       

    }
  }

  caluclateExpression(){
    
    this.setState({
      totalValue:eval(this.state.resultText)
    })

  }

  validateText(){
    let textLength= this.state.resultText.length
    if(this.state.resultText.charAt(textLength-1)=='+'|this.state.resultText.charAt(textLength-1)=='-'|
    this.state.resultText.charAt(textLength-1)=='/'| this.state.resultText.charAt(textLength-1)=='*')
    return false
    else return true
  }

  render() {
    let a=[["C","+/-","C/E"],[1,2,3],[4,5,6],[7,8,9],[0,".","="]];
    let numberElementsOuter=[]
    for(let i=0;i<5;i++){
      let numberElementsInner=[]
      for(let j=0;j<3;j++){
        numberElementsInner.push(<TouchableOpacity style={styles.btnText} 
        onPress={()=> this.getNumberFromPanel(a[i][j])}>
        <Text style={styles.numberText}>{a[i][j]}</Text></TouchableOpacity>)
      }
      numberElementsOuter.push(<View style={styles.row}>{numberElementsInner}</View>)
    }
    let opr=["Del","/","*","-","+"]
    let operators=[]
    for(let i=0;i<5;i++){
      operators.push(<TouchableOpacity style={styles.btnText} onPress={()=>this.operationSymbol(opr[i])}>
        <Text style={styles.oprText}>{opr[i]}</Text>
      </TouchableOpacity>)
    }
 
    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.result}>{this.state.resultText}</Text>
        </View>
        <View style={styles.caluclation}>
        <Text style={styles.caluclation}>{this.state.totalValue}</Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>
           {numberElementsOuter}
          </View>
          <View style={styles.operator}>
            <View style={styles.column}>
              {operators}
            </View>
          </View>
        </View>  
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  result:{
    flex:2,
    backgroundColor:'rgb(192,192,192)',
    alignItems:'flex-end',
    fontSize:30
  },
  caluclation:{
    flex:1,
    backgroundColor:'rgb(192,192,192)',
    alignItems:'flex-end',
    fontSize:30
  },
  buttons:{
    flex:7,
    flexDirection:'row',
  },
  numbers:{
    flex:3,
    backgroundColor:'white',
    
  },

  operator:{
    flex:1,
    backgroundColor:'#000000'
  },

  row:{
    flex:1,
    flexDirection:'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 1,
    borderWidth: 0.5,
    borderColor: '#d6d7da'

  },
  column:{
    flex:1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },

  oprText:{
    fontSize:30,
    alignItems:'center',
    justifyContent:'center',
    color:'white'
  },

  numberText:{
    fontSize:30,
    alignItems:'center',
    justifyContent:'center',
    color:'black'
  },


  btnText:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
   
  }


});
