'use strict';
/* @flow */

import React from 'react';
import {StyleSheet,Text,View,Navigator,TouchableHighlight,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const _getRandomRoute = () => ({title:`#${Math.ceil(Math.random()*1000)}`});

class NavButton extends React.Component {
  render() {
    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor='#B5B5B5'
        onPress={this.props.onPress}>
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
}

export default class App extends React.Component {
  componentWillMount() {
    this._navBarRouteMapper = {
      rightContentForRoute:(route,navigator) => {
        return null;
      },
      titleContentForRoute:(route,navigator) => {
        return (
          <TouchableOpacity
            onPress={() => navigator.push(_getRandomRoute())}>
            <Text style={styles.titleText}>{route.title}</Text>
          </TouchableOpacity>
        );
      },
      iconForRoute:(route,navigator) => {
        return (
          <TouchableOpacity
            onPress={() => {navigator.popToRoute(route)}}
            style={styles.crumbIconPlaceholder}
          />
        );
      },
      separatorForRoute:(route,navigator) => {
        return (
          <TouchableOpacity
            onPress={navigator.pop}
            style={styles.crumbSeparatorPlaceholder}
          />
        );
      }
    };
  }
  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={_getRandomRoute()}
        renderScene={this._renderScene}
        navigationBar={
          <Navigator.BreadcrumbNavigationBar
            routeMapper={this._navBarRouteMapper}
          />
        }
      />
    );
  }
  _renderScene(route,navigator) {
    return (
      <View style={styles.scene}>
        <NavButton
          onPress={() => {navigator.push(_getRandomRoute())}}
          text='Push'
        />
        <NavButton
          onPress={() => {navigator.pop()}}
          text='Pop'
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scene:{
    paddingTop:50,
    flex:1
  },
  button:{
    backgroundColor:'white',
    padding:15,
    borderBottomWidth:StyleSheet.hairlineWidth,
    borderBottomColor:'#CDCDCD'
  },
  buttonText:{
    fontSize:17,
    fontWeight:'500'
  },
  container:{
    overflow:'hidden',
    backgroundColor:'#dddddd',
    flex:1
  },
  titleText:{
    fontSize:18,
    color:'#666666',
    textAlign:'center',
    fontWeight:'bold',
    lineHeight:32
  },
  crumbIconPlaceholder:{
    flex:1,
    backgroundColor:'#666666'
  },
  crumbSeparatorPlaceholder:{
    flex:1,
    backgroundColor:'#aaaaaa'
  }
});
