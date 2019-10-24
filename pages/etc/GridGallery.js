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
  ScrollView,
  Image,
} from 'react-native';
import FastImage from 'react-native-fast-image';
// import {
//   handleAndroidBackButton,
//   removeAndroidBackButtonHandler
// } from './modules/androidBackButton.js';
import Axios from 'axios'

// export default class App extends Component {


export default function GridGallery() {

  const styles = StyleSheet.create({

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

  // console.log("dataSource", dataSource)

  useEffect(() => {
    async function fetchData() {

      console.log("useeffect")
      const { data } = await Axios.get('http://192.168.41.68:8082/photo/getPhotoByUid/' + uid)
      const items = Array.apply(null, Array(data.length)).map((v, i) => {
        return {
          pno: data[i].pno,
          src: encodeURI("http://192.168.41.68:8082/photo/viewPhoto?file=" + data[i].folderPath + '\\' + data[i].uuid + '_' + data[i].originalPhotoName),
          thumbSrc: encodeURI("http://192.168.41.68:8082/photo/viewPhoto?file=" + data[i].folderPath + '\\thumbnail\\' + "thumb_" + data[i].uuid + '_' + data[i].originalPhotoName),
        };
      })
      console.log("items", items)
      setDataSource(items)

    }
    if(!dataSource){
      console.log("fetching data")
      fetchData()
    }

  }
  )


  if (ModalVisibleStatus) {
    // ModalVisibleStatus = true
    console.log("ModalVisibleStatus", ModalVisibleStatus)
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
              source={{ uri: imageUri }}
              resizeMode={FastImage.resizeMode.contain}
            />

          </View>
        </Modal>
    )
  }
  else {
    // ModalVisibleStatus = false
    console.log("ModalVisibleStatus", ModalVisibleStatus)
    return (
      <ScrollView >
        <FlatList data={dataSource}
          renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.0}
                style={{ flex: 1 }}
                onPress={() => {
                  ShowModalFunction(true, item.src);
                }}>
                <FastImage
                  style={styles.image}
                  source={{ uri: item.thumbSrc }}
                />
              </TouchableOpacity>

            </View>
          )}
          //Setting the number of column
          numColumns={3}
          keyExtractor={(item, index) => {
            console.log(item)
            return index.toString()}}
        />
    
      </ScrollView>
    );
  }
}


