// Global variable that will tell us if PhoneGap is ready
var isPhoneGapReady = false;

// Default all phone types to false
var isAndroid = false;
var isBlackberry = false;
var isIphone = false;
var isWindows = false;
var intervalID = false;

// Store the device's uuid
var deviceUUID;
var deviceName='';
// Store the current network status
var PhoneGap_isConnected = false;
var PhoneGap_isHighSpeed;
var PhoneGap_networkDescription = null;
var internetInterval;
var compassHeading = 0;
var PhoneGapNetword_watchID = null;
var PhoneGapCompass_watchID = null;
var PhoneGapGeolocation_watchID = null;
var TipoConexion = '';
var Regis;

var currentUrl;
//initPhoneGap();
window.TipoConexion = TipoConexion;
window.deviceUUID = deviceUUID;
window.initPhoneGap=initPhoneGap;
function initPhoneGap() {
	
	console.log('initPhoneGap...');

    if (isPhoneGapReady) {
		console.log('ready...');
		
        onDeviceReady();
    } else {

		console.log('not ready...');
        // Add an event listener for deviceready
		//document.addEventListener("deviceready", onDeviceReady, false);

        // Older versions of Blackberry < 5.0 don't support 
        // PhoneGap's custom events, so instead we need to 
        // perform an interval check every 500 milliseconds 
        // to see if PhoneGap is ready.  Once done, the 
        // interval will be cleared and normal processing
        // can begin
		/*
        intervalID = window.setInterval(function() {
              if (PhoneGap.available) {
                  onDeviceReady();
              }
          }, 500);
		*/
      }
}

function onDeviceReady() {

	console.log('onDeviceReady...');
    
    // set to true
    isPhoneGapReady = true;
    
    deviceUUID = device.uuid;
    localStorage.setItem("IdCelular", deviceUUID);
    navigator.notification.alert(deviceUUID);
    
    // detect for network access
    PhoneGap_networkDetection();

    //Detecto la plataforma
    deviceDetection();

    localStorage.setItem("TC", TipoConexion);
}

function PhoneGap_networkDetection() {


	console.log('network .. detection ..');

    if (isPhoneGapReady) {
        
        // determine if this connection is high speed or not
        switch (navigator.connection.type) {
            case Connection.UNKNOWN:
                break;
			case Connection.NONE:
				PhoneGap_isConnected = false;
				PhoneGap_isHighSpeed = false;
                //setConectado(false);
                //setAltaVelocidad (false);
                TipoConexion = 'NONE';
                //alert('No tienes navegacion, por favor conectate a internet.');
				break;
            case Connection.CELL_2G:
				PhoneGap_isConnected = true;			
                PhoneGap_isHighSpeed = false;
                //setConectado(true);
                //setAltaVelocidad (false);
                TipoConexion = '2G';
                //alert('Tu conexion es deficiente, las consultas pueden tardar mas de lo previsto.');
                break;
            case Connection.CELL_3G:
                PhoneGap_isConnected = true;            
                PhoneGap_isHighSpeed = false;
                //setConectado(true);
                //setAltaVelocidad (false);
                TipoConexion = '3G';
                //alert('Tu conexion es deficiente, las consultas pueden tardar mas de lo previsto.');
                break;
            default:
				PhoneGap_isConnected = true;	
                PhoneGap_isHighSpeed = true;
                TipoConexion = '4G-WiFi';
                //setConectado(true);
                //setAltaVelocidad (true);
                break;
        }
		
		var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.NONE]     = 'No network connection';
		
		PhoneGap_networkDescription = states[navigator.connection.type];
		console.log('Connection type: ' + PhoneGap_networkDescription);
    }
}

function deviceDetection() {
    if (isPhoneGapReady) {
        switch (device.platform) {
            case "Android":
                localStorage.setItem("Platform","Android");
                console.log('is android');
                break;
            case "Blackberry":
                localStorage.setItem("Platform","BlackBerry");
                console.log('is bb');
                break;
            case "iOS":
                localStorage.setItem("Platform","iOS");
                console.log('is iphone');
                break;
            case "WinCE":
                localStorage.setItem("Platform","WinCE");
                console.log('is WinCE');
                break;
            default:
                localStorage.setItem("Platform",device.platform);
                console.log(device.platform);
                break;
        }
    }
}

function GetTipoConexion() {
    return TipoConexion;
}

function GetIdCel() {
    return deviceUUID;
}

function GetRegistro() {
    return Regis;
}

