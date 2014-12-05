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

var currentUrl;
//initPhoneGap();
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

    window.clearInterval(intervalID);
    
    // set to true
    isPhoneGapReady = true;
    
    deviceUUID = device.uuid;
    
    // detect the device's platform
    deviceDetection();
    
    // detect for network access
    PhoneGap_networkDetection();
    
    // execute any events at start up
    executeEvents();
    
    // obtiene lat y long del gps
	//PhoneGapGeolocation_startWatch();
    //executeCallback();

    if(!PhoneGap_isConnected)
    {
        alert('No tienes navegacion, por favor conectate a internet.');
    }
    else
    {
        if(!PhoneGap_isHighSpeed)
        {
            alert('Tu conexion es deficiente, las consultas pueden tardar mas de lo previsto.');
        }
    }
}

function executeEvents() {
    if (isPhoneGapReady) {
	
		console.log('attached events ...');
	
        // attach events for online and offline detection
        document.addEventListener("online", onOnline, false);
        document.addEventListener("offline", onOffline, false);
        
        // attach events for pause and resume detection
        document.addEventListener("pause", onPause, false);
        document.addEventListener("resume", onResume, false);

        //attach event for backbutton
        document.addEventListener("backbutton", onBackButton, false);
        
		
        // set a timer to check the network status
       /* internetInterval = window.setInterval(function() {
				console.log('..checking network... : ' + navigator.connection.type);
				
              if (navigator.connection.type != Connection.NONE) {
                onOnline();
              } else {
                onOffline();
              }
          }, 5000);*/
		
    }
}

function onBackButton() {
    alert('Estoy Regresando');
    navigator.app.backHistory();
}

/*
function executeCallback() {
    if (isPhoneGapReady) {
        // get the name of the current html page
        var pages = currentUrl.split("/");
        var currentPage = pages[pages.length - 1].slice(0, pages[pages.length - 1].indexOf(".html"));
        
        // capitalize the first letter and execute the function
        currentPage = currentPage.charAt(0).toUpperCase() + currentPage.slice(1);
        
        if (typeof window['on' + currentPage + 'Load'] == 'function') {
            window['on' + currentPage + 'Load']();
        }
    }
}
*/

function deviceDetection() {
    if (isPhoneGapReady) {
        switch (device.platform) {
            case "Android":
                isAndroid = true;
				console.log('is android');
				deviceName="Android";
                break;
            case "Blackberry":
                isBlackberry = true;
				console.log('is bb');
				deviceName="Blackberry";
                break;
            case "iPhone":
                isIphone = true;
				console.log('is iphone');
				deviceName="Iphone";
                break;
            case "WinCE":
                isWindows = true;
				console.log('is WinCE');
				deviceName="WinCE";
                break;
        }
    }
}


function checkConnection() {
        var networkState = navigator.connection.type;

        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.NONE]     = 'No network connection';

        console.log('Connection type: ' + states[networkState]);
}

function PhoneGap_networkDetection() {


	console.log('network .. detection ..');

    if (isPhoneGapReady) {
		
        //if (navigator.network.connection.type != Connection.NONE) {
        //    isConnected = true;
        //}
        
        // determine if this connection is high speed or not
        switch (navigator.connection.type) {
            case Connection.UNKNOWN:
                break;
			case Connection.NONE:
				PhoneGap_isConnected = false;
				PhoneGap_isHighSpeed = false;
				break;
            case Connection.CELL_2G:
				PhoneGap_isConnected = true;			
                PhoneGap_isHighSpeed = false;
                break;
            case Connection.CELL_3G:
                PhoneGap_isConnected = true;            
                PhoneGap_isHighSpeed = false;
                break;
            default:
				PhoneGap_isConnected = true;	
                PhoneGap_isHighSpeed = true;
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

function onOnline() {
	console.log('onOnline...');
    PhoneGap_isConnected = true;
}

function onOffline() {
	console.log('onOffline...');
    PhoneGap_isConnected = false;
}

function onPause() {
    isPhoneGapReady = false;
    
    // clear the Internet check interval
    //window.clearInterval(internetInterval);
}

function onResume() {
    // don't run if phonegap is already ready
    if (isPhoneGapReady == false) {
       // alert('resuming');
        initPhoneGap();
    }
}

// Network detection


// Compass ------------------------------------------------------------------------

    function PhoneGapCompass_startWatch() {
        // Update compass every 3 seconds
        var options = { frequency: 3000 };
        PhoneGapCompass_watchID = navigator.compass.watchHeading(PhoneGapCompass_onSuccess, PhoneGapCompass_onError, options);
    }

    // Stop watching the compass
    function PhoneGapCompass_stopWatch() {
        if (PhoneGapCompass_watchID) {
            navigator.compass.clearWatch(PhoneGapCompass_watchID);
            watchID = null;
        }
    }

    // onSuccess: Get the current heading
    function PhoneGapCompass_onSuccess(heading) {
        //var element = document.getElementById('heading');
        //element.innerHTML = 'Heading: ' + heading.magneticHeading;
		console.log('PhoneGapCompass_onSuccess : ' + heading.magneticHeading);
		compassHeading = heading.magneticHeading;
		
		$('#phonegap_output').text(compassHeading);
		
    }

    // onError: Failed to get the heading
    function PhoneGapCompass_onError(compassError) {
        alert('Compass error: ' + compassError.code);
    }

// Geolocation --------------------------------------------------------------------------------	
	
	function PhoneGapGeolocation_startWatch() {
		console.log("searching gps location...");
        // Get the most accurate position updates available on the device.
		// Throw an error if no update is received every 3 seconds
        var options = { enableHighAccuracy: true, timeout: 3000 };
        PhoneGapGeolocation_watchID = navigator.geolocation.watchPosition(PhoneGapGeolocation_onSuccess, PhoneGapGeolocation_onError, options);
    }

    // onSuccess Geolocation
    function PhoneGapGeolocation_onSuccess(pos) {
        var element = document.getElementById('phonegap_output');
		 
		setLatitud(pos.coords.latitude);
		setLongitud(pos.coords.longitude);

        console.log('Latitude: '+ pos.coords.latitude + ' Longitude: ' + pos.coords.longitude);
		//busca direccion de ciudad basada en el lat y long e ingresa al app
		//codeLatLng(pos.coords.latitude,pos.coords.longitude);
		//para el reloj
		PhoneGapGeolocation_stopWatch();
    }

    // clear the watch that was started earlier
    function PhoneGapGeolocation_stopWatch() {
        if (PhoneGapGeolocation_watchID != null) {
            navigator.geolocation.clearWatch(PhoneGapGeolocation_watchID);
            PhoneGapGeolocation_watchID = null;
			console.log("whatch has stopped..");
        }
    }

    // onError Callback receives a PositionError object
    function PhoneGapGeolocation_onError(error) {
          console.log('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n'); 
				//var sqlqueryUser='CREATE TABLE IF NOT EXISTS City(id INTEGER NOT NULL PRIMARY KEY, ciudad uniqueidentifier, pais uniqueidentifier, nombrec TEXT, nombrep TEXT)';
				//checkTable(sqlqueryUser);
				//check if the user has db entries
				//checkRegistry();
    }
	function codeLatLng(lat, lng) {
			console.log("onCodeLatLng...with lat="+lat+" long="+lng);
			var geocoder = new google.maps.Geocoder();
			var latlng = new google.maps.LatLng(lat, lng);
			
			geocoder.geocode({'latLng': latlng}, function(results, status) {
			  console.log(results);
			  if (status == google.maps.GeocoderStatus.OK) {
			  
				if (results[1]) {
				 //formatted address
				 console.log(results[1].formatted_address);
				 //busca ciudad
				 //searchCity(results);
				 

				} else {
				  console.log("No results found");
				}
			  } else {
				console.log("Geocoder failed due to: " + status);
			  }
    });
		 }
	var estado=false;
	var cityobject;
	//metodo que busca la ciudad en el bd de una lista de direcciones asociadas a la lat y long de la ubicacion del usuario
	function searchCity(objectNames) {
		console.log("onSearchCity...");
		//				
		//consulta el nombre especifico de la ciudad en bd 
		//url="http://lmcwfc.azurewebsites.net/malltopicWcf.svc/Ciudades?$filter=(nombre)eq('"+nombre+"')";
		
		//consulta todas las ciudades regitradas en la BD
		var url="http://Administrator:malltopic2014@malltopicserviceapp.azurewebsites.net/malltopicWcf.svc/Cities?$expand=Countries";		
		$.ajax({
					type: "GET",
					url: url,
					dataType: "json",
					success: function (results) {
						cityobject=results;
						console.log(results)
				//ciclo que recorre el objeto de las direcciones asociadas a la lat y long del usuario
			for (var j=0; j<objectNames.length; j++) {
				//find city name of google object
				for (var i=0; i<objectNames[j].address_components.length; i++) {
				//ciclo para recorrer todos los registros de bd 
					for(var k=0; k<results.value.length; k++) {
						console.log("Comparing city name= "+objectNames[j].address_components[i].long_name+" with the city "+results.value[k].nombre);
				//valida que el nombre de la bd sea igual al del objeto de direcciones del usuario
						if(results.value[k].nombre==objectNames[j].address_components[i].long_name){
							console.log("paisID="+ results.value[k].fk_idPais+" ciudadID="+results.value[k].id+" ciudadNombre="+results.value[k].nombre+" paisNombre="+results.value[k].Paises.nombre);
				//asigna valores a variables globales para manejo de formulario y consultas dentro de la aplicacion
							paisId=results.value[k].fk_idPais;
							ciudadId=results.value[k].id;
							ciudadNombre=results.value[k].nombre;
							paisNombre=results.value[k].Paises.nombre;
							direccionUsuario=objectNames[0].formatted_address;
				//redirecciona a index con los datos de la ciudad del usuario
							$.mobile.changePage( "#index", {
								transition: "slide",
								reverse: false,
								});
							i=objectNames[j].address_components.length;
							j=objectNames.length;
							k=results.value.length;
							break;
						}
					
					}
					//console.log("cityobject="+cityobject);
					
					}
				 }
			alert("Lo siento, no ha sido posible encontrar la ciudad. Favor ingresarla manualmente");								
						
								
					},
					error: function (msg) {
						//ServiceFailed(msg);
						console.log("error="+msg);
						alert("Lo siento, no ha sido posible encontrar la ciudad. Favor ingresarla manualmente");
						alert(msg);
					}
				});
	

    }

/*
// This gets called by jQuery mobile when the page has loaded
$(document).bind("pageload", function(event, data) {
    initPhoneGap(data.url);
});

$(document).bind("mobileinit", function(){
  $.mobile.page.prototype.options.addBackBtn = true;
});
*/
// Set an onload handler to call the init function
//window.onload = initPhoneGap;
