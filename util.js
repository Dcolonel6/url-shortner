import { argv } from 'node:process';
import axios from 'axios';
import 'dotenv/config' 

const BASE_URL = 'https://api.tinyurl.com';


/*

*grabs all content from the argv except first two elements. 
returns an array
* 
*/
function grabContentFromCli(input){
    return argv.slice(2);    
}
/**
 * post a payload to URLShortner service
 * 
 * @param {*string} urlToShorten 
 * @param {*object payload 
 * @param {*string} access_token 
 */
function sendToShortnerService(urlToShorten,payload,access_token=process.env.API_TOKEN){

   const reqConfig = {
        baseURL: BASE_URL,
        url: '/create',  
        method: 'post',     
        headers:{
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'multipart/form-data'
        },
        data: payload,
        transformResponse: [function (data) {
            // Do whatever you want to transform the data
            data = JSON.parse(data);
        
            return data;
          }]

    };
    

    axios(reqConfig)
    .then((res) =>{
        const {url, tiny_url} = res.data.data;        
        console.log(`Done \n${url} ==> ${tiny_url} `);
    })
    .catch((error) =>{
       const {status, statusText } = error.response;
        console.error(status, statusText);
        console.log(error.response);
    })

}

export {
    grabContentFromCli as grabInputFromCLI,
    sendToShortnerService as postToShortner
};