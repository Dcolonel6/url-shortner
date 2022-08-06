import { argv } from 'node:process';
import axios from 'axios';
import 'dotenv/config' 

const BASE_URL = 'api.tinyurl.com';


/*

*grabs all content from the argv except first two elements. 
returns an array

* @param {*array} inputs 
*/
function grabContentFromCli(inputs){
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

    axios.post(`${BASE_URL}/create`,
        {
            data: payload
        },
        {
            headers:{
                'Authorization': `Basic ${access_token}` 
            }

        })
    .then((res) =>{
        console.log(res.data);
    })
    .catch((error) =>{
        console.error(error);
    })

}

export default {
    grabInputFromCLI: grabContentFromCli,
    postToShortner: sendToShortnerService
};