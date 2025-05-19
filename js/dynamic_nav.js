$(document).ready(function () {

    // Function to update background position and size
    function updatenvBG() {
        var activeLink = $(".nav_con_list a.link_active");
        var bgElement = $(".nav_bg"); // Updated class for background

        if (activeLink.length) {
            var bgWidth = activeLink.outerWidth();
            var bgLeft = activeLink.position().left;

            // Apply changes to background
            bgElement.css({
                width: bgWidth + "px",
                transform: "translateX(" + bgLeft + "px)",
            });
        }
    }

    // Initialize background on page load
    updatenvBG();

    // Hover effect to move background on hover
    $(".nav_con_list a").hover(
        function () {
            var bgElement = $(".nav_bg");

            // Get width & position of hovered link
            var hoverWidth = $(this).outerWidth();
            var hoverLeft = $(this).position().left;

            // Apply changes to background
            bgElement.css({
                width: hoverWidth + "px",
                transform: "translateX(" + hoverLeft + "px)",
            });
        },
        function () {
            // When mouse leaves, reset to active link
            updatenvBG();
        }
    );


    // Click event to update active link
    $(".nav_con_list a").click(function () {
        $(".nav_con_list a").removeClass("link_active");
        $(this).addClass("link_active");

        updatenvBG();
    });


    $(window).resize(function () {
        updatenvBG();
    })

});