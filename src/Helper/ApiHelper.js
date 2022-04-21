import axios from 'axios';
import {Constants} from '../CommonConfig/CommonConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseUrl = Constants.BASE_URL;


export const postRequest = async (url, data) => {

    return await axios
      .post( baseUrl + url, data, {
        headers:{
              'Content-Type': 'application/json',
            }
      })
      .then((response) => {
          //console.log(response)
        if (response.data.status === 1) {
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
  