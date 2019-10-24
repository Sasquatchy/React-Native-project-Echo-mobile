import React, { Component } from "react";

import styles from "./style";
import {Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView, Button} from 'react-native';
// import { Button } from 'react-native-elements';

const appId = "1047121222092614"

export default class LoginScreen extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
            uid: '',
            upw: ''

        };

      }

  render() {
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
          <Text style={styles.logoText}>Echo</Text>
            <TextInput placeholder="Username" placeholderColor="#c4c3cb" style={styles.loginFormTextInput}
             onChangeText={(text) => this.setState({uid:text})} value={this.state.uid}/>
            <TextInput placeholder="Password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} 
            onChangeText={(text) => this.setState({upw:text})} value={this.state.upw}
            secureTextEntry={true}/>
            <Button
              buttonStyle={styles.loginButton}
              onPress={() =>  this.props.navigation.navigate('GridGallery2',{uid:'echo',upw:'echo'})}
              title="Login"
            />
           
          </View>
        </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }

}