var client = new WindowsAzure.MobileServiceClient("https://actividadservice.azure-mobile.net/","sLoJhypFhkyneeSyoebbAEUHcnsMRr37");

  window.fbAsyncInit = function() {
    FB.init({
      appId: "1476431165907073",
      nativeInterface: CDV.FB,
      useCachedDialogs: false
    });
    
    
	FB.Event.subscribe('auth.authResponseChange', function(response) 
	{
 	 if (response.status === 'connected') 
  	{
  		document.getElementById("message").innerHTML +=  "<br>Connected to Facebook";
  		//SUCCESS  		
  	}	 
	else if (response.status === 'not_authorized') 
    {
    	document.getElementById("message").innerHTML +=  "<br>Failed to Connect";

		//FAILED
    } 
    else 
    {
    	document.getElementById("message").innerHTML +=  "<br>Logged Out";

    	//UNKNOWN ERROR
    }
	});	
	};
    
  function LoginFace()
	{
	
		FB.login(["basic_info"],function(response) {
		   if (response.authResponse) 
		   {
		    	//getUserInfo();
          GuardarDatosUsuario();


  			} else 
  			{
  	    	 console.log('User cancelled login or did not fully authorize.');
   			}
		 });
		
	}

	function getPhoto()
	{
	  FB.api('/me/picture?type=normal', function(response) {

		  var str="<br/><b>Pic</b> : <img src='"+response.data.url+"'/>";
	  	  document.getElementById("status").innerHTML+=str;
	  	  	    
    });
	
	}

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
            TablaInsert.insert(object);
        }
        
    }
    
}

function GuardarDatosUsuario(){
    FB.api('/me', function(response) {  
      var arrayInfo=null;
      var DatosUsuario;

      DatosUsuario = {
        idFacebook: response.id,
        nombre: response.name,
        genero: response.gender,
        cine: false,
        calzado: false,
        moda: false,
        tecnologia: false,
        gastronomia: false,
        turismo:false,
        fecha_de_nacimiento: response.birthday,
        email: response.email,         
        ubicacion: response.location.name,
        UserFacebook: response.username
      };

      InsertObject('regis_users', DatosUsuario);
      

    });
}
    



function getFriends()
  {
    facebookConnectPlugin.api('/me?fields=friendlists', function(response) {

      var str="<br/><b>Friends</b> <br/>"+response.data.url+"</b>";
      document.getElementById("status").innerHTML+=str;
    });
  
  }


	function Logout()
	{
		facebookConnectPlugin.logout(function(){document.location.reload();});
	}

  // Load the SDK asynchronously
  /*(function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "https://connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));*/
