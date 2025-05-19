function loadParticlesScript() {
    if (!document.getElementById("particles-script")) {
        const script = document.createElement("script");
        script.src = "js/particles_init.js";
        script.id = "particles-script";
        document.body.appendChild(script);
    }
}

function removeParticlesScript() {
    const existingScript = document.getElementById("particles-script");
    if (existingScript) {
        existingScript.remove();
    }
}

// Check and toggle script based on window width
function handleResize() {
    if (window.innerWidth >= 1000) {
        loadParticlesScript();
    } else {
        removeParticlesScript();
    }
}

// Initial check
handleResize();

// Listen for screen resize events
window.addEventListener("resize", handleResize);