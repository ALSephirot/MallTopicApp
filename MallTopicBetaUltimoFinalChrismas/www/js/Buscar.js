var valorselectbuscar = '*';

function Buscar() {

	$.mobile.loading("show",{
		  text: "Buscando...",
		  textVisible: true,
		  theme: "b",
		  html: ""
		});

	setTimeout(function(){
		try
		{
			var buscar = $("#NomComercio #NombreComercioBuscar").val();
			var textoBuscar;
			textoBuscar = buscar;
					

			var Parametro = valorselectbuscar;
			var url;

			if(Parametro == "*")
			{
				if(textoBuscar == "")
				{
					alert('Escoje un filtro y/o llene el campo "Busqueda" para realizar la busqueda.');
					return;
				}
				else
				{
					
					//url = WebService + "Stores?$filter=startswith(nombre, '"+ textoBuscar +"') or endswith(nombre, '"+ textoBuscar +"')&$orderby=fk_idCC,nombre";
				}	url = WebService + "GetStoresxCategories?IdMall=''&IdCategory=''&PNombre='"+ textoBuscar +"'";
			}
			else
			{
				if(textoBuscar == "")
				{
					//url = WebService + "Stores?$filter=fk_idActividadComercial eq (guid'"+ Parametro +"')&$orderby=fk_idCC,nombre";	
					url = WebService + "GetStoresxCategories?IdMall=''&IdCategory='"+ Parametro +"'&PNombre=''";	
				}
				else
				{
					//url = WebService + "Stores?$filter=startswith(nombre, '"+ textoBuscar +"') or endswith(nombre, '"+ textoBuscar +"') and fk_idActividadComercial eq (guid'"+ Parametro +"')&$orderby=fk_idCC,nombre";
					url = WebService + "GetStoresxCategories?IdMall=''&IdCategory='"+ Parametro +"'&PNombre='"+ textoBuscar +"'";
				}
			}

			loadDataArray(url);
			var ArrayLocalesBuscar = arrayInfo;
			var htmls;
			var estado = false;
			setStoresBuscar(ArrayLocalesBuscar);

			htmls = '<ul id="ListaLocales">';

			//Variables de Control Lazy Load
			setLLControl(0);
			var IndexIni = getLLControl();
			var IndexFin = IndexIni + CantItemLazyLoad;
			setLLControl(IndexFin + 1);

			$.each(ArrayLocalesBuscar.value,function(index, item) {
				  
				if(index >= IndexIni && index <= IndexFin)
				{

					var logotemp = RutaRecursos + "Logos/Locales/"+ item.id + ".png";
					var LogoFinal = VerificarArchivo("LogosTiendas",logotemp,"");

					htmls += '<li class="listaTipo1"><a id="'+item.id+'"  href="#DetalleComercio" data-transition="slide"  ><img src="'+ LogoFinal +'" /><div class="textolistaTipo1"><h3>' + item.nombre+ '</h3><p>Local: '+item.numLocal+' - Tel: ' + item.telefono +'</p><p>'+ item.nombreMall +'</p><p>'+ item.NombreCategoria +'</p></div><div class="FlechaLocales">Ir</div></a></li>';							
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
			});

			if(estado==false){
			
				htmls += '<li>No se encontraron locales comerciales</li>';

			}
			
			htmls += '</ul>';

			$("#NomComercio #NombreComercio").val('');
			var contenedor = $("div.contenedor div#ContenedorResultado");
			contenedor.html(htmls);
			console.log(contenedor);


		}
		catch (err)
		{
			//alert(err);
		}	
		
		$.mobile.loading("hide");
	}, 2000);	
}

function LlenarSelectsBuscar() {
	try
	{
		var url = WebService + "Categories";
		loadDataArray(url);
		var ACategorias = arrayInfo;
		ACatego = arrayInfo;
		var selectbuscar = '<option value="*">Todas las Categorias</option>';

		if(ACategorias != undefined || ACategorias != '' || ACategorias != 'null')
		{
			$.each(ACategorias.value, function(index, item) {
				selectbuscar += '<option value="'+ item.id +'">'+ item.nombre +'</option>';
			});
		}
			

		selectbuscar += '';
		$('[name="escogerCat"]').html(selectbuscar);
	}
	catch(err)
	{
		//alert(err);
	}		
}

function ParametroBusqueda(select) {
	try
	{
		valorselectbuscar = select.value;
	}
	catch(err)
	{
		//alert(err);
	}

	
	
}

function limpiarTodo()
	{
        $("#NombreComercioBuscar").val("");
		$("#ContenedorResultado" ).empty();
    }

$(document).ready(function() {
	$("#ContenedorResultado").bind('scrollstop', function() {
		var locales = getStoresBuscar();
		var IndexIni = getLLControl();
		var IndexFin = IndexIni + CantItemLazyLoad;
		setLLControl(IndexFin + 1);
		var htmls = '';
		var LengthArray = locales.value.length;

		if(IndexIni <= LengthArray)
		{
			//recorre y muestra todos los locales consultados
			$.each(locales.value, function(index, item) {

				if(index >= IndexIni && index <= IndexFin)
				{
					var logotemp = RutaRecursos + "Logos/Locales/"+ item.id + ".png";
					var LogoFinal = VerificarArchivo("LogosTiendas",logotemp,"");

					htmls += '<li class="listaTipo1"><a id="'+item.id+'"  href="#DetalleComercio" data-transition="slide"  ><img src="'+ LogoFinal +'" /><div class="textolistaTipo1"><h3>' + item.nombre+ '</h3><p>Local: '+item.numLocal+' - Tel: ' + item.telefono +'</p><p>'+ item.nombreMall +'</p><p>'+ item.NombreCategoria +'</p></div><div class="FlechaLocales">Ir</div></a></li>';							
					estado=true;
				}
			});
			
			var contenedor = $("div.contenedor div#ContenedorResultado ul#ListaLocales");		
			contenedor.append(htmls);
		}
	});
});