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
	    	UserFacebook: InfoUser.username
		    	
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

	InsertRegis('regis_user', DatosUsuario);
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

function HandleError(error) {
    var text = error + (error.request ? ' - ' + error.request.status : '');
    alert(text);
}

function RegistroCorrecto() {
	alert('Tu favorito ha sido guardado correctamente.');
}
