function CargarCategorias(idpaginacontent)
{
	var html='';		
	$('.removec').empty();
	var count;
	var ActividadControl = '';
	var IndexControl = getIndexControl();
	var estado = false;
	var mall = getCC();
	mall = mall.toUpperCase();

	if(mall == '6B05F88A-4E02-48E6-AA0D-1EB1432737A3')
	{
		url= WebService + "Malls(guid'"+ mall +"')/Categories?$select= id,nombre,icono,descripcion,especial,fk_idCC&$orderby=descripcion";					
	}
	else
	{
		url= WebService + "Categories?$select= id,nombre,icono,descripcion,especial,fk_idCC&$orderby=descripcion";				
	}
		
	loadDataArray(url);
	var Categorias= arrayInfo

	//Pinto el Unordered List
	var htmlList = '<p>Categorias Generales</p>';
	var htmlCatEspe = '<p>Categorias Especiales</p>';
	var htmlMovicentro = '<p>Categorias Movicentro</p>';
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
			var mallfk = item.fk_idCC;

			if(mallfk != null)
			{
				mallfk = mallfk.toUpperCase();
			}
					

			if(mall == "" || mall == undefined)
			{
				if(item.especial)
				{
					
					if(mallfk == '6B05F88A-4E02-48E6-AA0D-1EB1432737A3')
					{
						ActividadCiclo = item.fk_idActividadComercial;
	
						htmlMovicentro += '<div class="iconos3"><a id="'+ item.id +'" href="'+ LinkLocal +'" data-transition="slide" style="display : inline-block; background: url('+ RutaRecursos + 'Categorias/'+ item.id +'.png);background-size : 100%;width: 100%;height: 100%"></a><p>'+ item.nombre +'</p></div>';
			            ActividadControl = item.id;
			            estado = true;

					}
					else
					{
						ActividadCiclo = item.fk_idActividadComercial;

						htmlCatEspe += '<div class="iconos3"><a id="'+ item.id +'" href="'+ LinkLocal +'" data-transition="slide" style="display : inline-block; background: url('+ RutaRecursos + 'Categorias/'+ item.id +'.png);background-size : 100%;width: 100%;height: 100%"></a><p>'+ item.nombre +'</p></div>';
			            ActividadControl = item.id;
			            estado = true;
					}
							
				}
				else			
				{
					ActividadCiclo = item.fk_idActividadComercial;

					htmlList += '<div class="iconos3"><a id="'+ item.id +'" href="'+ LinkLocal +'" data-transition="slide" style="display : inline-block; background: url('+ RutaRecursos + 'Categorias/'+ item.id +'.png);background-size : 100%;width: 100%;height: 100%"></a><p>'+ item.nombre +'</p></div>';
				    ActividadControl = item.id;
				    estado = true;

				}

			}
			else
			{
				if(item.especial)
				{
					if(mallfk == mall)
					{
						ActividadCiclo = item.fk_idActividadComercial;
						htmlList += '<div class="iconos3"><a id="'+ item.id +'" href="'+ LinkLocal +'" data-transition="slide" style="display : inline-block; background: url('+ RutaRecursos + 'Categorias/'+ item.id +'.png);background-size : 100%;width: 100%;height: 100%"></a><p>'+ item.nombre +'</p></div>';
				        ActividadControl = item.id;
				        estado = true;
					}
				}
				else
				{
					if(mall == 'F7180CC5-01EB-4D59-9369-A531EC05BEFC')
					{
						var idcatego = item.id;
						idcatego = idcatego.toUpperCase();
						if(idcatego == '8B4515F7-EF51-4CF5-B18D-F8FC8B9B1E34' || idcatego == '80D49C63-6884-4659-AE8D-C7E649CDE171' || idcatego == '8F009501-56B5-4A96-B504-66736952F0C9')
						{
									//alert('Hola' + item.nombre)
						}
						else
						{
							ActividadCiclo = item.fk_idActividadComercial;
							htmlList += '<div class="iconos3"><a id="'+ item.id +'" href="'+ LinkLocal +'" data-transition="slide" style="display : inline-block; background: url('+ RutaRecursos + 'Categorias/'+ item.id +'.png);background-size : 100%;width: 100%;height: 100%"></a><p>'+ item.nombre +'</p></div>';
					        ActividadControl = item.id;
					        estado = true;
						}
					}
					else
					{
						ActividadCiclo = item.fk_idActividadComercial;
						htmlList += '<div class="iconos3"><a id="'+ item.id +'" href="'+ LinkLocal +'" data-transition="slide" style="display : inline-block; background: url('+ RutaRecursos + 'Categorias/'+ item.id +'.png);background-size : 100%;width: 100%;height: 100%"></a><p>'+ item.nombre +'</p></div>';
				        ActividadControl = item.id;
				        estado = true;
					}
				}
			}
		}
	});

	if(estado==false)
	{
		htmlList = '<div>No se encontraron Categorias</div>';
	}

	$(idpaginacontent + ' #ContentCate').html('');
	$(idpaginacontent + ' #ContentCate').html(htmlList);

	$(idpaginacontent + ' #ContentCateEsp').html('');
	$(idpaginacontent + ' #ContentCateEsp').html(htmlCatEspe);

	$(idpaginacontent + ' #ContentCateMovi').html('');
	$(idpaginacontent + ' #ContentCateMovi').html(htmlMovicentro);

	if(mall =="" || mall == undefined)
	{
		$(idpaginacontent + ' #ContentCateEsp').attr('style', 'display:inline-block;');
	}
	else
	{
		$(idpaginacontent + ' #ContentCateEsp').attr('style', 'display:none;');
	}

	setIndexControl(IndexControl +1);
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
				//url= WebService + "StoresXCategories?$filter=fk_idCategory eq (guid'"+ idcate +"')&$expand=Stores";	
				url= WebService + "GetStoresxCategories?IdMall=''&IdCategory='"+ idcate +"'&PNombre=''";	
			}
			else
			{
				//url= WebService + "Malls(guid'"+ MallFiltro +"')/Stores?$filter=(fk_idActividadComercial)eq(guid'"+idcate+"')&$orderby=fk_idCC,nombre";
				//url= WebService + "StoresXCategories?$filter=fk_idCategory eq (guid'"+ idcate +"')&$expand=Stores";
				url= WebService + "GetStoresxCategories?IdMall='"+ MallFiltro +"'&IdCategory='"+ idcate +"'&PNombre=''";
			}
		}
		else
		{
			if(MallFiltro == "" || MallFiltro == undefined)
			{
				url= WebService + "Stores?$orderby=fk_idCC,nombre";
			}
			else
			{
				//url= WebService + "Malls(guid'"+ MallFiltro +"')/Stores?$orderby=fk_idCC,nombre";
				url= WebService + "GetStoresxCategories?IdMall='"+ MallFiltro +"'&IdCategory=''&PNombre=''";
			}
		}
	}
	else
	{
		if (idcate != "") 
		{
			//url= WebService + "Malls(guid'"+Mall+"')/Stores?$filter=(fk_idActividadComercial)eq(guid'"+idcate+"')&$orderby=fk_idCC,nombre";
			//url= WebService + "StoresXCategories?$filter=fk_idCategory eq (guid'"+ idcate +"')&$expand=Stores";//"Categories(guid'"+ idcate +"')?$expand=StoresXCategories";
			url= WebService + "GetStoresxCategories?IdMall='"+ Mall +"'&IdCategory='"+ idcate +"'&PNombre=''";
		}
		else
		{
			//url= WebService + "Malls(guid'"+Mall+"')/Stores?$orderby=fk_idCC,nombre";
			url= WebService + "GetStoresxCategories?IdMall='"+ Mall +"'&IdCategory=''&PNombre=''";
		}
	}
			

	var estado=false;
	var LocalesBuscar = getLocalesBuscar();
	var locales;
	var localestemp;

	//Consulta todos los locales pertenecientes a una ciudad
	loadDataArray(url);

	if(idcate != "")
	{
		var TempLocal = arrayInfo.value;

		/*$.each(arrayInfo.value,function (index,item) {
			TempLocal[index] = item.Stores;
		})*/
		

		if(Mall == "" || Mall == undefined)
		{
			if(MallFiltro != "")
			{
				TempLocal = $.grep(TempLocal, function (n, i) {
		            return n.fk_idCC == MallFiltro;
		        });
			}
		}
		else
		{
			TempLocal = $.grep(TempLocal, function (n, i) {
	            return n.fk_idCC == Mall;
	        });

	        TempLocal.sort(function(a,b) {
				if(a.nombre < b.nombre) return -1;
				if(a.nombre > b.nombre) return 1;
				return 0;
			});
		}

		locales = TempLocal;
		localestemp = locales;
	}
	else
	{
		locales=arrayInfo;
		localestemp = locales.value;
	}
	

	var MasCercanos = getMasCercanos();
	var ALocalesFinal = new Array();
	var DistanciaAsignada = false;

	/*html+='<div class="ui-grid-a botones"><div class="ui-block-a"><a data-rel="back" data-role="button" data-icon="arrow-l" data-iconpos="notext" data-mini="true" data-inline="true" class="left"></a></div></div>';
	html+='<div class="titulo centrar"><p>Selecciona tu Local Comercial</p></div>';
	html+='<div  class="contenido-1"><ul id="ListaLoc" data-role="listview" data-inset="true" data-theme="i">';*/

	

	$.each(localestemp, function(index, item) {
		var atemp = localestemp[index];
		var atemp2 = new Array();

		atemp2['id'] = atemp['id'];
		atemp2['fk_idCC'] = atemp['fk_idCC'];
		atemp2['nombre'] = atemp['nombre'];
		atemp2['numLocal'] = atemp['numLocal'];
		atemp2['telefono'] = atemp['telefono'];
		atemp2['nombreMall'] = atemp['nombreMall'];

		$.each(MasCercanos, function(index, item2) {
			if(!DistanciaAsignada)
			{
				if(item.fk_idCC == item2.idmall)
				{
					atemp2['distancia'] = item2.distancia;
					DistanciaAsignada = true;
				}
				else
				{
					atemp2['distancia'] = 0;
				}
			}				
		});

		ALocalesFinal[index] = atemp2;
		DistanciaAsignada = false;
	});

	ALocalesFinal.sort(function(a,b) {
		if(a.distancia < b.distancia) return -1;
		if(a.distancia > b.distancia) return 1;
		return 0;
	});

	setGlovalALocales(ALocalesFinal);

	html = '<ul id="ListaLocales">';

	//Variables de Control Lazy Load
	setLLControl(0);
	var IndexIni = getLLControl();
	var IndexFin = IndexIni + CantItemLazyLoad;
	setLLControl(IndexFin + 1);


	//recorre y muestra todos los locales consultados
	$.each(ALocalesFinal, function(index, item) {

		if(index >= IndexIni && index <= IndexFin)
		{
			if(Mall == "" || Mall == undefined)
			{
				if(ComprobarMasCercanos(item.fk_idCC, index, ALocalesFinal.length))
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

			if(index == IndexFin)
			{
				if(!estado)
				{
					IndexIni = getLLControl();
					IndexFin = IndexIni + CantItemLazyLoad;
					setLLControl(IndexFin + 1);
				}
			}
		}
	});

	if(estado==false){

		if(Mall == "" || Mall == undefined)
		{
			alert('No se encontraron Tiendas  cerca de  usted, por favor diríjase al Home  y seleccione  el botón Malls.');
			html += '<li>No se encontraron locales comerciales</li>';
		}
		else
		{
			html += '<li>No se encontraron locales comerciales</li>';
		}			
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

function CargarDetalleLoc()
{
	//Capturo el id del local seleccionado
	var Comercio = GetLocal();

	//Consulto la info de ese local
	url = WebService + "Stores(guid'"+ Comercio +"')/";
	loadDataArray(url);
	var ArrayComercios = arrayInfo;

	//Configuro el Header
	ConfigurarHeaders("DetalleComercio","#HeaderDetalleComercio", "#DetelleComercio", ArrayComercios.fk_idCC);

	//Cambio el nombre
	$("#Encabezado h2").html(ArrayComercios.nombre)

	//Lleno los botones de llamar y el local
	var Botones = '<a href="tel:034'+ ArrayComercios.telefono +'" class="btnDetalles"><div class="telephone"></div><p>Llamar</p></a>';
	Botones += '<div class="btnDetalles"><h3>'+ ArrayComercios.numLocal +'</h3><p>Local</p></div>';
	$("#ContentBotonesDetComer").html(Botones);

	//Lleno el acordeon
	//Info general del local

	var Acordeon ="<h3>Información General</h3><div><p>";

	Acordeon += "<h3>Horario Atención</h3><br/>";
	Acordeon += "<h5>Lunes a Viernes</h3>";
	Acordeon += "<p>"+ ArrayComercios.H_lunes_a_viernes +"</p><br/>";

	if(ArrayComercios.H_sabado != "")
	{
		Acordeon += "<h5>Sábados</h3>";
		Acordeon += "<p>"+ ArrayComercios.H_sabado +"</p><br/>";
	}
	
	if(ArrayComercios.H_domingos_y_festivos != "")
	{
		Acordeon += "<h5>Domingos y Festivos</h3>";
		Acordeon += "<p>"+ ArrayComercios.H_domingos_y_festivos +"</p><br/>";
	}

	
	Acordeon += "<h3>Ubicación</h3>";
	Acordeon += "<p>"+ArrayComercios.ubicacion+" - Local:"+ ArrayComercios.numLocal +"</p>";
	Acordeon += "<h3>Teléfono</h3>";
	Acordeon += "<p>"+ ArrayComercios.telefono +"</p>";
	Acordeon +="<h3>Descripcion</h3>";
	Acordeon += "<p>"+ ArrayComercios.descripcion +"</p>";
		


	Acordeon += "</p></div>";

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

	//Productos
	url = WebService + "Stores(guid'"+ Comercio +"')/Products";
	loadDataArray(url);
	var AProductos = arrayInfo;
	Acordeon += "<h3>Productos/Servicios</h3><div><ul>";
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

	Acordeon += "</ul></div>";

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

	$("#AcordeonLocales").html(Acordeon);
	$("#AcordeonLocales").accordion({collapsible: true});
	$( "#AcordeonLocales" ).accordion( "refresh" );


	$('#lf').attr("onclick","InAppBrowserOpen('"+ ArrayComercios.Facebook +"')");
	$('#lt').attr("onclick","InAppBrowserOpen('"+ ArrayComercios.Twitter +"')");
	$('#li').attr("onclick","InAppBrowserOpen('"+ ArrayComercios.Instagram+"')");
	$('#ly').attr("onclick","InAppBrowserOpen('"+ ArrayComercios.youtube+"')");


}
