import axios from 'axios'


export const fetchLogin = (userObj) => {
    console.log("fetchLogin")
    return (dispatch) => {
        axios.post("http://192.168.41.38:8080/member/getUser", userObj)
        .then(res => {
            console.log(res.data)
            dispatch({type:'SUCCESS_LOGIN', payload:res.data})
            console.log(dispatch)
        })
    }
}


export default {}