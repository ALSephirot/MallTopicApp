

$(document).on("click","#btnGuardar",function(){
	var parking = {
		Nivel:"",
		Celda:"",
		Color:""
	}
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
		parking.Nivel = Nivel.val();
		parking.Celda = Celda.val();
		parking.Color = getColor();
		var stringParking = JSON.stringify(parking);
		localStorage.setItem('EParking',stringParking);
		Nivel.val("");
		Celda.val("");
		Color.attr("style","#fff");
		alert('Datos guardados con Exito');
	}
});

$(document).on("click","#btnMostrar",function(){

	var sparking = localStorage.getItem('EParking');
	var parking = JSON.parse(sparking);
	if(parking != null)
	{
		var Nivel = parking.Nivel;
		var Celda = parking.Celda;
		var Color = parking.Color;

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
	}
	else
	{
		alert('No hay posicion guardada');
	}
	
});

$(document).on("click","#btnBorrar",function(){
	var parking = {
		Nivel:"",
		Celda:"",
		Color:""
	}
	parking.Nivel = "";
	parking.Celda = "";
	parking.Color = "";
	var stringParking = JSON.stringify(parking);
	localStorage.setItem('EParking',stringParking);
	setNivel("");
	setCelda("");
	$('#Lugar').html('');
	$('#MostrarColor').attr('style', 'background: #fff !important');
	alert("Datos borrados");
});