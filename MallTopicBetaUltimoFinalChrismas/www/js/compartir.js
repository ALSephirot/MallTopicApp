var Mensajes = {
	"Promos": "Estoy viendo la super promo {0} de {1}. La vi en MallTopic.",
	"Eventos": "Estoy viendo el gran Evento {0} programado por {1}. Lo vi en MallTopic.",
	"Colecciones": "{0} es la nueva coleccion de {1}. Lo vi en MallTopic",
	"Comercios": "Mira todo lo que tiene {0}. Lo vi en MallTopic",
	"Malls": "{0} es lo maximo. Lo vi en MallTopic"
};

//Nomenclatura format.
//Para Promos, Eventos y Colecciones:
//{0} = Nombre de la Promo.
//{1} = Nombre del Comercio o del Mall.
//para Comercios y Mall:
//{0} = Nombre del Mall o del Comercio.
function CompartirContenidos (Pred, Pmodulo, Pid) {

	if (!String.prototype.format) {
	  String.prototype.format = function() {
	    var args = arguments;
	    return this.replace(/{(\d+)}/g, function(match, number) { 
	      return typeof args[number] != 'undefined'
	        ? args[number]
	        : match
	      ;
	    });
	  };
	}

	if(Pred == "WhatsApp")
	{
		CompartirWhatsApp(Pred, Pmodulo, Pid);
	}
	else if(Pred == "E-Mail")
	{
		CompartirEmail(Pred, Pmodulo, Pid);
	}
}

function CompartirWhatsApp (red, modulo, id) {
	var ShareText = Mensajes[modulo];
	switch (modulo)
	{
		case "Promos":

			var url = WebService + "Promos(guid'"+ id +"')?$expand=Malls,Stores";
			loadDataArray(url);
			var APromo = arrayInfo;
			var Mall = APromo.Malls;
			var Store = APromo.Stores;

			if(Mall == null)
			{
				ShareText = ShareText.format(APromo.nombre,Store.nombre);
			}
			else
			{
				ShareText = ShareText.format(APromo.nombre,Mall.nombre);
			}

				
			$(window.location).attr('href','whatsapp://send?text='+ShareText);
			break;
		case "Eventos":

			var url = WebService + "Events(guid'"+ id +"')?$expand=Malls,Stores";
			loadDataArray(url);
			var AEvento = arrayInfo;
			var Mall = AEvento.Malls;
			var Store = AEvento.Stores;

			if(Mall == null)
			{
				ShareText = ShareText.format(AEvento.nombre,Store.nombre);
			}
			else
			{
				ShareText = ShareText.format(AEvento.nombre,Mall.nombre);
			}

			$(window.location).attr('href','whatsapp://send?text='+ShareText);
			break;
		case "Colecciones":

			var url = WebService + "Colections(guid'"+ id +"')?$expand=Malls,Stores";
			loadDataArray(url);
			var AColecc = arrayInfo;
			var Mall = AColecc.Malls;
			var Store = AColecc.Stores;

			if(Mall == null)
			{
				ShareText = ShareText.format(AColecc.nombre,Store.nombre);
			}
			else
			{
				ShareText = ShareText.format(AColecc.nombre,Mall.nombre);
			}

			$(window.location).attr('href','whatsapp://send?text='+ShareText);
			break;
		case "Comercios":

			var url = WebService + "Stores(guid'"+ id +"')?$expand=Malls";
			loadDataArray(url);
			var AStores = arrayInfo;
			var Mall = AStores.Malls;
			var Store = AStores.Stores;

			if(Mall == null)
			{
				ShareText = ShareText.format(AStores.nombre,Store.nombre);
			}
			else
			{
				ShareText = ShareText.format(AStores.nombre,Mall.nombre);
			}

			$(window.location).attr('href','whatsapp://send?text='+ShareText);
			break;
		case "Malls":

			var url = WebService + "Malls(guid'"+ id +"')";
			loadDataArray(url);
			var AMall = arrayInfo;
			var Mall = AMall.Malls;
			var Store = AMall.Stores;

			if(Mall == null)
			{
				if(Store == null)
				{
					ShareText = ShareText.format(AMall.nombre);
				}
				else
				{
					ShareText = ShareText.format(AMall.nombre,Store.nombre);
				}
				
			}
			else
			{
				if(Store == null)
				{
					ShareText = ShareText.format(Mall.nombre);
				}
				else
				{
					ShareText = ShareText.format(Mall.nombre,Store.nombre);
				}
				
			}

			$(window.location).attr('href','whatsapp://send?text='+ShareText);
			break;
	}
}

function CompartirFacebook (Mensaje) {
	var idusuario = getIdUsuario("facebook");
	var AccesToken = getToken();
	OAuth.popup('facebook',{cache: true})
			.done(function(result) {

				result.post("http://graph.facebook.com/{user-id}/feed", {data:{
			            'message' : Mensaje,
                        'access_token' : AccesToken
			        }
			    })
			    .done(function (response) {
			    	//alert('Bienvenido: ' + response.name + '\nTu usuario es:' response.user);
			        alert('Se ha compartido correctamente el contenido en facebook.');
			    })
			    .fail(function (err) {
			        alert('No se ha podido compartir.\nIntentalo de nuevo mas tarde.');
			    });
				//use result.access_token in your API request 
				//or use result.get|post|put|del|patch|me methods (see below)
				var resultado = JSON.stringify(result);
			    alert(resultado);
				
			})
			.fail(function (err) {
			  //handle error with err
		});
}

function CompartirEmail (red, modulo, id) {
	var ShareText = Mensajes[modulo];
	switch (modulo)
	{
		case "Promos":

			var url = WebService + "Promos(guid'"+ id +"')?$expand=Malls,Stores";
			loadDataArray(url);
			var APromo = arrayInfo;
			var Mall = APromo.Malls;
			var Store = APromo.Stores;

			if(Mall == null)
			{
				ShareText = ShareText.format(APromo.nombre,Store.nombre);
			}
			else
			{
				ShareText = ShareText.format(APromo.nombre,Mall.nombre);
			}

				
			$(window.location).attr('href','mailto:Coloca_tu_destinatario?subject=Mira esta super Promo&body='+ShareText);
			break;
		case "Eventos":

			var url = WebService + "Events(guid'"+ id +"')?$expand=Malls,Stores";
			loadDataArray(url);
			var AEvento = arrayInfo;
			var Mall = AEvento.Malls;
			var Store = AEvento.Stores;

			if(Mall == null)
			{
				ShareText = ShareText.format(AEvento.nombre,Store.nombre);
			}
			else
			{
				ShareText = ShareText.format(AEvento.nombre,Mall.nombre);
			}

			$(window.location).attr('href','mailto:Coloca_tu_destinatario?subject=Mira este super Evento&body='+ShareText);
			break;
		case "Colecciones":

			var url = WebService + "Colections(guid'"+ id +"')?$expand=Malls,Stores";
			loadDataArray(url);
			var AColecc = arrayInfo;
			var Mall = AColecc.Malls;
			var Store = AColecc.Stores;

			if(Mall == null)
			{
				ShareText = ShareText.format(AColecc.nombre,Store.nombre);
			}
			else
			{
				ShareText = ShareText.format(AColecc.nombre,Mall.nombre);
			}

			$(window.location).attr('href','mailto:Coloca_tu_destinatario?subject=Mira esta super Coleccion&body='+ShareText);
			break;
		case "Comercios":

			var url = WebService + "Stores(guid'"+ id +"')?$expand=Malls";
			loadDataArray(url);
			var AStores = arrayInfo;
			var Mall = AStores.Malls;
			var Store = AStores.Stores;

			if(Mall == null)
			{
				ShareText = ShareText.format(AStores.nombre,Store.nombre);
			}
			else
			{
				ShareText = ShareText.format(AStores.nombre,Mall.nombre);
			}

			$(window.location).attr('href','mailto:Coloca_tu_destinatario?subject=Mira este super Local&body='+ShareText);
			break;
		case "Malls":

			var url = WebService + "Malls(guid'"+ id +"')";
			loadDataArray(url);
			var AMall = arrayInfo;
			var Mall = AMall.Malls;
			var Store = AMall.Stores;

			if(Mall == null)
			{
				//ShareText = ShareText.format(AMall.nombre,Store.nombre);
				ShareText = ShareText.format(AMall.nombre);
			}
			else
			{
				ShareText = ShareText.format(AMall.nombre,Mall.nombre);
			}

			$(window.location).attr('href','mailto:Coloca_tu_destinatario?subject=Mira este super Centro Comercial&body='+ShareText);
			break;
	}
}

function CompartirTwitter(){

			OAuth.popup('twitter',{cache: true})
				.done(function(result) {

					result.post("https://api.twitter.com/1.1/statuses/update.json", {data:{
				            'status' : Mensajes["Promos"],
	                        'trim_user' : true
				        }
				    })
				    .done(function (response) {
				    	//alert('Bienvenido: ' + response.name + '\nTu usuario es:' response.user);
				        alert('Tu tweet se ha publicado correctamente');
				    })
				    .fail(function (err) {
				        alert('No hemos podido publicar tu Tweet.\nIntentalo de nuevo mas tarde.');
				    });
					//use result.access_token in your API request 
					//or use result.get|post|put|del|patch|me methods (see below)
					
				})
				.fail(function (err) {
				  //handle error with err
			});
}