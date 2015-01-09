
//variable global
var client = new WindowsAzure.MobileServiceClient("https://actividadservice.azure-mobile.net/","sLoJhypFhkyneeSyoebbAEUHcnsMRr37");
var selectedMall;
var selectedCategory = "";
var CantItemLazyLoad = 10;
var VerConexion = true;
var mallHeader;
var mallSplash;
var mallName;
var arrayInfo = null;
var arrayInfoAsync = null;
var WebService = "http://Administrator:malltopic2014!@MallTopicServiceApp.azurewebsites.net/malltopicWcf.svc/";	//Variable que almacena la URL del WebService con Autenticacion
var url = "";//Variable para armar las respesctivas URL para las consultas
var MallCheckIn = '';
var Usuarios = {"Facebook":"ASephirot","Twitter": "LuisOquendoDev"};
var RutaRecursos = "http://malltopic.azurewebsites.net/Images/Uploads/MallTopicApp/";


jQuery(document).ready(function($) {

	try
	{
		OAuth.initialize('QS1KdtPIJXpYmqxJmHW1xRew5t4');

		var TextosSocial = {
			"Famosos": "Acabo de ver un Famoso en el #Cc"+MallCheckIn+"MT @MallTopic",
			"Pasarela": "Esta disfrutando de un desfile de modas en el #Cc"+MallCheckIn+"MT @MallTopic",
			"Show": "Esta un evento en el #Cc"+MallCheckIn+"MT @MallTopic",
			"SoloxHoy": "Acaba de ver una super promocion Solo x Hoy en el #Cc"+MallCheckIn+"MT @MallTopic",
			"Concursos": "Esta participando de los concursos que hay en el #Cc"+MallCheckIn+"MT @MallTopic",
			"Vitrineando": "Esta vitrineando en el #Cc"+MallCheckIn+"MT @MallTopic",
			"Gratis": "Aviso que estan dando regalos en el #Cc"+MallCheckIn+"MT @MallTopic",
			"Lanzamiento": "Estoy en el lanzamiento de una nueva coleccion en el #Cc"+MallCheckIn+"MT @MallTopic"
		};

		setTSocial(TextosSocial);

		$(".botonChekin").on('click',function(){
			$(".iconoCheck").css( "opacity", "1" );
			$(".listaCheck").css( "right", "0px" );
		});

		$(".campoTexto").on('click',function(){
			console.log('click texto');
			$(".abreBusqueda").css({ "opacity":"1", "z-index":"+1" });
			$(this).val('');
		});

		$(".logo").on("click", function() {
			onBackButton();
		})

		$(".logoComoLlegar").on("click", function() {
			onBackButton();
		})

		VerificarRegistro();

		/*$(".btnBuscar").on('click',function(){
			Buscar();
		});*/

	}
	catch(err)
	{
		//alert(err);
	}
});

function VerificarRegistro() {
	var id = localStorage.getItem('VR');
	if(id == "false")
	{
	    localStorage.setItem("VR", "false");
	    $.mobile.changePage('#Index','slide');
	    TodosFooter(false);
	}
	else
	{
	    localStorage.setItem("VR", "true");
	    $.mobile.changePage('#Index','slide');
	}
}

function TodosFooter (Registro) {
	var foo = '<a href="#Index" class="btnHome" data-transition="slide">Home</a>' +
              '<a href="#modFavoritos" class="btnFavoritos">Favoritos</a>' +
              '<a href="#modBuscar" class="btnBuscar" data-transition="slide">Buscar</a>';

	var todosFooter = $(".footer");

	if(!Registro)
	{
		$.each(todosFooter, function(index,item){
			$(item).append("<a href='#Login' id='btnRegistrar'>Registrarme</a>");
		});
	}
	else
	{
		$.each(todosFooter, function(index,item){
			$(item).html(foo);
		});
	}
}

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

function CargarTextoSocial() {
	var TextosSocial = {
			"Famosos": "Acabo de ver un Famoso en el #Cc"+MallCheckIn+"MT @MallTopic",
			"Pasarela": "Esta disfrutando de un desfile de modas en el #Cc"+MallCheckIn+"MT @MallTopic",
			"Show": "Esta un evento en el #Cc"+MallCheckIn+"MT @MallTopic",
			"SoloxHoy": "Acaba de ver una super promocion Solo x Hoy en el #Cc"+MallCheckIn+"MT @MallTopic",
			"Concursos": "Esta participando de los concursos que hay en el #Cc"+MallCheckIn+"MT @MallTopic",
			"Vitrineando": "Esta vitrineando en el #Cc"+MallCheckIn+"MT @MallTopic",
			"Gratis": "Aviso que estan dando regalos en el #Cc"+MallCheckIn+"MT @MallTopic",
			"Lanzamiento": "Estoy en el lanzamiento de una nueva coleccion en el #Cc"+MallCheckIn+"MT @MallTopic"
		};

	setTSocial(TextosSocial);
}

	 //Validación de la fecha
function FormatoFecha(Fechai,Fechaf)
{
	try
	{
		var retorno = '';

	  	if(Fechai != null && Fechai != '')
	  	{
		   if(Fechaf!=null && Fechaf !='' )
		   {
			    if(Fechai!=Fechaf )
			    {
			     	retorno='Desde el ' + FormatearFecha(Fechai) + ' hasta el ' + FormatearFecha(Fechaf); 
			    }
			    else
			    {
			     	retorno=FormatearFecha(Fechaf) + ', Todo el día';
			    }
			}
			else
			{
			    retorno='Desde el ' + FormatearFecha(Fechai); 
			}
		}
		else
		{
	   		if(Fechaf!=null && Fechaf!='' )
	   		{
		    	retorno='Hasta el ' + FormatearFecha(Fechaf); 
			}
			else
			{
		    	retorno='Permanente';
			}
		}

	  	return retorno;
	}
	catch(err)
	{
		//alert(err);
	}
}

//Convertir fecha
function FormatearFecha(Fecha)
{
	try
	{
		var MesArray = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];


		var fecha = new Date(Fecha);
		var dia = fecha.getDate()+1;
	  	var mes =  fecha.getMonth();
	  	var year = fecha.getFullYear();

	  	return dia + ' de ' + MesArray[mes]  + ' de ' + year;
	}
	catch(err)
	{
		//alert(err);
	}

	

}

	//E-Parking - Validacion que sea numerico//
	function Solo_Numerico(variable){
		var Numer = parseInt(variable);

		if(isNaN(Numer))
		{
			return "";
		}
		
		return Numer;
	}

	function ValNumero(Control){
		Control.value= Solo_Numerico(Control.value);
	}

	//objectUser= Objeto con los datos a ingresar
	//url= direccion con la consulta 
  	function insertDataArray(objectUser, url) {

		$.ajax({
			type: "POST",
			url: url,
            contentType: "application/json; charset=utf-8",
			traditional: true,
		    data: JSON.stringify(objectUser),
			success: function (msg) {
				if(msg){
					console.log("objeto ingresado en BD suscriptores");
					console.log(objectUser);
					alert("Se ingreso la info correctamente");
				}else{
					console.log("error "+ msg);
			        alert("No fue posible regitrarlo en el portal !");
				}
			},
			error: function (msg) {
			  
				ServiceFailed(msg);
			}
		});

    }

	//url= direccion uri de la consulta
	function loadDataArray(url,asincrono,consulta) {
		if(asincrono == null || asincrono == undefined)
		{
			asincrono = false;
		}

		try
		{
			$.support.cors = true;
			$.ajax({
				type: "GET",
				url: url,
				dataType: "json",
				async:asincrono,
				isLocal: true,
				success: function (results) {

					//se almacena objeto resultados en variable global
					/*if(asincrono)
					{
						if($.mobile.activePage.is('#IndexMall') || $.mobile.activePage.is('#SplashScreen'))
						{
							if(consulta == "AMall")
							{
								arrayInfoAsync=results;
							}
							else if(consulta == "StoresxCategories")
							{
								arrayInfo=results;
								setStoresxCategories(arrayInfo);
							}
							
						}
					}
					else
					{*/
						arrayInfo=results;
						/*if(consulta == "AMall")
						{
							arrayInfoAsync=results;
						}
						else if(consulta == "StoresxCategories")
						{
							arrayInfo=results;
							setStoresxCategories(arrayInfo);
						}
					}*/
		   					

				},
				error: function (msg) {
					  
					ServiceFailed(msg);

				}
			});
		}
		catch(err)
		{
			//alert(err.message);
		}
    }
		
	function ServiceFailed(xhr) {
			
		/*if (xhr.responseText) {

			var err = xhr.responseText;
		if (err)
		{

			//alert('Error: ' + err);
		}
		else
		{

			//alert("Message: Unknown server error.");
		}
		return;*/
	}

	//Funcion que carga el select de Ciudades/Mall de forma variable. 
	//Recibe el el id del Section en el que se quiere mostrar
	window.CargarSelect = CargarSelect;
	function CargarSelect(idpaginacontenedor){
		var mall = getCC();

		var htmlSelect = '<div class="arrow"></div>';

		if(mall == "")
		{
			htmlSelect += '<select id="cuadroSelCiudad" class="Filtro1" data-native-menu="false" onchange="OnChangedCiudad(this)">';
			var Ciudad = getCiudad();
			var url = WebService + "Cities?$select=id,nombre"
			loadDataArray(url);
			var CiudadesSelect = arrayInfo;

			$.each(CiudadesSelect.value, function(index, item) {
				 
				if(item.id == Ciudad)
				{
					htmlSelect += "<option value='"+ item.id +"' selected='selected'>"+ item.nombre +"</option>";
				}
				else
				{
					htmlSelect += "<option value='"+ item.id +"'>"+ item.nombre +"</option>";
				}

			});


		}
		else
		{
			htmlSelect += '<select id="cuadroSelMall" class="Filtro1" data-native-menu="false" onchange="OnChangedMall(this)">';
			var Malls = getGlovalAMalls();

			$.each(Malls.value, function(index, item) {
				 
				if(item.id == mall)
				{
					htmlSelect += "<option value='"+ item.id +"' selected='selected'>"+ item.nombre +"</option>";
				}
				else
				{
					htmlSelect += "<option value='"+ item.id +"'>"+ item.nombre +"</option>";
				}

			});

			
		}

		htmlSelect += 	"</select>";

		var contentsel = $(idpaginacontenedor + " #ContentSelect");
		console.log(contentsel);

		
		contentsel.html(htmlSelect);

		contentsel = $(idpaginacontenedor + " #ContentSelect");
		console.log(contentsel);
	}

	function ComprobarValRepetidos(ArrayValores, ValorAnalizar)
	{
		$.each(ArrayValores.value, function(index, Item) {
			 if(ArrayValores[index] == ValorAnalizar)
			 {
			 	return false;
			 }
			 else
			 {
			 	return true;
			 }
		});
	}

//CARGA CINES

function CargarCines()
	{
		var Mall = getCC();
		var ACines;
		var estado = false;
		var Movie = getMovie();

		if(Mall == "" || Mall == undefined)
		{
			url = WebService + "Movies?$filter=(publicar)eq(true)";
		}
		else
		{
			url = WebService + "Malls(guid'"+ Mall +"')/Movies?$filter=(publicar)eq(true)";
		}

		loadDataArray(url);
		ACines = arrayInfo;

		var htmlCines = '';

		$.each(ACines.value, function(index, item) {
			if(Movie == '' || Movie == undefined)
			{
				if(index == 0)
				{
					setMovie(item.id);
					htmlCines += '<a id="'+ item.id +'" href="#" data-index="'+ index +'"><img id="'+ item.id +'" src="'+ RutaRecursos+'Cines/'+ item.id +'.jpg" class="peliSeleccionada" /></a>';
				}
				else
				{
					htmlCines += '<a id="'+ item.id +'" href="#" data-index="'+ index +'"><img id="'+ item.id +'" src="'+ RutaRecursos+'Cines/'+ item.id +'.jpg" class="peliNoSeleccionada" /></a>';
				}
			}
			else
			{
				if(Movie == item.id)
				{
					setMovie(item.id);
					htmlCines += '<a id="'+ item.id +'" href="#" data-index="'+ index +'"><img id="'+ item.id +'" src="'+ RutaRecursos+'Cines/'+ item.id +'.jpg" class="peliSeleccionada" /></a>';
				}
				else
				{
					htmlCines += '<a id="'+ item.id +'" href="#" data-index="'+ index +'"><img id="'+ item.id +'" src="'+ RutaRecursos+'Cines/'+ item.id +'.jpg" class="peliNoSeleccionada" /></a>';
				}

			}
			
			setCargarDetCine(true);
			estado = true;
		});
		

		if(estado==false)
		{
			htmlCines = '<li>No se encontraron cines que mostrar</li>';
			$("#ContentInfoMovie").html('');
			setCargarDetCine(false);
		}

		$('#ContentMovies').html(htmlCines);
	}

	function InfoMovie() {

		try
		{
			var Mall = getCC();
			var idMovie = getMovie();
			var AMovie;
			
			if(Mall == "" || Mall == undefined)
			{
				url = WebService + "Movies(guid'"+ idMovie +"')?$expand=Malls";	
			}
			else
			{
				url = WebService + "Movies(guid'"+ idMovie +"')?$expand=Room_movie";
			}
			
			loadDataArray(url);
			AMovie = arrayInfo;
			var htmlMovie = '';
			htmlMovie += '<div class="nombreMovie">' +
	                				'<h2>'+ AMovie.titulo +'</h2>' +
	            				'</div>';

			if (Mall == "" || Mall == undefined)
			{
	            	htmlMovie += '<h4 class="disponible">Disponibles en:</h4><div class="ListMallMovie"><ul>'

	            	$.each(AMovie.Malls, function(index, moviemall) {
	            		htmlMovie += '<a id="'+ moviemall.id +'" href="#Cines" data-transition="slide"><li class="listaTipo2">' +
						                        '<div class="textolistaTipo2">' +
						                        	'<h3>'+ moviemall.nombre +'</h3>' +
						                        '</div>' +
						                        '<div class="FlechaMovie">Ir</div>' +
						                '</a></li>';
	            	});

	            	htmlMovie += '</ul></div>';

	            	$("#ContentInfoMovie").html(htmlMovie);
			}
			else
			{
				htmlMovie += '<div id="AcordeonHorarios" class="acordion"><h3>Horarios</h3><div><ul>'

				$.each(AMovie.Room_movie, function(index, RoomMovie) {
					if(RoomMovie.fk_idCC == Mall)
					{

					 	htmlMovie += '<li><h4>'+ RoomMovie.nombre + '</h4>' + '<p>' + RoomMovie.descripcion +'</p></li>';
					}
				});
	                    	
				htmlMovie += '</ul></div></div>';
				htmlMovie += '<a href="#DetalleMovie" class="btnVerTrailer2" data-transition="slide">Más info</a>'

				$("#ContentInfoMovie").html(htmlMovie);
				$("#AcordeonHorarios").accordion({collapsible: true});
				$("#AcordeonHorarios").accordion( "refresh" );
			}
		}
		catch (err)
		{
			//alert(err);
		}
		
	}

	function CargarDetalleMovie() 
	{
		var Mall = getCC();
		var MallMovie = getMallCine();
		var AMovie;
		var IdMovie = getMovie();
		var estado = false;

		url = WebService + "Movies(guid'"+ IdMovie +"')?$expand=Room_movie";
		loadDataArray(url);
		AMovie = arrayInfo;

		var idvideo = "VideoTrailer"+ AMovie.titulo;
		var htmlMovie = '';

		var click = "InAppBrowserOpen('"+ AMovie.trailer +"')"

		$("#NombrePeli h2").html(AMovie.titulo);
		htmlMovie += '<img src="'+ RutaRecursos+'Cines/'+ AMovie.id +'.jpg" class="divPoster"></img>' +
                        '<div class="divSinopsis">' +
                        	'<h4>Genero:</h4>' +
                        	'<p>'+ AMovie.genero +'</p>' +
                        	'<h4>Clasificacion:</h4>' +
                        	'<p>'+ AMovie.censura +'</p>' +
                        	'<h4>Duracion:</h4>' +
                        	'<p>'+ AMovie.duracion +'</p>' +
                        	'<h4>Formato:</h4>' +
                        	'<p>'+ AMovie.formato +'</p>' +
                        	'<h4>Director:</h4>' +
                        	'<p>'+ AMovie.director +'</p>' +
                            '<a href="#" class="btnVerTrailer"  onclick="'+ click +'">Ver Trailer</a>' +
                        '</div>';

        $("#ContentDetalle").html(htmlMovie);

        htmlMovie = '<div id="AcordeonHorariosDetalle" class="acordion"><h3>Horarios</h3><div><ul>'

        //Cargo Horarios
		$.each(AMovie.Room_movie, function(index, RoomMovie) {
			if(Mall == "" || Mall == undefined)
			{
				if(RoomMovie.fk_idCC == MallMovie)
				{
				 	htmlMovie += '<li><h4>'+ RoomMovie.nombre + '</h4>' + '<p>' + RoomMovie.descripcion +'</p></li>';
				}
			}
			else
			{
				if(RoomMovie.fk_idCC == Mall)
				{
				 	htmlMovie += '<li><h4>'+ RoomMovie.nombre + '</h4>' + '<p>' + RoomMovie.descripcion +'</p></li>';
				}
			}
			
		});
                    	
		htmlMovie += '</ul></div>';

		//Cargo la Sinopsis
		htmlMovie += '<h3>Sinopsis</h3><div>';
		htmlMovie += '<p>'+ AMovie.sinopsis +'</p></div>';

		//Cargo el trailer
		//htmlMovie += '<h3>Trailer</h3><div>';
		//htmlMovie += '<video id="'+ idvideo +'" preload="none" controls></video></div>';

		//Cargo los Actores
		htmlMovie += '<h3>Actores</h3><div>';
		htmlMovie += '<p>'+ AMovie.actores +'</p></div>';

		htmlMovie += '</div>'

		$("#ContentDetalleMovie").html(htmlMovie);
		$("#AcordeonHorariosDetalle").accordion({collapsible: true});
		$("#AcordeonHorariosDetalle").accordion( "refresh" );
		//window.plugins.html5Video.initialize({idvideo: AMovie.trailer}); 
	}

	function CargarPromos()
	{
		var Mall = getCC();
		var FiltroMalls = getFiltroMalls();
		var EstadoPromo = getFiltroPromos();
		var fec = $.now();
		var Fecha = new Date(fec);
		var FechaActual = Fecha.toJSON();
		var APromociones;
		var estado = false;

		if(Mall == "" || Mall == undefined)
		{
			if(FiltroMalls == "" || FiltroMalls == undefined)
			{
				//url = WebService + "Promos?$filter=fechaInicio le datetime'"+ FechaActual.toString() +"' and fechaFinal ge datetime'"+ FechaActual.toString() +"'";	
				url = WebService + "GetPromos?IdPromo=''&IdMall=''";	
			}
			else
			{
				//url = WebService + "Malls(guid'"+ FiltroMalls +"')/Stores?$expand=Promos";
				url = WebService + "GetPromos?IdPromo=''&IdMall='"+ FiltroMalls +"'";	
			}
			
		}
		else
		{
			//url = WebService + "Malls(guid'"+ Mall +"')/Stores?$expand=Promos";
			url = WebService + "GetPromos?IdPromo=''&IdMall='"+ Mall +"'";
		}

		loadDataArray(url);
		APromociones = arrayInfo;

		var htmlPromos = '<ul>';

		if(Mall == "" || Mall == undefined)
		{
			if(FiltroMalls == "" || FiltroMalls == undefined)
			{
				$.each(APromociones.value, function(index, item) {
					if(ComprobarMasCercanos(item.fk_idcc, index, APromociones.length))
					{
						htmlPromos += '<li class="listaTipo1"><a id="'+ item.id +'" href="#DetallePromos" data-transition="slide"><img src="'+ RutaRecursos +'Promociones/'+item.id+'.jpg"/><div class="textolistaTipo1"><h3>'+ item.nombre +'</h3><p style="color: #0e79b7; font-style: italic;">'+ item.NombreMall +' - '+ item.NombreLocal +'</p></div><div class="FlechaLocales">Ir</div></a></li>';
					 	estado = true;
					}
				});
			}
			else
			{
				$.each(APromociones.value, function(index, item) {
					htmlPromos += '<li class="listaTipo1"><a id="'+ item.id +'" href="#DetallePromos" data-transition="slide"><img src="'+ RutaRecursos +'Promociones/'+item.id+'.jpg"/><div class="textolistaTipo1"><h3>'+ item.nombre +'</h3><p style="color: #0e79b7; font-style: italic;">'+ item.NombreMall +' - '+ item.NombreLocal +'</p></div><div class="FlechaLocales">Ir</div></a></li>';
					estado = true;
				});
			}
		}
		else
		{
			$.each(APromociones.value, function(index, item) {
				htmlPromos += '<li class="listaTipo1"><a id="'+ item.id +'" href="#DetallePromos" data-transition="slide"><img src="'+ RutaRecursos +'Promociones/'+item.id+'.jpg"/><div class="textolistaTipo1"><h3>'+ item.nombre +'</h3></div><div class="FlechaLocales">Ir</div></a></li>';
				estado = true;
			});
		}

		if(estado==false)
		{
			if(Mall == "" || Mall == undefined)
			{
				alert('No se encontraron Tiendas  cerca de  usted, por favor diríjase al Home  y seleccione  el botón Malls.');
				htmlPromos = '<li>No se encontraron Promociones</li>';
			}
			else
			{
				htmlPromos = '<li>No se encontraron Promociones</li>';
			}
			
		}

		htmlPromos += '</ul>';

		$('#PromosList').html(htmlPromos);
	}

	function CargarDetallePromo()
	{
		var Promo = getPromo();
		url = WebService + "GetPromos?IdPromo='"+ Promo +"'&IdMall=''";
		loadDataArray(url);
		var APromo = arrayInfo;
		var HtmlAcordeon = '';

		$.each(APromo.value, function(index, item) {
			//Falta cargar Logo Promo e imagen promo
			$("#ImagenPromo").attr('src', RutaRecursos +'Promociones/'+Promo+'.jpg')
			$("#NombrePromo").html(item.nombre);
			//$("#Descripcion").html("<p>"+ APromo.descripcion +"</p>");

	        //Cargo como participar
	        HtmlAcordeon = '<h3>Cómo Participar?</h3><div>';
	        HtmlAcordeon += '<p>'+ item.comoParticipar +'</p>';
	        HtmlAcordeon += '</div>';

	        //Cargar fecha final
			HtmlAcordeon += '<h3>Fecha Límite</h3><div>';
	        HtmlAcordeon += '<p>'+FormatoFecha(item.fechaInicio,item.fechaFinal)+'</p>';
	        HtmlAcordeon += '</div>';

	        //Cargo requisitos
	        HtmlAcordeon += '<h3>Condiciones y Restricciones</h3><div>';
	        HtmlAcordeon += '<p>'+ item.requisitosParaParticipar +'</p>';
	        HtmlAcordeon += '</div>';
		});

		$("#AcordeonPromo").html(HtmlAcordeon);
	    $("#AcordeonPromo").accordion({collapsible: true});
		$("#AcordeonPromo").accordion( "refresh" );
		

	}

	function CargarEventos()
	{
		var Mall = getCC();
		var FiltroMalls = getFiltroMalls();
		var AEventos;
		var estado = false;

		 if(Mall == "" || Mall == undefined)
		 {
		 	if(FiltroMalls == "" || FiltroMalls == undefined)
		 	{
		 		url = WebService + "GetEventos?IdEvento=''&IdMall=''";
		 	}
		 	else
		 	{
		 		//url = WebService + "Malls(guid'"+ FiltroMalls +"')/Events?$expand=Malls,Stores";
		 		url = WebService + "GetEventos?IdEvento=''&IdMall='"+ FiltroMalls +"'";		
		 	}
		 }
		 else
		 {
		 	//url = WebService + "Malls(guid'"+ Mall +"')/Events?$expand=Malls,Stores";
		 	url = WebService + "GetEventos?IdEvento=''&IdMall='"+ Mall +"'";
		 }


		 loadDataArray(url);
		 AEventos = arrayInfo;
		 var htmlEventos = '<ul>';

		$.each(AEventos.value, function(index, item) {
			var Store = item.fk_idStore;
		 	var imagen = item.imagen;
		 	var urlimagen = '';
		 	var TempImagen = '';

			if(Store == 'null' || Store == '' || Store == undefined)
			{
				TempImagen = RutaRecursos + 'Eventos/Malls/' + item.id + '.jpg';
				urlimagen = VerificarArchivo("EventosLogos",TempImagen,"");
			}
			else
			{
				TempImagen = RutaRecursos + 'Eventos/Locales/' + item.id + '.jpg';
				urlimagen = VerificarArchivo("EventosLogos",TempImagen,"");
			}

			htmlEventos += '<li class="listaTipo1"><a id="'+ item.id +'" href="#DetalleEventos" data-transition="slide"><img src="'+ urlimagen +'"/><div class="textolistaTipo1"><h3>'+ item.nombre +'</h3><p>- '+ item.descripcion +'</p><p>- '+ item.NombreMall +'</p></div><div class="FlechaLocales">Ir</div></li>'; 
			estado = true;
		});

		if(estado==false)
		{
			htmlEventos = '<li>No se encontraron Eventos</li>';
		}

		htmlEventos += '</ul>';
		$("#EventList").html(htmlEventos);
	}

	function CargarDetalleEventos() 
	{
		var Evento = getEvento();
		url = WebService + "Events(guid'"+ Evento +"')/";
		loadDataArray(url);
		var AEvento = arrayInfo;
		imagen = AEvento.imagen;
		mall = AEvento.fk_idCC;

		var urlimagen = '';
		var urllogo = '';
		
		if(mall == 'null')
		{
			urlimagen = RutaRecursos + 'Eventos/Locales/' + AEvento.id + '.jpg';
			var logotemp = RutaRecursos + 'Logos/Locales/' + AEvento.fk_idStores + '.png'; 
			urllogo = VerificarArchivo("EventosLogos",logotemp,"");
		}
		else
		{
			urlimagen = RutaRecursos + 'Eventos/Malls/' + AEvento.id + '.jpg';
			var logotemp = RutaRecursos + 'Logos/Malls/' + AEvento.fk_idCC + '.png';
			urllogo = VerificarArchivo("EventosLogos",logotemp,"");
		}
		
		$("#LogoEventos").attr('src',urllogo);
		$("#NombreEvento").html(AEvento.nombre);
		$("#ImagenEventos").attr('src',urlimagen);
		$("#DescEvento").html("<p>"+AEvento.descripcion+"</p>");

		var AcordeonEventos = '<h3>Mas información</h3>';
		AcordeonEventos += '<div>';
        AcordeonEventos += '<h4>Lugar<h4>';
        AcordeonEventos += '<p>'+ AEvento.lugar +'</p><br/>';
        AcordeonEventos += '<h4>Fecha<h4>';
        AcordeonEventos += '<p>'+ FormatoFecha(AEvento.fechaInicio,AEvento.fechaFinal)  +'</p><br/>';
        AcordeonEventos += '<h4>Organizador<h4>';
        AcordeonEventos += '<p>'+ AEvento.organizador +'</p><br/>';
        AcordeonEventos += '<h4>Telefono<h4>';
        AcordeonEventos += '<p>'+ AEvento.telefono +'</p><br/>';
        AcordeonEventos += '<h4>Correo<h4>';
        AcordeonEventos += '<p>'+ AEvento.correo +'</p><br/>';
		AcordeonEventos += '</div>';

		$('#AcordeonEventos').html(AcordeonEventos);
		$("#AcordeonEventos").accordion({collapsible: true});
		$("#AcordeonEventos").accordion( "refresh" );
	}

	function CargarColecciones()
	{
		var Mall = getCC();
		var estado = false;

		if(Mall == "" || Mall == undefined)
		{
			url = WebService + "GetColecciones?idmall=''";
		}
		else
		{
			url = WebService + "GetColecciones?idmall='"+Mall+"'";
		}

		loadDataArray(url);
		var AColecc = arrayInfo;
		var htmlColec = '<ul>';

		$.each(AColecc.value, function(index, item) {
			 htmlColec += '<li class="listaTipo1"><a id="'+ item.id +'" href="#DetalleColecciones" data-transition="slide"><img src="'+ RutaRecursos + "Colecciones/Portadas/"+ item.id +'.jpg"/><div class="textolistaTipo1"><h3>'+ item.nombre +'</h3><p>'+ item.año +'</p><p>'+ item.NombreLocal +'</p></div><div class="FlechaLocales">Ir</div></li>';
			 estado = true;
		});

		if(estado==false)
		{
			htmlColec = '<li>No se encontraron Colecciones</li>';
		}

		htmlColec += '</ul>';
		$("#ColectionList").html(htmlColec);
	}

	function CargarDetalleColecciones () 
	{
		var Coleccion = getColeccion();
		url = WebService + "Colections(guid'"+ Coleccion +"')/";
		loadDataArray(url);
		var AColeccion = arrayInfo;

		$("#NombreColeccion").html(AColeccion.nombre);

		url = WebService + "Colections(guid'"+ Coleccion +"')/Colections_detail";
		loadDataArray(url);
		var AGalColecc = arrayInfo;
		var htmlGalColec = '<ul class="thumbs noscript">';

		$.each(AGalColecc.value, function(index, item) {
			 htmlGalColec += '<li><a class="thumb" name="leaf" href="'+ RutaRecursos + "Colecciones/Imagenes/"+ item.id +'.jpg" title="'+ item.nombre +'"><img src="'+ RutaRecursos + "Colecciones/Imagenes/"+ item.id +'.jpg" alt="'+ item.nombre +'" /><div class="caption"><div class="download"><a href="'+ RutaRecursos + "Colecciones/Imagenes/"+ item.id +'.jpg">Descarga la Imagen</a></div><div class="image-title">'+ item.nombre +'</div><div class="image-desc">Description</div></div></li>';
		});

		htmlGalColec += '</ul>';

		$("#DetalleColecciones #thumbs").html(htmlGalColec);

		// We only want these styles applied when javascript is enabled
		$('#DetalleColecciones div.navigation').css({'width' : '300px', 'float' : 'left'});
		$('#DetalleColecciones div.content').css('display', 'block');

		// Initially set opacity on thumbs and add
		// additional styling for hover effect on thumbs
		var onMouseOutOpacity = 0.67;
		$('#DetalleColecciones #thumbs ul.thumbs li').opacityrollover({
			mouseOutOpacity:   onMouseOutOpacity,
			mouseOverOpacity:  1.0,
			fadeSpeed:         'fast',
			exemptionSelector: '.selected'
		});
			
		// Initialize Advanced Galleriffic Gallery
		var gallery = $('#DetalleColecciones #thumbs').galleriffic({
			delay:                     2500,
			numThumbs:                 15,
			preloadAhead:              10,
			enableTopPager:            true,
			enableBottomPager:         true,
			maxPagesToShow:            7,
			imageContainerSel:         '#DetalleColecciones #slideshow',
			controlsContainerSel:      '#DetalleColecciones #controls',
			captionContainerSel:       '#DetalleColecciones #caption',
			loadingContainerSel:       '#DetalleColecciones #loading',
			renderSSControls:          true,
			renderNavControls:         true,
			playLinkText:              'Play',
			pauseLinkText:             'Pause',
			prevLinkText:              '&lsaquo; Prev',
			nextLinkText:              'Next&rsaquo;',
			nextPageLinkText:          'Next &rsaquo;',
			prevPageLinkText:          '&lsaquo; Prev',
			enableHistory:             false,
			autoStart:                 false,
			syncTransitions:           true,
			defaultTransitionDuration: 900,
			onSlideChange:             function(prevIndex, nextIndex) {
				// 'this' refers to the gallery, which is an extension of $('#thumbs')
				this.find('ul.thumbs').children()
					.eq(prevIndex).fadeTo('fast', onMouseOutOpacity).end()
					.eq(nextIndex).fadeTo('fast', 1.0);
			},
			onPageTransitionOut:       function(callback) {
				this.fadeTo('fast', 0.0, callback);
			},
			onPageTransitionIn:        function() {
				this.fadeTo('fast', 1.0);
			}
		});
	}

	function CargarGalerias () 
	{
		var Mall = getCC();
		var estado = false;

		if(Mall == "" || Mall == undefined)
		{
			url = WebService + "Gallery";
		}
		else
		{
			//url = WebService + "Gallery";
			url = WebService + "Malls(guid'"+ Mall +"')/Gallery";
		}

		loadDataArray(url);
		var AGallery = arrayInfo;
		var htmlGalle = '';

		$.each(AGallery.value, function(index, item) {
			 htmlGalle += '<a id="'+ item.id +'" href="#DetalleGalerias" data-transition="slide" class="iconos4"><img src="'+ RutaRecursos + "Galerias/Portadas/"+ item.id +'.jpg" class="galeria"/><p>'+ item.portada +'</p></a>';
			 estado = true;
		});

		if(estado==false)
		{
			htmlGalle = '<div>No se encontraron fotos en la galería</div>';
		}

		$("#Galerias #ContentIcons").html(htmlGalle);
	}

	function CargarDetalleGalerias () 
	{
		var Galeria = getGaleria();
		url = WebService + "Gallery(guid'"+ Galeria +"')/";
		loadDataArray(url);
		var AGaleria = arrayInfo;

		$("#NombreGaleria").html(AGaleria.portada);

		url = WebService + "Gallery(guid'"+ Galeria +"')/Gallery_detail";
		loadDataArray(url);
		var ADetGal = arrayInfo;
		var htmlDetGal = '<ul class="thumbs noscript">';

		$.each(ADetGal.value, function(index, item) {
			 htmlDetGal += '<li><a class="thumb" name="leaf" href="'+ RutaRecursos + "Galerias/Imagenes/"+ item.id +'.jpg" title="'+ item.fotos +'"><img src="'+ RutaRecursos + "Galerias/Imagenes/"+ item.id +'.jpg" alt="'+ item.fotos +'" /><div class="caption"><div class="download"><a href="'+ RutaRecursos + "Galerias/Imagenes/"+ item.id +'.jpg">Descarga la Imagen</a></div><div class="image-title">'+ item.fotos +'</div><div class="image-desc">Description</div></div></li>';
		});

		htmlDetGal += '</ul>';

		$("#DetalleGalerias #thumbs").html(htmlDetGal);

		// We only want these styles applied when javascript is enabled
		$('#DetalleGalerias div.navigation').css({'width' : '300px', 'float' : 'left'});
		$('#DetalleGalerias div.content').css('display', 'block');

		// Initially set opacity on thumbs and add
		// additional styling for hover effect on thumbs
		var onMouseOutOpacity = 0.67;
		$('#DetalleGalerias #thumbs ul.thumbs li').opacityrollover({
			mouseOutOpacity:   onMouseOutOpacity,
			mouseOverOpacity:  1.0,
			fadeSpeed:         'fast',
			exemptionSelector: '.selected'
		});
			
		// Initialize Advanced Galleriffic Gallery
		var gallery = $('#DetalleGalerias #thumbs').galleriffic({
			delay:                     2500,
			numThumbs:                 15,
			preloadAhead:              10,
			enableTopPager:            true,
			enableBottomPager:         true,
			maxPagesToShow:            7,
			imageContainerSel:         '#DetalleGalerias #slideshow',
			controlsContainerSel:      '#DetalleGalerias #controls',
			captionContainerSel:       '#DetalleGalerias #caption',
			loadingContainerSel:       '#DetalleGalerias #loading',
			renderSSControls:          true,
			renderNavControls:         true,
			playLinkText:              'Play',
			pauseLinkText:             'Pause',
			prevLinkText:              '&lsaquo; Prev',
			nextLinkText:              'Next &rsaquo;',
			nextPageLinkText:          'Next &rsaquo;',
			prevPageLinkText:          '&lsaquo; Prev',
			enableHistory:             false,
			autoStart:                 false,
			syncTransitions:           true,
			defaultTransitionDuration: 900,
			onSlideChange:             function(prevIndex, nextIndex) {
				// 'this' refers to the gallery, which is an extension of $('#thumbs')
				this.find('ul.thumbs').children()
					.eq(prevIndex).fadeTo('fast', onMouseOutOpacity).end()
					.eq(nextIndex).fadeTo('fast', 1.0);
			},
			onPageTransitionOut:       function(callback) {
				this.fadeTo('fast', 0.0, callback);
			},
			onPageTransitionIn:        function() {
				this.fadeTo('fast', 1.0);
			}
		});
	}

	function ConfigurarHeaders(Modulo, IdImage, idpagina,fk_idCC){

		var mall = getCC();
		var Comercio = GetLocal();

		switch (Modulo)
		{
			case "Mall":

				var LogoMall = $(idpagina+" #LogoIndexMall");
				var HeaderMall = $(IdImage);

				LogoMall.attr("src", RutaRecursos + "/Logos/Malls/"+ mall +".png")
				HeaderMall.attr("src",RutaRecursos+"Headers/HeadersMalls/"+ mall +".png");

				if(mall =="" || mall == undefined)
				{
					LogoMall.attr("style","display:none")
				}

				break;
			case "DetalleComercio":
				var HeaderComercio = $(IdImage);
				var rutatemp = RutaRecursos+"Headers/HeadersLocales/"+ Comercio +".png";
				var rutafinal = VerificarArchivo('DetalleComercios',rutatemp,fk_idCC);
				HeaderComercio.attr("src",rutafinal);
				break;
		}
	}

	function OnChangedCiudad(select)
	{
		var Valor = select.value;
		setCiudad(Valor);
		CargarAMalls();
		$.mobile.changePage('#Index','slide');
	}

	function OnChangedMall(select)
	{
		var Valor = select.value;
		setCC(Valor);
		CargarSplashScreen();
		$.mobile.changePage('#SplashScreen','slide');
	}

	function CargarFooter (idPagina) {
		var Footer = 	'<a href="#Index" class="btnHome">Home</a>' +
	                    '<a href="#" class="btnFavoritos">Favoritos</a>' +
	                    '<a href="#" class="btnBuscar">Buscar</a>' +
	                    '<input type="text" class="campoTexto" value="Busqueda"/>';
		$(idPagina+" footer").html(Footer);	   
	}

	function AplicarFiltroMalls(select) {
		var Mall = select.value;
		var PaginaContent = select.getAttribute("data-pagina");
		setFiltroMalls(Mall);

		if(PaginaContent == "#ComerciosxCategorias" || PaginaContent == "#ComerciosxLocales")
		{
			var Categoria = getCate()
			cargarListaloc(Categoria, PaginaContent);
		}
		else if(PaginaContent == "#Promociones")
		{
			CargarPromos();
		}
		else if(PaginaContent == "#Eventos")
		{
			CargarEventos();
		}
		
	}

	function AplicarFiltroPromo(select){
		var EstadoPromo = select.value;
		setFiltroPromos(EstadoPromo);
		CargarPromos();
	}

	function ConfigurarHeadersModulos(Modulo) {
		var Mall = getCC();
		var Ruta = '';
		var header = '';
		switch(Modulo)
		{
			case "Comercios":
				if(Mall == "" || Mall == undefined)
				{
					header = RutaRecursos + "Headers/HeadersModulos/headerTiendas1.png";
				}
				else
				{
					Ruta = RutaRecursos + 'Headers/HeadersModulos/'+ Mall +' - Comercios.jpg';
					header = VerificarArchivo(Modulo,Ruta, "");
				}

				$('#HeaderComCate').attr('src',header);
				$('#HeaderComLoc').attr('src',header);
				break;
			case "Promos":
				if(Mall == "" || Mall == undefined)
				{
					header = RutaRecursos + "Headers/HeadersModulos/headerPromos1.png";;
				}
				else
				{
					Ruta = RutaRecursos + 'Headers/HeadersModulos/'+ Mall +' - Promos.jpg';
					header = VerificarArchivo(Modulo,Ruta, "");
				}

				$('#HeaderPromos').attr('src',header);
				$('#HeaderDetPromos').attr('src',header);
				break;
			case "Eventos":
				if(Mall == "" || Mall == undefined)
				{
					header = RutaRecursos + "Headers/HeadersModulos/headerEventos1.png";;
				}
				else
				{
					Ruta = RutaRecursos + 'Headers/HeadersModulos/'+ Mall +' - Eventos.jpg';
					header = VerificarArchivo(Modulo,Ruta, "");
				}
				
				$('#HeaderEventos').attr('src',header);
				$('#HeaderDetEventos').attr('src',header);
				break;
			case "Colecciones":
				if(Mall == "" || Mall == undefined)
				{
					header = RutaRecursos + "Headers/HeadersModulos/headerColecciones1.png";;
				}
				else
				{
					Ruta = RutaRecursos + 'Headers/HeadersModulos/'+ Mall +' - Colecciones.jpg';
					header = VerificarArchivo(Modulo,Ruta, "");
				}

				$('#HeaderColecciones').attr('src',header);
				$('#HeaderDetColecciones').attr('src',header);
				break;
			case "Cines":
				if(Mall == "" || Mall == undefined)
				{
					header = RutaRecursos + "Headers/HeadersModulos/headerCines1.png";;
				}
				else
				{
					Ruta = RutaRecursos + 'Headers/HeadersModulos/'+ Mall +' - Cines.jpg';
					header = VerificarArchivo(Modulo,Ruta, "");
				}


				$('#HeaderCines').attr('src',header);
				$('#HeaderDetCines').attr('src',header);
				break;
			case "Galerias":
				Ruta = RutaRecursos + 'Headers/HeadersModulos/'+ Mall +' - Galerias.jpg';
				header = VerificarArchivo(Modulo,Ruta, "");

				$('#HeaderGalerias').attr('src',header);
				$('#HeaderDetalleGalerias').attr('src',header);
				$('#LogoGalerias').attr('src',RutaRecursos + "/Logos/Malls/"+ Mall +".png");
				$('#LogoDetGalerias').attr('src',RutaRecursos + "/Logos/Malls/"+ Mall +".png");
				break;
		}
	}

	function VerificarArchivo(tipo,ruta,resolucion) {
		var resultado;

		switch(tipo)
		{
			case "SplashScreen":
				if(!file_exist(ruta))
				{

					if(resolucion == "mdpi")
					{
						resultado = RutaRecursos + "BackgroundSplash/defaultMT - mdpi.jpg"
					}
					else if(resolucion == "hdpi")
					{
						resultado = RutaRecursos + "BackgroundSplash/defaultMT - hdpi.jpg"
					}
					else if(resolucion == "xhdpi")
					{
						resultado = RutaRecursos + "BackgroundSplash/defaultMT - xhdpi.jpg"
					}
				}
				else
				{
					resultado = ruta;
				}
				break;
			case "LogosMall":

				break;
			case "LogosTiendas":
				if(!file_exist(ruta))
				{
					resultado = "images/Store.png"
				}
				else
				{
					resultado = ruta;
				}
				break;
			case "Comercios":
				if(!file_exist(ruta))
				{
					resultado = RutaRecursos + "Headers/HeadersModulos/headerTiendas1.png";
				}
				else
				{
					resultado = ruta;
				}
				break;
			case "DetalleComercios":
				if(!file_exist(ruta))
				{
					var rutaheaderComMall = RutaRecursos + "Headers/HeadersModulos/"+resolucion+" - Comercios.jpg";
					if(!file_exist(rutaheaderComMall))
					{
						resultado = RutaRecursos + "Headers/HeadersMalls/"+resolucion+".png";	
					}
					else
					{
						resultado = rutaheaderComMall;
					}
					
				}
				else
				{
					resultado = ruta;
				}
				break;
			case "Promos":
				if(!file_exist(ruta))
				{
					resultado = RutaRecursos + "Headers/HeadersModulos/headerPromos1.png";
				}
				else
				{
					resultado = ruta;
				}
				break;
			case "Eventos":
				if(!file_exist(ruta))
				{
					resultado = RutaRecursos + "Headers/HeadersModulos/headerEventos1.png";
				}
				else
				{
					resultado = ruta;
				}
				break;
			case "EventosLogos":
				if(!file_exist(ruta))
				{
					resultado = "images/Store.png";
				}
				else
				{
					resultado = ruta;
				}
				break;
			case "Colecciones":
				if(!file_exist(ruta))
				{
					resultado = RutaRecursos + "Headers/HeadersModulos/headerColecciones1.png";
				}
				else
				{
					resultado = ruta;
				}
				break;
			case "Cines":
				if(!file_exist(ruta))
				{
					resultado = RutaRecursos + "Headers/HeadersModulos/headerCines1.png";
				}
				else
				{
					resultado = ruta;
				}
				break;
			case "Galerias":
				if(!file_exist(ruta))
				{
					resultado = RutaRecursos+"Headers/HeadersMalls/"+ getCC() +".png";
					
				}
				else
				{
					resultado = ruta;
				}
				break;
		}

		return resultado;
	}

	function file_exist (url) {

		var req = this.window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
		if (!req) {
	    	throw new Error('XMLHttpRequest not supported');
	  	}

	  	// HEAD Results are usually shorter (faster) than GET
	  	req.open('HEAD', url, false);
	  	req.send(null);
	  	if (req.status == 200) {
	    	return true;
	  	}

	  	return false;
	}

	function CambioColor (opcion) {
    	var Hexa = $(opcion).attr('id');
    	setColor(Hexa);
    	$('#btnColor').attr('style','background:'+ Hexa + ';');
    	$( "#ColorPicker" ).dialog( "close" );

    }

    function LlamarPopUpColor() {
		$( "#ColorPicker" ).dialog( "open" );
	}

	function ComprobarMasCercanos(IdMall,index,totalarray) {
		var MallsMasCercanos = getMasCercanos();
		var HayMasCercanos = false;

		if(MallsMasCercanos != undefined)
		{
			$.each(MallsMasCercanos, function(index, val) {
				 if(IdMall == val.idmall)
				 {
				 	HayMasCercanos = true;
				 }
			});
		}
		
		if(!HayMasCercanos)
		{
			if(index  == totalarray)
			{
				if($.mobile.activePage.is('#Promociones'))
				{
					alert('No se encontraron Promociones  cerca de  usted, por favor diríjase al Home  y seleccione  el botón Malls.');
				}
				else if($.mobile.activePage.is('#Eventos'))
				{
					alert('No se encontraron malls cerca de  usted.');
				}
				else if($.mobile.activePage.is('#ComerciosxCategorias'))
				{
					alert('No se encontraron Tiendas  cerca de  usted, por favor diríjase al Home  y seleccione  el botón Malls.');
				}
				else if($.mobile.activePage.is('#ComerciosxLocales'))
				{
					alert('No se encontraron Tiendas  cerca de  usted, por favor diríjase al Home  y seleccione  el botón Malls.');
				}
			}
		}

		return HayMasCercanos;
	}

	function CargarServicios() {
		var estado = false;
		var Mall = getCC();
		var url = WebService + "GetServicios?IdMall='"+Mall+"'";
		loadDataArray(url);
		var AServices_Detail = arrayInfo;
		var Html = '<p>Servicios Disponibles</p><ul>';

		$.each(AServices_Detail.value, function(index, item) {
			url = WebService + "Services(guid'"+ item.id +"')"
			loadDataArray(url);
			var AServices = arrayInfo;

			Html += '<li class="listaTipo3">' +
                        '<div class="textolistaTipo3">' +
                            '<h3>'+ AServices.servicio +'</h3>'  +  
                        '</div>' +
                        '<a>Ir</a>' +
                    '</li>';
			estado = true;
		});

		if(!estado)
		{
			Html += '<li>No se encontraron servicios.</li>';
		}
		Html += '</ul>';
		$("#ContenedorServicios").html(Html);
	}

	function onBackButton() {
		setCargarInfo(false);
		var Mall = getCC();
		if($.mobile.activePage.is('#Index'))
		{
			navigator.app.exitApp();
		}
		else if($.mobile.activePage.is('#ComerciosxCategorias'))
		{
			$.mobile.changePage('#Index','slide');			
		}
		else if($.mobile.activePage.is('#ComerciosxLocales'))
		{
			$.mobile.changePage('#ComerciosxCategorias','slide');			
		}
		else if($.mobile.activePage.is('#EParking'))
		{
			$.mobile.changePage('#Index','slide');			
		}
		else if($.mobile.activePage.is('#Promociones'))
		{
			if(Mall == '' || Mall == undefined)
			{
				$.mobile.changePage('#Index','slide');
			}
			else
			{
				$.mobile.changePage('#IndexMall','slide');
			}			
		}
		else if($.mobile.activePage.is('#DetallePromos'))
		{
			$.mobile.changePage('#Promociones','slide');			
		}
		else if($.mobile.activePage.is('#Eventos'))
		{
			if(Mall == '' || Mall == undefined)
			{
				$.mobile.changePage('#Index','slide');
			}
			else
			{
				$.mobile.changePage('#IndexMall','slide');
			}			
		}
		else if($.mobile.activePage.is('#DetalleEventos'))
		{
			$.mobile.changePage('#Eventos','slide');			
		}
		else if($.mobile.activePage.is('#Colecciones'))
		{
			if(Mall == '' || Mall == undefined)
			{
				$.mobile.changePage('#Index','slide');
			}
			else
			{
				$.mobile.changePage('#IndexMall','slide');
			}			
		}
		else if($.mobile.activePage.is('#DetalleColecciones'))
		{
			$.mobile.changePage('#Colecciones','slide');			
		}
		else if($.mobile.activePage.is('#Cines'))
		{
			if(Mall == '' || Mall == undefined)
			{
				$.mobile.changePage('#Index','slide');
			}
			else
			{
				CargarSelect("#IndexMall");
				ConfigurarHeaders("Mall","#HeaderIndexMall", "#IndexMall");
				CargarIndexMall();
				ConfigurarHeaders("Mall","#HeaderInfoGeneral", "#InfoGeneral");
				ConfigurarHeaders("Mall","#HeaderServicios", "#Servicios");
				ConfigurarHeadersModulos("Comercios");
				ConfigurarHeadersModulos("Promos");
				ConfigurarHeadersModulos("Eventos");
				ConfigurarHeadersModulos("Colecciones");
				ConfigurarHeadersModulos("Cines");
				ConfigurarHeadersModulos("Galerias");
				$.mobile.changePage('#IndexMall','slide');
				setCate('');
			}			
		}
		else if($.mobile.activePage.is('#DetalleMovie'))
		{
			$.mobile.changePage('#Cines','slide');			
		}
		else if($.mobile.activePage.is('#maps'))
		{
			$.mobile.changePage('#Index','slide');			
		}
		else if($.mobile.activePage.is('#ComoLlegar'))
		{
			$.mobile.changePage('#IndexMall','slide');			
		}
		else if($.mobile.activePage.is('#social'))
		{
			$.mobile.changePage('#Index','slide');			
		}
		else if($.mobile.activePage.is('#ListaCC'))
		{
			$.mobile.changePage('#Index','slide');			
		}
		else if($.mobile.activePage.is('#ComerciosxLocales'))
		{
			$.mobile.changePage('#ComerciosxCategorias','slide');			
		}
		else if($.mobile.activePage.is('#ComerciosxCategoriasMall'))
		{
			$.mobile.changePage('#IndexMall','slide');			
		}
		else if($.mobile.activePage.is('#ComerciosxLocalesMall'))
		{
			$.mobile.changePage('#ComerciosxCategoriasMall','slide');			
		}
		else if($.mobile.activePage.is('#DetalleComercio'))
		{
			var isbuscar = getIsBuscar();
			var isfavorito = getIsFavorito();
			if(isbuscar)
			{
				$.mobile.changePage('#modBuscar','slide');
			}
			else
			{
				if(isfavorito)
				{
					$.mobile.changePage('#modFavoritos','slide');
				}
				else
				{
					if(Mall == '' || Mall == undefined)
					{
						$.mobile.changePage('#ComerciosxLocales','slide');
					}
					else
					{
						$.mobile.changePage('#ComerciosxLocalesMall','slide');
					}	

				}
			}
					
		}
		else if($.mobile.activePage.is('#InfoGeneral'))
		{
			$.mobile.changePage('#IndexMall','slide');			
		}
		else if($.mobile.activePage.is('#Servicios'))
		{
			$.mobile.changePage('#IndexMall','slide');			
		}
		else if($.mobile.activePage.is('#Galerias'))
		{
			$.mobile.changePage('#IndexMall','slide');			
		}
		else if($.mobile.activePage.is('#DetalleGalerias'))
		{
			$.mobile.changePage('#Galerias','slide');			
		}
		else if($.mobile.activePage.is('#DetalleGym'))
		{
			$.mobile.changePage('#IndexMall','slide');			
		}
		else if($.mobile.activePage.is('#PilasPues'))
		{
			$.mobile.changePage('#IndexMall','slide');			
		}
		else if($.mobile.activePage.is('#IndexMall'))
		{
			$.mobile.changePage('#ListaCC','slide');			
		}
		else if($.mobile.activePage.is('#modBuscar'))
		{
			$.mobile.changePage('#Index','slide');			
		}
		else if($.mobile.activePage.is('#modFavoritos'))
		{
			$.mobile.changePage('#Index','slide');			
		}
		else if($.mobile.activePage.is('#SplashScreen'))
		{
						
		}
		else
		{
			$.mobile.changePage('#Index','slide');
		}
	    
	    
	}

	function CargarPilasps() {
		var estado = false;
		var Mall = getCC();
		var url = WebService + "Malls(guid'"+ Mall +"')/PilasPs";
		loadDataArray(url);
		var APilasPs = arrayInfo;
		var Html = '<ul>';

		$.each(APilasPs.value, function(index, item) {
			Html += '<li class="listaTips">' +
                             '<img src="images/Movicentro.png"/>' +
                              '<div class="textolistaTips">' +
                              '<h3>'+ item.titulo +'</h3>' +
                              '<p>'+ item.descripcion +'</p>' +
                              '</div>' +
                              '<a href="#" class="compTips" onclick="LlamarCompartir()">Compartir</a>' +
                              '<a href="#" onclick="InAppBrowserOpen('+ item.link +')" class="verMore">...</a>' +
                           '</li>';
			estado = true;
		});

		if(!estado)
		{
			Html += '<li>No se encontraron noticias.</li>';
		}

		Html += '</ul>';
		$("#ContentTips").html(Html);
	}

	function LlamarCompartir() {
		$( "#modCompartir" ).dialog( "open" );
	}
	//Cambiar iconos de Index mall
	function cambiariconosCompartirMall(){
		$("#ContenedorMalls").html('<div class="divRedesSocial">'+
                        '<p>¡Comparte!</p>'+
	                    '<a data-red="Facebook" id="lf" href="#" onclick="CompatirFTWMMall(this)" class="socialNet1"></a>'+
	                    '<a data-red="Twitter"id="lt" href="#" onclick="CompatirFTWMMall(this)" class="socialNet2"></a>'+
	                    '<a data-red="WhatsApp"id="li" href="#" onclick="CompatirFTWMMall(this)" class="socialNetWhats"></a>'+
	                    '<a data-red="Correo"id="ly" href="#" onclick="CompatirFTWMMall(this)" class="socialNetMail"></a>'+
	                    //'<a data-red="Correo" id="ly" href="#" onclick="CompatirFTWMMall(this)" class="socialNetMail"></a>'+

	                    '<a date-red="Volver" href="#" onclick="volverBotonMall()" class="socialNetAtras"></a>'+
	                    '</div>');
	}

	function volverBotonMall(){
		$("#ContenedorMalls").html('<div class="divRedesSocial" id="ContenedorMalls">'+
				                    '<p>¡Síguenos!</p>'+
				                    '<a id="LinkFacebookMall" href="#" onclick="InAppBrowserOpen("http://www.facebook.com")" class="socialNet1"></a>'+
				                    '<a id="LinkTwitterMall" href="#" onclick="InAppBrowserOpen("http://www.twittwer.com")" class="socialNet2"></a>'+
				                    '<a id="LinkInstagramMall" href="#" onclick="InAppBrowserOpen("http://www.instagram.com/")" class="socialNet3"></a>'+
				                    '<a id="LinkYoutubeMall" href="#" onclick="InAppBrowserOpen("http://www.youtube.com")" class="socialNet4"></a>'+
				                    '<a href="#modCompartir" onclick="cambiariconosCompartirMall()" class="socialNet5"></a>'+
				                '</div>');
	}
	//Cambiar iconos de infogeneral
	function cambiariconosCompartirInfoGeneral(){
		$("#ContenedorinfoGeneralMall").html('<div class="divRedesSocial">'+
            '<p>¡Comparte!</p>'+
            '<a data-red="Facebook" id="lf" href="#" onclick="CompatirFTWMInfoGeneral(this)" class="socialNet1"></a>'+
            '<a data-red="Twitter"id="lt" href="#" onclick="CompatirFTWMInfoGeneral(this)" class="socialNet2"></a>'+
            '<a data-red="WhatsApp"id="li" href="#" onclick="CompatirFTWMInfoGeneral(this)" class="socialNetWhats"></a>'+
            '<a data-red="Correo" id="ly" href="#" onclick="CompatirFTWMInfoGeneral(this)" class="socialNetMail"></a>'+
            '<a date-red="Volver" href="#" onclick="volverBotonInfoGeneral()" class="socialNetAtras"></a>'+
            '</div>');
	}

	function volverBotonInfoGeneral()
	{
		$("#ContenedorinfoGeneralMall").html('<div class="divRedesSocial" id="ContenedorinfoGeneralMall">'+
			'<p>¡Comparte!</p>'+
		    '<a id="facebookinfogeneral" onclick="InAppBrowserOpen("http://www.facebook.com")" href="#" class="socialNet1"></a>'+
		    '<a id="twitterinforgeneral" onclick="InAppBrowserOpen("http://www.twitter.com")" href="#" class="socialNet2"></a>'+
		    '<a id="instagrraminfogeneral" onclick="InAppBrowserOpen("http://www.instagram.com")" href="#" class="socialNet3"></a>'+
		    '<a id="youtubeinfogeneral" onclick="InAppBrowserOpen("http://www.youtube.com")" href="#" class="socialNet4"></a>'+
		    '<a id="compartirinfogeneral" onclick="cambiariconosCompartirInfoGeneral()"  href="#modCompartir" class="socialNet5"></a>'+
		    '</div>');
	}

	// cambiar iconos de detalle local

	function cambiariconocompartirlocal()
	{
		$("#ContenedorDetallelocal").html('<div class="divRedesSocial">'+
            '<p>¡Comparte!</p>'+
            '<a data-red="Facebook" id="lf" href="#" onclick="CompatirFTWMlocal(this)" class="socialNet1"></a>'+
            '<a data-red="Twitter"id="lt" href="#" onclick="CompatirFTWMlocal(this)" class="socialNet2"></a>'+
            '<a data-red="WhatsApp"id="li" href="#" onclick="CompatirFTWMlocal(this)" class="socialNetWhats"></a>'+
            '<a data-red="Correo" id="ly" href="#" onclick="CompatirFTWMlocal(this)" class="socialNetMail"></a>'+
            '<a date-red="Volver" href="#" onclick="volverBotonCompartirlocal()" class="socialNetAtras"></a>'+
            '</div>');
	}

	function volverBotonCompartirlocal()
	{
		$("#ContenedorDetallelocal").html('<div class="divRedesSocial" id="ContenedorDetallelocal">'+
            '<p>¡Síguenos!</p>'+
                '<a id="lf" href="#" onclick="InAppBrowserOpen("http://www.facebook.com")" class="socialNet1"></a>'+
                '<a id="lt" href="#" onclick="InAppBrowserOpen("http://www.twitter.com")"" class="socialNet2"></a>'+
                '<a id="li" href="#" onclick="InAppBrowserOpen("http://www.instagram.com")" class="socialNet3"></a>'+
                '<a id="ly" href="#" onclick="InAppBrowserOpen("http://www.youtube.com")" class="socialNet4"></a>'+
                '<a href="#modCompartir" onclick="cambiariconocompartirlocal()"  class="socialNet5"></a>'+
    			'</div>');
	}

	// Fin 

	function InAppBrowserOpen(LinkSite) {
		var ref = window.open(LinkSite, '_blank', 'location=yes');
	    ref.addEventListener('loadstart', function(event) { /*alert('start: ' + event.url);*/ });
	    ref.addEventListener('loadstop', function(event) { /*alert('stop: ' + event.url);*/ });
	    ref.addEventListener('loaderror', function(event) { /*alert('error: ' + event.message);*/ });
	    ref.addEventListener('exit', function(event) { /*alert(event.type);*/ });
	    ref.show();
	}

	function AgregarFavoritos(Modulo) {
		var Argumentos;
		switch (Modulo)
		{
			case "Mall":
				var idMall = getCC();
				Argumentos = {
					Favorito: Modulo,
					Mall: idMall,
					Comercio: null
				};
				break;
			case "Comercio":
				var Local = GetLocal();
				Argumentos = {
					Favorito: Modulo,
					Mall: null,
					Comercio: Local
				};
				break;
		}

		GuardarFavorito(Argumentos);

	}

	function CargarCheckIn() {
		var Malls = getGlovalAMalls();
		var MallsHtml = '';
		var estado = false;

		$.each(Malls.value,function(index, item) {
			var valor = item.nombre;
			valor = valor.replace(" ","");
			MallsHtml += '<li><input type="radio" name="chekin" class="chekI" onClick="ClickCheckIn(this)" value="'+ valor +'"/>'+ item.nombre +'</li>';
			estado = true;
		});

		if(!estado)
		{
			MallsHtml += '<li>No se encontraron Malls</li>';
		}

		$('#MallsCheckIn').html(MallsHtml);

	}

	/*Fin Funciones*/

	/* Control de Eventos */

	//Reinicio la variable del CC
	$( document ).on( "pageshow", "#Index", function() {
		//alert(screen.width + " x " + screen.height);
		setCargarInfo(true);
		setCC("");
		setFiltroMalls("");
		setMallCine("");
		setMovie("");
		ConfigurarHeadersModulos("Comercios");
		ConfigurarHeadersModulos("Promos");
		ConfigurarHeadersModulos("Eventos");
		ConfigurarHeadersModulos("Colecciones");
		ConfigurarHeadersModulos("Cines");
		ConfigurarHeadersModulos("Galerias");
		directionsService = new google.maps.DirectionsService();
		directionsDisplay = new google.maps.DirectionsRenderer();
		PosicionInicial = undefined;
		PosicionFinal = undefined;

		/*if(VerConexion)
		{
			setTimeout(VerificarConexion,5000);
			VerConexion = false;
		}*/
		

		//attach event for backbutton
    	document.addEventListener("backbutton", onBackButton, false);
		//CargarFooter("#Index");

	});

	$( document ).on( "pageshow", "#InfoGeneral", function(){
		var Cargar = getCargarInfo();

		if(Cargar)
		{
			$.mobile.loading("show",{
			  text: "Cargando Info General...",
			  textVisible: true,
			  theme: "b",
			  html: ""
			});
			setTimeout(function(){
				CargarSelect("#InfoGeneral");
				CargarInfoGeneral();
				//CargarFooter("#InfoGeneral");
				$.mobile.loading("hide");
			}, 2000);
		}
		else
		{
			setCargarInfo(true);
		}
	});

	//Cargo las categorias de los comercios del Index
	$( document ).on( "pageshow", "#ComerciosxCategorias", function() {
		var Cargar = getCargarInfo();

		if(Cargar)
		{
			$.mobile.loading("show",{
			  text: "Cargando Categorias...",
			  textVisible: true,
			  theme: "b",
			  html: ""
			});
			setTimeout(function(){
				CargarSelect("#ComerciosxCategorias");
				CargarSelectMalls("#ComerciosxCategorias");
				CargarCategorias("#ComerciosxCategorias");
				//CargarFooter("#ComerciosxCategorias");
				$.mobile.loading("hide");
			}, 2000);
		}
		else
		{
			setCargarInfo(true);
		}
	});

	$( document ).on( "pageshow", "#ComerciosxCategoriasMall", function() {
		var Cargar = getCargarInfo();

		if(Cargar)
		{
			$.mobile.loading("show",{
			  text: "Cargando Categorias...",
			  textVisible: true,
			  theme: "b",
			  html: ""
			});
			setTimeout(function(){
				CargarSelect("#ComerciosxCategoriasMall");
				CargarCategorias("#ComerciosxCategoriasMall");
				//CargarFooter("#ComerciosxCategoriasMall");
				$.mobile.loading("hide");
			}, 2000);
		}
		else
		{
			setCargarInfo(true);
		}
	});

	//Cargo los locales del Index
	$( document ).on( "pageshow", "#ComerciosxLocales", function() {
		var Cargar = getCargarInfo();

		if(Cargar)
		{
			$.mobile.loading("show",{
			  text: "Cargando Locales...",
			  textVisible: true,
			  theme: "b",
			  html: ""
			});

			setTimeout(function(){
				CargarSelect("#ComerciosxLocales");
				CargarSelectMalls("#ComerciosxLocales");

				var categoria = getCate();
				cargarListaloc(categoria,"#ComerciosxLocales");
				//CargarFooter("#ComerciosxLocales");
				$.mobile.loading("hide");
			}, 2000);
		}
		else
		{
			setCargarInfo(true);
		}
	});

	$( document ).on( "pageshow", "#ComerciosxLocalesMall", function() {
		var Cargar = getCargarInfo();

		if(Cargar)
		{
			$.mobile.loading("show",{
			  text: "Cargando Locales...",
			  textVisible: true,
			  theme: "b",
			  html: ""
			});

			setTimeout(function(){
				CargarSelect("#ComerciosxLocalesMall");
				var categoria = getCate();
				cargarListaloc(categoria,"#ComerciosxLocalesMall");
				setCate('');
				//CargarFooter("#ComerciosxLocalesMall");
				$.mobile.loading("hide");
			}, 2000);
		}
		else
		{
			setCargarInfo(true);
		}
	});

	$( document ).on( "pageshow", "#DetalleComercio", function() {
		var Cargar = getCargarInfo();

		if(Cargar)
		{
			$.mobile.loading("show",{
			  text: "Cargando Informacion del Local...",
			  textVisible: true,
			  theme: "b",
			  html: ""
			});

			setTimeout(function(){
				CargarSelect("#DetalleComercio");
				CargarDetalleLoc();
				//CargarFooter("#DetalleComercio");
				$.mobile.loading("hide");
			}, 2000);
		}
		else
		{
			setCargarInfo(true);
		}
	});

	$( document ).on( "pageshow", "#Promociones", function() {
		var Cargar = getCargarInfo();

		if(Cargar)
		{
			$.mobile.loading("show",{
			  text: "Cargando Promociones...",
			  textVisible: true,
			  theme: "b",
			  html: ""
			});

			setTimeout(function(){
				CargarSelect("#Promociones");
				CargarSelectMalls("#Promociones");
				CargarPromos();
				//CargarFooter("#Promociones");
				$.mobile.loading("hide");
			}, 2000);
		}
		else
		{
			setCargarInfo(true);
		}
	});

	$( document ).on( "pageshow", "#DetallePromos", function() {
		var Cargar = getCargarInfo();

		if(Cargar)
		{
			$.mobile.loading("show",{
			  text: "Cargando Promocion...",
			  textVisible: true,
			  theme: "b",
			  html: ""
			});

			setTimeout(function(){
				CargarSelect("#DetallePromos");
				CargarDetallePromo();
				//CargarFooter("#DetallePromos");
				$.mobile.loading("hide");
			}, 2000);
		}
		else
		{
			setCargarInfo(true);
		}
	});

	$( document ).on( "pageshow", "#Eventos", function() {
		var Cargar = getCargarInfo();

		if(Cargar)
		{
			$.mobile.loading("show",{
			  text: "Cargando Eventos...",
			  textVisible: true,
			  theme: "b",
			  html: ""
			});

			setTimeout(function(){
				CargarSelect("#Eventos");
				CargarSelectMalls("#Eventos");
				CargarEventos();
				//CargarFooter("#Eventos");
				$.mobile.loading("hide");
			}, 2000);
		}
		else
		{
			setCargarInfo(true);
		}
	});

	$( document ).on( "pageshow", "#DetalleEventos", function() {
		var Cargar = getCargarInfo();

		if(Cargar)
		{
			$.mobile.loading("show",{
			  text: "Cargando Evento...",
			  textVisible: true,
			  theme: "b",
			  html: ""
			});

			setTimeout(function(){
				CargarSelect("#DetalleEventos");
				CargarDetalleEventos();
				//CargarFooter("#DetalleEventos");
				$.mobile.loading("hide");
			}, 2000);
		}
		else
		{
			setCargarInfo(true);
		}
	});

	$( document ).on( "pageshow", "#Colecciones", function() {
		var Cargar = getCargarInfo();

		if(Cargar)
		{
			$.mobile.loading("show",{
			  text: "Cargando Colecciones...",
			  textVisible: true,
			  theme: "b",
			  html: ""
			});

			setTimeout(function(){
				CargarSelect("#Eventos");
				CargarSelectMalls("#Eventos");
				CargarColecciones();
				//CargarFooter("#Colecciones");
				$.mobile.loading("hide");
			}, 2000);
		}
		else
		{
			setCargarInfo(true);
		}
	});

	$( document ).on( "pageshow", "#DetalleColecciones", function() {
		var Cargar = getCargarInfo();

		if(Cargar)
		{
			$.mobile.loading("show",{
			  text: "Cargando Colecciones...",
			  textVisible: true,
			  theme: "b",
			  html: ""
			});

			setTimeout(function(){
				CargarSelect("#DetalleColecciones");
				CargarDetalleColecciones();
				//CargarFooter("#DetalleColecciones");
				$.mobile.loading("hide");
			}, 2000);
		}
		else
		{
			setCargarInfo(true);
		}
	});

	$( document ).on( "pageshow", "#Servicios", function() {
		var Cargar = getCargarInfo();

		if(Cargar)
		{
			$.mobile.loading("show",{
			  text: "Cargando Servicios...",
			  textVisible: true,
			  theme: "b",
			  html: ""
			});

			setTimeout(function(){
				CargarSelect("#Servicios");
				CargarServicios();
				//CargarFooter("#Servicios");
				$.mobile.loading("hide");
			}, 2000);
		}
		else
		{
			setCargarInfo(true);
		}
	});

	$( document ).on( "pageshow", "#Galerias", function() {
		var Cargar = getCargarInfo();

		if(Cargar)
		{
			$.mobile.loading("show",{
			  text: "Cargando Galerias...",
			  textVisible: true,
			  theme: "b",
			  html: ""
			});

			setTimeout(function(){
				CargarSelect("#Galerias");
				CargarGalerias();
				//CargarFooter("#Galerias");
				$.mobile.loading("hide");
			}, 2000);
		}
		else
		{
			setCargarInfo(true);
		}
	});

	$( document ).on( "pageshow", "#DetalleGalerias", function() {
		var Cargar = getCargarInfo();

		if(Cargar)
		{
			$.mobile.loading("show",{
			  text: "Cargando Galeria...",
			  textVisible: true,
			  theme: "b",
			  html: ""
			});

			setTimeout(function(){
				CargarSelect("#DetalleGalerias");
				CargarDetalleGalerias();
				ConfigurarHeaders("Mall","#HeaderDetalleGalerias", "#DetalleGalerias")
				//CargarFooter("#DetalleGalerias");
				$.mobile.loading("hide");
			}, 2000);
		}
		else
		{
			setCargarInfo(true);
		}
	});

	$( document ).on( "pageshow", "#Cines", function() {
		var Cargar = getCargarInfo();

		if(Cargar)
		{
			$.mobile.loading("show",{
			  text: "Cargando Cines...",
			  textVisible: true,
			  theme: "b",
			  html: ""
			});

			setTimeout(function(){
				CargarSelect("#Cines");
				CargarCines();
				var CargarDetCine = getCargarDetCine();
				if(CargarDetCine)
				{
					InfoMovie();
				}
				$.mobile.loading("hide");
			}, 2000);
		}
		else
		{
			setCargarInfo(true);
		}
	});

	$( document ).on( "pageshow", "#DetalleMovie", function() {
		var Cargar = getCargarInfo();

		if(Cargar)
		{
			$.mobile.loading("show",{
			  text: "Cargando Cines...",
			  textVisible: true,
			  theme: "b",
			  html: ""
			});

			setTimeout(function(){
				CargarSelect("#DetalleMovie");
				CargarDetalleMovie();
				ConfigurarHeaders("Mall","#HeaderDetalleGalerias", "#DetalleMovie")
				$.mobile.loading("hide");
			}, 2000);
		}
		else
		{
			setCargarInfo(true);
		}
	});

	$(window).bind('scrollstop', function() {
		if($.mobile.activePage.is('#ComerciosxLocales')){
				var Mall = getCC();
	            var locales = getGlovalALocales();
	            var IndexIni = getLLControl();
				var IndexFin = IndexIni + CantItemLazyLoad;
				setLLControl(IndexFin + 1);
				var html = '';
				var LengthArray = locales.length;
				var stringSP = 'FD62AD02-B232-49E4-ABF6-A79EFBA7B117';
				var stringCons = '9BA14D6A-83E0-4726-B41B-52080A75AFE5';

				stringSP = stringSP.toLowerCase();
				stringCons = stringCons.toLowerCase();

				var storesxcategories = getStoresxCategories();
				var SP = $.grep(storesxcategories.value, function (n, i) {
				            return n.fk_idCategory == stringSP;
				        });
				var Cons = $.grep(storesxcategories.value, function (n, i) {
				            return n.fk_idCategory == stringCons;
				        });

				if(IndexIni <= LengthArray)
				{
					//recorre y muestra todos los locales consultados
					$.each(locales, function(index, item) {
						
						var SP1 = $.grep(SP, function (n, i) {
						    return n.fk_idstore.toUpperCase() == item.id.toUpperCase();
						});

						var Cons1 = $.grep(Cons, function (n, i) {
										return n.fk_idstore.toUpperCase() == item.id.toUpperCase();
									});

						if(index >= IndexIni && index <= IndexFin)
						{
							if(Mall == "" || Mall == undefined)
							{
								if(ComprobarMasCercanos(item.fk_idCC, index, ALocalesFinal.length))
								{
									if(SP1.length > 0)
									{
										if(Cons1.length > 0)
										{
											var logotemp = RutaRecursos + "Logos/Locales/"+ item.id + ".png";
											var LogoFinal = VerificarArchivo("LogosTiendas",logotemp,"");

											html += '<li class="listaTipo1"><a id="'+item.id+'"  href="#DetalleComercio" data-transition="slide"  ><img src="'+ LogoFinal +'" /><div class="textolistaTipo1"><h3>' + item.nombre+ '</h3><p>Consultorio: '+item.numLocal+' - Tel: ' + item.telefono +'</p><p>'+ item.nombreMall +'</p></div><div class="FlechaLocales">Ir</div></a></li>';							
											estado=true;
										}
										else
										{
											var logotemp = RutaRecursos + "Logos/Locales/"+ item.id + ".png";
											var LogoFinal = VerificarArchivo("LogosTiendas",logotemp,"");

											html += '<li class="listaTipo1"><a id="'+item.id+'"  href="#DetalleComercio" data-transition="slide"  ><img src="'+ LogoFinal +'" /><div class="textolistaTipo1"><h3>' + item.nombre+ '</h3><p>Oficina: '+item.numLocal+' - Tel: ' + item.telefono +'</p><p>'+ item.nombreMall +'</p></div><div class="FlechaLocales">Ir</div></a></li>';							
											estado=true;
										}
									}
									else
									{
										var logotemp = RutaRecursos + "Logos/Locales/"+ item.id + ".png";
										var LogoFinal = VerificarArchivo("LogosTiendas",logotemp,"");

										html += '<li class="listaTipo1"><a id="'+item.id+'"  href="#DetalleComercio" data-transition="slide"  ><img src="'+ LogoFinal +'" /><div class="textolistaTipo1"><h3>' + item.nombre+ '</h3><p>Local: '+item.numLocal+' - Tel: ' + item.telefono +'</p><p>'+ item.nombreMall +'</p></div><div class="FlechaLocales">Ir</div></a></li>';							
										estado=true;
									}
								}
							}
							else
							{
								if(SP1.length > 0)
								{
									if(Cons1.length > 0)
									{
										var logotemp = RutaRecursos + "Logos/Locales/"+ item.id + ".png";
										var LogoFinal = VerificarArchivo("LogosTiendas",logotemp,"");

										html += '<li class="listaTipo1"><a id="'+item.id+'"  href="#DetalleComercio" data-transition="slide"  ><img src="'+ LogoFinal +'" /><div class="textolistaTipo1"><h3>' + item.nombre+ '</h3><p>Consultorio: '+item.numLocal+' - Tel: ' + item.telefono +'</p><p>'+ item.nombreMall +'</p></div><div class="FlechaLocales">Ir</div></a></li>';							
										estado=true;
									}
									else
									{
										var logotemp = RutaRecursos + "Logos/Locales/"+ item.id + ".png";
										var LogoFinal = VerificarArchivo("LogosTiendas",logotemp,"");

										html += '<li class="listaTipo1"><a id="'+item.id+'"  href="#DetalleComercio" data-transition="slide"  ><img src="'+ LogoFinal +'" /><div class="textolistaTipo1"><h3>' + item.nombre+ '</h3><p>Oficina: '+item.numLocal+' - Tel: ' + item.telefono +'</p><p>'+ item.nombreMall +'</p></div><div class="FlechaLocales">Ir</div></a></li>';							
										estado=true;
									}
								}
								else
								{
									var logotemp = RutaRecursos + "Logos/Locales/"+ item.id + ".png";
									var LogoFinal = VerificarArchivo("LogosTiendas",logotemp,"");

									html += '<li class="listaTipo1"><a id="'+item.id+'"  href="#DetalleComercio" data-transition="slide"  ><img src="'+ LogoFinal +'" /><div class="textolistaTipo1"><h3>' + item.nombre+ '</h3><p>Local: '+item.numLocal+' - Tel: ' + item.telefono +'</p><p>'+ item.nombreMall +'</p></div><div class="FlechaLocales">Ir</div></a></li>';							
									estado=true;
								}

							}
						}
					});
					
					$('#ComerciosxLocales #ListaLocales').append(html);
				}
	    }
	    else if($.mobile.activePage.is('#ComerciosxLocalesMall')){
				var Mall = getCC();
	            var locales = getGlovalALocales();
	            var IndexIni = getLLControl();
				var IndexFin = IndexIni + CantItemLazyLoad;
				setLLControl(IndexFin + 1);
				var html = '';
				var LengthArray = locales.length;
				var stringSP = 'FD62AD02-B232-49E4-ABF6-A79EFBA7B117';
				var stringCons = '9BA14D6A-83E0-4726-B41B-52080A75AFE5';

				stringSP = stringSP.toLowerCase();
				stringCons = stringCons.toLowerCase();

				var storesxcategories = getStoresxCategories();
				var SP = $.grep(storesxcategories.value, function (n, i) {
				            return n.fk_idCategory == stringSP;
				        });
				var Cons = $.grep(storesxcategories.value, function (n, i) {
				            return n.fk_idCategory == stringCons;
				        });

				if(IndexIni <= LengthArray)
				{
					//recorre y muestra todos los locales consultados
					$.each(locales, function(index, item) {
						
						var SP1 = $.grep(SP, function (n, i) {
						    return n.fk_idstore.toUpperCase() == item.id.toUpperCase();
						});

						var Cons1 = $.grep(Cons, function (n, i) {
										return n.fk_idstore.toUpperCase() == item.id.toUpperCase();
									});

						if(index >= IndexIni && index <= IndexFin)
						{
							if(Mall == "" || Mall == undefined)
							{
								if(ComprobarMasCercanos(item.fk_idCC, index))
								{
									if(SP1.length > 0)
									{
										if(Cons1.length > 0)
										{
											var logotemp = RutaRecursos + "Logos/Locales/"+ item.id + ".png";
											var LogoFinal = VerificarArchivo("LogosTiendas",logotemp,"");

											html += '<li class="listaTipo1"><a id="'+item.id+'"  href="#DetalleComercio" data-transition="slide"  ><img src="'+ LogoFinal +'" /><div class="textolistaTipo1"><h3>' + item.nombre+ '</h3><p>Consultorio: '+item.numLocal+' - Tel: ' + item.telefono +'</p><p>'+ item.nombreMall +'</p></div><div class="FlechaLocales">Ir</div></a></li>';							
											estado=true;
										}
										else
										{
											var logotemp = RutaRecursos + "Logos/Locales/"+ item.id + ".png";
											var LogoFinal = VerificarArchivo("LogosTiendas",logotemp,"");

											html += '<li class="listaTipo1"><a id="'+item.id+'"  href="#DetalleComercio" data-transition="slide"  ><img src="'+ LogoFinal +'" /><div class="textolistaTipo1"><h3>' + item.nombre+ '</h3><p>Oficina: '+item.numLocal+' - Tel: ' + item.telefono +'</p><p>'+ item.nombreMall +'</p></div><div class="FlechaLocales">Ir</div></a></li>';							
											estado=true;
										}
									}
									else
									{
										var logotemp = RutaRecursos + "Logos/Locales/"+ item.id + ".png";
										var LogoFinal = VerificarArchivo("LogosTiendas",logotemp,"");

										html += '<li class="listaTipo1"><a id="'+item.id+'"  href="#DetalleComercio" data-transition="slide"  ><img src="'+ LogoFinal +'" /><div class="textolistaTipo1"><h3>' + item.nombre+ '</h3><p>Local: '+item.numLocal+' - Tel: ' + item.telefono +'</p><p>'+ item.nombreMall +'</p></div><div class="FlechaLocales">Ir</div></a></li>';							
										estado=true;
									}
								}
							}
							else
							{
								if(SP1.length > 0)
								{
									if(Cons1.length > 0)
									{
										var logotemp = RutaRecursos + "Logos/Locales/"+ item.id + ".png";
										var LogoFinal = VerificarArchivo("LogosTiendas",logotemp,"");

										html += '<li class="listaTipo1"><a id="'+item.id+'"  href="#DetalleComercio" data-transition="slide"  ><img src="'+ LogoFinal +'" /><div class="textolistaTipo1"><h3>' + item.nombre+ '</h3><p>Consultorio: '+item.numLocal+' - Tel: ' + item.telefono +'</p><p>'+ item.nombreMall +'</p></div><div class="FlechaLocales">Ir</div></a></li>';							
										estado=true;
									}
									else
									{
										var logotemp = RutaRecursos + "Logos/Locales/"+ item.id + ".png";
										var LogoFinal = VerificarArchivo("LogosTiendas",logotemp,"");

										html += '<li class="listaTipo1"><a id="'+item.id+'"  href="#DetalleComercio" data-transition="slide"  ><img src="'+ LogoFinal +'" /><div class="textolistaTipo1"><h3>' + item.nombre+ '</h3><p>Oficina: '+item.numLocal+' - Tel: ' + item.telefono +'</p><p>'+ item.nombreMall +'</p></div><div class="FlechaLocales">Ir</div></a></li>';							
										estado=true;
									}
								}
								else
								{
									var logotemp = RutaRecursos + "Logos/Locales/"+ item.id + ".png";
									var LogoFinal = VerificarArchivo("LogosTiendas",logotemp,"");

									html += '<li class="listaTipo1"><a id="'+item.id+'"  href="#DetalleComercio" data-transition="slide"  ><img src="'+ LogoFinal +'" /><div class="textolistaTipo1"><h3>' + item.nombre+ '</h3><p>Local: '+item.numLocal+' - Tel: ' + item.telefono +'</p><p>'+ item.nombreMall +'</p></div><div class="FlechaLocales">Ir</div></a></li>';							
									estado=true;
								}

							}
						}
					});
					
					$('#ComerciosxLocalesMall #ListaLocales').append(html);
				}
	    }

    });

	$( document ).on( "pageshow", "#PilasPues", function() {
		$.mobile.loading("show",{
		  text: "Cargando Noticias...",
		  textVisible: true,
		  theme: "b",
		  html: ""
		});

		setTimeout(function(){
			CargarSelect("#PilasPues");
			CargarPilasps();
			$.mobile.loading("hide");
		}, 2000);	
	});	

	$( document ).on( "pageshow", "#social", function() {
		$.mobile.loading("show",{
		  text: "Cargando Social...",
		  textVisible: true,
		  theme: "b",
		  html: ""
		});

		setTimeout(function(){
			CargarSelect("#social");
			CargarCheckIn();
			ConsultarTweet();
			$.mobile.loading("hide");
		}, 2000);	
	});
	
	$( document ).on( "pageshow", "#modFavoritos", function() {

		var registro= localStorage.getItem("VR");
		var valor = (registro === "true");
		if(valor)
		{
			$.mobile.loading("show",{
			  text: "Cargando favoritos...",
			  textVisible: true,
			  theme: "b",
			  html: ""
			});

			setTimeout(function(){
				CargarSelect("#modFavoritos");
				TraerFavoritos();
			}, 2000);	
		}else
		{
			alert("Para usar este modulo debes estár registrado.");
				$.mobile.changePage("#Index");
		}	
});


	
	$( document ).on( "pageshow", "#modBuscar", function() {
		$.mobile.loading("show",{
		  text: "Cargando Buscar...",
		  textVisible: true,
		  theme: "b",
		  html: ""
		});

		setTimeout(function(){
			CargarSelect("#modBuscar");
			LlenarSelectsBuscar();
			$.mobile.loading("hide");
		}, 2000);	
	});



