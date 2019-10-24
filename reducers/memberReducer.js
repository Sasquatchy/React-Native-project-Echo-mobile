// import axios from 'axios'
// import { tsPropertySignature } from '@babel/types'
// export const fetchLogin = (userObj) => {
//    return (dispatch) => {
//        axios.post("http://192.168.41.38:8080/member/getUser", userObj)
//        .then(res => {
//            console.log(res.data)
//            dispatch({type:'SUCCESS_LOGIN', payload: res.data})
//        } )
//    }
// }

function memberReducer(state = {user:null}, action) {
   console.log("memberReducer", state, action)
   const {type, payload} = action

   let newState = state

   if(type === 'SUCCESS_LOGIN'){
       newState = {user:payload}
    }
   
   console.log('newState:' , newState)
   return newState
}
export default memberReducer