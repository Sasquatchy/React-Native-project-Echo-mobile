import React ,{Component} from 'react'
import {View, Text, Button} from 'react-native'
import {connect} from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'

class Main extends Component {
  
  constructor(props){
    super(props)
    console.log(props)
    console.log("Main")
  }

  render(){
    return(
        <View>
            <Text>information</Text>
            <Text>{this.props.user.uid}</Text>
            <Text>{this.props.user.username}</Text>
            <Text>{this.props.user.mobile}</Text>
            <Text>{this.props.user.regDate}</Text>
            <Button title=" sign out" onPress={this.signOutAsync} />
        </View>
    )
  }
  
  signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Login');
  };
}

    const mapStateToProps = (state) => {
      return {
        user: state.memberReducer.user
      }
    }
    
    export default connect(mapStateToProps)(Main)