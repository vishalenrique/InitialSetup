/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Alert, Modal} from 'react-native';
import { Immersive } from 'react-native-immersive'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = { isFullScreen: true, showModal: false } ;
  }
  componentWillMount(){
    Immersive.addImmersiveListener(this.restoreImmersive)
  }
  componentWillUnmount(){
    Immersive.removeImmersiveListener(this.restoreImmersive)
  }

  restoreImmersive = () =>{
    // console.log('restoreImmersive')
    //  __DEV__ && console.warn('Immersive State Changed!')
    Immersive.on()
  } 

  switchFullScreen = () => {
    this.setState({isFullScreen: !this.state.isFullScreen})
  }
  enterFullScreen = () => {
    console.log('enterFullScreen')
    Immersive.on()
    Immersive.setImmersive(true)
  }
  exitFullScreen = () => {
    console.log('exitFullScreen')
    Immersive.off()
    Immersive.setImmersive(false)
  }
  render() {
    this.state.isFullScreen ? this.enterFullScreen() : this.exitFullScreen()
    return (
      <View style={styles.container}>
        <Text style={styles.welcome} onPress={() => this.switchFullScreen()}>Click to On/Off Fullscreen </Text>
        <Text style = {{padding:20, fontSize:20}} onPress={() => Alert.alert('alert')}>Click for alert</Text>
        <Text  style = {{padding:20, fontSize:20}} onPress={() => this.setState({showModal: true})}>Click for Modal</Text>
        <TextInput
        placeholder='Here'
        />
         <Modal
          transparent={true}
          visible={this.state.showModal}
          animationType="slide"
          style={{justifyContent:'center',alignItems:'center'}}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.')}}
          >
          <View style={{ justifyContent:'center',flex:1,
             alignItems:'center'}}>
          <View style={{
             backgroundColor : '#ABDBDA',
             height : 200,
             width : 200,
             justifyContent:'center',
             alignItems:'center'
          }}>
          <Text  style = {{padding:20, fontSize:20}} onPress={() => this.setState({showModal: false})}>Click to close the Modal</Text>
          <Text style = {{padding:20, fontSize:20}} onPress={() => Alert.alert('alert')}>Click for alert</Text>
          </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
