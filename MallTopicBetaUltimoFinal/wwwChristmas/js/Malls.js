function CargarAMalls() {
	var url = WebService + "Cities(guid'"+getCiudad()+"')/Malls?$filter=(publicar)eq(true)&$orderby=orden&$expand=transport";
	loadDataArray(url);
	setGlovalAMalls(arrayInfo);
	console.log(arrayInfo);
}

window.cargarListaCC=cargarListaCC;
function cargarListaCC(){

	var html='';
	console.log("cargandoListaCC..");
	var estado=false;

	//Consulta todos los locales pertenecientes a una ciudad
	var malls= getGlovalAMalls();

	html = '<ul>';

	//recorre y muestra todos los locales consultados
	$.each(malls.value, function(index, item){
		html += '<li class="Mall"><a id="'+item.id+'" href="#SplashScreen" data-transition="slide" onclick="setCC("'+ item.id +'")" data-veri="CentrosComerciales"><img src="'+ RutaRecursos +'Logos/Malls/'+item.id+'.png" class="logoMall"/><div class="textoMall"><h3>' + item.nombre+ '</h3><p>'+item.descripcion+'</p></div><div class="flechaAzul">Ir</div></a></li>';
		estado=true;
	});

	if(!estado)
	{
		html += '<li>No se encontraron centros comerciales</li>';
	}
		
	html+='</ul>';
	$('#ContentListCC').html(html);
	$('#ContentListCC').trigger('create');
}

function CargarIndexMall() {

	var Mall = getCC();
	Mall = Mall.toUpperCase();
	var botoncines = "";
	var botongalerias = "";
	var url = WebService + "Malls(guid'"+ Mall +"')/";
	loadDataArray(url);
	var AMall = arrayInfo;

	$('#NumLocales').html(AMall.cantLocales);
	$('#NumEstaciona').html(AMall.cantParqueadero);
	$('#NumTelefono').html(AMall.telefono);
	var idserviciosprofe = "'FD62AD02-B232-49E4-ABF6-A79EFBA7B117'";

	if(Mall == "F7180CC5-01EB-4D59-9369-A531EC05BEFC")
	{
		botoncines = '<a href="#DetalleGym" class="iconoGym" data-transition="slide"></a>' +
                     '<p>C.A.F</p>';

        botongalerias = '<a href="#Galerias" class="iconoGalerias" data-transition="slide"></a>' +
        				'<p>Galerias</p>';

        $('#NomNumEstacionamientos').html('Zonas de Comidas');
	}
	else if(Mall == "1F636102-5E7F-4499-82EF-671AFF387710")
	{
		botoncines = '<a href="#ComerciosxLocalesMall" class="iconoSP" data-transition="slide" onclick="setCate('+ idserviciosprofe +')"></a>' +
                     '<p>Servicios Profesionales</p>';

        botongalerias = '<a href="#Galerias" class="iconoGalerias" data-transition="slide"></a>' +
            				'<p>Galerias</p>';
        $('#NomNumEstacionamientos').html('Estacionamientos');
	}
	else if(Mall == "6B05F88A-4E02-48E6-AA0D-1EB1432737A3")
	{
		botoncines = '<a href="#PilasPues" class="iconoPilasPs" data-transition="slide"></a>' +
                     '<p>Pilas Ps</p>';

        botongalerias = '<a href="#Galerias" class="iconoGalerias" data-transition="slide"></a>' +
          				'<p>Galerias</p>';

        $('#NomNumEstacionamientos').html('Estacionamientos');
	}
	else if(Mall == "970E3BEA-7441-4B40-9CE6-C89644C50457")
	{
		botoncines = '<a href="#Cines" class="iconoCines" data-transition="slide"></a>' +
                     '<p>Cinépolis</p>';

        botongalerias = '<a href="#DetalleBody" class="iconoBodytech" data-transition="slide"></a>' +
          				'<p>Bodytech</p>';

        $('#NomNumEstacionamientos').html('Estacionamientos');
	}
	else
	{
		botoncines = '<a href="#Cines" class="iconoCines" data-transition="slide"></a>' +
                     '<p>Cines</p>';

        $('#NomNumEstacionamientos').html('Estacionamientos');

        botongalerias = '<a href="#Galerias" class="iconoGalerias" data-transition="slide"></a>' +
          				'<p>Galerias</p>';
	}


	$('#IconoEspecial').html(botoncines);
	$('#IconoEspecial2').html(botongalerias);
	
	if (AMall.facebook  )  
	{
		$('#LinkFacebookMall').attr("onclick","InAppBrowserOpen('"+ AMall.facebook +"')");
	}else{
		$('#LinkFacebookMall').attr("onclick","InAppBrowserOpen('http://www.malltopic.com/errorApp/')");
	}
	if(AMall.twitter)
	{
		$('#LinkTwitterMall').attr("onclick","InAppBrowserOpen('"+ AMall.twitter +"')");
	}else{
		$('#LinkTwitterMall').attr("onclick","InAppBrowserOpen('http://www.malltopic.com/errorApp/')");
	}
	if (AMall.youtube ) 
		{
		$('#LinkInstagramMall').attr("onclick","InAppBrowserOpen('"+ AMall.youtube +"')");	
	}else
	{
		$('#LinkInstagramMall').attr("onclick","InAppBrowserOpen('http://www.malltopic.com/errorApp/')");
	}
	if (AMall.Instagram ) 
	{
		$('#LinkYoutubeMall').attr("onclick","InAppBrowserOpen('"+ AMall.Instagram +"')");
	}else
	{
		$('#LinkYoutubeMall').attr("onclick","InAppBrowserOpen('http://www.malltopic.com/errorApp/')");
	}

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

function CargarInfoGeneral () {
	var Mall = getCC();
	url = WebService + "Malls(guid'"+ Mall +"')?$expand=Cities";
	loadDataArray(url);
	var AMall = arrayInfo;
	var web = "'"+ AMall.web +"'";
	var htmlMall = "<h2>"+ AMall.nombre +"</h2>";
	htmlMall += "<h3>Dirección</h3>";
	htmlMall += "<p>"+ AMall.direccion +"</p>";
	htmlMall += "<h3>Horario de Atención</h3>";
	htmlMall += "<p>"+ AMall.horarios +"</p>";
	htmlMall += "<a href='tel:03"+AMall.Cities.Indicativo + AMall.telefono +"' class='btnLlamar'></a>";
	htmlMall += "<h3>Teléfono</h3>";
	htmlMall += "<p>("+ AMall.Cities.Indicativo +") "+ AMall.telefono +"</p>";
	htmlMall += '<a href="#" class="btnVisitar" onclick="InAppBrowserOpen('+ web +'); "></a>';
	htmlMall += "<h3>WebSite</h3>";
	htmlMall += "<p>"+ AMall.web +"</p>";

	$("#ContentInfoGeneral").html(htmlMall);

	if (AMall.facebook)
			 {
			 	$('#facebookinfogeneral').attr("onclick","InAppBrowserOpen('"+ AMall.facebook +"')");
			 }else
			 {
			 	$('#facebookinfogeneral').attr("onclick","InAppBrowserOpen('http://www.malltopic.com/errorApp/')");
			 }
			 if (AMall.twitter) 
			 	{
			 		$('#twitterinforgeneral').attr("onclick","InAppBrowserOpen('"+ AMall.twitter +"')");
			 	}else
			 	{
			 		$('#twitterinforgeneral').attr("onclick","InAppBrowserOpen('http://www.malltopic.com/errorApp/')");
			 	}
			 	if (AMall.youtube) 
			 	{
					$('#youtubeinfogeneral').attr("onclick","InAppBrowserOpen('"+ AMall.youtube +"')"); 		
			 	}else
			 	{
		 			$('#youtubeinfogeneral').attr("onclick","InAppBrowserOpen('http://www.malltopic.com/errorApp/')");
			 	}
			 	if (AMall.Instagram) 
			 	{
					$('#instagrraminfogeneral').attr("onclick","InAppBrowserOpen('"+ AMall.Instagram +"')");
			 	}
			 	else
			 	{
			 		$('#instagrraminfogeneral').attr("onclick","InAppBrowserOpen('http://www.malltopic.com/errorApp/')");	
			 	}

}

//Funcion que carga el select de filtro de mall de forma variable. 
//Recibe el el id del Section en el que se quiere mostrar
//Solo se muestra en las opciones desde el index.
window.CargarSelectMalls = CargarSelectMalls;
function CargarSelectMalls(idpaginacontenedor)
{
	var VarMall = getCC();
	var Malls = getMasCercanos();
	var FiltroMalls = getFiltroMalls();

	if(VarMall == "" || VarMall == undefined)
	{ 

		var htmlSelect =  '<div class="arrow"></div>' +
							'<select id="cuadroSel" class="Filtro1" data-native-menu="false" onchange="AplicarFiltroMalls(this)" data-pagina="'+ idpaginacontenedor +'">';

		if(FiltroMalls== "" || FiltroMalls == undefined)
		{
			htmlSelect += "<option value='' selected='selected'>Mas Cercanos</option>";	
		}
		else
		{
			htmlSelect += "<option value=''>Mas Cercanos</option>";
		}
			

		$.each(Malls, function(index, item) {
			
			if (item.id == FiltroMalls)
			{
				htmlSelect += "<option value='"+ item.idmall +"' selected='selected'>"+ item.nombre +"</option>";
			} 
			else
			{
				htmlSelect += "<option value='"+ item.idmall +"'>"+ item.nombre +"</option>";
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

/*Page Show Lista Centros Comerciales*/
$( document ).on( "pageshow", "#ListaCC", function() {
	var Cargar = getCargarInfo();

	if(Cargar)
	{
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
	}
	else
	{
		setCargarInfo(true);
	}
});

//Splash Screen Mall's
$( document ).on( "pageshow", "#SplashScreen", function(){

	setTimeout(function() {
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
	}, 2000);

});

$( document ).on( "pageshow", "#IndexMall", function(){
	var Cargar = getCargarInfo();

	if(Cargar)
	{
		$.mobile.loading("show",{
			text: "Cargando Centro Comercial...",
			textVisible: true,
			theme: "b",
			html: ""
		});

		setTimeout(function(){
			$.mobile.loading("hide");
		}, 2000);
	}
	else
	{
		setCargarInfo(true);
	}
});