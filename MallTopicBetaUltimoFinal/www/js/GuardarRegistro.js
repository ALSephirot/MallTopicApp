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

	InsertObject('regis_user', DatosUsuario);
}