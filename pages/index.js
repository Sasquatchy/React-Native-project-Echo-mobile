
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import React from 'react'
import {Image} from 'react-native'
import Main from './Main';
import Login from './Login';
import Splash from './Splash';
import GridGallery2 from './GridGallery2'
import MyPage from './MyPage';

const stackNav = createStackNavigator({
    Gallery:{screen:GridGallery2},
    MyPage:{screen:MyPage}
},
{   
    
    defaultNavigationOptions: ({ navigation }) => {
        return {
            headerLeft: (
                <Image source={require('../resources/images/echo_long.png')}  style={{width: 120, height: 40}}/>
            )
        };
    }
})

const switchNav = createSwitchNavigator({
    Splash:{screen:Splash},
    Login:{screen:Login},
    Gallery:{screen:stackNav},
    MyPage:{screen:MyPage},
},{
    initialRouteName:'Splash'
})

const AppNav = createAppContainer(switchNav)

export default AppNav