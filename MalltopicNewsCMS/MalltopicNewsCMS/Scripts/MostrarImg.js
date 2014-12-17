var Imagenes;
function IMG(logo, id) {
    var d = new Date();

    var div = window.opener.document.getElementById("ContenedorIMG");
    var etiqueta = '<div id="' + id + '"><img  src="' + logo + '?' + d.getSeconds() + '" ><br/>' +
        '<label>Pie de imagen</label>' +
		'<input name="nombimgs" id="' + id + '" type="text" onchange="PieChange(this)"/>' +
        '<button id="' + id + '"type="button" onclick="borrar(\'' + id + '\');">Eliminar</button><br/></div>';
    var ids = new Array;
    ids.push(id);

    var idsimg = window.opener.document.getElementById("idsimgarray")
    var machete = '<input style="display:none;" name="idimgs" type="text" value="' + ids + '"/>';

    
        var guardar = {};
        guardar["id"] = id;
        guardar["pie"] = 'null';

   
            var cookiee = getCookie("Imagen");

            if (cookiee == "")
            {
                window.opener.Imagenes = [];
                window.opener.Imagenes.push(guardar);
            }
            else
            {
                window.opener.Imagenes = JSON.parse(getCookie("Imagen"));
                window.opener.Imagenes.push(guardar);
            }
    

        $(idsimg).append(machete);
        $(div).append(etiqueta);
        var String = JSON.stringify(window.opener.Imagenes);
        setCookie("Imagen", String, 1);
    }

    function setCookie(cname, cvalue, exdays) {
        var d = new Date();

        if (exdays == 1)
        {
            document.cookie = cname + "=" + cvalue + "; path=/";
        }
        else
        {
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
        }
    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
    }

    function PieChange(input)
    {
        var AImagenes;
        var i = getCookie("Imagen");
        AImagenes = JSON.parse(i);

        try
        {
            var idinput = $(input).attr("id");

            $.each(AImagenes, function (index, item) {
                if (Imagenes == undefined)
                {
                    if (item.id == idinput)
                    {
                        item.pie = $(input).val();
                    }
                }
                else
                {
                    if (item.id == idinput)
                    {
                        item.pie = $(input).val();
                    }
                }
                
            });
            var String = JSON.stringify(AImagenes);
            setCookie("Imagen", String, 1);
            Imagenes = AImagenes;
        }
        catch (error)
        {
            var StringError = JSON.stringify(error);
            alert(StringError);
        }
    }


function IMG2(logo, id) {
    var d = new Date();
    var div = window.opener.document.getElementById("ContenedorIMGportada");
    var etiqueta = '<img  src="' + logo + '?' + d.getSeconds() + '" ><br/>';
    div.innerHTML = etiqueta;   
    setCookie();
}

function borrar(id) {
    $("#" + id).remove();

    var ima = JSON.parse(getCookie("Imagen"));
    
    $.each(ima, function (index, item) {
        if (item.id == id) {
            delete ima[index];
        }
    });
    var String = JSON.stringify(ima);
    String = String.replace(",null", "");
    String = String.replace("[null]", "");
    String = String.replace("null,", "");
    setCookie("Imagen", String, 1);
}