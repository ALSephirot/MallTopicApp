function Login(Provider) {
	try
	{
		OAuth.popup(Provider,{cache: true})
			.done(function(result) {

				result.get("/me")
			    .done(function (response) {
			    	//alert('Bienvenido: ' + response.name + '\nTu usuario es:' response.user);
			        alert('Bienvenido: ' + response.name + ' a MallTopic!.');
			        setIdUsuario(response.id,Provider);
			        setToken(response.access_token,Provider);
			        //var myJsonString = JSON.stringify(response);
			        GuardarDatosUsuario(Provider, response);
			        $.mobile.changePage('#Index','slide');
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
		//alert(error);
	}
}

function LoginRegistro(Provider) {
	try
	{
		OAuth.popup(Provider,{cache: true})
			.done(function(result) {

				alert('Te has logeado correctamente en '+ Provider);
				
			})
			.fail(function (err) {
			  //handle error with err
		});
	}
	catch(error)
	{
		//alert(error);
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
		//alert(error);
	}
}

//<!-----------------------------------Chekin Social------------------------------------->
			   
function ClickCheckIn(option)
{
	try
	{
		$(".listaCheck").css( "right", "-450px" );
    	$(".iconoCheck").css({'background':'url(images/iconoChekin.png)', 'background-size':'100%'});
    	MallCheckIn = option.value;
    	CargarTextoSocial();
	}
	catch(err)
	{
		//alert(err);
	}
}

function c (argument) {
	console.log(argument);
}
//<!-----------------------------------Chekin Social------------------------------------->
