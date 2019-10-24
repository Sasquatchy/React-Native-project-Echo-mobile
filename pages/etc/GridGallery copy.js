/*This is an Example of Grid Image Gallery in React Native*/
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  Button,
} from 'react-native';
import FastImage from 'react-native-fast-image';
// import {
//   handleAndroidBackButton,
//   removeAndroidBackButtonHandler
// } from './modules/androidBackButton.js';
import Axios from 'axios'
import { encode } from 'punycode';

// export default class App extends Component {


export default function App() {

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // marginTop: 30,
    },
    image: {
      height: 120,
      width: '100%',
    },
    fullImageStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '98%',
      resizeMode: 'contain',
    },
    modelStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,1.0)',
    },


    closeButtonStyle: {
      width: 25,
      height: 25,
      // top: 9,
      // right: 9,
      top:0,
      right:0,
      position: 'absolute',
    },
  });
  

  const [imageUri, setImageUri] = useState("")
  const [uid, setUid] = useState("Heo")
  const [ModalVisibleStatus, setModalVisibleStatus] = useState(false)
  const [dataSource, setDataSource] = useState(null)



  
  

  const ShowModalFunction = (visible, imageURL) => {
    //handler to handle the click on image of Grid
    //and close button on modal
    setImageUri(imageURL)
    setModalVisibleStatus(visible)
  }


  useEffect(() => {
    async function fetchData() {

      console.log("useeffect")
      const { data } = await Axios.get('http://192.168.41.68:8082/photo/getPhotoByUid/' + uid)
      const items = Array.apply(null, Array(data.length)).map((v, i) => {
        return { 
          id: data[i].pno, 
          src: encodeURI("http://192.168.41.68:8082/photo/viewPhoto?file=" + data[i].folderPath + '\\' + data[i].uuid + '_' + data[i].originalPhotoName),
          thumbSrc: encodeURI("http://192.168.41.68:8082/photo/viewPhoto?file=" + data[i].folderPath + '\\'+"thumb_" + data[i].uuid + '_' + data[i].originalPhotoName),
        };
      })
      console.log(items)

      setDataSource(items)
    }
    fetchData()

  }, [uid]
  )


  // useEffect(() => { }, [ModalVisibleStatus])

  // form a list of photo
  // let items = Array.apply(null, Array(120)).map((v, i) => {
  //   return { id: i, src: 'http://192.168.41.46:8080/photo/getPhotoByUid/' + uid };
  // });
  // that.setState({
  //   dataSource: items,
  // });
  // componentDidMount() {

  //       // if(!imageuri){
  //       //   handleAndroidBackButton(this.ShowModalFunction(!ModalVisibleStatus,''))
  //       // }
  //     }


  // componentWillUnmount() {
  //   removeAndroidBackButtonHandler();
  // }


  if (ModalVisibleStatus) {
    return (
      <Modal
        transparent={false}
        animationType={'fade'}
        visible={ModalVisibleStatus}
        onRequestClose={() => {
          ShowModalFunction(!ModalVisibleStatus, '');
        }}>
        <View style={styles.modelStyle}>
          <FastImage
            style={styles.fullImageStyle}
            source={{ uri: imageuri }}
            resizeMode={FastImage.resizeMode.contain}
          />
          <TouchableOpacity
              // activeOpacity={0.5}rr
              onPress={() => {
                this.ShowModalFunction(!ModalVisibleStatus, '');
              }}> 
              <FastImage
                source={{
                  uri:
                    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/close.png',
                }}
                style={{ width: 35, height: 35, marginTop: 16 }}
              /> 
            </TouchableOpacity>
        </View>
      </Modal>
    );
  } else {
    return (
      <View style={styles.container}>
        {/* <Button title="get" style={{backgroundColor:"yellow",color:"black"}} onPress={()=>{console.log("pressed");setUid("Heo")}}></Button> */}
        <Text
          style={{
            padding: 16,
            fontSize: 20,
            color: 'white',
            backgroundColor: 'green',
          }}>
          Image Gallery
          </Text>
        <FlatList
          data={dataSource}
          renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
              <TouchableOpacity
                // key={item.id}
                // style={{ flex: 1 }}
                onPress={() => {
                  this.ShowModalFunction(true, item.src);
                }}>
                <FastImage
                  style={styles.image}
                  source={{
                    uri: item.src,
                  }}
                />
              </TouchableOpacity>
            </View>
          )}
          //Setting the number of column
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }

}

