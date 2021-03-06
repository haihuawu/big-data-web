let requestUrl = "http://167.99.13.127:8001/single-profile";
let spinner = $('.spin');
$(document).on('ready', () => {
    spinner.spin('hide');
    $('#submit').on('click', (e) => {
        
        let table = $('#table').val();
        let column = $('#column').val();

        // Taking care of null input
        if(table == null || table == "" || column == null || column == "") {
            if(table == null || table == "") {
                $('#table-alert').show('fade');
                setTimeout(function () {
                    $('#table-alert').hide('fade');
                }, 3000);
            }

            if(column == null || column == "") {
                $('#column-alert').show('fade');
                setTimeout(function () {
                    $('#column-alert').hide('fade');
                }, 3000);
            }

            return false;
        }

        
        spinner.spin('show');
        // $('.spin').spin('hide');

        e.preventDefault();
        if (!table || !column) {
            console.log("fill necessary fields");
            return;
        }
        let options = {
            url: requestUrl,
            data: {
                table: table,
                column: column
            },
            method: 'GET',
            success: (result) => {
                // init_table(result);
                console.log(result);
                $('#datatable-buttons').DataTable({
                    "ordering": false,
                    "data": result.data,
                    "columns": [
                        {"data": "val"},
                        {"data": "count"},
                    ]
                });
                spinner.spin('hide');
            },
            error: (err) => {
                console.log(err);
                spinner.spin('hide');
            }
        };
        $.ajax(options);
    })
})