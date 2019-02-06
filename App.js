/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, Dimensions, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, ImageBackground, TouchableHighlight} from 'react-native';
import { RNCamera } from 'react-native-camera';
import OverlayingImage from './picture.png'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

// const screenWidth = Dimensions.get('window').width,
// const screenHeight = Dimensions.get('window').height

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
     uris:[],
     referenceShown:false
    }
    this.timer = null;
    this.getImages = this.getImages.bind(this)
    this.show = this.show.bind(this)
    this.hide = this.hide.bind(this)
  }

   async takePicture() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      setTimeout(() => {
       this.camera.resumePreview()
      }, 5000)
      const uri = data.uri
      const newData = [...this.state.uris]
      newData.push(uri)
      console.log('newData: ', newData);
      this.setState({
        uris: newData
      })
    }
  }

  getImages(){
    const images = this.state.uris.map((currentItem, index) => {
      console.log('ererrewdw ', currentItem)
      const item = (
        <Image
        style={{width: 50, height: 50}}
        source={{isStatic:true, uri: currentItem}}
        key={index}
      />
      )
      return item
    })
    return images
  }

  show(){
   console.log('Button pressed, Its shown')
   this.setState({
    referenceShown: true
   })
    this.timer = setTimeout(this.show, 500);
  }

  hide(){
    console.log('Button released, Its hidden')
    this.setState({
      referenceShown: false
     })
    clearTimeout(this.timer);
    this.takePicture()
  }


  render() {
    console.log('ghftybgtbff',this.state.uris);
    return (
      // <View style={styles.container}>
      //   <Text style={styles.welcome}>Welcome to React Native!</Text>
      //   <Text style={styles.instructions}>To get started, edit App.js</Text>
      //   <Text style={styles.instructions}>{instructions}</Text>
      // </View>
        <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'black' }}>
        <RNCamera
          ref={(ref) => { this.camera = ref }}
          orientation = {'landscapeRight'}
          style={{ flex: 1}}
          flashMode={RNCamera.Constants.FlashMode.off}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
        >
        {/* {this.state.referenceShown ? <View/>:
        <TouchableOpacity onPressIn={this.show} onPressOut={this.hide} style={{ flex: 0, backgroundColor: '#fff', borderRadius: 5, padding: 15, paddingHorizontal: 20, alignSelf: 'center', margin: 20 }}>
            <Text style={{ fontSize: 14 }}>SHOW</Text>
        </TouchableOpacity>
        } */}
        {this.state.referenceShown
        ? // referenceShown ? ShowOverlat and remove button , SHow Button
        <ImageBackground 
        style={{ flex:1,
          opacity:0.8,
          justifyContent:'flex-end',
          backgroundColor:'#ffffff'
        }}  
        source = {OverlayingImage}  
        resizeMode = {'contain'}    
        >
        {/* <View style={{flexDirection:'row', alignSelf:'center'}}>
        <TouchableOpacity onPress={this.takePicture.bind(this)} style={{ flex: 0, backgroundColor: '#fff', borderRadius: 5, padding: 15, paddingHorizontal: 20, alignSelf: 'center', margin: 20 }}>
            <Text style={{ fontSize: 14 }}> SNAP PLEASE!</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.hide} style={{ flex: 0, backgroundColor: '#fff', borderRadius: 5, padding: 15, paddingHorizontal: 20, alignSelf: 'center', margin: 20 }}>
            <Text style={{ fontSize: 14 }}>HIDE</Text>
          </TouchableOpacity>
        </View> */}
        </ImageBackground>
        :
       <View/>
        }
         {/* <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center', backgroundColor:'#DBDBDA' }}> */}
          {/* <TouchableOpacity onPress={this.takePicture.bind(this)} style={{ flex: 0, backgroundColor: '#fff', borderRadius: 5, padding: 15, paddingHorizontal: 20, alignSelf: 'center', margin: 20 }}>
            <Text style={{ fontSize: 14 }}> SNAP PLEASE!</Text>
          </TouchableOpacity> */}
        {/* </View> */}
        </RNCamera>
        <View style={{flexDirection:'row'}}>
        <View style = {{backgroundColor:'#000000', justifyContent:'center'}}>
        <TouchableHighlight 
        onPressIn={this.show} 
        onPressOut={this.hide}
        underlayColor= {'#aaaaaa'}
        style={{ 
          flex: 0,
          backgroundColor: '#fff',
          borderRadius: 5,
          padding: 15,
          paddingHorizontal: 20,
          alignSelf: 'center',
          margin:10 }}>
            <Text style={{ fontSize: 14 }}>SNAP</Text>
        </TouchableHighlight>
        {/* <TouchableOpacity onPress={this.takePicture.bind(this)} style={{ flex: 0, backgroundColor: '#fff', borderRadius: 5, padding: 15, paddingHorizontal: 20, alignSelf: 'center' }}>
            <Text style={{ fontSize: 14 }}> SNAP PLEASE!</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.hide} style={{ flex: 0, backgroundColor: '#fff', borderRadius: 5, padding: 15, paddingHorizontal: 20, alignSelf: 'center' }}>
            <Text style={{ fontSize: 14 }}>HIDE</Text>
        </TouchableOpacity> */}
        </View>
        <View>
        {this.getImages()}
        </View>
        </View>
        {/* <ScrollView 
        horizontal> */}
        {/* {this.state.referenceShown ? */}
        {/* :
        <View/>
        } */}
        {/* </ScrollView> */}
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
