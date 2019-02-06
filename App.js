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

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props)
    const isPortrait = () => {
      const dim = Dimensions.get('screen');
      return dim.height >= dim.width;
    };

    // Event Listener for orientation changes
    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: isPortrait() ? 'portrait' : 'landscape'
      });
    });

    this.state = {
     uris:[],
     referenceShown:false,
     orientation: isPortrait() ? 'portrait' : 'landscape'
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
    if (this.state.orientation === 'portrait') {
      return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
        <RNCamera
          ref={(ref) => { this.camera = ref }}
          orientation = {'portrait'}
          style={{ flex: 1}}
          flashMode={RNCamera.Constants.FlashMode.off}
          type={RNCamera.Constants.Type.back}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
        >
        {this.state.referenceShown
        ?
        <ImageBackground 
        style={{ flex:1,
          opacity:0.8,
          justifyContent:'flex-end',
          backgroundColor:'#ffffff'
        }}  
        source = {OverlayingImage}  
        resizeMode = {'contain'}    
        >
        </ImageBackground>
        :
       <View/>
        }
        </RNCamera>
        <View>
        <View style = {{backgroundColor:'#000000', alignItems:'center'}}>
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
        </View>
        <View style={{flexDirection:'row'}}>
        {this.getImages()}
        </View>
        </View>
        </View>
       );
    }
    else {
    return (
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
        {this.state.referenceShown
        ?
        <ImageBackground 
        style={{ flex:1,
          opacity:0.8,
          justifyContent:'flex-end',
          backgroundColor:'#ffffff'
        }}  
        source = {OverlayingImage}  
        resizeMode = {'contain'}    
        >
        </ImageBackground>
        :
       <View/>
        }
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
        </View>
        <View>
        {this.getImages()}
        </View>
        </View>
        </View>
    );
  }
  }
}
