
//parseInt(str, base) -  base = 16 , convert as 16-based(hexadecimal)
//                     base = 36, convert as 36-based (hex to base64)
//                     base = 10; convert as 10-based (decimal)
//                          = 2; binary


function hexToArrDec(hexStr) {
    for(var bytes = [], c = 0; c < hexStr.length; c += 2) {
        bytes.push(parseInt(hexStr.substr(c, 2),16))
    }
    console.log(bytes);
    return bytes;
}


hexToArrDec('09016E962DF102000003000000F6020000467F0C00');//[ 9, 1, 110, 150, 45, 241, 2, 0, 0, 3, … ]



let dec = parseInt('a0', 16)

console.log(dec)

function arrDecToHex(arr){
    var str = new String();
    for(var i=0; i < arr.length; i++) {
        str = str + decimalToHex(arr[i], 2)
    }
    console.log(str)
    return str;
}

function decimalToHex(d, base) {
    var hex = Number(d).toString(16);
    console.log(hex);
    base = typeof base === "underfined"|| base === null ? base=2: base;
    while (hex.length < base) {
        hex = "0" + hex;
    }
    return hex

}

arrDecToHex([9, 1, 110, 150, 45, 241, 2, 0, 0, 3,])

//convert the hex output string to array of decimals, for Chirpstack
function hex_to_dec_array(hexString) {
    var hexArray = new Array();
    var decArray = new Array();
    var newString = new String();
    var lengthHexString = hexString.length;
    for (var i = 0; i < lengthHexString; i++) {
        if (i % 2 == 1) {
            var newString = hexString.charAt(i - 1) + hexString.charAt(i)
            hexArray.push("0x" + newString);
        }
    }
    var lengthHexArray = hexArray.length;
    for (var i = 0; i < lengthHexArray; i++) {
        decArray.push(parseInt(hexArray[i]));
    }
    return decArray;
}

console.log (hex_to_dec_array('09016E962DF102000003000000F6020000467F0C00'));