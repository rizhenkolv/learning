import { Buffer } from "buffer";
window.Buffer = window.Buffer || require("buffer").Buffer; 

var buf = Buffer.from('abc');
window.Buffer = window.Buffer || require("buffer").Buffer; 


console.log(buf)
console.log(Buffer.from("Hello World").toString('base64'));