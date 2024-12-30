$(document).ready(function () {
    $(document).foundation();
    var sidebarAndWrapper = $('#sidebar,.manage-wrapper');

    $('.sidebar-toggle').on('click', function () {
        $(sidebarAndWrapper).toggleClass('hide-sidebar');
    });

    var $win = $(window);

    $win.scroll(function () {

        if ($win.scrollTop() == 0) {
            $('#sidebar').removeClass('top-scroll');

        }
        else {
            $('#sidebar').addClass('top-scroll');
        }
    });
    // Morris.Donut({
    //     element: 'graph',
    //     data: [
    //         {value: 70, label: 'foo'},
    //         {value: 15, label: 'bar'},
    //         {value: 10, label: 'baz'},
    //         {value: 5, label: 'A really really long label'}
    //     ],
    //       colors: [
    //         '#ffae00',
    //         '#cc8b00',
    //         '#d6a02a',
    //         '#bc8e2a'
    //     ],
    //     formatter: function (x) { return x + "%"}
    //     }).on('click', function(i, row){
    //     console.log(i, row);
    //});
});