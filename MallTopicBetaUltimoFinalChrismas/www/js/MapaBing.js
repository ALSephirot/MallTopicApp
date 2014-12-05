//Variables generales
var map;
var PosicionInicial;
var PosicionFinal;
var directionsService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer();
var WebService = "http://Administrator:malltopic2014!@wcfmalltopic.azurewebsites.net/malltopicWcf.svc/";
var url;
var arrayInfo=null;
var CargadoMapsIndex = false;
var CargadoMapsMall = false;


//Funciones

//url= direccion uri de la consulta
function loadDataArray(url) {

	$.ajax({
		type: "GET",
		url: url,
		dataType: "json",
		async:false,
		success: function (results) {

			//se almacena objeto resultados en variable global
   			arrayInfo=results;		

		},
		error: function (msg) {
				  
			ServiceFailed(msg);

		}
	});
}
		
function ServiceFailed(xhr) {
		
	/*if (xhr.responseText) {

		var err = xhr.responseText;
	if (err)

		error(err+' error');

	else

		error({ Message: "Unknown server error." })
	}*/
	return;
}


function EstablecerMapa()
{
	try
	{
		    map = new Microsoft.Maps.Map(document.getElementById('map_canvas'), {credentials: 'AmpeWrDHLHa6-kHCUfw5as49ZthzPoAU1DP3kZvo1lU49pw0dTUYXIuYndVXjHUj'});
	}
	catch(error)
	{
		alert(error);
	}
}

function AgregarMarcadoresMalls()
{
	try
	{
		url = WebService + "Cities(guid'"+ getCiudad() +"')/Malls?$select=id,latitud,longitud,nombre,direccion,telefono,correo";
		loadDataArray(url);
		var Coordenadas = arrayInfo;

		$.each(Coordenadas.value, function(index, item) {
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
		            infowindow.setContent('<img ALIGN="Left" width="50" height="50" SRC="http://malltopic.azurewebsites.net/Images/Uploads/Icons/SplashMalls/Logosmall/'+item.id+'.png"/>Centro comercial '+ item.nombre+'<p>Direccion:'+item.direccion+'</p><p>Telefono:'+item.telefono+'</p><p>Contacto:'+item.correo+'</p>');
		            infowindow.open(map, marker);
	            }
	        })(marker));

		});

	}
	catch(error)
	{
		alert(error);
	}
}

function EstablecerMapaComoLlegar()
{
	try
	{
		if(CargadoMapsMall == false)
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

		    map = new google.maps.Map(document.getElementById("map_canvasComoLlegar"), mapOptions);
		    directionsDisplay.setMap(map);

		    //directionsDisplay.setMap(map);
		    directionsDisplay.setPanel(document.getElementById('directions-panel'));

		    var control = document.getElementById('Cont_Buttons');
		    control.style.display = 'block';
		    map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(control);
		    google.maps.event.trigger(map,'resize');
		    CargadoMapsMall = true;
		    $('#map_canvasComoLlegar').height($(window).height() - (10 + $('[data-role=header]').height() - $('[data-role=footer]').height()));
		}
	}
	catch(error)
	{
		alert(error);
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
	        	alert('No se pudo calcular la ruta');
	        }
	    });

	}
	catch(error)
	{
		alert(error);
	}
    

}

function GetPositionInitial()
{
	try
	{
		PosicionInicial = new google.maps.LatLng(getLatitud(), getLongitud());
	    map.setCenter(PosicionInicial);
		/*if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(function (pos) {
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

	        });

	    }*/

	}
	catch (error)
	{
		alert(error);
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


//Control de Eventos

$(document).on("pageshow","#maps",function(){

	EstablecerMapa();
	//AgregarMarcadoresMalls();
	

});

$(document).on("pageshow","#ComoLlegar",function(){

	EstablecerMapaComoLlegar();
	GetPositionFinal();
	GetPositionInitial();
	trazarRuta("DRIVING");
	//$('#map_canvasComoLlegar').height($(window).height() - (10 + $('[data-role=header]').height() - $('[data-role=footer]').height()));
});
