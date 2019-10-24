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
  SafeAreaView,
  RefreshControl,
  ToastAndroid
} from 'react-native';
import FastImage from 'react-native-fast-image';
// import {
//   handleAndroidBackButton,
//   removeAndroidBackButtonHandler
// } from './modules/androidBackButton.js';
import Axios from 'axios'
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialIcons'




import ImagePicker from 'react-native-image-crop-picker'
import Header from '../modules/Header';
// export default class App extends Component {


export default function GridGallery2(props) {

  const [imageUri, setImageUri] = useState("")
  const [uid, setUid] = useState("Heo")
  const [ModalVisibleStatus, setModalVisibleStatus] = useState(false)
  const [dataSource, setDataSource] = useState(null)
  const [refreshing, setRefreshing] = React.useState(false);


/*이거 다 리프레시 만들때 쓴거임*/
  function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
      fetchData();
    });
  }
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(600).then(() => setRefreshing(false));
    // fetchData();
  }, [refreshing]);
/*이거 다 리프레시 만들때 쓴거임*/
  useEffect(() => {

    if (!dataSource) {
      console.log("fetching data")
      fetchData()
    }
  })
  

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

  
  const ShowModalFunction = (visible, imageURL) => {
    //handler to handle the click on image of Grid
    //and close button on modal
    setImageUri(imageURL)
    setModalVisibleStatus(visible)
  }
  console.log("dataSource", dataSource)
  
  
  

  createFormData = (photo, body) => {
    const data = new FormData();

    console.log("photo", photo)
    photo.forEach(
      (p)=>{
        data.append(
          "photo",
          {
            name: this.getFileName(p.path),
            type:p.mime,
            uri:Platform.OS === "android" ? p.path : p.path.replace("file://", "")
          }
        )
      })

    // append additional datas
    Object.keys(body).forEach(key => {
      console.log("object:",key,"=",body[key])
      data.append(key, body[key]);
    });
    return data
  };

  getFileName = (path)=>{
    const strSplit = path.split("/");
    return strSplit[strSplit.length-1]
  }




  chooseFile = () => {

    console.log("chooseFile")
    console.log("uid1:"+uid)
    ImagePicker.openPicker({ multiple: true, }).then((image) => {
      console.log("uid2:"+uid)
      console.log("image",image)
      let list = []
      image.forEach((photo) =>{
          list.push({originalPhotoName:this.getFileName(photo.path)})
      })
      const data = this.createFormData(image, {uid:uid,});
     
      return Axios.post(
        // academy server address
        // ip should be changed according to project server
        "http://192.168.41.68:8082/upload/new", 
        // "http://192.168.41.46:8080/upload/new", 
        data,
        {
          headers:{"Content-Type":"multipart/form-data;"}
        })
        .then(
          (responseAxios) =>{
            console.log("resAxios",responseAxios)
            //Toast to show success or not
            ToastAndroid.show(responseAxios.data,ToastAndroid.SHORT)
            fetchData()
          })
   
    })
  };//end chooseFile



  CameraOn = () => {
    ImagePicker.openCamera({

    }).then(image => {
      console.log("image captured",image);

      let imageArr = [image]
      
      const data = this.createFormData(imageArr, {uid:uid,});
      return Axios.post(
        // academy server address
        "http://192.168.41.68:8082/upload/new", 
        data,
        {
          headers:{"Content-Type":"multipart/form-data;"}
        })
        .then(
          (responseAxios) =>{
            console.log("resAxios",responseAxios)
            //Toast to show success or not
            ToastAndroid.show(responseAxios.data,ToastAndroid.SHORT)
            fetchData()
          })

    });
  }

  
  
  if (ModalVisibleStatus) {
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
      <View style={styles.ViewStlye}>
        
        <ScrollView refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
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
            keyExtractor={(item, index) => {return index.toString()}}
            />
        </ScrollView>
        {/* button should be down here */}
        <ActionButton buttonColor="rgba(231,76,60,1)" style={styles.ActionButtonMain}>
          {/*Inner options of the action button*/}
          {/*Icons here https://infinitered.github.io/ionicons-version-3-search/*/}
          
          <ActionButton.Item
            buttonColor="#3498db"
            title="Camera On"
            onPress={() => this.CameraOn()}>
            <Icon name="ios-camera" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#1abc9c"
            title="Choose File"
            onPress={() => this.chooseFile()
            }>
            <Icon2 name="add-to-photos" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#C89EC4"
            title="Settings"
            onPress={() => 
              // console.log(props.navigation)
              props.navigation.navigate('MyPage')
              // alert("준비 중 임다")
            }>
            <Icon2 name="settings" style={styles.actionButtonIcon} />
          </ActionButton.Item>

        </ActionButton>
      </View>
    );
  }
}


const styles = StyleSheet.create({

  image: {
    height: 120,
    width: 135,
    borderRadius : 3
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
  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
    //backgroundColor:'black'
  },
  actionButtonIcon: {
    fontSize: 38,
    justifyContent: 'center',
    // height: 22,
    color: 'white',
  },

  ActionButtonMain:{
  //  bottom:50,
  },

  ViewStlye:{
    height:'100%',
  },

});