$(document).ready(function () {
    var fav = $("#destacado").val();

    if (fav == "") {
        $("#destacado").val("false");
    }

    $("#IcoFavorito").on("click", function () {
        var Select = $("#IcoFavorito").attr("data-select");

        if (Select == "false") {
            $("#destacado").val("true");

            $("#IcoFavorito").attr("data-select", "true");

            if (update) {
                $("#IcoFavorito").attr("src", "../../images/Favorito.png");
            }
            else {
                $("#IcoFavorito").attr("src", "../images/Favorito.png");
            }

        }
        else {
            $("#destacado").val("false");
            $("#IcoFavorito").attr("data-select", "false");

            if (update) {
                $("#IcoFavorito").attr("src", "../../images/No_Favorito.png");
            }
            else {
                $("#IcoFavorito").attr("src", "../images/No_Favorito.png");
            }

        }

    });
});