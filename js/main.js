/* =========================================================
   MADE FOR YOU
   PHASE 3 — MAIN ENGINE
========================================================= */


/* =========================================================
   GLOBAL STATE
========================================================= */

const siteState = {

    currentSection: 1,

    totalSections: 9,

    soundEnabled: false,

    answers: {

        mood: null,

        weapon: null,

        superpower: null

    },

    secretClicks: 0,

    loaderFinished: false

};


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeSite();

});


/* =========================================================
   INITIALIZE WEBSITE
========================================================= */

function initializeSite() {

    initializeLoader();

    initializeNavigation();

    initializeScrollObserver();

    initializeStats();

    initializeCounters();

    initializeSound();

    updateProgress(1);

}


/* =========================================================
   LOADER
========================================================= */

function initializeLoader() {

    const loader =
        document.getElementById("loader");

    const line =
        document.querySelector(".loader-line span");

    const percentage =
        document.querySelector(".loader-percentage");


    /*
       If loader doesn't exist,
       simply continue with website.
    */

    if (!loader) {

        revealWebsite();

        return;

    }


    let progress = 0;

    let finished = false;


    /*
       Update loader visually
    */

    function updateLoader(value) {

        if (line) {

            line.style.width =
                value + "%";

        }

        if (percentage) {

            percentage.textContent =
                value + "%";

        }

    }


    /*
       Finish loader
    */

    function finishLoader() {

        if (finished) return;

        finished = true;

        siteState.loaderFinished = true;


        updateLoader(100);


        setTimeout(() => {

            loader.classList.add("loader-hidden");

            document.body.classList.add("site-ready");

            revealWebsite();

        }, 400);

    }


    /*
       Animate loader
    */

    const interval = setInterval(() => {

        /*
           Random progress
           but guaranteed to move.
        */

        progress +=
            Math.floor(
                Math.random() * 8
            ) + 4;


        if (progress >= 100) {

            progress = 100;

        }


        updateLoader(progress);


        if (progress >= 100) {

            clearInterval(interval);

            finishLoader();

        }

    }, 80);


    /*
       HARD FAILSAFE

       Even if something goes wrong,
       website opens after 3 seconds.
    */

    setTimeout(() => {

        clearInterval(interval);

        finishLoader();

    }, 3000);

}


/* =========================================================
   REVEAL WEBSITE
========================================================= */

function revealWebsite() {

    document.body.classList.add("site-ready");

}


/* =========================================================
   NAVIGATION
========================================================= */

function initializeNavigation() {

    const enterButton =
        document.getElementById("enterButton");


    if (enterButton) {

        enterButton.addEventListener(
            "click",
            () => {

                scrollToSection("welcome");

            }
        );

    }


    const nextButtons =
        document.querySelectorAll(
            ".next-section"
        );


    nextButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const target =
                    button.dataset.target;


                if (target) {

                    scrollToSection(target);

                }

            }
        );

    });

}


/* =========================================================
   SCROLL TO SECTION
========================================================= */

function scrollToSection(id) {

    const target =
        document.getElementById(id);


    if (!target) return;


    target.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}


/* =========================================================
   SECTION OBSERVER
========================================================= */

function initializeScrollObserver() {

    const sections =
        document.querySelectorAll(
            ".section"
        );


    if (!sections.length) return;


    /*
       Fallback for browsers without
       IntersectionObserver.
    */

    if (!("IntersectionObserver" in window)) {

        sections.forEach(section => {

            revealSection(section);

        });

        return;

    }


    const observer =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        const section =
                            entry.target;


                        const index =
                            [
                                ...sections
                            ]
                            .indexOf(section) + 1;


                        siteState.currentSection =
                            index;


                        updateProgress(index);


                        revealSection(section);

                    }

                });

            },

            {

                threshold: 0.35

            }

        );


    sections.forEach(section => {

        observer.observe(section);

    });

}


/* =========================================================
   SECTION REVEAL
========================================================= */

function revealSection(section) {

    if (
        section.dataset.revealed === "true"
    ) {

        return;

    }


    section.dataset.revealed =
        "true";


    const elements =
        section.querySelectorAll(

            ".section-content > *, " +
            ".question, " +
            ".detail-card, " +
            ".effort-item"

        );


    elements.forEach(
        (element, index) => {

            element.classList.add(
                "reveal"
            );


            setTimeout(() => {

                element.classList.add(
                    "visible"
                );

            }, index * 80);

        }
    );


    /*
       Character stats
    */

    if (
        section.id === "character"
    ) {

        animateStats();

    }


    /*
       Effort counters
    */

    if (
        section.id === "effort"
    ) {

        animateCounters();

    }

}


/* =========================================================
   PROGRESS INDICATOR
========================================================= */

function updateProgress(number) {

    const current =
        document.querySelector(
            ".progress-current"
        );


    if (!current) return;


    current.textContent =
        String(number).padStart(2, "0");

}


/* =========================================================
   CHARACTER STATS
========================================================= */

function initializeStats() {

    const fills =
        document.querySelectorAll(
            ".stat-fill"
        );


    fills.forEach(fill => {

        fill.style.width = "0%";

    });

}


function animateStats() {

    const fills =
        document.querySelectorAll(
            ".stat-fill"
        );


    fills.forEach((fill, index) => {

        const value =
            fill.dataset.value || 0;


        setTimeout(() => {

            fill.style.width =
                value + "%";

        }, index * 150);

    });

}


/* =========================================================
   EFFORT COUNTERS
========================================================= */

function initializeCounters() {

    const counters =
        document.querySelectorAll(
            ".effort-value[data-count]"
        );


    counters.forEach(counter => {

        counter.textContent = "0";

    });

}


function animateCounters() {

    const counters =
        document.querySelectorAll(
            ".effort-value[data-count]"
        );


    counters.forEach(
        (counter, index) => {

            /*
               Don't restart counter every time
               the section becomes visible.
            */

            if (
                counter.dataset.animated === "true"
            ) {

                return;

            }


            counter.dataset.animated =
                "true";


            const target =
                Number(
                    counter.dataset.count
                );


            let current = 0;


            const duration = 1300;

            const steps = 40;

            const increment =
                target / steps;

            const intervalTime =
                duration / steps;


            setTimeout(() => {

                const interval =
                    setInterval(() => {

                        current += increment;


                        if (
                            current >= target
                        ) {

                            current = target;

                            clearInterval(
                                interval
                            );

                        }


                        counter.textContent =
                            Math.floor(current);

                    }, intervalTime);

            }, index * 150);

        }
    );

}


/* =========================================================
   SOUND
========================================================= */

function initializeSound() {

    const toggle =
        document.getElementById(
            "soundToggle"
        );

    const audio =
        document.getElementById(
            "backgroundMusic"
        );


    if (!toggle || !audio) return;


    toggle.addEventListener(
        "click",
        async () => {

            if (audio.paused) {

                try {

                    await audio.play();


                    siteState.soundEnabled =
                        true;


                    const text =
                        toggle.querySelector(
                            ".sound-text"
                        );


                    if (text) {

                        text.textContent =
                            "SOUND ON";

                    }

                }

                catch (error) {

                    console.log(
                        "Audio playback unavailable."
                    );

                }

            }

            else {

                audio.pause();


                siteState.soundEnabled =
                    false;


                const text =
                    toggle.querySelector(
                        ".sound-text"
                    );


                if (text) {

                    text.textContent =
                        "SOUND OFF";

                }

            }

        }
    );

}


/* =========================================================
   GLOBAL HELPERS
========================================================= */

window.siteState =
    siteState;


window.scrollToSection =
    scrollToSection;


window.updateProgress =
    updateProgress;