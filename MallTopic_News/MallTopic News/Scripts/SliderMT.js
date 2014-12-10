﻿
function CambiarImagen(ListItem, AtrasSiguiente) {

    if (AtrasSiguiente)
    {
        var Imagen = ListItem.children();
    }
    else
    {
        var Imagen = ListItem.children[0];
    }
    
    var ImagenJQ = $(Imagen);
    var PImagen = ImagenJQ.attr("data-src");
    var NombreImagen = ImagenJQ.attr("data-NombreImagen");
    var DescripcionNoticia = ImagenJQ.attr("data-DescripcionNoticia");
    var LinkNoticia = ImagenJQ.attr("data-LinkNoticia");
    var PieImagen = ImagenJQ.attr("data-PieImagen");
    var Contador = ImagenJQ.attr("data-count");
    var titulo = ImagenJQ.attr("data-titulo");

    $("#miniaturas li").each(function () {
        $(this).attr("data-select", "false");
    });

    $(ListItem).attr("data-select", "true");

    //Cambio los atributos de la imagen
    //Oculto los campo
    $("[data-ocultar=true]").fadeOut(500);
    
    setTimeout(function () {
        //Modifico
        $("#Imagen").attr("src", PImagen);
        $("#Imagen").attr("data-count", Contador);
        $("#PieImagen").html(PieImagen);
        $("#NombreImagen").html(NombreImagen);
        $("#DescripcionNoticia").html(DescripcionNoticia);
        $("#LinkNoticia").attr("href", LinkNoticia);
        $("#LinkNoticia").html(titulo);
        //Vuelvo y Muestro
        $("[data-ocultar=true]").fadeIn(500);
    },500)
    
}

function Atras()
{
    var Actual = $("#Imagen").attr("data-count");
    if(Actual == 0)
    {
        var Imagenes = $("#miniaturas li img");
        var Imagen = $("[data-count=" + (Imagenes.length - 1) + "]");
        CambiarImagen(Imagen.parent(), true);
    }
    else
    {
        var contador = Actual - 1;
        var Imagen = $("[data-count=" + contador+ "]");
        CambiarImagen(Imagen.parent(), true);
    }
}

function Siguiente() {
    var Actual = $("#Imagen").attr("data-count");
    var Imagenes = $("#miniaturas li img");

    if (Actual == (Imagenes.length - 1)) {
        var Imagen = $("[data-count=0]");
        CambiarImagen(Imagen.parent(), true);
    }
    else
    {
        var contador = parseInt(Actual) + 1;
        var Imagen = $("[data-count=" + contador + "]");
        CambiarImagen(Imagen.parent(), true);
    }
}

$(document).ready(function () {
    var imagen = $("img[data-count=0]");
    CambiarImagen(imagen[1].parentNode);
    
    setInterval(function () {
        Siguiente();
    }, 5000);

});