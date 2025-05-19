$(document).ready(function () {

    window_width = $(window).width();


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

        updateStaticData();
        swapper();

    });

    // Swapper

    function swapper() {
        // 1001 - 1920 windows screen
        if (window_width > 1010) {
            $('.header').insertAfter('nav');
        }
        // 1000 - 801 windows screen
        else if (window_width <= 1010 && window_width > 800) {
            $('.header').insertAfter('nav');
        }
        // 800 - 601 windows screen
        else if (window_width <= 800 && window_width > 500) {
            $('.header').insertAfter('nav');
        }
        else if (window_width <= 500) {
            $('header').insertAfter('nav');
        }
        else {
            $('header').insertBefore('nav');
        }
    }

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
    const counterSection = document.querySelector("#temp_mid"); // your section ID
    const observer = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    incrementCounter($("#yrs_count"), 2);
                    incrementCounter($("#ctries_count"), 6);
                    incrementCounter($("#indtrs_count"), 5);
                    incrementCounter($("#stisfd_count"), 100);
                    observer.unobserve(counterSection); // run only once
                }
            });
        },
        { threshold: 0.5 } // trigger when 50% of section is visible
    );

    observer.observe(counterSection);

    document.querySelectorAll('.a_btn').forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            const rect = this.getBoundingClientRect();
            ripple.style.left = `${e.clientX - rect.left}px`;
            ripple.style.top = `${e.clientY - rect.top}px`;
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.background = '#0c172416';
            ripple.style.width = ripple.style.height = '200px';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });




    document.addEventListener("click", function (e) {
        const ripple = document.createElement("div");
        ripple.className = "cursor-ripple";

        ripple.style.left = `${e.clientX - 50}px`;
        ripple.style.top = `${e.clientY - 50}px`;

        document.body.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});
