//Variables generales
var map;
var PosicionInicial;
var PosicionFinal;
var directionsService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer();
/*var WebService = "http://Administrator:malltopic2014!@malltopicserviceapp.azurewebsites.net/malltopicWcf.svc/";
var url;
var arrayInfo=null;*/
var CargadoMapsIndex = false;
var CargadoMapsMall = false;

function EstablecerMapa()
{
	try
	{
			//Establesco el centro del mapa en Medellin
			//Debe de traerse desde la base de datos
			var Center = new google.maps.LatLng(6.235925000000000000, -75.575136999999980000)
			//alert('Establesco Cordenadas Iniciales: '+ Center);

			//Creo el objeto de propiedades del mapa
		    var mapOptions = {

		    	center: PosicionInicial,
		        zoom: 15,
		        mapTypeId: google.maps.MapTypeId.ROADMAP

		    };

		    map = new google.maps.Map(document.getElementById("map_canvas"), {
						   zoom: 14,
	                       center: PosicionInicial,
						   mapTypeId: google.maps.MapTypeId.ROADMAP
						 });
		    //alert('Agrego el mapa ' + map)
		    directionsDisplay.setMap(map);
	}
	catch(error)
	{
		//alert(error);
	}
}

function AgregarMarcadoresMalls()
{
	try
	{
		var Coordenadas = getGlovalAMalls();

		$.each(Coordenadas.value, function(index, item) {
			if(ComprobarMasCercanos(item.id))
			{
				var Coorde = new google.maps.LatLng(item.latitud, item.longitud);
				var marker = new google.maps.Marker({
		            position: Coorde,
		            animation: google.maps.Animation.DROP,
		            map: map,
		            title: item.nombre
		        });

		        var infowindow = new google.maps.InfoWindow();
		            //contenido de recuadro de informacion del cc 
		        google.maps.event.addListener(marker, 'click', (function (marker) {
		            return function () {
			            infowindow.setContent('<img ALIGN="Left" width="50" height="50" SRC="http://malltopic.azurewebsites.net/Images/Uploads/Icons/SplashMalls/Logosmall/'+item.id+'.png"/>Centro comercial '+ item.nombre+'<p>Direccion:'+item.direccion+'</p><p>Telefono:'+item.telefono+'</p>');
			            infowindow.open(map, marker);
		            }
		        })(marker));
			}
		});

	}
	catch(error)
	{
		//alert(error);
	}
}

function EstablecerMapaComoLlegar()
{
	try
	{	
			//Establesco el centro del mapa en Medellin
			//Debe de traerse desde la base de datos
			var Center = new google.maps.LatLng(6.235925000000000000, -75.575136999999980000)

			//Creo el objeto de propiedades del mapa
		    var mapOptions = {

		    	center: Center,
		        zoom: 15,
		        mapTypeId: google.maps.MapTypeId.ROADMAP

		    };

		    map = new google.maps.Map(document.getElementById("map_canvasComoLlegar"), {

																			    	center: Center,
																			        zoom: 15,
																			        mapTypeId: google.maps.MapTypeId.ROADMAP

																			    });
		    directionsDisplay.setMap(map);

		    //directionsDisplay.setMap(map);
		    directionsDisplay.setPanel(document.getElementById('directions-panel'));

		    var control = document.getElementById('Cont_Buttons');
		    control.style.display = 'block';
		    map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(control);

		    var Medios = document.getElementById('ButtonMedios');
		    Medios.style.display = 'block';
		    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(Medios);

		    var Rutas = document.getElementById('ButtonInstrucciones');
		    Rutas.style.display = 'block';
		    map.controls[google.maps.ControlPosition.LEFT_CENTER].push(Rutas);
		    
		    CargadoMapsMall = true;

		    CargarMediosTransporte();
		    
	}
	catch(error)
	{
		//alert(error);
	}
	
}

function trazarRuta(TravelMode) {

	try
	{
		var request = {
	    	origin: PosicionInicial,
	        destination: PosicionFinal,
	        travelMode: google.maps.TravelMode[TravelMode]
	    };

	    directionsService.route(request, function (response, status) {
	    	if (status == google.maps.DirectionsStatus.OK) {
	                    directionsDisplay.setDirections(response);
	        }
	        else {
	        	//alert('No hay rutas para esta opcion.');
	        }
	    });

	}
	catch(error)
	{
		alert('No pudimos trazar la ruta automaticamente, por favor selecciona una opcion.');
	}
    

}

function GetPositionInitial()
{
	try
	{
		if (navigator.geolocation) {
			var options = { enableHighAccuracy: true, timeout: 3000 };
			var PhoneGapGeolocation_watchID = navigator.geolocation.watchPosition(PhoneGapGeolocation_onSuccess, PhoneGapGeolocation_onError, options);

	        /*navigator.geolocation.getCurrentPosition(function (pos) {
	            PosicionInicial = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
	            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));

	        }, function (error) {
	            switch (error.code) {
	                case error.TIMEOUT:
	                    alert('Request timeout');
	                    break;
	                case error.POSITION_UNAVAILABLE:
	                    alert('Tu posición no está disponible');
	                    break;
	                case error.PERMISSION_DENIED:
	                    alert('Tu navegador ha bloqueado la solicitud de geolocalización');
	                    break;
	                case error.UNKNOWN_ERROR:
	                    alert('Error desconocido');
	                    break;
	            }

	        });*/

	    }

	}
	catch (error)
	{
		//alert(error);
	}
	
}

function PhoneGapGeolocation_onSuccess(pos) {
    var element = document.getElementById('phonegap_output');
		 
	PosicionInicial = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);

    console.log('Latitude: '+ pos.coords.latitude + ' Longitude: ' + pos.coords.longitude);
	
	PhoneGapGeolocation_stopWatch();
	MallsMasCercanos();
}

function PhoneGapGeolocation_onError(error) 
{
    switch (error.code) {
        case error.TIMEOUT:
            //alert('Request timeout');
            break;
        case error.POSITION_UNAVAILABLE:
            alert('Tu posición no está disponible');
            break;
        case error.PERMISSION_DENIED:
            alert('Tu navegador ha bloqueado la solicitud de geolocalización');
            break;
        case error.UNKNOWN_ERROR:
            alert('Error desconocido');
            break;
    }
}

function PhoneGapGeolocation_stopWatch() {
    if (PhoneGapGeolocation_watchID != null) {
        navigator.geolocation.clearWatch(PhoneGapGeolocation_watchID);
        PhoneGapGeolocation_watchID = null;
		console.log("whatch has stopped..")
    }
}


function GetPositionFinal()
{
	try
	{
		url = WebService + "Malls(guid'"+getCC()+"')/";
		loadDataArray(url);
		var aaaa = arrayInfo;
		PosicionFinal = new google.maps.LatLng(aaaa.latitud, aaaa.longitud);

	}
	catch(error)
	{
		alert(error)
	}
	

}

function LlamarPopUpMedios() {
	$( "#PopUp" ).dialog( "open" );
}

function MallsMasCercanos(){
	var AMalls = getGlovalAMalls();
	var AMallsCercanos = '';

	$.each(AMalls.value, function(index, item) {
		
		var DistanciaKM = 5000;
		var CoordeMall = new google.maps.LatLng(item.latitud,item.longitud);
		var distancia = google.maps.geometry.spherical.computeDistanceBetween(PosicionInicial,CoordeMall);

		if(distancia <= DistanciaKM)
		{
			AMallsCercanos += item.id + ','+ distancia +','+item.nombre+';';	
		}
		
	});

	AMallsCercanos = AMallsCercanos.substring(0, AMallsCercanos.length -1);
	var MallsMasCercanos = AMallsCercanos.split(';');

	$.each(MallsMasCercanos, function(index, item) {
		var Atemp = MallsMasCercanos[index].split(',');

		var atemp2 = new Array();
		atemp2['idmall'] = Atemp[0];
		atemp2['distancia'] = Atemp[1];
		atemp2['nombre'] = Atemp[2];

		MallsMasCercanos[index] = atemp2;
		
	});

	MallsMasCercanos.sort(function(a,b) {
			if(a.distancia < b.distancia) return -1;
		    if(a.distancia > b.distancia) return 1;
		    return 0;
		});

	setMasCercanos(MallsMasCercanos);
	
}

function CargarMediosTransporte() {
	var AMalls = getGlovalAMalls();
	var Mall = getCC();
	var estado = false;

	var htmlMedios = '<ul>';

	$.each(AMalls.value, function(index, val) { 
		var idMall = val.id;

		if(idMall == Mall)
		{
			$.each(val.transport, function(index, transport) {
				 htmlMedios += '<li>' +
			                        '<div class="medioTrans">' +
			                        '<img src="'+ RutaRecursos +'MediosTransporte/'+ transport.ID +'.png" class="iconaso"></img>' +
			                        '<p>'+ transport.transporte +'</p>' +
			                        '</div>' +
			                    '</li>';
			     estado = true;
			});
		}
	});

	if(!estado)
	{
		htmlMedios += '<li>No se encontraron medios de transporte.</li>';
	}
	htmlMedios += '</ul>';

	$('#ContentMedios').html(htmlMedios);
                    
}


//Control de Eventos

$(document).on("pageshow","#maps",function(){
	$.mobile.loading("show",{
		  text: "Cargando Mapa y marcadores...",
		  textVisible: true,
		  theme: "b",
		  html: ""
		});

	setTimeout(function(){
		EstablecerMapa();
		AgregarMarcadoresMalls();
		$.mobile.loading("hide");
	}, 20);

});

$(document).on("pageshow","#ComoLlegar",function(){
	$.mobile.loading("show",{
		  text: "Cargando Mapa y ruta...",
		  textVisible: true,
		  theme: "b",
		  html: ""
		});

	setTimeout(function(){
		var control = $('#ContenedorBotonesGeneral');

		var botones = 	'<div id="Cont_Buttons">' +
		                        '<div id="ButtonDriving">' +
		                            '<a href="#" onclick="trazarRuta('+"'DRIVING'"+')"><figure><img src="images/trazaRuta.png" alt="TrazarRuta"></figure></a>' +
		                        '</div>' +
		                '</div>';
		botones += 	'<div id="ButtonMedios">' +
		                        '<div id="Medios">' +
		                            '<a href="#" onclick="LlamarPopUpMedios()" data-rel="dialog" data-transition="pop""><figure><img src="images/btnTransporte.png" alt="MediosTransporte"></figure></a>' +
		                        '</div>' +
		                '</div>';

		botones += 	'<div id="ButtonInstrucciones">' +
		                        '<div id="Rutas">' +
		                            '<a href="#directions-panel" onclick="$.mobile.silentScroll(200)" ><figure><img src="images/InfoMapa.png" alt="Instrucciones Ruta"></figure></a>' +
		                        '</div>' +
		                '</div>';

		control.html(botones);
		EstablecerMapaComoLlegar();
		GetPositionFinal();
		GetPositionInitial();
		setTimeout(function(){
				trazarRuta("DRIVING");
			}, 2000);
		$.mobile.loading("hide");
	}, 20);	
});

jQuery(document).ready(function($) {
	setInterval(CargarAMalls,120000);
	CargarAMalls();
	GetPositionInitial();
});


		