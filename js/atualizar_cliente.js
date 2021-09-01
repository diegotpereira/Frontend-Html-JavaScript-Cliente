$(document).ready(function() {
    $("#atualizar_cliente_form").submit(function(event) {
        event.preventDefault();
        try {
            let clienteId = $("#cliente_id").val();

            // Preprar formulario de dados
            let formularioDados = {
                nome: $("#cliente_nome").val(),
                sobrenome: $("#cliente_sobrenome").val(),
                endereco: $("#cliente_endereco").val(),
                idade: $("#cliente_idade").val()
            }

            // Enviar Requisição
            $.ajax({
                url: 'http://localhost:8080/api/cliente/atualizarPorId/' + clienteId + "/",
                type: 'PUT',
                contentType: "application/json",
                data: JSON.stringify(formularioDados),
                dataType: 'json',
                async: false,
                cache: false,
                success: function(response) {
                    let cliente = response.clientes[0];
                    let clienteString = "{nome: " + cliente.nome +
                        ", sobrenome: " + cliente.sobrenome +
                        ", endereco:  " + cliente.endereco +
                        ", idade:     " + cliente.idade + "}"
                    let successAlert =
                        '<div class="alert alert-success alert-dismissible">' +
                        '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
                        '<strong>' + response.message + '</strong> Cliente\'s Informações = ' + clienteString;
                    '</div>'

                    // alterar os dados atualizados para o registro da tabela do cliente
                    $("#tr_" + clienteId + " td.td_nome").text(cliente.nome.toUpperCase());
                    $("#tr_" + clienteId + " td.td_endereco").text(cliente.endereco.toUpperCase());

                    $("#response").empty();
                    $("#response").append(successAlert);
                    $("#response").css({ "display": "block" });
                },

                error: function(response) {
                    let errorAlert =
                        '<div class="alert alert-danger alert-dismissible">' +
                        '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
                        '<strong>' + response.message + '</strong>' + ',Error: ' + message.error +
                        '</div>';

                    $("#response").empty();
                    $("#response").append(errorAlert);
                    $("#response").css({ "display": "block" });
                }
            });
        } catch (error) {
            console.log(error);
            alert(error);
        }
    });

    $(document).on("click", "table button.btn_id", function() {
        let id_of_button = (event.srcElement.id);
        let clienteId = id_of_button.split("_")[2];

        // Enviar requisição
        $.ajax({
            url: 'http://localhost:8080/api/cliente/encontrarUm/' + clienteId,
            type: 'GET',
            success: function(response) {
                let cliente = response.clientes[0];
                $("#cliente_id").val(cliente.id);
                $("#cliente_nome").val(cliente.nome);
                $("#cliente_sobrenome").val(cliente.sobrenome);
                $("#cliente_endereco").val(cliente.endereco);
                $("#cliente_idade").val(cliente.idade);
                $("#div_cliente_atualizar").css({ "display": "block" });
            },

            error: function(error) {
                console.log(error);
                alert("Error -> " + error);
            }
        });
    });
});