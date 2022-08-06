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
