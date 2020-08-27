/* eslint-disable no-undef */
$(function() {
    $("#example1").DataTable({
            "responsive": true,
            "autoWidth": false,
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
        "responsive": true
    });
    $('#transactions').DataTable({
        // "order": [[ 4, "desc" ]],
        "paging": true,
        "lengthChange": true,
        "searching": true,
        "ordering": false,
        "info": true,
        "autoWidth": false,
        "responsive": true
    });
});