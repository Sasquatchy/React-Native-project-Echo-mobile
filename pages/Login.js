import React,{Component} from 'react'
import {Keyboard, 
  Text, 
  View, 
  TextInput, 
  TouchableWithoutFeedback, 
  Alert, 
  KeyboardAvoidingView, 
  Button,
  StyleSheet} from 'react-native';
import axios from 'axios'
import {connect} from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'

class Login extends Component {

  constructor(props){
    super(props)
    this.state = {uid:'Heo', pw:'12345678'}
}

  render(){

    return(
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.loginScreenContainer}>
        <View style={styles.loginFormView}>
        <Text style={styles.logoText}>Echo</Text>
            
            <TextInput placeholder="Username" placeholderColor="#c4c3cb"
             style={styles.loginFormTextInput} type='text'
             value = {this.state.uid} 
             onChangeText = {(text) => {this.setState({uid:text}) } 
             } />
            <TextInput placeholder="Password" placeholderColor="#c4c3cb" 
            style={styles.loginFormTextInput} type='text' 
            value = {this.state.pw} 
            onChangeText = {(text) => { this.setState({pw:text}) } } 
            secureTextEntry={true}/>
              <Button
              buttonStyle={styles.loginButton}
               title='login' onPress={() => 
                  
                  {
                    console.log("login button is clicked")
                      this.props.doLogin(this.state,this.props)
                  }
                  }></Button>
          </View>
          </View>
     </TouchableWithoutFeedback>
     </KeyboardAvoidingView>
    )
  }
}

const fetchLogin = (userObj,props) => {
  console.log("fetchlogin..................")
  return (dispatch) => {
    console.log(dispatch)
      axios.post("http://192.168.41.68:8082/member/getMember", userObj)
      .then(res => {
          console.log(res.data)
          dispatch({type:'SUCCESS_LOGIN', payload:res.data})
          console.log(props)
          props.navigation.navigate('Gallery')
          const key="USER_INFO"
          AsyncStorage.setItem(key,JSON.stringify(userObj))
        .then(()=>{
            console.log("Item is stored..........")
        })
      })
  }
}

const mapStateToProps = ({memberReducer}) => {
  console.log("mapStateToProps", memberReducer)
  return {user: memberReducer.user}
}

const mapDispatchToProps = (dispatch) => {
  console.log("mapDispatchToProps",dispatch)
  return {doLogin: (userObj,props) => dispatch(fetchLogin(userObj,props))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)


const styles = StyleSheet.create({


  containerView: {
    flex: 1,
  },
  loginScreenContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: 40,
    fontWeight: "800",
    marginTop: 150,
    marginBottom: 30,
    textAlign: 'center',
  },
  loginFormView: {
    flex: 1
  },
  loginFormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#fafafa',
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
  
  },
  loginButton: {
    backgroundColor: '#3897f1',
    borderRadius: 5,
    height: 45,
    marginTop: 10,
  },
  fbLoginButton: {
    height: 45,
    marginTop: 10,
    backgroundColor: 'transparent',
  },

})