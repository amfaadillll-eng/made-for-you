```javascript
/* =========================================================
   MADE FOR YOU
   PHASE 3 — EASTER EGG
========================================================= */


/* =========================================================
   SECRET SYSTEM
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeEasterEgg
);


function initializeEasterEgg() {

    const star =
        document.getElementById(
            "secretStar"
        );


    const overlay =
        document.getElementById(
            "secretOverlay"
        );


    const closeButton =
        document.getElementById(
            "closeSecret"
        );


    if (!star || !overlay) {

        return;

    }


    let clicks = 0;


    star.addEventListener(
        "click",
        () => {

            clicks++;


            /* ---------------------------------
               SMALL FEEDBACK
            --------------------------------- */

            star.style.transform =
                `rotate(${clicks * 45}deg)`;


            /* ---------------------------------
               SECRET FOUND
            --------------------------------- */

            if (clicks >= 7) {

                openSecret(overlay);

                clicks = 0;

            }

        }
    );


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            () => {

                closeSecret(overlay);

            }
        );

    }

}


/* =========================================================
   OPEN SECRET
========================================================= */

function openSecret(overlay) {

    overlay.style.display =
        "flex";


    overlay.style.opacity =
        "0";


    requestAnimationFrame(() => {

        overlay.style.transition =
            "opacity 0.7s ease";

        overlay.style.opacity =
            "1";

    });


    document.body.style.overflow =
        "hidden";

}


/* =========================================================
   CLOSE SECRET
========================================================= */

function closeSecret(overlay) {

    overlay.style.opacity =
        "0";


    setTimeout(() => {

        overlay.style.display =
            "none";


        document.body.style.overflow =
            "";

    }, 600);

}
```
