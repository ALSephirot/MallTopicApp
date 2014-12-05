$( document ).on( "pageshow", "#Cargando", function(){
            try
            {
                //alert('Bienvenido');
               
                
                
            }
            catch(err)
            {
                alert('No se han podido cargar todas las librerias necesarias, por favor revisa tu conexion a internet y vuelve a intentarlo.');
                navigator.app.exitApp();
            }
       });

$(document).ready(function() {
	setTimeout(function(){
		//$.mobile.changePage('main.html','slide');
        window.location.href = 'main.html';
    }, 5000);
});