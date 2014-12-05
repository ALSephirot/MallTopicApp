function Login(Provider) {
	try
	{
		OAuth.popup(Provider,{cache: true})
			.done(function(result) {

				result.get("/me")
			    .done(function (response) {
			    	//alert('Bienvenido: ' + response.name + '\nTu usuario es:' response.user);
			        alert('Bienvenido: ' + response.name + ' a MallTopic!.\nTu id es: '+ response.id);
			        setIdUsuario(response.id);
			    })
			    .fail(function (err) {
			        //handle error with err
			    });
				//use result.access_token in your API request 
				//or use result.get|post|put|del|patch|me methods (see below)
				//alert('token: ' + result.access_token);
				
			})
			.fail(function (err) {
			  //handle error with err
		});
	}
	catch(error)
	{
		alert(error);
	}
}

function PublicarTweet(Opcion){

	try
	{
		var item = Opcion.name;
		var Texto = getTSocial();
		var Mensaje = Texto[item];

		OAuth.popup('twitter',{cache: true})
			.done(function(result) {

				result.post("https://api.twitter.com/1.1/statuses/update.json", {data:{
			            'status' : Mensaje,
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
	catch(error)
	{
		alert(error);
	}
}

