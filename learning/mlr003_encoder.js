/**
    ______ _____ ____  __  __ 
    |  ____/ ____|  _ \|  \/  |
    | |__ | |    | |_) | \  / |
    |  __|| |    |  _ <| |\/| |
    | |___| |____| |_) | |  | |
    |______\_____|____/|_|  |_|

    This encoder was developed by ECBM GmbH.
    Liudmyla Ryzhenko
    ryzhenko@ecbm.me

    Version: v1.0.0
 */
// Encode encodes the given object into an array of bytes.
//  - fPort contains the LoRaWAN fPort number
//  - obj is an object, e.g. {"temperature": 22.5}
//  - variables contains the device variables e.g. {"calibration": "3.5"} (both the key / value are of type string)
// The function must return an array of bytes, e.g. [225, 230, 255, 0]

var ecbm_encoder_version = "v1.0.0";

//json object for testing in ChirpStack
objJson = {	
  "valvePosition": 5,
  "ambTemp": 19,
  "flowTemp": 22,
  "externSensorTemp": 0,
  "safetyValvePos":6,
  "safetyFlowTemp": 15,
  "safetyAmbTemp": 6,
  "radioInterval": 10,
  "userMode": 2,
  "safetyMode":0,
  "offsetKompens":0,
  "controllerGain":3,
  "referenceRun":0

}

// data to downlink
const obj = {
    valvePosition:5,
    ambTemp: 20,
    externSensorTemp: 0,
    safetyValvePos:6,
    safetyFlowTemp: 15,
    safetyAmbTemp: 6,
    radioInterval: 10,
    userMode: 2,
    safetyMode:0,
    offsetKompens:0,
    controllerGain:3,
    referenceRun:0
}

function hexToDec(hex) {
    var bytes = parseInt(hex, 16);
    return bytes;
}

function decimalToHex(d, base) {
    var hex = Number(d).toString(16);
    typeof base === "undefined"|| base === null ? base = 2: base;
    while (hex.length < base) {
        hex = "0" + hex;
    }
    return hex;

}
function binToHex(bin, base){
    var hex = parseInt(bin.toString(),2).toString(16);
   (typeof base === "undefined")|| base === null ? base = 2: base;
    while (hex.length < base) {
        hex = "0" + hex;
    }
    return hex;
}

function hex2bin(hex,l){
    //return (parseInt(hex,16).toString(2).padStart(3,'0'))
    // if padStart() doesn't work in ChirpStack:
     var bin = (parseInt(hex,16).toString(2));
     if( l == 2) {
        switch(bin.length){
           case 1: 
           return "0"+ bin;
           break;
           case 2: 
           return bin;
           break;
        }
       }
     
     if( l == 3) {
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
    if( l == 4) {
        switch(bin.length){
           case 1: 
           return "000"+ bin;
           break;
           case 2: 
           return "00"+bin;
           break;
           case 3:
           return "0"+bin;
           break;
           case 4:
           return bin;
        }

    }
   
 }

function convertNumber(n, fromBase, toBase) {
    if (fromBase === void 0) {
      fromBase = 10;
    }
    if (toBase === void 0) {
      toBase = 10;
    }
    return parseInt(n.toString(), fromBase).toString(toBase);
  }
  //console.log( convertNumber("00100110", 2, 16));



function encoder(fPort, obj){
    var interval, mode, safetyMode, offsetDec, offsetHex, offsetBin, gainHex, gainBin;
    var sendPacket = [];
    var sendPacketDec =[];
    //sendPacket[0]= decimalToHex(obj.ambTemp*2); it depend on Mode radioInterval and UseMode
    sendPacket[1]= decimalToHex(obj.externSensorTemp*4);
   
    
    // Funkausfall einstellen..radio communication interval
    switch (obj.radioInterval) {
        case 5:
            interval = hex2bin("1",3);
            break;
        case 10:
            interval = hex2bin("0",3);
            break;
        case 60:
            interval = hex2bin("2",3);
            break; 
        case 120:
            interval = hex2bin("3",3);
            break; 
        case 480:
            interval = hex2bin("4",3);
            break;     
    }
    // Betriebsmodus einstellen.. select user mode
    switch (obj.userMode) {
        case 0:
            sendPacket[0]=decimalToHex(obj.valvePosition);
            
            mode = hex2bin("0", 2)
            break;
        case 1:
            sendPacket[0]= decimalToHex(obj.flowTemp*2);
            
            mode = hex2bin("1", 2)
            break;    
        case 2:
            sendPacket[0]= decimalToHex(obj.ambTemp*2);
            
            mode = hex2bin("2", 2)
            break;

    }
    //Funkausfall Sollwert einstellen..select safety mode
    switch (obj.safetyMode) {
        case 0:
            sendPacket[2]= decimalToHex(obj.safetyAmbTemp*2);
            safetyMode = hex2bin("0", 2)
            break;
        case 1:
            sendPacket[2]= decimalToHex(obj. safetyFlowTemp*2);
            safetyMode = hex2bin("1", 2)
            break;    
        case 2:
            sendPacket[2]= decimalToHex(obj.safetyValvePos);
            console.log(sendPacket[2])
            safetyMode = hex2bin("2", 2)
            break;

    }

     //console.log('0'+interval+mode+safetyMode); 

    sendPacket[3]= (binToHex("0"+interval+mode+safetyMode));

    // count sendPacket[4]:

    switch(obj.offsetKompens) {
        case 0: offsetDec= 0; break;
        case 1: offsetDec= 1; break;
        case 2: offsetDec= 2; break;
        case 3: offsetDec= 3; break;
        case 4: offsetDec= 4; break;
        case 5: offsetDec= 5; break;
        case 6: offsetDec= 6; break;
        case 7: offsetDec= 7; break;
        case -1: offsetDec= 15; break;
        case -2: offsetDec= 14; break;
        case -3: offsetDec= 13; break;
        case -4: offsetDec= 12; break;
        case -5: offsetDec= 11; break;
        case -6: offsetDec= 10; break;
        case -7: offsetDec= 9; break;
        case -8: offsetDec= 8; break;

    }
    offsetHex = decimalToHex(offsetDec);
    offsetBin = hex2bin(offsetHex,4) + "0000";


    sendPacket[4] = binToHex(offsetBin);

    // count sendPacket[5]

    switch(obj.controllerGain) {
        case 1: gainHex= 2; break;
        case 2: gainHex= 3; break;
        case 3: gainHex= 0; break;
        case 4: gainHex= 1; break;
    }
    
    if(obj.referenceRun == 0 ){
        gainBin = "0" + hex2bin(gainHex,2) + "00000";
    } else {
        gainBin = "1" + hex2bin(gainHex,2) + "00000";
    }

    sendPacket[5] = (binToHex(gainBin));
    //return [sendPacket]; array HEX format

    console.log(sendPacket)
    for(x = 0; x < sendPacket.length; x++){
        sendPacketDec[x] =  hexToDec(sendPacket[x]);
    }
    console.log(sendPacketDec);
    return sendPacketDec; // array DEC format
   }
   


encoder(2, obj)