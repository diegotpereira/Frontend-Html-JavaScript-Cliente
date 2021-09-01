$(document).ready(function() {
    (function() {
        $.ajax({
            type: "GET",
            url: "localhost:8080/api/cliente/buscarTodosClientes",
            success: function(response) {
                $.each(response.clientes, (i, cliente) => {

                    let deleteButton = '<button ' +
                        'id = ' +
                        '\"' + 'btn_delete_' + cliente.id + '\"' +
                        'type = "button" class="btn btn_danger btn-delete" data-toggle = "modal" data-target="#delete-modal"' +
                        '>&times</button>';

                    let get_More_Info_Btn = '<button' +
                        'id = ' + '\"' + 'btn_id_' + cliente.id + '\"' +
                        'type = "button" class = "btn btn-info btn_id">' +
                        cliente.id +
                        '</button>';
                    let tr_id = 'tr_' + cliente.id;
                    let clienteLinha = '<tr id = \"' + tr_id + "\"" + '>' +
                        '<td>' + get_More_Info_Btn + '</td>' +
                        '<td class = \"td_nome\">' + cliente.nome.toUpperCase() + '</td>' +
                        '<td class = \"td_endereco\">' + cliente.endereco + '</td>' +
                        '<td>' + deleteButton + '</td>' +
                        '</tr>';

                    $('#clienteTabela tbody').append(clienteLinha);
                });
            },

            error: function(e) {
                alert("Erro: ", e);
                console.log("Erro: ", e);
            }
        });
    })();
    (function() {
        let pathname = window.location.pathname;
        if (pathname == "/clientes.html") {
            $(".nav .nav-item a:last").addClass("active");
        }
    })();
});