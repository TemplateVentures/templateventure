$(document).ready(function () {

    window_width = $(window).width();

    var init = function () {
        var isMobile =
            navigator.userAgent &&
            navigator.userAgent.toLowerCase().indexOf("mobile") >= 0;
        var isSmall = window.innerWidth < 1000;

        var ps = new ParticleSlider({
            ptlGap: isMobile || isSmall ? 3 : 2,
            ptlSize: isMobile || isSmall ? 3 : 2,
            width: 1e9,
            height: 1e9,
        });
    };

    var initParticleSlider = (function () {
        var psScript = document.createElement("script");
        psScript.addEventListener
            ? psScript.addEventListener("load", init, false)
            : (psScript.onload = init);
        psScript.src = "./js/particle.js";
        psScript.setAttribute("type", "text/javascript");
        document.body.appendChild(psScript);
    })(
        window.addEventListener
            ? window.addEventListener("load", initParticleSlider, false)
            : (window.onload = initParticleSlider)
    );


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


    // document.addEventListener("contextmenu", (e) => {
    //     e.preventDefault();
    // }, false);

    // document.addEventListener("keydown", (e) => {
    //     if (e.ctrlKey || e.keyCode == 123) {
    //         e.stopPropagation();
    //         e.preventDefault();
    //     }
    // });


    function highlightCompanyName() {
        const searchText = "Template Ventures";
        $("*").contents().each(function () {
            if (this.nodeType === 3 && this.nodeValue.includes(searchText)) {
                const regex = new RegExp(`(${searchText})`, "gi");
                const newHtml = this.nodeValue.replace(regex, '<mark class="comp_name">$1</mark>');
                $(this).replaceWith(newHtml);
            }
        });
    }

    highlightCompanyName();



    $(window).scroll(function () {
        if ($(this).scrollTop() > 600) {
            $('.temp_bck_top').fadeIn();
        } else {
            $('.temp_bck_top').fadeOut();
        }
    });


    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('nav').addClass('toggle_fixed_nav');
            $('.nav').css('top', '0px');
            $('.banner').css('margin-top', '207px');
        } else {
            $('nav').removeClass('toggle_fixed_nav');
            $('.nav').css('top', '20px');
            $('.banner').css('margin-top', '100px');
        }
    });


    // Scroll to top on click
    $('.temp_bck_top').click(function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 600);
        return false;
    });

    // Menu bar
    $('.nav_menu_bar').click(function () {
        $(this).toggleClass('active');
        $(this).addClass('bounce');
        $('body').toggleClass("ovflw_hdn_body")
        $('.nav_con').toggleClass('toggle_nav_con');
        $('.nav_con_list').toggleClass('toggle_nav_con_list');
        $('.nav_menu_bar').toggleClass('fixed_menu_bar');
        setTimeout(() => $(this).removeClass('bounce'), 500);
    });


    $(window).resize(function () {
        function updateStaticData() {
            if (window_width <= 1000) {
                $('.nav_menu_bar').removeClass('active');
                $('.nav_con').removeClass('toggle_nav_con');
                $('.nav_con_list').removeClass('toggle_nav_con_list');
                $('.nav_menu_bar').removeClass('fixed_menu_bar');
            }
        }

        updatenvBG();
        updateStaticData();

    });

    // Swapper

    function swapper() {
        //1001 - 1920 windows screen
        // if (window_width > 1010) {
        //     $('.header').insertAfter('nav');
        // }
        // // 1000 - 801 windows screen
        // else if (window_width <= 1010 && window_width > 800) {
        //     $('.header').insertAfter('nav');
        // }
        // // 800 - 601 windows screen
        // else if (window_width <= 800 && window_width > 500) {
        //     $('.header').insertAfter('nav');
        // }
        if (window_width <= 500) {
            $('header').insertAfter('nav');
        }
        else {
            $('header').insertBefore('nav');
        }
    }
    $(window).resize(function () {
        swapper();
    });


    swapper();




    //   counter
    function incrementCounter(counterElement, finalValue) {
        var currentCount = 0;

        function updateCounter() {
            counterElement.text(currentCount);

            if (currentCount < finalValue) {
                currentCount++;
                setTimeout(updateCounter, 25); // Adjust the delay for smoother animation
            }
        }

        updateCounter();
    }
    // incrementCounter($('#yrs_count'), 2);
    // incrementCounter($('#ctries_count'), 6);
    // incrementCounter($('#indtrs_count'), 47);
    // incrementCounter($('#stisfd_count'), 100);


    // Intersection Observer Setup
    // document.addEventListener("DOMContentLoaded", function () {
    const counterSection = document.querySelector("#temp_mid"); // your section ID
    const observer = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    incrementCounter($("#yrs_count"), 2);
                    incrementCounter($("#ctries_count"), 6);
                    incrementCounter($("#indtrs_count"), 47);
                    incrementCounter($("#stisfd_count"), 100);
                    observer.unobserve(counterSection); // run only once
                }
            });
        },
        { threshold: 0.5 } // trigger when 50% of section is visible
    );

    observer.observe(counterSection);
    // });

});
