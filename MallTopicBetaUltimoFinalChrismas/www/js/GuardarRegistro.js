function GuardarDatosUsuario(red, InfoUser) {

    if(red == 'facebook')
	{
	  	DatosUsuario = {
	    	idFacebook: InfoUser.id,
	    	nombres: InfoUser.first_name,
	    	apellidos: InfoUser.last_name,
	    	cine: false,
	    	calzado: false,
	    	moda: false,
	    	tecnologia: false,
	    	gastronomia: false,
	    	fecha_de_nacimiento: InfoUser.birthday,
	    	email: InfoUser.email,
	    	turismo:false,
	    	idtwitter: '',
	    	usertwitter: '',
	    	UserFacebook: InfoUser.username,
	    	idcelular: localStorage.getItem("IdCelular")
		    	
	    };
	}
	else if(red == "Registro")
	{
		DatosUsuario = {
	    	idFacebook: InfoUser.id,
	    	nombres: InfoUser.first_name,
	    	apellidos: InfoUser.last_name,
	    	cine: false,
	    	calzado: false,
	    	moda: false,
	    	tecnologia: false,
	    	gastronomia: false,
	    	fecha_de_nacimiento: null,
	    	email: '',
	    	turismo:false,
	    	idtwitter: '',
	    	usertwitter: '',
	    	UserFacebook: InfoUser.username
		    	
	    };
	}

	InsertRegis('regis_users', DatosUsuario);
}

function InsertRegis(tabla, object)
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
            TablaInsert.insert(object).then(RegistroCorrecto, HandleError);
        }
        
    }
    
}

function InsertData(tabla, object)
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
            TablaInsert.insert(object).then(SaveSucess, SaveError);
        }
        
    }
    
}

function HandleError(error) {
    var text = error + (error.request ? ' - ' + error.request.status : '');
    //alert(text);
}
function SaveSucess()
{
	console.log("Guardado correctamente!");
	//alert("Guardado correctamente!");
}

function SaveError(err)
{
	var text = error + (error.request ? ' - ' + error.request.status : '');
	console.log(text);
	//alert(text);
}

function RegistroCorrecto() {
	alert('Tus datos han sido guardados correctamente.');
	$.mobile.changePage('#registro2','slide');
}

function captura(){
	var notifi = $("#Notificaciones");
	var terminos = $("#Terminos");

	if(terminos.is(':checked'))
	{
		var hijos = $("#ContentRegistro").children('input');
		var DatosUsuarioManual = {

		    	nombres: $(hijos[0]).val(),
		    	alias: $(hijos[1]).val(),
				telefono: $(hijos[2]).val(),
				edad: $(hijos[3]).val(),
				//fecha_de_nacimiento: $(hijos[4]).val(),
				email: $(hijos[4]).val(),
				pais: $(hijos[5]).val(),
				ciudad: $(hijos[6]).val(),
				//Gustos
				cines: ValidarGustos("Cines"),
				eventos:ValidarGustos("Eventos"),
				promos:ValidarGustos("Promos"),
				comidas:ValidarGustos("Comidas"),
				tecnologia:ValidarGustos("Tecnología"),
				deportes:ValidarGustos("Deportes"),
				arte:ValidarGustos("Arte"),
				musica:ValidarGustos("Música"),
				turismo:ValidarGustos("Turismo"),
				idcelular: localStorage.getItem("IdCelular"),
				notificaciones: notifi.is(':checked')
		    };

		    InsertRegis('regis_users', DatosUsuarioManual);
	}
	else
	{
		alert('Debes de aceptar los Términos y Condiciones.');
	}
}


function ValidarGustos(gusto){
	var check = $("input[type=checkbox]:checked");
	var resultado = false;
	$.each(check,function(index,item) {
		var AGusto = $(item).attr("data-gusto");
		if(AGusto == gusto)
		{
			resultado = true;
		}
	});

	return resultado;

}


function Solo_Numerico(variable){
			Numer=parseInt(variable);
			if (isNaN(Numer)){
			return "";
			}
			return Numer;
			}
			function ValNumero(Control){
			Control.value=Solo_Numerico(Control.value);
			}

