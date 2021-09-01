$(document).ready(function() {

    let clienteId = 0;

    $(document).on("click", "#div_cliente_tabela table button.btn_delete", function() {

        let btn_id = (event.srcElement.id);
        clienteId = btn_id.split("_")[2];

        $("div.modal-body").text("Você quer deletar o cliente com id = " + clienteId + " ? ");
        $("#modal-delete-btn").css({ "display": "inline" });
    });

    $(document).on("click", "#modal-delete-btn", function() {
        $.ajax({
            url: 'http://localhost:8080/api/cliente/deletarPorID/' + clienteId,
            type: 'DELETE',
            success: function(response) {
                $("div.modal-body").text("Deletado com sucesso o cliente com id = " + clienteId + "!");
                $("#modal-delete-btn").css({ "display": "none" });
                $("button.btn.btn-secondary").text("Close");


                // exclua a linha do cliente na página html
                let linha_id = "tr_" + clienteId;
                $("#" + linha_id).remove();
                $("#div_cliente_atualizar").css({ "display": "none" });
            },

            error: function(error) {
                console.log(error);
                $("#div_cliente_atualizar").css({ "display": "none" });
                alert("Error -> " + error);
            }
        });
    });
});