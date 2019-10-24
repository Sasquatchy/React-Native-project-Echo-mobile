import React, {Component} from 'React'
import { View, Text, StyleSheet,Image} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import {connect} from 'react-redux'
import axios from 'axios'


class Splash extends Component {
    constructor(props){
        super(props)
        console.log(props)
    }
    
    componentDidMount(){
        console.log("componentDidMount")
        this.userAsync(this.props);
    }
    
    userAsync = async(props)=>{
        const userInfo = await AsyncStorage.getItem('USER_INFO')
        console.log("userInfo",userInfo)

        setTimeout(() => {
            if(userInfo){
                console.log(userInfo)
                this.props.checkLogin(userInfo, props)
            }else{
                props.navigation.navigate('Login')
            }
        }, 500);
    }

    render(){
        return(
            
            <View style={styles.ViewStyle} >
                <Image source={require('../resources/images/echo_white.png')}  style={{width: 200, height: 140}}/>
            </View>
        )
    }
}

const fetchLogin = (userInfo,props) => {
    console.log("fetchlogin..................")
    console.log("userInfo",userInfo)
    return (dispatch) => {
        userObj = JSON.parse(userInfo)
        console.log(userObj)
        console.log(dispatch)
        console.log(props)
        // axios.post("http://192.168.41.38:8080/member/getUser", userObj)
      axios.post("http://192.168.41.68:8082/member/getMember", userObj)
        .then(res => {
            console.log(res.data)
            dispatch({type:'SUCCESS_LOGIN', payload:res.data})
            console.log(props)
                        
            props.navigation.navigate('Gallery')
        })
    }
}

const mapStateToProps = ({memberReducer}) => {
    console.log("mapStateToProps", memberReducer)
    return {user: memberReducer.user}
  }

const mapDispatchToProps = (dispatch) => {
    console.log("mapdispatchtoprops", dispatch)
    return {checkLogin: (userInfo, props) => dispatch(fetchLogin(userInfo, props))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Splash)


const styles = StyleSheet.create({

    ViewStyle: {
        backgroundColor: 'rgba(46,119,170,1.0)',
        height:'100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
  });
