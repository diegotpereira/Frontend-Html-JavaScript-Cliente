$(document).ready(function() {

    $("#add_novo_cliente").submit(function(evt) {
        evt.preventDefault();

        // PREPARAR DADOS DO FORMULÁRIO
        let formularioDados = {
            nome: $("#nome").val(),
            sobrenome: $("#sobrenome").val(),
            endereco: $("#endereco").val(),
            idade: $("#idade").val()
        }

        // Enviar requisição
        $.ajax({
            url: 'http://localhost:8080/api/cliente/novo',
            type: 'POST',
            contentType: "application/json",
            data: JSON.stringify(formularioDados),
            dataType: 'json',
            async: false,
            cache: false,
            success: function(response) {
                let cliente = response.clientes[0];
                let clienteString =
                    "{ nome: " + cliente.nome + " " + cliente.sobrenome + ", endereco: " + cliente.endereco + ", idade: " + cliente.idade + "}"
                let successAlert =
                    '<div class="alert alert-success alert-dismissible">' +
                    '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
                    '<strong>' + response.message + '</strong> Cliente Informação = ' + clienteString;
                '</div>'
                $("#response").append(successAlert);
                $("#response").css({ "display": "block" });

                redefinirFormUpload();
            },

            error: function(response) {
                let errorAlert =
                    '<div class="alert alert-danger alert-dismissible">' +
                    '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
                    '<strong>' + response.message + '</strong>' + '.Error: ' + message.error +
                    '</div>'

                $("#response").append(errorAlert);
                $("#response").css({ "display": "block" });

                redefinirFormUpload();
            }
        });
    });

    function redefinirFormUpload() {
        $("#nome").val("");
        $("#sobrenome").val("");
        $("#endereco").val("");
        $("#idade").val("");
    }

    (function() {
        let pathname = window.location.pathname;
        if (pathname === "/") {
            $(".nav .nav-item a:first").addClass("active");
        } else if (pathname == "/cliente.html") {
            $(".nav .nav-item a:last").addClass("active");
        }
    })();
});