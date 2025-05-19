$(document).ready(function () {

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

    // $(window).resize(function () {
    //     if (window_width <= 1000) {
    //         initParticleSlider();
    //         init();
    //     }
    // })

});