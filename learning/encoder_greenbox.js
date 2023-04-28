// Encode encodes the given object into an array of bytes.	
//  - fPort contains the LoRaWAN fPort number	
//  - obj is an object, e.g. {"temperature": 22.5}	
//  - variables contains the device variables e.g. {"calibration": "3.5"} (both the key / value are of type string)	
// The function must return an array of bytes, e.g. [225, 230, 255, 0]	
// Version: v1.0.0

var ecbm_encoder_version = "v1.0.0";

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
function addZeroToHex(strTime) {	
    if (strTime.length < 2) {	
        strTime = "0" + strTime;	
    }	
    return strTime;	
}

function Encode(fPort, obj, auth_method) {

    if (obj.type == "20") {
        var kanal = obj.kanal;
        if (obj.brightness <= 100) {
            var brightness = obj.brightness.toString(16).toUpperCase();
        }
        console.log(brightness.length < 2);
        if (brightness.length < 2) {
            var downlink = obj.group + obj.type + "0" + kanal + "0" + brightness;
        }
        else {
            var downlink = obj.group + obj.type + "0" + kanal + brightness;
        }
    }

    if (obj.type == "07") {
        var downlink = obj.group + obj.type;
    }

    if (obj.type == "0F") {
        var downlink = obj.group + obj.type;
    }

    if (obj.type == "13") {
        switch (obj.configure) {
            case true:
                var downlink = obj.group + obj.type + "00" + obj.wieOft.toString(16);
                break;
            case false:
                var downlink = obj.group + obj.type + "80";
                break;
        }
    }

    if (obj.type == "1A") {
        switch (obj.configure) {
            case true:
                var downlink = obj.group + obj.type + addZeroToHex(obj.stunde.toString(16)) + addZeroToHex(obj.minute.toString(16)) + addZeroToHex(obj.sekunde.toString(16)) + addZeroToHex(obj.tag.toString(16)) + addZeroToHex(obj.monat.toString(16)) + addZeroToHex((obj.jahr - 2000).toString(16));
                break;
            case false:
                var downlink = obj.group + obj.type + "80";
                break;
        }
    }

    if (obj.type == "00") {
        var downlink = obj.group + obj.type;
    }

    if (obj.type == "02" || obj.type == "03") {
        switch (obj.configure) {
            case true:
                var sp = (obj.aus_ein + obj.aktiv_inactive).toString(16);
                var kanalHex = obj.kanal.toString();

                if (obj.schaltart.toString(16) == "0") {
                    var scheduledDaysBinary = obj.sonntag + obj.samstag + obj.freitag + obj.donnerstag + obj.mittwoch + obj.dienstag + obj.montag;
                    var scheduledDaysHex = parseInt(scheduledDaysBinary, 2).toString(16).toUpperCase();

                    if (obj.zeit_astro.toString(16) == "0") {
                        var downlink = obj.group + obj.type + "0" + obj.programNr.toString(16) + obj.schaltart.toString(16) + obj.zeit_astro.toString(16) + "00" + scheduledDaysHex + addZeroToHex(obj.stunde.toString(16)) + addZeroToHex(obj.minute.toString(16)) + kanalHex + sp + addZeroToHex(obj.helligkeit.toString(16)) + addZeroToHex(obj.sperrzeit.toString(16));
                    }
                    else {
                        var downlink = obj.group + obj.type + "0" + obj.programNr.toString(16) + obj.schaltart.toString(16) + obj.zeit_astro.toString(16) + "0" + obj.auf_untergang.toString(16) + scheduledDaysHex + "00" + addZeroToHex(obj.delay.toString(16)) + kanalHex + sp + addZeroToHex(obj.helligkeit.toString(16)) + addZeroToHex(obj.sperrzeit.toString(16));
                    }
                }
                else {
                    if (obj.zeit_astro.toString(16) == "0") {
                        var downlink = obj.group + obj.type + "0" + obj.programNr.toString(16) + obj.schaltart.toString(16) + obj.zeit_astro.toString(16) + addZeroToHex(obj.tag.toString(16)) + addZeroToHex(obj.monat.toString(16)) + addZeroToHex(obj.stunde.toString(16)) + addZeroToHex(obj.minute.toString(16)) + kanalHex + sp + addZeroToHex(obj.helligkeit.toString(16)) + addZeroToHex(obj.sperrzeit.toString(16));
                    }
                    else {
                        var downlink = obj.group + obj.type + "0" + obj.programNr.toString(16) + obj.schaltart.toString(16) + obj.zeit_astro.toString(16) + addZeroToHex(obj.tag.toString(16)) + addZeroToHex(obj.monat.toString(16)) + "00" + addZeroToHex(obj.delay.toString(16)) + kanalHex + sp + addZeroToHex(obj.helligkeit.toString(16)) + addZeroToHex(obj.sperrzeit.toString(16));
                    }

                }
                break;
            case false:
                var downlink = obj.group + obj.type + "8" + obj.programNr.toString(16);
                break;
        }
    }

    switch (auth_method){
        case "OTAA":
            if(obj.type == "01") {
    
                var kanal = obj.kanal;
                var minute = obj.minute.toString(16).toUpperCase();
                if (obj.brightness <= 100) {
                    var brightness = obj.brightness.toString(16).toUpperCase();
                } 
                var downlink = obj.group + obj.type + "0" + kanal + "00" + minute + brightness;
                
            }  
            if (obj.type == "40") {
                switch (obj.configure) {
                    case true:
                        var programsBinary = parseInt(obj.program15) + parseInt(obj.program14) + parseInt(obj.program13) + parseInt(obj.program12) + parseInt(obj.program11) + parseInt(obj.program10) + parseInt(obj.program9) + parseInt(obj.program8) + parseInt(obj.program7) + parseInt(obj.program6) + parseInt(obj.program5) + parseInt(obj.program4) + parseInt(obj.program3) + parseInt(obj.program2) + parseInt(obj.program1) + parseInt(obj.program0);
                        var programsHexadecimal = parseInt((programsBinary).toString(2)).toString(16).toUpperCase();
                        //var downlink =  obj.group + obj.type + programsHexadecimal;
                        var downlink = obj.group + obj.type + addZeroToHex(obj.stunde.toString(16)) + addZeroToHex(obj.minute.toString(16)) + addZeroToHex(obj.sekunde.toString(16)) + addZeroToHex(obj.tag.toString(16)) + addZeroToHex(obj.monat.toString(16)) + addZeroToHex((obj.jahr - 2000).toString(16));
                        break;
                    case false:
                        var downlink = obj.group + obj.type + "80";
                        break;
                }
            }
            //downlink = downlink.toUpperCase();
            break;
        case "ABP":
            if (obj.type == "40") {
                switch (obj.configure) {
                    case true:
                        var programsBinary = obj.program15 + program14 + program13 + program12 + program11 + program10 + program9 + program8 + program7 + program6 + program5 + program4 + program3 + program2 + program1 + program0;
                        var programsHexadecimal = parseInt(programsBinary, 2).toString(16).toUpperCase();
                        var downlink = obj.group + obj.type + addZeroToHex(obj.stunde.toString(16)) + addZeroToHex(obj.minute.toString(16)) + addZeroToHex(obj.sekunde.toString(16)) + addZeroToHex(obj.tag.toString(16)) + addZeroToHex(obj.monat.toString(16)) + addZeroToHex((obj.jahr - 2000).toString(16));
                        break;
                    case false:
                        var downlink = obj.group + obj.type + "80";
                        break;
                }
            }
            downlink = downlink.toUpperCase();
            break;
    }

    return hex_to_dec_array(downlink);
}

