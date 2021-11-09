$(() => {
    $('#login').on('submit', function(e) {
        e.preventDefault();
        $('#listadoPost').html('')
        $.ajax({
            url: '/login',
            method: 'post',
            data: $('#login').serialize(),
            success: function(data) {
                console.log(data.token)
                if (!data.error) {
                    localStorage.setItem('token', data.token)
                    document.location = '/portada'
                } else {
                    $('#listadoPost').html('<span class="text-danger">' + data.error + '</span>')
                }
            }
        })
    })

    $("#logout").on("click", function(event) {
        event.preventDefault();
        localStorage.removeItem("token")
        document.location = '/'
    })

    $("#btn-save").on("click", function(){
        let titulo = $("#txt-titulo").val();
        let cuerpo = $("#txt-cuerpo").val();

        let token = localStorage.getItem("token")
        if(token){
            $.ajax({
                url: '/registrar_posts',
                method: 'post',
                dataType: 'json',
                headers:{
                    Authorization: token
                },
                data: {
                    titulo,
                    cuerpo
                },
                success: function(data){
                    if(data.error){
                        alert("Ocurrió un error registrando posts, Intente nuevamente")
                    }else{
                        alert("Registro exitoso")
                        document.location = '/portada'
                    }
                }
            });
        }else{
            document.location = '/'
        }

    })

    let init = () => {
        let token = localStorage.getItem("token")
        if(token){
            $.ajax({
                url: '/listado',
                method: 'post',
                dataType: 'json',
                headers:{
                    Authorization: token
                },
                success: function(data){
                    if(data.posts){
                        data.posts.map((item) => {
                            $("#list-users tbody").append(`
                                <tr>
                                    <td>${item.id}</td>
                                    <td>${item.titulo}</td>
                                    <td>${item.cuerpo}</td>
                                </tr>
                            `)
                        })
                    }
                }
            })
        }
    }
    init();
})