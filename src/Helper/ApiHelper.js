import axios from 'axios';
import {Constants} from '../CommonConfig/CommonConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseUrl = Constants.BASE_URL;

// Post API 

export const postRequest = async (url, data) => {

    return await axios
      .post( baseUrl + url, data, {
        headers:{
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+(await AsyncStorage.getItem('token'))
            }
      })
      .then((response) => {
        //  console.log("RESP          ",response.status)
        if (response.status === 200) {
          return {
            success: true,
            data: response.data,
            statusCode: response.status,
          };
        } else {
          return {
            success: false,
            data: response.data,
            statusCode: response.status,
          };
        }
      })
      .catch((error) => {
        return {
          success: false,
          data: error.response.data,
          statusCode: error.response.status,
        };
    });
};

// Form Data for Image (Currently not working)

export const postFormDataRequest = async( url, data ) => {
  // console.log("Data: ",data)
  return await axios
  .post( 'https://bluff-city.herokuapp.com' + url,{
      headers:{          
          'Content-Type': 'multipart/form-data',
      },
      body:data
  })
  .then( (response) => {
      if(response.data.status === 1) {
          return {
            success: true,
            data: response.data,
            statusCode: response.status,
          };
      } else {
          return {
            success: '123',
            data: response.data,
            statusCode: response.status,
          };
      }
  })
  .catch((error) => {
        return {
          success: false,
          data: error.response.data,
          statusCode: error.response.status,
      };
  });
}

// Get API for Logout

 export const getRequest = async( url ) => {
   return await axios
   .get( baseUrl + url, { 
     headers:  {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+(await AsyncStorage.getItem('token'))
    }
 })
 .then( (response) => {
  if(response.data.status === 1) {
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
  } else {
      return {
        success: false,
        data: response.data,
        statusCode: response.status,
      };
  }
})
.catch((error) => {
    return {
      success: false,
      data: error.response.data,
      statusCode: error.response.status,
  };
})}

// Get API 

export const getMainRequest = async( url ) => {
  return await axios
  .get( baseUrl + url, { 
    headers:  {
     'Content-Type': 'application/json',
   }
})
.then( (response) => {
  // console.log("HELPER RESPONSE     \n",response.status);
 if(response.status === 200) {
     return {
       success: true,
       data: response.data,
       statusCode: response.status,
     };
 } else {
     return {
       success: false,
       data: response.data,
       statusCode: response.status,
     };
 }
})
.catch((error) => {
   return {
     success: false,
     data: error.response.data,
     statusCode: error.response.status,
 };
})}

// Refresh Token

export const refreshToken = async(data) => {
  return await axios
  .post( baseUrl + '/refresh-token' , data,{
      headers: {
          'Content-Type': 'application/json',
        } 
  })
  .then( (response) => {
      if(response.data.status===1) {
          return {
            success: true,
            data: response.data,
            statusCode: response.status,
          };
      } else {
          return {
            success: false,
            data: response.data,
            statusCode: response.status,
          };
      }
  })
  .catch((error) => {
        return {
          success: false,
          data: error.response.data,
          statusCode: error.response.status,
      };
  });
}

// Delete API Helper

export const deleteRequest = async( url, data) => {
  return await axios
  .delete( baseUrl + url ,{
      headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + ( await AsyncStorage.getItem('token') )
      } , data
  })
  .then( (response) => {
      if(response.data.status===1) {
          return {
            success: true,
            data: response.data,
            statusCode: response.status,
          };
      } else {
          return {
            success: false,
            data: response.data,
            statusCode: response.status,
          };
      }
  })
  .catch((error) => {
        return {
          success: false,
          data: error.response.data,
          statusCode: error.response.status,
      };
  });
}
 
  