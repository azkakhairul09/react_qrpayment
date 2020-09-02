/* eslint-disable no-undef */
$(function() {
    $("#example1").DataTable({
            "responsive": true,
            "autoWidth": true,
        })
        .rows()
        .data();
    $('#products').DataTable({
        // "order": [[ 4, "desc" ]],
        "paging": true,
        "lengthChange": true,
        "searching": true,
        "ordering": false,
        "info": true,
        "autoWidth": true,
        "responsive": true,
    });
    $('#transactions').DataTable({
        // "order": [[ 4, "desc" ]],
        "paging": true,
        "lengthChange": true,
        "searching": true,
        "ordering": false,
        "autoWidth": true,
        "responsive": true,
        "info": true,
        dom: 'Bfrtip',
        buttons: [{
            extend: 'excelHtml5',
            className: 'btn btn-primary btn-xs',
            text: '<i class="fas fa-cloud-download-alt"></i> Excel',
            exportOptions: {
                modifier: {
                    search: 'applied',
                    order: 'applied'
                }
            },
            filename: function() {
                var value = $('.dataTables_filter input').val();
                return 'report_qr_transaction_' + value;
            },
            // title: function() {
            //     var value = $('.dataTables_filter input').val();
            //     return 'QR Transaction Report ' + value;
            // }
        }]
    });
});