
var f = new Date();
var contenedor = window.document.getElementById("daTime");
//var html = '<p class="parrafoFecha">' + 'Fecha: ' + f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear() + '</p>'

var meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
var diasSemana = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
var fechaLetras = (diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear());

contenedor.innerHTML = fechaLetras;
var entro = false;

var estado = false;

function MostrarMalls() {
    $(".ListaMalls").css("display", "block");
}
function OcultarMalls() {
    $(".ListaMalls").css("display", "none");
}

function OnMall(miDivsito) {

        console.log("entro");
        var link = $(miDivsito);
        var Divhijo = link.children();
        var hijos = Divhijo.children();


        $(hijos[0]).animate({ width: '65px', height: '65px', top: '10px', left: '10px' });
        $(hijos[1]).animate({ opacity: '1' });
        $(hijos[2]).animate({ opacity: '1' });
}

function OutMall(miDivsito) {
    console.log("salgo");
    var link = $(miDivsito);
    var Divhijo = link.children();
    var hijos = Divhijo.children();

    $(hijos[0]).animate({ width: '150px', height: '150px', top: '20px', left: '50px' });
    $(hijos[1]).animate({ opacity: '0' });
    $(hijos[2]).animate({ opacity: '0' });
}

$("a[data-id=contenedor]").hover(function () { OnMall(this); }, function () { OutMall(this); });

$("#desplegable1").on("click", scroll1);
$("#desplegable2").on("click", scroll2);
$("#desplegable3").on("click", scroll3);
$("#desplegable4").on("click", scroll4);
$("#desplegable5").on("click", scroll5);
$("#desplegable6").on("click", scroll6);
$("#desplegable7").on("click", scroll7);
$("#desplegable8").on("click", scroll8);
$("#desplegable9").on("click", scroll9);
$("#desplegable10").on("click", scroll10);


function scroll1() {
var section = $(".tag1");
$("html, body").animate({ scrollTop: (section.offset().top - 100) }, 600);
}
function scroll2() {
    var section = $(".tag2");
    $("html, body").animate({ scrollTop: (section.offset().top - 100) }, 400);
}
function scroll3() {
    var section = $(".tag3");
    $("html, body").animate({ scrollTop: (section.offset().top - 100) }, 600);
}
function scroll4() {
    var section = $(".tag4");
    $("html, body").animate({ scrollTop: (section.offset().top - 100) }, 600);
}

function scroll5() {
    var section = $(".tag5");
    $("html, body").animate({ scrollTop: (section.offset().top - 100) }, 600);
}

function scroll6() {
    var section = $(".tag6");
    $("html, body").animate({ scrollTop: (section.offset().top - 100) }, 600);
}

function scroll7() {
    var section = $(".tag7");
    $("html, body").animate({ scrollTop: (section.offset().top - 100) }, 600);
}

function scroll8() {
    var section = $(".tag8");
    $("html, body").animate({ scrollTop: (section.offset().top - 100) }, 600);
}

function scroll9() {
    var section = $(".tag9");
    $("html, body").animate({ scrollTop: (section.offset().top - 100) }, 600);
}

function scroll10() {
    var section = $(".tag10");
    $("html, body").animate({ scrollTop: (section.offset().top - 100) }, 600);
}

function abrirentana(ruta)
{
    window.open("http://" + ruta);
}
