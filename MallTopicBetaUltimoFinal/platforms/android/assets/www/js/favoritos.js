var client = new WindowsAzure.MobileServiceClient("https://actividadservice.azure-mobile.net/","sLoJhypFhkyneeSyoebbAEUHcnsMRr37");

function InsertObject(tabla, object)
{
    if(tabla == "" || tabla == undefined)
    {
        alert('No hay tabla en que guardar');
    }
    else
    {
        if(object == "" || object == undefined)
        {
            alert('No hay datos que guardar');

        }
        else
        {
            var TablaInsert = client.getTable(tabla);
            TablaInsert.insert(object).then(GuardadoCorrectamente, handleError);
        }
        
    }
    
}

function GuardarFavorito (argumentos){
	var Favorito = argumentos.Favorito;
	var Datos;
	var idCelular = getIdTelefono();
	var TablaInsert = client.getTable("favoritos");
	var iduser = getIdUsuario();
	
	if(Favorito == "Mall")
	{
		var IdMall = argumentos.Mall;

		Datos = {
	        idusuario: iduser,
	        idmallfav: IdMall,
	        idlocalfav: null
	    };

	    var queryMalls = TablaInsert.where({ idusuario: iduser, idmallfav: IdMall});
		queryMalls.read().then(function(argument) {

			if(argument.length == 0)
			{
				InsertObject('favoritos', Datos);
		    }
		    else
		    {
		    	alert('Este Mall ya se encuentra entre tus favoritos!.');
		    }
		});

	}
	else if(Favorito == "Comercio")
	{
		var IdComercio = argumentos.Comercio;

		Datos = {
	        idusuario: iduser,
	        idmallfav: null,
	        idlocalfav: IdComercio
	    };

	    var queryComercios = TablaInsert.where({ idusuario: iduser, idlocalfav: IdComercio});
		queryComercios.read().then(function(argument) {

			if(argument.length == 0)
			{
				InsertObject('favoritos', Datos);
		    }
		    else
		    {
		    	alert('Este Comercio ya se encuentra entre tus favoritos!.');
		    }
		});

      	
	}
}

function TraerFavoritos() {
	var TablaInsert = client.getTable("favoritos");
	var iduser = getIdUsuario();
	var queryMalls = TablaInsert.where({ idusuario: iduser, idlocalfav: null});
	queryMalls.read().then(function(argument) {
			var Lista='';
			$.each(argument,function(index,item) {
				var url = WebService + "Malls(guid'"+ item.idmallfav +"')"
				loadDataArray(url);
				var mall = arrayInfo;

				Lista += '<a id="'+ mall.id +'" name="Malls" href="#SplashScreen"><li class="listaFav">' +
							'<img src="images/Store.png"/>' +
							'<p class="textolistaFav">'+ mall.nombre +'</p>' +
                            '<div class="FlechaLocalesFav">Ir</div>' +
                        '</li></a>';
			});

			var listafinal = Lista;

            $('[data-id="MallsFavoritos"]').html(Lista);
            
	});

	var queryLocal = TablaInsert.where({ idusuario: iduser, idmallfav: null});
	queryLocal.read().then(function(argument) {
		var Lista='';
			$.each(argument,function(index,item) {
				var url = WebService + "Stores(guid'"+ item.idlocalfav +"')"
				loadDataArray(url);
				var Local = arrayInfo;

				Lista += '<a id="'+ Local.id +'" href="#DetalleComercio" name="Locales" ><li class="listaFav">' +
							'<img src="images/Store.png"/>' +
							'<p class="textolistaFav">'+ Local.nombre +'</p>' +
                            '<div class="FlechaLocalesFav">Ir</div>' +
                        '</li></a>';
			});

			var listafinal = Lista;

            $('[data-id="LocalesFavoritos"]').html(Lista);
	});

	$.mobile.loading("hide");
}

function handleError(error) {
    var text = error + (error.request ? ' - ' + error.request.status : '');
    alert(text);
}

function GuardadoCorrectamente() {
	alert('Tu favorito ha sido guardado correctamente.');
}

