$(document).ready(function() {
        document.addEventListener("deviceready", onDeviceReady, false);

        setTimeout(function() {
        	VerificarConexion();
        	VerificarRegistro();
            var GlovalParameters =  localStorage.getItem("GlovalParameters");
        },5000);
});

var client = new WindowsAzure.MobileServiceClient("https://actividadservice.azure-mobile.net/","sLoJhypFhkyneeSyoebbAEUHcnsMRr37");

function VerificarConexion() {
    var TC = localStorage.getItem('TC');

    switch (TC)
    {
    	case "4G-WiFi":
    		console.log('Alta Velocidad');
    		break;
    	case "2G":
    		alert('Hemos detectado que tu conexion es deficiente.\nLas consultas podran tardar mas de lo esperado');
    		break;
    	case "3G":
    		alert('Hemos detectado que tu conexion es deficiente.\nLas consultas podran tardar mas de lo esperado');
    		break;
    	case "NONE":
    		alert('No hemos detectado conexion a WiFi o Plan de datos.\nPor favor verifica tu conexion e intenta ingresar nuevamente.');
    		navigator.app.exitApp();
    		break;
    }
    
}

function VerificarRegistro() {
	var id = localStorage.getItem('IdCelular');
    var TablaInsert = client.getTable("regis_users");
    var queryMalls = TablaInsert.where({ idcelular: id});

        queryMalls.read().then(function(argument) {
            if(argument.length == 0)
            {
                localStorage.setItem("VR", "false");
            }
            else
            {
                localStorage.setItem("VR", "true");
            }
            window.location.href = "main.html";
        });
}