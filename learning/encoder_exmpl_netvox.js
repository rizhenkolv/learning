/**
    ______ _____ ____  __  __ 
    |  ____/ ____|  _ \|  \/  |
    | |__ | |    | |_) | \  / |
    |  __|| |    |  _ <| |\/| |
    | |___| |____| |_) | |  | |
    |______\_____|____/|_|  |_|

    This encoder was developed by ECBM GmbH.
    Mohamed Akram
    akram@ecbm.me

    Version: v1.0.0
 */
// Encode encodes the given object into an array of bytes.
//  - fPort contains the LoRaWAN fPort number
//  - obj is an object, e.g. {"temperature": 22.5}
//  - variables contains the device variables e.g. {"calibration": "3.5"} (both the key / value are of type string)
// The function must return an array of bytes, e.g. [225, 230, 255, 0]

var ecbm_encoder_version = "v1.0.0";

/*
fPort: INTEGER: the port of the device that this payload should be sent to. the port can be either:
 - 0x07 for report configuration 
 - 0x0E for sensor configuration
obj: DICTIONARY: the data that should be sent to the device format:
    report_configuration:
    obj = {
        
    }

    sensor_configuration:
    obj = {
        
    }
*/
function convertValueToBytes(value){
    var b2 = (value & 0xFF);
    var b1 = ((value >> 8) & 0xFF);
    return [b1,b2]
}

//use fport 0x07 when sending data
function Encode(fPort, obj, variables) {
    var minTime = convertValueToBytes(obj.minTime)
    var maxTime = convertValueToBytes(obj.maxTime)
    var batteryChange = obj.batteryChange * 10
    var temperatureChange = convertValueToBytes(obj.temperatureChange * 10)

    var sendPacket = [];
    sendPacket[0] = 0x01; //set command ID
    sendPacket[1] = 0x16; //set Device  Type
    sendPacket[2] = minTime[0];
    sendPacket[3] = minTime[1];
    sendPacket[4] = maxTime[0];
    sendPacket[5] = maxTime[1];
    sendPacket[6] = batteryChange;
    sendPacket[7] = temperatureChange[0];
    sendPacket[8] = temperatureChange[1];
    sendPacket[9] = 0x00;
    sendPacket[10] = 0x00;
    return sendPacket;
}

//////////////////////////////Test/////////////////////////////////////////////////

console.log(Encode(0,{ minTime:300, maxTime:300, batteryChange:0.1, temperatureChange:0.1}));
console.log(convertValueToBytes(300));