function hex2bin(hex){

    //return (parseInt(hex,16).toString(2).padStart(3,'0'))
    // if padStart() doesn't work in ChirpStack:
     var bin = (hex.toString(2));
     console.log(bin.length)
     switch(bin.length){
        case 1: 
        return "00"+ bin;
        break;
        case 2: 
        return "0"+bin;
        break;
        case 3:
        return bin;
     }
}

console.log(hex2bin(4))

function hexTobin(hex){
    hex = hex.replace("0x", "").toLowerCase();
    var out = "";
    for(var c of hex) {
        switch(c) {
            case '0': out += "0000"; break;
            case '1': out += "0001"; break;
            case '2': out += "0010"; break;
            case '3': out += "0011"; break;
            case '4': out += "0100"; break;
            case '5': out += "0101"; break;
            case '6': out += "0110"; break;
            case '7': out += "0111"; break;
            case '8': out += "1000"; break;
            case '9': out += "1001"; break;
            case 'a': out += "1010"; break;
            case 'b': out += "1011"; break;
            case 'c': out += "1100"; break;
            case 'd': out += "1101"; break;
            case 'e': out += "1110"; break;
            case 'f': out += "1111"; break;
            default: return "";
        }
    }

    return out;
}
