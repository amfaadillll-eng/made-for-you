```javascript
/* =========================================================
   MADE FOR YOU
   PHASE 3 — ANIMATION ENGINE
========================================================= */


/* =========================================================
   CUSTOM CURSOR
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeCursor
);


function initializeCursor() {

    const cursor =
        document.querySelector(
            ".cursor"
        );

    const dot =
        document.querySelector(
            ".cursor-dot"
        );

    const outline =
        document.querySelector(
            ".cursor-outline"
        );


    if (!cursor || !dot || !outline) {

        return;

    }


    let mouseX = window.innerWidth / 2;

    let mouseY = window.innerHeight / 2;


    let outlineX = mouseX;

    let outlineY = mouseY;


    document.addEventListener(
        "mousemove",
        event => {

            mouseX =
                event.clientX;

            mouseY =
                event.clientY;


            dot.style.left =
                `${mouseX}px`;

            dot.style.top =
                `${mouseY}px`;

        }
    );


    function animateCursor() {

        outlineX +=
            (mouseX - outlineX) * 0.15;

        outlineY +=
            (mouseY - outlineY) * 0.15;


        outline.style.left =
            `${outlineX}px`;

        outline.style.top =
            `${outlineY}px`;


        requestAnimationFrame(
            animateCursor
        );

    }


    animateCursor();


    /* -----------------------------------------
       INTERACTIVE ELEMENTS
    ----------------------------------------- */

    const interactive =
        document.querySelectorAll(
            "button, a, .choice, .detail-card"
        );


    interactive.forEach(element => {

        element.addEventListener(
            "mouseenter",
            () => {

                outline.style.width =
                    "52px";

                outline.style.height =
                    "52px";

                outline.style.borderColor =
                    "rgba(199,167,106,0.8)";

            }
        );


        element.addEventListener(
            "mouseleave",
            () => {

                outline.style.width =
                    "34px";

                outline.style.height =
                    "34px";

                outline.style.borderColor =
                    "rgba(199,167,106,0.55)";

            }
        );

    });

}


/* =========================================================
   MOUSE FOLLOWING BACKGROUND GLOW
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeMouseGlow
);


function initializeMouseGlow() {

    const glow =
        document.querySelector(
            ".background-glow"
        );


    if (!glow) return;


    document.addEventListener(
        "mousemove",
        event => {

            const x =
                (event.clientX /
                    window.innerWidth) *
                100;


            const y =
                (event.clientY /
                    window.innerHeight) *
                100;


            glow.style.left =
                `${x}%`;

            glow.style.top =
                `${y}%`;

        }
    );

}


/* =========================================================
   PARTICLE SYSTEM
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeParticles
);


function initializeParticles() {

    const container =
        document.getElementById(
            "particles"
        );


    if (!container) return;


    const particleCount =
        window.innerWidth < 600
            ? 25
            : 45;


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        createParticle(container);

    }

}


function createParticle(container) {

    const particle =
        document.createElement(
            "span"
        );


    particle.className =
        "particle";


    const size =
        Math.random() * 2 + 1;


    const x =
        Math.random() * 100;


    const y =
        Math.random() * 100;


    const duration =
        Math.random() * 12 + 8;


    const delay =
        Math.random() * -15;


    particle.style.width =
        `${size}px`;

    particle.style.height =
        `${size}px`;

    particle.style.left =
        `${x}%`;

    particle.style.top =
        `${y}%`;

    particle.style.animation =
        `particleFloat ${duration}s ease-in-out ${delay}s infinite`;


    container.appendChild(
        particle
    );

}


/* =========================================================
   ADD PARTICLE ANIMATION
========================================================= */

const particleStyle =
document.createElement("style");


particleStyle.textContent = `

@keyframes particleFloat {

    0% {

        transform:
            translate3d(0, 0, 0);

        opacity: 0;

    }

    20% {

        opacity: 0.2;

    }

    50% {

        transform:
            translate3d(
                20px,
                -40px,
                0
            );

        opacity: 0.35;

    }

    80% {

        opacity: 0.15;

    }

    100% {

        transform:
            translate3d(
                -15px,
                -80px,
                0
            );

        opacity: 0;

    }

}

`;


document.head.appendChild(
    particleStyle
);


/* =========================================================
   PARALLAX EFFECT
========================================================= */

document.addEventListener(
    "mousemove",
    event => {

        const elements =
            document.querySelectorAll(
                "[data-parallax]"
            );


        const x =
            (event.clientX -
                window.innerWidth / 2) /
            40;


        const y =
            (event.clientY -
                window.innerHeight / 2) /
            40;


        elements.forEach(element => {

            const speed =
                Number(
                    element.dataset.parallax
                ) || 1;


            element.style.transform =
                `translate3d(
                    ${x * speed}px,
                    ${y * speed}px,
                    0
                )`;

        });

    }
);


/* =========================================================
   MAGNETIC BUTTON EFFECT
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeMagneticButtons
);


function initializeMagneticButtons() {

    const buttons =
        document.querySelectorAll(
            ".primary-button"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "mousemove",
            event => {

                const rect =
                    button.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;


                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;


                button.style.transform =
                    `translate(
                        ${x * 0.12}px,
                        ${y * 0.12}px
                    )`;

            }
        );


        button.addEventListener(
            "mouseleave",
            () => {

                button.style.transform =
                    "translate(0, 0)";

            }
        );

    });

}


/* =========================================================
   TEXT FOCUS EFFECT
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeTextFocus
);


function initializeTextFocus() {

    const cards =
        document.querySelectorAll(
            ".detail-card"
        );


    cards.forEach(card => {

        card.addEventListener(
            "mouseenter",
            () => {

                cards.forEach(
                    other => {

                        if (
                            other !== card
                        ) {

                            other.style.opacity =
                                "0.45";

                        }

                    }
                );

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                cards.forEach(
                    other => {

                        other.style.opacity =
                            "1";

                    }
                );

            }
        );

    });

}
```
