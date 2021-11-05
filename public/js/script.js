$(() => {
    $('#login').on('submit', function(e) {
        e.preventDefault();

        $.ajax({
            url: '/login',
            method: 'post',
            data: $('#login').serialize(),
            success: function(data) {
                console.log(data.token)
                if (!data.error) {
                    localStorage.setItem('token', data.token)
                } else {
                    $('#listadoPost').html('<span class="text-danger">' + data.error + '</span>')
                }
            }
        })
    })
})