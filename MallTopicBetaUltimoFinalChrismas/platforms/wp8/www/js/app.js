//
//variable global 
var selectedMall;
var selectedCategory="";

var mallHeader;
var mallSplash;
var mallName;
var arrayInfo=null;
var WebService= "http://Administrator:malltopic2014!@MallTopicServiceApp.azurewebsites.net/malltopicWcf.svc/";	//Variable que almacena la URL del WebService con Autenticacion
var url = "";//Variable para armar las respesctivas URL para las consultas
var RutaRecursos = "http://malltopic.azurewebsites.net/Images/Uploads/MallTopicApp/";



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
	function loadDataArray(url) {

		try
		{
			$.ajax({
				type: "GET",
				url: url,
				dataType: "json",
				async:false,
				isLocal: true,
				success: function (results) {

					//se almacena objeto resultados en variable global
		   			arrayInfo=results;		

				},
				error: function (msg) {
					  
					ServiceFailed(msg);

				}
			});
		}
		catch(err)
		{
			alert(err.message);
		}
    }

	//url= direccion uri de la consulta
	//href= direccion donde se redirige cada item
	//idlistlistid= id del control donde se insertan los datos
	function loadData(url, idlist, href) {

		$.mobile.loading('show');

		$.ajax({
			type: "GET",
			url: url,
			dataType: "json",
			success: function (results) {

				var html ='';
				$.each(results.value, function(index, item) {
							
					html += '<li><a id="'+item.id+'" data-transition="slide" href="'+href+'"><h3>' + item.nombre+ '</h3></a></li>';
					//html += '<li><a id="'+item.id+'" data-transition="slide" ><h3>' + item.nombre+ '</h3></a></li>';
				});
					
				$('#'+idlist).append($(html)).listview("refresh");
				//$('#'+idlist).trigger('create');    
				//$('#'+idlist).listview('refresh');
			},
			error: function (msg) {
				  
				ServiceFailed(msg);

			}
		});

		$.mobile.loading('hide');
    }
		
	function ServiceFailed(xhr) {
			
		if (xhr.responseText) {

			var err = xhr.responseText;
		if (err)

			alert('Error: ' + err);

		else

			alert("Message: Unknown server error.");
		}
		return;
	}

	/* Funciones*/


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
			var url = WebService + "Malls?$select=id,nombre"
			loadDataArray(url);
			var Malls = arrayInfo;

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

	//Funcion que carga el select de filtro de mall de forma variable. 
	//Recibe el el id del Section en el que se quiere mostrar
	//Solo se muestra en las opciones desde el index.
	window.CargarSelectMalls = CargarSelectMalls;
	function CargarSelectMalls(idpaginacontenedor)
	{
		var VarMall = getCC();
		var url = WebService + "Malls?$select=id,nombre"
		loadDataArray(url);
		var Malls = arrayInfo;
		var FiltroMalls = getFiltroMalls();

		if(VarMall == "" || VarMall == undefined)
		{ 

			var htmlSelect = 	'<div class="arrow"></div>' +
								'<select id="cuadroSel" class="Filtro1" data-native-menu="false" onchange="AplicarFiltroMalls(this)" data-pagina="'+ idpaginacontenedor +'">';

			if(FiltroMalls== "" || FiltroMalls == undefined)
			{
				htmlSelect += "<option value='' selected='selected'>Mas Cercanos</option>";	
			}
			else
			{
				htmlSelect += "<option value=''>Mas Cercanos</option>";
			}
			

			$.each(Malls.value, function(index, item) {

				if(ComprobarMasCercanos(item.id))
				{
					if (item.id == FiltroMalls)
					{
						htmlSelect += "<option value='"+ item.id +"' selected='selected'>"+ item.nombre +"</option>";
					} 
					else
					{
						htmlSelect += "<option value='"+ item.id +"'>"+ item.nombre +"</option>";
					}
				}
			});

			htmlSelect += 	"</select>";

			var contentsel = $(idpaginacontenedor + " #SelectMall");
			console.log(contentsel);

			
			contentsel.html(htmlSelect);

			contentsel = $(idpaginacontenedor + " #SelectMall");
			console.log(contentsel);
		}
		else
		{
			var contentsel = $(idpaginacontenedor + " #SelectMall");
			contentsel.attr({
				property1: 'style',
				property2: 'display:none;'
			});
		}
	}
		
	window.cargarListaCC=cargarListaCC;
	function cargarListaCC(){

		$.mobile.loading('show');
		var html='';
		console.log("cargandoListaCC..");

		//Construyo la Uri
		url= WebService + "Cities(guid'"+getCiudad()+"')/Malls";				
		var estado=false;

		//Consulta todos los locales pertenecientes a una ciudad
		loadDataArray(url);
		var malls=arrayInfo;

		html = '<ul>';

		//recorre y muestra todos los locales consultados
		$.each(malls.value, function(index, item) 
		{
			html += '<li class="Mall"><a id="'+item.id+'" href="#SplashScreen" data-transition="slide" onclick="setCC("'+ item.id +'")" data-veri="CentrosComerciales"><img src="http://malltopic.azurewebsites.net/Images/Uploads/Mall/'+item.id+'.png" class="logoMall"/><div class="textoMall"><h3>' + item.nombre+ '</h3><p>'+item.descripcion+'</p></div><div class="flechaAzul">Ir</div></a></li>';
			estado=true;
		});

		if(estado==false){
			html += '<li>No se encontraron centros comerciales</li>';
		}
		
		html+='</ul>';

		$.mobile.loading('hide');
		$('#ContentListCC').html(html);
		$('#ContentListCC').trigger('create');    
		/*$('#listTiendas').listview('refresh'); */
	}

	//FUNCION PARA CARGAR LISTAS DE LOCALES
	//Recibe el id de la categoria, si este esta en blanco los carga todos.
	//Recibe el id de la pagina que necesita la lista,
	window.cargarListaloc=cargarListaloc;
	function cargarListaloc(idcate, idpaginacontenedor){

		
		var html='';
		console.log("cargandoListaLoc..");
		$('.removec').empty();
		var IndexControl = getIndexControl();

		//$('#titleg').append("Centros comerciales");
		var Mall = getCC();
		var MallFiltro = getFiltroMalls();
		
			$('#contentloc').html('');

			//Configuro y aplico todos los filtros necesarios.
			if(Mall == "" || Mall == undefined)
			{
				if (idcate != "") 
				{
					if(MallFiltro == "" || MallFiltro == undefined)
					{
						url= WebService + "Stores?$filter=(fk_idActividadComercial)eq(guid'"+idcate+"')";	
					}
					else
					{
						url= WebService + "Malls(guid'"+ MallFiltro +"')/Stores?$filter=(fk_idActividadComercial)eq(guid'"+idcate+"')";
					}
				}
				else
				{
					if(MallFiltro == "" || MallFiltro == undefined)
					{
						url= WebService + "Stores";
					}
					else
					{
						url= WebService + "Malls(guid'"+ MallFiltro +"')/Stores";
					}
				}
			}
			else
			{
				if (idcate != "") 
				{
					url= WebService + "Malls(guid'"+Mall+"')/Stores?$filter=(fk_idActividadComercial)eq(guid'"+idcate+"')";
				}
				else
				{
					url= WebService + "Malls(guid'"+Mall+"')/Stores";
				}

			}
			

			var estado=false;
			//Consulta todos los locales pertenecientes a una ciudad
			loadDataArray(url);

			var locales=arrayInfo;

			/*html+='<div class="ui-grid-a botones"><div class="ui-block-a"><a data-rel="back" data-role="button" data-icon="arrow-l" data-iconpos="notext" data-mini="true" data-inline="true" class="left"></a></div></div>';
			html+='<div class="titulo centrar"><p>Selecciona tu Local Comercial</p></div>';
			html+='<div  class="contenido-1"><ul id="ListaLoc" data-role="listview" data-inset="true" data-theme="i">';*/

			html = '<ul>'; 


			//recorre y muestra todos los locales consultados
			$.each(locales.value, function(index, item) {
				if(Mall == "" || Mall == undefined)
				{
					if(ComprobarMasCercanos(item.fk_idCC))
					{
						var logotemp = RutaRecursos + "Logos/Locales/"+ item.id + ".png";
						var LogoFinal = VerificarArchivo("LogosTiendas",logotemp,"");

						html += '<li class="listaTipo1"><a id="'+item.id+'"  href="#DetalleComercio" data-transition="slide"  ><img src="'+ LogoFinal +'" /><div class="textolistaTipo1"><h3>' + item.nombre+ '</h3><p>Local: '+item.numLocal+' - Tel: ' + item.telefono +'</p><p>'+ item.nombreMall +'</p></div><div class="FlechaLocales">Ir</div></a></li>';							
						estado=true;
					}
				}
				else
				{
					url = WebService + "Malls(guid'"+item.fk_idCC+"')/";
					loadDataArray(url);
					var AMall = arrayInfo;

					var logotemp = RutaRecursos + "Logos/Locales/"+ item.id + ".png";
					var LogoFinal = VerificarArchivo("LogosTiendas",logotemp,"");

					html += '<li class="listaTipo1"><a id="'+item.id+'"  href="#DetalleComercio" data-transition="slide"  ><img src="'+ LogoFinal +'" /><div class="textolistaTipo1"><h3>' + item.nombre+ '</h3><p>Local: '+item.numLocal+' - Tel: ' + item.telefono +'</p><p>'+ AMall.nombre +'</p></div><div class="FlechaLocales">Ir</div></a></li>';							
					estado=true;

				}
				
			});

			if(estado==false){
				html += '<li>No se encontraron locales comerciales</li>';
			}
			
			html+='</ul>';
			html+='</div>';

			
			
			$(idpaginacontenedor + ' #contentloc').html(html);   
			//$('#listTiendas').listview('refresh'); 
			setIndexControl(IndexControl +1);
		
		$.mobile.loading('hide');

		if(IndexControl >= 1){
			setIndexControl(0);
		}
	}

	function CargarCategorias(idpaginacontent)
	{
		var html='';		
		$('.removec').empty();
		var count;
		var ActividadControl = '';
		var IndexControl = getIndexControl();
		var estado = false;
		var mall = getCC();

		
			url= WebService + "Categories?$select= id,nombre,icono,descripcion&$orderby=descripcion";				
			loadDataArray(url);
			var Categorias= arrayInfo

			//Pinto el Unordered List
			var htmlList = '';
			var LinkLocal = "";
			if(mall =="" || mall == undefined)
			{
				LinkLocal="#ComerciosxLocales";
			}
			else
			{
				LinkLocal = "#ComerciosxLocalesMall";
			}

			$.each(Categorias.value, function(index, item) {
				if(ActividadCiclo != ActividadControl)
				{
					var ActividadCiclo = '';
					ActividadCiclo = item.fk_idActividadComercial;

					htmlList += '<div class="iconos3"><a id="'+ item.id +'" href="'+ LinkLocal +'" data-transition="slide" style="display : inline-block; background: url('+ RutaRecursos + 'Categorias/'+ item.id +'.png);background-size : 100%;width: 100%;height: 100%"></a><p>'+ item.nombre +'</p></div>';
		            ActividadControl = item.id;
		            estado = true;
		        }
			});
			if(estado==false)
			{
				htmlList = '<div>No se encontraron Categorias</div>';
			}

			$(idpaginacontent + ' #ContentCate').html('');
			$(idpaginacontent + ' #ContentCate').html(htmlList);

			setIndexControl(IndexControl +1);

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

	function CargarDetalleLoc()
	{
		//Capturo el id del local seleccionado
		var Comercio = GetLocal();

		//Consulto la info de ese local
		url = WebService + "Stores(guid'"+ Comercio +"')/";
		loadDataArray(url);
		var ArrayComercios = arrayInfo;

		//Configuro el Header
		ConfigurarHeaders("DetalleComercio","HeaderDetalleComercio", "#DetelleComercio");

		//Cambio el nombre
		$("#Encabezado h2").html(ArrayComercios.nombre)

		//Lleno los botones de llamar y el local
		var Botones = '<a href="tel:'+ ArrayComercios.telefono +'" class="btnDetalles"><div class="telephone"></div><p>Llamar</p></a>';
		Botones += '<div class="btnDetalles"><h3>'+ ArrayComercios.numLocal +'</h3><p>Local</p></div>';
		$("#ContentBotonesDetComer").html(Botones);

		//Lleno el acordeon
		//Info general del local

		var Acordeon ="<h3>Información General</h3><div><p>";

		Acordeon += "<h3>Horario Atención</h3>";
		Acordeon += "<p>"+ ArrayComercios.horario +"</p>";
		Acordeon += "<h3>Ubicación</h3>";
		Acordeon += "<p>Piso - Nivel - Torre - Local:"+ ArrayComercios.numLocal +"</p>";
		Acordeon += "<h3>Teléfono</h3>";
		Acordeon += "<p>"+ ArrayComercios.telefono +"</p>";
		Acordeon +="<h3>Descripcion</h3>";
		Acordeon += "<p>"+ ArrayComercios.descripcion +"</p>";

		Acordeon += "</p></div>";

		//Productos
		url = WebService + "Stores(guid'"+ Comercio +"')/Products";
		loadDataArray(url);
		var AProductos = arrayInfo;
		Acordeon += "<h3>Productos</h3><div><ul>";
		var marcas = "<h3>Marcas</h3><div><p></p><ul>";
		var ControlMarcas = "";
		var estado = false;
		var estadoMarcas = false;

		$.each(AProductos.value, function(index, item) {
			 
			 Acordeon += "<li>"+ item.nombre +"</li>";

			 url = WebService + "Trademark(guid'"+ item.fk_idMarca +"')/"
			 loadDataArray(url);
			 var AMarcas = arrayInfo;
			 estado = true;

			$.each(AMarcas.value, function(index, Marca) {
			 	if(ControlMarcas != Marca.id)
			 	{
			 		marcas +="<li>"+ Marca.nombre +"</li>";
			 		ControlMarcas = Marca.id;
			 		estadoMarcas = true;
			 	}
			 	
			});
		});

		if(!estado)
		{
			Acordeon += "<li>No se encontraron Productos</li>"; 
		}

		if(!estadoMarcas)
		{
			marcas += "<li>No se encontraron Marcas</li>";
		}
		marcas += "</ul></div>";

		Acordeon += "</ul></div>" + marcas;

		//Cargo las Promociones
		Acordeon += "<h3>Promociones</h3><div><ul>";
		estado = false;
		url = WebService + "Stores(guid'"+ Comercio +"')/Promos";
		loadDataArray(url);
		var APromociones = arrayInfo;
		$.each(APromociones.value, function(index, item) {
			 Acordeon += "<li>"+ item.nombre +"</li>"
			 estado = true;
		});

		if(!estado)
		{
			Acordeon += "<li>No se encontraron Promociones</li>"; 
		}

		Acordeon +="</ul></div>";

		//Cargo los Eventos
		Acordeon += "<h3>Eventos</h3><div><ul>";
		estado = false;
		url = WebService + "Stores(guid'"+ Comercio +"')/Events";
		loadDataArray(url);
		var AEventos = arrayInfo;
		$.each(AEventos.value, function(index, item) {
			 Acordeon += "<li>"+ item.nombre +"</li>"
			 estado = true;
		});

		if(!estado)
		{
			Acordeon += "<li>No se encontraron Eventos</li>"; 
		}

		Acordeon +="</ul></div>";

		//Cargo las Colecciones
		Acordeon += "<h3>Colecciones</h3><div></div>";

		//Cargo las Galerias
		//Pendiente codigo
		Acordeon += "<h3>Galerias</h3><div></div>";

		$("#AcordeonLocales").html(Acordeon);
		$("#AcordeonLocales").accordion({collapsible: true});
		$( "#AcordeonLocales" ).accordion( "refresh" );

	}


//CARGA CINES

function CargarCines()
	{
		var Mall = getCC();
		var ACines;
		var estado = false;

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
			if(index == 0)
			{
				setMovie(item.id);
				htmlCines += '<a id="'+ item.id +'" href="#" data-index="'+ index +'"><img id="'+ item.id +'" src="'+ RutaRecursos+'Cines/'+ item.id +'.jpg" class="peliSeleccionada" /></a>';
			}
			else
			{
				htmlCines += '<a id="'+ item.id +'" href="#" data-index="'+ index +'"><img id="'+ item.id +'" src="'+ RutaRecursos+'Cines/'+ item.id +'.jpg" class="peliNoSeleccionada" /></a>';
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
	            		htmlMovie += '<a id="'+ moviemall.id +'" href="#DetalleMovie" data-transition="slide"><li class="listaTipo2">' +
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
					 	htmlMovie += '<li>'+ RoomMovie.descripcion +' - '+ RoomMovie.nombre +'</li>';
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
			alert(err);
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

		var htmlMovie = '';

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
                            '<a href="'+ AMovie.trailer +'" class="btnVerTrailer"  target="_blank">Ver Trailer</a>' +
                        '</div>';

        $("#ContentDetalle").html(htmlMovie);

        htmlMovie = '<div id="AcordeonHorariosDetalle" class="acordion"><h3>Horarios</h3><div><ul>'

        //Cargo Horarios
		$.each(AMovie.Room_movie, function(index, RoomMovie) {
			if(Mall == "" || Mall == undefined)
			{
				if(RoomMovie.fk_idCC == MallMovie)
				{
				 	htmlMovie += '<li>'+ RoomMovie.descripcion +' - '+ RoomMovie.nombre +'</li>';
				}
			}
			else
			{
				if(RoomMovie.fk_idCC == Mall)
				{
				 	htmlMovie += '<li>'+ RoomMovie.descripcion +' - '+ RoomMovie.nombre +'</li>';
				}
			}
			
		});
                    	
		htmlMovie += '</ul></div>';

		//Cargo la Sinopsis
		htmlMovie += '<h3>Sinopsis</h3><div>';
		htmlMovie += '<p>'+ AMovie.sinopsis +'</p></div>';

		//Cargo el trailer
		htmlMovie += '<h3>Trailer</h3><div>';
		htmlMovie += '<video preload="none" controls> <source type="video/youtube" src="'+ AMovie.trailer +'" />'+ AMovie.titulo +'</video></div>';

		//Cargo los Actores
		htmlMovie += '<h3>Actores</h3><div>';
		htmlMovie += '<p>'+ AMovie.actores +'</p></div>';

		htmlMovie += '</div>'

		$("#ContentDetalleMovie").html(htmlMovie);
		$("#AcordeonHorariosDetalle").accordion({collapsible: true});
		$("#AcordeonHorariosDetalle").accordion( "refresh" );
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
				if(EstadoPromo == "" || EstadoPromo == undefined)
				{
					url = WebService + "Promos";	
				}
				else
				{
					if(EstadoPromo =="Activas")
					{
						url = WebService + "Promos?$filter=fechaInicio le datetime'"+ FechaActual.toString() +"' and fechaFinal ge datetime'"+ FechaActual.toString() +"'";	
					}
					else if(EstadoPromo =="Proximas")
					{
						url = WebService + "Promos?$filter=fechaInicio ge datetime'"+ FechaActual.toString() +"'";	
					}
					else if(EstadoPromo =="Vencidas")
					{
						url = WebService + "Promos?$filter=fechaFinal le datetime'"+ FechaActual.toString() +"'";	
					}
				}
			}
			else
			{
				url = WebService + "Malls(guid'"+ FiltroMalls +"')/Stores?$expand=Promos";
			}
			
		}
		else
		{
			url = WebService + "Malls(guid'"+ Mall +"')/Stores?$expand=Promos";
		}

		loadDataArray(url);
		APromociones = arrayInfo;

		var htmlPromos = '<ul>';

		if(Mall == "" || Mall == undefined)
		{
			if(FiltroMalls == "" || FiltroMalls == undefined)
			{
				$.each(APromociones.value, function(index, item) {
					url = WebService + "Stores(guid'"+ item.fk_idLocal +"')/";
					loadDataArray(url);
					var ALocal = arrayInfo;

					if(ComprobarMasCercanos(ALocal.fk_idCC))
					{
						url = WebService + "Malls(guid'"+ ALocal.fk_idCC +"')/";
						loadDataArray(url);
						var AMall = arrayInfo;

						htmlPromos += '<li class="listaTipo1"><a id="'+ item.id +'" href="#DetallePromos" data-transition="slide"><img src="'+ RutaRecursos +'Promociones/'+item.id+'.jpg"/><div class="textolistaTipo1"><h3>'+ item.nombre +'</h3><p style="color: #0e79b7; font-style: italic;">'+ AMall.nombre +' - '+ ALocal.nombre +'</p><p>'+ item.descripcion +'</p></div><div class="FlechaLocales">Ir</div></a></li>';
						estado = true;
					}
				});
			}
			else
			{
				$.each(APromociones.value, function(index, item1) {
					if(ComprobarMasCercanos(item1.fk_idCC))
					{
						url = WebService + "Malls(guid'"+ item1.fk_idCC +"')/";
						loadDataArray(url);
						var AMall = arrayInfo;

						if(EstadoPromo == "" || EstadoPromo == undefined)
						{
							$.each(item1.Promos, function(index, item) {
								htmlPromos += '<li class="listaTipo1"><a id="'+ item.id +'" href="#DetallePromos" data-transition="slide"><img src="'+ RutaRecursos +'Promociones/'+item.id+'.jpg"/><div class="textolistaTipo1"><h3>'+ item.nombre +'</h3><p style="color: #0e79b7; font-style: italic;">'+ AMall.nombre +' - '+ item1.nombre +'</p><p>'+ item.descripcion +'</p></div><div class="FlechaLocales">Ir</div></a></li>';
							 	estado = true;
							});
						}
						else
						{
							$.each(item1.Promos, function(index, item) {
								var FecIni = item.fechaInicio;
								var FecFin = item.fechaFinal;
								if(EstadoPromo == "Activas")
								{
									if(FecIni <= FechaActual && FecFin >= FechaActual)
									{
										htmlPromos += '<li class="listaTipo1"><a id="'+ item.id +'" href="#DetallePromos" data-transition="slide"><img src="'+ RutaRecursos +'Promociones/'+item.id+'.jpg"/><div class="textolistaTipo1"><h3>'+ item.nombre +'</h3><p style="color: #0e79b7; font-style: italic;">'+ AMall.nombre +' - '+ item1.nombre +'</p><p>'+ item.descripcion +'</p></div><div class="FlechaLocales">Ir</div></a></li>';		
									}
								}
								else if(EstadoPromo == "Proximas")
								{
									if(FecIni >= FechaActual)
									{
										htmlPromos += '<li class="listaTipo1"><a id="'+ item.id +'" href="#DetallePromos" data-transition="slide"><img src="'+ RutaRecursos +'Promociones/'+item.id+'.jpg"/><div class="textolistaTipo1"><h3>'+ item.nombre +'</h3><p style="color: #0e79b7; font-style: italic;">'+ AMall.nombre +' - '+ item1.nombre +'</p><p>'+ item.descripcion +'</p></div><div class="FlechaLocales">Ir</div></a></li>';			
									}
								}
								else if(EstadoPromo == "Vencidas")
								{
									if(FecFin <= FechaActual)
									{
										htmlPromos += '<li class="listaTipo1"><a id="'+ item.id +'" href="#DetallePromos" data-transition="slide"><img src="'+ RutaRecursos +'Promociones/'+item.id+'.jpg"/><div class="textolistaTipo1"><h3>'+ item.nombre +'</h3><p style="color:#0e79b7; font-style: italic;">'+ AMall.nombre +' - '+ item1.nombre +'</p><p>'+ item.descripcion +'</p></div><div class="FlechaLocales">Ir</div></a></li>';		
									}
								}
								
							 	estado = true;
							});
						}
					}
				});
			}
		}
		else
		{
			$.each(APromociones.value, function(index, item1) {
				if(EstadoPromo == "" || EstadoPromo == undefined)
				{
					$.each(item1.Promos, function(index, item) {
						htmlPromos += '<li class="listaTipo1"><a id="'+ item.id +'" href="#DetallePromos" data-transition="slide"><img src="'+ RutaRecursos +'Promociones/'+item.id+'.jpg"/><div class="textolistaTipo1"><h3>'+ item.nombre +'</h3><p>'+ item.descripcion +'</p></div><div class="FlechaLocales">Ir</div></a></li>';
					 	estado = true;
					});
				}
				else
				{
					$.each(item1.Promos, function(index, item) {
						var FecIni = item.fechaInicio;
						var FecFin = item.fechaFinal;
						if(EstadoPromo == "Activas")
						{
							if(FecIni <= FechaActual && FecFin >= FechaActual)
							{
								htmlPromos += '<li class="listaTipo1"><a id="'+ item.id +'" href="#DetallePromos" data-transition="slide"><img src="'+ RutaRecursos +'Promociones/'+item.id+'.jpg"/><div class="textolistaTipo1"><h3>'+ item.nombre +'</h3><p>'+ item.descripcion +'</p></div><div class="FlechaLocales">Ir</div></a></li>';		
							}
						}
						else if(EstadoPromo == "Proximas")
						{
							if(FecIni >= FechaActual)
							{
								htmlPromos += '<li class="listaTipo1"><a id="'+ item.id +'" href="#DetallePromos" data-transition="slide"><img src="'+ RutaRecursos +'Promociones/'+item.id+'.jpg"/><div class="textolistaTipo1"><h3>'+ item.nombre +'</h3><p>'+ item.descripcion +'</p></div><div class="FlechaLocales">Ir</div></a></li>';			
							}
						}
						else if(EstadoPromo == "Vencidas")
						{
							if(FecFin <= FechaActual)
							{
								htmlPromos += '<li class="listaTipo1"><a id="'+ item.id +'" href="#DetallePromos" data-transition="slide"><img src="'+ RutaRecursos +'Promociones/'+item.id+'.jpg"/><div class="textolistaTipo1"><h3>'+ item.nombre +'</h3><p>'+ item.descripcion +'</p></div><div class="FlechaLocales">Ir</div></a></li>';		
							}
						}
					 	estado = true;
					});
				}
			});
		}

		if(estado==false)
		{
			htmlPromos = '<li>No se encontraron Promociones</li>';
		}

		htmlPromos += '</ul>';

		$('#PromosList').html(htmlPromos);
	}

	function CargarDetallePromo()
	{
		var Promo = getPromo();
		url = WebService + "Promos(guid'"+ Promo +"')/"
		loadDataArray(url);
		var APromo = arrayInfo;

		//Falta cargar Logo Promo e imagen promo
		$("#ImagenPromo").attr('src', RutaRecursos +'Promociones/'+Promo+'.jpg')
		$("#NombrePromo").html(APromo.nombre);
		$("#Descripcion").html("<p>"+ APromo.descripcion +"</p>");

        //Cargo como participar
        var HtmlAcordeon = '<h3>Cómo Participar?</h3><div>';
        HtmlAcordeon += '<p>'+ APromo.comoParticipar +'</p>';
        HtmlAcordeon += '</div>';

        //Cargo a quien va dirigido
		HtmlAcordeon += '<h3>Fecha Límite</h3><div>';
        HtmlAcordeon += '<p>'+ APromo.fechaFinal +'</p>';
        HtmlAcordeon += '</div>';

        //Cargo requisitos
        HtmlAcordeon += '<h3>Condiciones y Restricciones</h3><div>';
        HtmlAcordeon += '<p>'+ APromo.requisitosParaParticipar +'</p>';
        HtmlAcordeon += '</div>';

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
		 		url = WebService + "Events?$expand=Malls,Stores";
		 	}
		 	else
		 	{
		 		url = WebService + "Malls(guid'"+ FiltroMalls +"')/Events?$expand=Malls,Stores";		
		 	}
		 }
		 else
		 {
		 	url = WebService + "Malls(guid'"+ Mall +"')/Events?$expand=Malls,Stores";
		 }


		 loadDataArray(url);
		 AEventos = arrayInfo;
		 var htmlEventos = '<ul>';

		$.each(AEventos.value, function(index, item) {
			var favorito = item.favorito;
			var Store = item.fk_idStore;
		 	var imagen = item.imagen;
		 	var urlimagen = '';

		 	if(Mall == "" || Mall == undefined)
		 	{
		 		if(favorito)
		 		{
		 			if(imagen == 'null')
				 	{
				 		urlimagen = 'images/Store.png';
				 	}
				 	else
				 	{
				 		if(Store == 'null' || Store == '' || Store == undefined)
				 		{
				 			urlimagen = RutaRecursos + 'Eventos/Malls/' + item.id + '.jpg';
				 		}
				 		else
				 		{
				 			urlimagen = RutaRecursos + 'Eventos/Locales/' + item.id + '.jpg';
				 		}
				 	}

				 	htmlEventos += '<li class="listaTipo1"><a id="'+ item.id +'" href="#DetalleEventos" data-transition="slide"><img src="'+ urlimagen +'"/><div class="textolistaTipo1"><h3>'+ item.nombre +'</h3><p>- '+ item.descripcion +'</p><p>- '+ item.Malls.nombre +'</p></div><div class="FlechaLocales">Ir</div></li>'; 
				 	estado = true;
		 		}
		 	}
		 	else
		 	{
		 		if(imagen == 'null')
			 	{
			 		urlimagen = 'images/Store.png';
			 	}
			 	else
			 	{
			 		if(Store == 'null' || Store == '' || Store == undefined)
			 		{
			 			urlimagen = RutaRecursos + 'Eventos/Malls/' + item.id + '.jpg';
			 		}
			 		else
			 		{
			 			urlimagen = RutaRecursos + 'Eventos/Locales/' + item.id + '.jpg';
			 		}
			 	}

			 	htmlEventos += '<li class="listaTipo1"><a id="'+ item.id +'" href="#DetalleEventos" data-transition="slide"><img src="'+ urlimagen +'"/><div class="textolistaTipo1"><h3>'+ item.nombre +'</h3><p>- '+ item.descripcion +'</p><p>- '+ item.Malls.nombre +'</p></div><div class="FlechaLocales">Ir</div></li>'; 
			 	estado = true;
		 	}
		 	
		});

		if(estado==false)
		{
			htmlEventos = '<li>No se encontraron Eventos</li>';
		}
		htmlEventos += '</ul>';
		$("#EventList").html(htmlEventos);
	}

	function CargarDetalleEventos () 
	{
		var Evento = getEvento();
		url = WebService + "Events(guid'"+ Evento +"')/";
		loadDataArray(url);
		var AEvento = arrayInfo;
		imagen = AEvento.imagen;
		mall = AEvento.fk_idCC;

		var urlimagen = '';
		var urllogo = '';
		 	if(imagen == 'null')
		 	{
		 		urlimagen = 'images/Store.png';
		 	}
		 	else
		 	{
		 		if(mall == 'null')
		 		{
		 			urlimagen = RutaRecursos + 'Logos/Locales/' + AEvento.id + '.jpg';
		 			urllogo = RutaRecursos + 'Logos/Locales/' + AEvento.fk_idStores + '.png';
		 		}
		 		else
		 		{
		 			urlimagen = RutaRecursos + 'Eventos/Malls/' + AEvento.id + '.jpg';
		 			urllogo = RutaRecursos + 'Logos/Malls/' + AEvento.fk_idCC + '.png';
		 		}
		 	}

		$("#LogoEventos").attr('src',urllogo);
		$("#NombreEvento").html(AEvento.nombre);
		$("#ImagenEventos").attr('src',urlimagen);
		$("#DescEvento").html("<p>"+AEvento.descripcion+"</p>");

		var AcordeonEventos = '<h3>Mas información</h3>';
		AcordeonEventos += '<div>';
        AcordeonEventos += '<h4>Lugar<h4>';
        AcordeonEventos += '<p>'+ AEvento.lugar +'</p><br/>';
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

	function CargarColecciones () 
	{
		var Mall = getCC();
		var estado = false;

		if(Mall == "" || Mall == undefined)
		{
			url = WebService + "Colections?$expand=Stores";
		}
		else
		{
			url = WebService + "Colections?$expand=Stores";
		}

		loadDataArray(url);
		var AColecc = arrayInfo;
		var htmlColec = '<ul>';

		$.each(AColecc.value, function(index, item) {
			 htmlColec += '<li class="listaTipo1"><a id="'+ item.id +'" href="#DetalleColecciones" data-transition="slide"><img src="'+ RutaRecursos + "Colecciones/Portadas/"+ item.id +'.jpg"/><div class="textolistaTipo1"><h3>'+ item.nombre +'</h3><p>'+ item.año +'</p><p>'+ item.Stores.nombre +'</p></div><div class="FlechaLocales">Ir</div></li>';
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
			url = WebService + "Gallery";
			//url = WebService + "Malls(guid'"+ Mall +"')/Gallery";
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

	function ConfigurarHeaders(Modulo, IdImage, idpagina){

		var mall = getCC();
		var Comercio = GetLocal();

		switch (Modulo)
		{
			case "Mall":

				var LogoMall = $(idpagina+" #LogoIndexMall");
				var HeaderMall = $(IdImage);

				LogoMall.attr("src","http://malltopic.azurewebsites.net/Images/Uploads/Icons/SplashMalls/Logosmall/"+ mall +".png")
				HeaderMall.attr("src",RutaRecursos+"Headers/HeadersMalls/"+ mall +".png");

				if(mall =="" || mall == undefined)
				{
					LogoMall.attr("style","display:none")
				}

				break;
			case "DetalleComercio":
				var HeaderComercio = $(IdImage);
				HeaderComercio.attr("src",RutaRecursos+"Headers/HeadersLocales/"+ Comercio +".png");
				break;
		}
	}

	function CargarInfoGeneral () {
		var Mall = getCC();
		url = WebService + "Malls(guid'"+ Mall +"')/";
		loadDataArray(url);
		var AMall = arrayInfo;
		var PaginaWeb = '"'+ AMall.web +'","_blank","location=yes"';

		var htmlMall = "<h2>"+ AMall.nombre +"</h2>";
		htmlMall += "<h3>Dirección</h3>";
		htmlMall += "<p>"+ AMall.direccion +"</p>";
		htmlMall += "<h3>Horario Atención</h3>";
		htmlMall += "<p>"+ AMall.horarios +"</p>";
		htmlMall += "<a href='tel:"+ AMall.telefono +"' class='btnLlamar'></a>";
		htmlMall += "<h3>Teléfono</h3>";
		htmlMall += "<p>"+ AMall.telefono +"</p>";
		//htmlMall += "<a href='#' class='btnVisitar' onclick='window.open("+ PaginaWeb +"); '></a>";
		htmlMall += "<h3>WebSite</h3>";
		htmlMall += "<p>"+ AMall.web +"</p>";

		$("#ContentInfoGeneral").html(htmlMall);



	}

	function OnChangedCiudad(select)
	{
		var Valor = select.value;
		setCiudad(Valor);
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

	function CargarSplashScreen() {
		setFiltroMalls('');
		var centro = getCC();
		var Imagensplash = '';
		var ImagenTempSplash;

		
		if(window.devicePixelRatio == 1)
		{
			ImagenTempSplash = RutaRecursos + 'BackgroundSplash/'+ centro +' - mdpi.jpg';
			Imagensplash = VerificarArchivo("SplashScreen",ImagenTempSplash,"mdpi");
		}
		else if(window.devicePixelRatio == 1.5)
		{
			ImagenTempSplash = RutaRecursos + 'BackgroundSplash/'+ centro +' - hdpi.jpg';
			Imagensplash = VerificarArchivo("SplashScreen",ImagenTempSplash,"hdpi");
		}
		else if(window.devicePixelRatio == 2)
		{
			ImagenTempSplash = RutaRecursos + 'BackgroundSplash/'+ centro +' - xhdpi.jpg';
			Imagensplash = VerificarArchivo("SplashScreen",ImagenTempSplash,"xhdpi");
		}
		else
		{
			ImagenTempSplash = RutaRecursos + 'BackgroundSplash/'+ centro +' - xhdpi.jpg';
			Imagensplash = VerificarArchivo("SplashScreen",ImagenTempSplash,"xhdpi");
		}



		$('#ImagenSplash').attr('src',Imagensplash);
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

	function CargarIndexMall() {
		var Mall = getCC();
		var url = WebService + "Malls(guid'"+ Mall +"')/"
		loadDataArray(url);
		var AMall = arrayInfo;

		$('#NumLocales').html(AMall.cantLocales);
		$('#NumEstaciona').html(AMall.cantParqueadero);
		$('#NumTelefono').html(AMall.telefono);

	}

	function ComprobarMasCercanos(IdMall) {
		var mc = getMasCercanos();
		var MallsMasCercanos = mc.split(';');
		var result = false;


		$.each(MallsMasCercanos, function(index, val) {
			 if(IdMall == val)
			 {
			 	result = true;
			 }
		});

		return result;
	}

	function CargarServicios() {
		var estado = false;
		var Mall = getCC();
		var url = WebService + "Malls(guid'"+ Mall +"')?$expand=services_detail";
		loadDataArray(url);
		var AServices_Detail = arrayInfo;
		var Html = '<p>Servicios Disponibles</p><ul>';

		$.each(AServices_Detail.services_detail, function(index, item) {
			url = WebService + "Services(guid'"+ item.fk_IdServicio +"')"
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



	/*Fin Funciones*/

	/* Control de Eventos */

	//Reinicio la variable del CC
	$( document ).on( "pageshow", "#Index", function() {
		ConfigurarHeadersModulos("Comercios");
		ConfigurarHeadersModulos("Promos");
		ConfigurarHeadersModulos("Eventos");
		ConfigurarHeadersModulos("Colecciones");
		ConfigurarHeadersModulos("Cines");
		setCC("");
		setFiltroMalls("");
		//CargarFooter("#Index");

	});

	/*Page Show Lista Centros Comerciales*/
	$( document ).on( "pageshow", "#ListaCC", function() {
		$.mobile.loading("show",{
		  text: "Cargando Centros Comerciales...",
		  textVisible: true,
		  theme: "b",
		  html: ""
		});

		setTimeout(function(){
			CargarSelect("#ListaCC");
			cargarListaCC();
			//CargarFooter("#ListaCC");
			$.mobile.loading("hide");
		}, 2000);	
	});	

	//Splash Screen Mall's
	$( document ).on( "pageshow", "#SplashScreen", function(){

		setTimeout(function() {
			CargarSelect("#IndexMall");
			ConfigurarHeaders("Mall","#HeaderIndexMall", "#IndexMall");
			CargarIndexMall();
			ConfigurarHeaders("Mall","#HeaderInfoGeneral", "#InfoGeneral");
			ConfigurarHeaders("Mall","#HeaderServicios", "#Servicios");
			ConfigurarHeaders("Mall","#HeaderGalerias", "#Galerias");
			ConfigurarHeadersModulos("Comercios");
			ConfigurarHeadersModulos("Promos");
			ConfigurarHeadersModulos("Eventos");
			ConfigurarHeadersModulos("Colecciones");
			ConfigurarHeadersModulos("Cines");
			$.mobile.changePage('#IndexMall','slide');
		}, 2000);

	});

	$( document ).on( "pageshow", "#IndexMall", function(){
		$.mobile.loading("show",{
		  text: "Cargando Centro Comercial...",
		  textVisible: true,
		  theme: "b",
		  html: ""
		});
		setTimeout(function(){
			$.mobile.loading("hide");
		}, 2000);

	});

	$( document ).on( "pageshow", "#InfoGeneral", function(){
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

	});

	//Cargo las categorias de los comercios del Index
	$( document ).on( "pageshow", "#ComerciosxCategorias", function() {
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
	});

	$( document ).on( "pageshow", "#ComerciosxCategoriasMall", function() {
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
	});

	//Cargo los locales del Index
	$( document ).on( "pageshow", "#ComerciosxLocales", function() {
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

	});

	$( document ).on( "pageshow", "#ComerciosxLocalesMall", function() {
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
			//CargarFooter("#ComerciosxLocalesMall");
			$.mobile.loading("hide");
		}, 2000);

	});

	$( document ).on( "pageshow", "#DetalleComercio", function() {
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
		

	});

	$(document).on("click","#btnGuardar",function(){
		var Nivel = $('#txtNivel');
		var Celda = $('#txtCelda');
		var Color = $('#btnColor');

		if(Nivel.val() == "" || Nivel.val() == undefined)
		{
			alert('Ingrese el Nivel o Piso');
		}
		else if(Celda.val() == "" || Celda.val() == undefined)
		{
			alert('Ingrese la Celda');
		}
		else
		{
			setNivel(Nivel.val());
			setCelda(Celda.val());
			Nivel.val("");
			Celda.val("");
			Color.attr("style","#fff");
			alert('Datos guardados con Exito');
		}
	});

	$(document).on("click","#btnMostrar",function(){
		var Nivel = getNivel();
		var Celda = getCelda();
		var Color = getColor();

		if(Nivel == "" || Nivel == undefined)
		{
			alert('No hay posicion guardada');
		}
		else if(Celda == "" || Celda == undefined)
		{
			alert('No hay posicion guardada');
		}
		else
		{
			var Posicion = "<h2>"+Nivel+" - "+Celda+"<h2>";
			$('#Lugar').html(Posicion);
			$('#MostrarColor').attr('style', 'background:' + Color + ' !important');
		}
	});

	$(document).on("click","#btnBorrar",function(){
		setNivel("");
		setCelda("");
		$('#Lugar').html('');
		$('#MostrarColor').attr('style', 'background: #fff !important');
		alert("Datos borrados");
	});

	$( document ).on( "pageshow", "#Promociones", function() {
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
		
	});

	$( document ).on( "pageshow", "#DetallePromos", function() {
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
		
	});

	$( document ).on( "pageshow", "#Eventos", function() {
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
		
	});

	$( document ).on( "pageshow", "#DetalleEventos", function() {
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
		
	});

	$( document ).on( "pageshow", "#Colecciones", function() {
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
		
	});

	$( document ).on( "pageshow", "#DetalleColecciones", function() {
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
		
	});

	$( document ).on( "pageshow", "#Servicios", function() {
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
		
	});

	$( document ).on( "pageshow", "#Galerias", function() {
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
		
	});

	$( document ).on( "pageshow", "#DetalleGalerias", function() {
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
		
	});

	$( document ).on( "pageshow", "#Cines", function() {
		
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
		
	});

	$( document ).on( "pageshow", "#DetalleMovie", function() {
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
		
	});
	


