
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

//function OnMall() {

//    $(".logoCC").animate({ width: '65px', height: '65px', top: '10px', left: '10px' });
//    $(".headerCC").animate({ opacity: '1' });
//    $(".parrafoCentroCC").animate({ opacity: '1' });
//}

//function OutMall() {

//    $(".logoCC").animate({ width:'100px', height: '100px', top: '20px', left: '100px' });
//    $(".headerCC").animate({ opacity: '0' });
//    $(".parrafoCentroCC").animate({ opacity: '0' });
//}


$("#LinkCC").mouseover(function () {
    
    OnMall();
});

$("#LinkCC").mouseout(function () {
    OutMall();
});

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
