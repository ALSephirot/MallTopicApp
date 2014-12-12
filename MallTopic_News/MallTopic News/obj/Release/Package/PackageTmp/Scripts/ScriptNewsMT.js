
var f = new Date();
var contenedor = window.document.getElementById("daTime");
var html = '<p class="parrafoFecha">' + 'Fecha: ' + f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear() + '</p>'
contenedor.innerHTML = html;

var estado = false;

function MostrarMalls() {
    $(".ListaMalls").css("display", "block");
}
function OcultarMalls() {
    $(".ListaMalls").css("display", "none");
}

$("#desplegable1").on("click", scroll1);
$("#desplegable2").on("click", scroll2);
$("#desplegable3").on("click", scroll3);
$("#desplegable4").on("click", scroll4);
$("#desplegable5").on("click", scroll5);
$("#desplegable6").on("click", scroll6);
$("#desplegable7").on("click", scroll7);
$("#desplegable8").on("click", scroll8);
$("#desplegable9").on("click", scroll9);


function scroll1() {
var section = $("#seccion1");
$("html, body").animate({ scrollTop: (section.offset().top - 100) }, 600);
}
function scroll2() {
    var section = $("#seccion2");
    $("html, body").animate({ scrollTop: (section.offset().top - 100) }, 400);
}
function scroll3() {
    var section = $("#seccion3");
    $("html, body").animate({ scrollTop: (section.offset().top - 100) }, 600);
}
function scroll4() {
    var section = $("#seccion4");
    $("html, body").animate({ scrollTop: (section.offset().top - 100) }, 600);
}

function scroll5() {
    var section = $("#seccion5");
    $("html, body").animate({ scrollTop: (section.offset().top - 100) }, 600);
}

function scroll6() {
    var section = $("#seccion6");
    $("html, body").animate({ scrollTop: (section.offset().top - 100) }, 600);
}

function scroll7() {
    var section = $("#seccion7");
    $("html, body").animate({ scrollTop: (section.offset().top - 100) }, 600);
}

function scroll8() {
    var section = $("#seccion8");
    $("html, body").animate({ scrollTop: (section.offset().top - 100) }, 600);
}

function scroll9() {
    var section = $("#seccion9");
    $("html, body").animate({ scrollTop: (section.offset().top - 100) }, 600);
}

function monterrey() {
    window.open("http://www.monterrey.com.co/home/");
}
function camino() {
    window.open("http://www.caminoreal.com.co/");
}
function movicentro() {
    window.open("http://www.movicentro.co/");
}
function molinos() {
    window.open("http://www.losmolinos.com.co/");
}
function sandiego() {
    window.open("http://www.sandiego.com.co/");
}
function fundadores() {
    window.open("http://www.centrocomercialfundadores.com/");
}
function mayorca(){
    window.open("http://www.mayorca.com.co/");
}
function tesoro() {
    window.open("http://www.eltesoro.com.co/es/");
}
function premium() {
    window.open("http://www.ccpremiumplaza.com/home.asp");
}
function cityplaza() {
    window.open("http://www.cityplaza.co/");
}
function sannicolas() {
    window.open("http://www.sannicolas.co/");
}
function malltopic() {
    window.open("http://www.malltopic.com/");
}