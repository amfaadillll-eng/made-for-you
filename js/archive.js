/* =========================================================
   PHASE 4 — ARCHIVE ENGINE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeArchive();

    }
);


/* =========================================================
   ARCHIVE CONTENT
========================================================= */

const archiveContent = {

    note: {

        number: "01",

        title: "A Note",

        text:
            "Not everything needs a reason. Sometimes someone simply makes you want to create something.",

        result:
            "This one took longer than it should have."

    },


    theory: {

        number: "02",

        title: "A Theory",

        text:
            "I have a theory about you. Unfortunately, there is only one way to test it.",

        result:
            "YOU ARE UNNECESSARILY INTERESTING."

    },


    question: {

        number: "03",

        title: "A Question",

        text:
            "If you could keep one completely ordinary day forever, what would it look like?",

        result:
            "There isn't a wrong answer."

    },


    effort: {

        number: "04",

        title: "The Effort",

        text:
            "There was absolutely no practical reason to build all of this.",

        result:
            "BUT IT WAS WORTH MAKING."

    },


    future: {

        number: "05",

        title: "The Future File",

        text:
            "Nothing has been written here yet.",

        result:
            "FOR NOW."

    }

};


/* =========================================================
   INITIALIZE
========================================================= */

function initializeArchive() {

    const cards =
        document.querySelectorAll(
            ".archive-card"
        );


    const modal =
        createArchiveModal();


    cards.forEach(card => {

        card.addEventListener(
            "click",
            () => {

                const key =
                    card.dataset.archive;


                if (
                    archiveContent[key]
                ) {

                    openArchive(
                        archiveContent[key]
                    );

                }

            }
        );

    });

}


/* =========================================================
   CREATE MODAL
========================================================= */

function createArchiveModal() {

    let modal =
        document.getElementById(
            "archiveModal"
        );


    if (modal) {

        return modal;

    }


    modal =
        document.createElement("div");


    modal.id =
        "archiveModal";


    modal.className =
        "archive-modal";


    modal.innerHTML = `

        <div class="archive-modal-content">

            <div
                class="archive-modal-number"
                id="archiveModalNumber"
            ></div>


            <h2
                id="archiveModalTitle"
            ></h2>


            <div
                class="archive-modal-text"
                id="archiveModalText"
            ></div>


            <div
                class="archive-result"
            >

                <span class="eyebrow">
                    ARCHIVE RESULT
                </span>


                <strong
                    id="archiveModalResult"
                ></strong>

            </div>


            <button
                class="archive-close"
                id="archiveClose"
                type="button"
            >
                CLOSE FILE
            </button>

        </div>

    `;


    document.body.appendChild(modal);


    const closeButton =
        document.getElementById(
            "archiveClose"
        );


    closeButton.addEventListener(
        "click",
        closeArchive
    );


    modal.addEventListener(
        "click",
        event => {

            if (
                event.target === modal
            ) {

                closeArchive();

            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeArchive();

            }

        }
    );


    return modal;

}


/* =========================================================
   OPEN
========================================================= */

function openArchive(data) {

    const modal =
        document.getElementById(
            "archiveModal"
        );


    if (!modal) return;


    document.getElementById(
        "archiveModalNumber"
    ).textContent =
        data.number;


    document.getElementById(
        "archiveModalTitle"
    ).textContent =
        data.title;


    document.getElementById(
        "archiveModalText"
    ).textContent =
        data.text;


    document.getElementById(
        "archiveModalResult"
    ).textContent =
        data.result;


    modal.classList.add(
        "active"
    );


    document.body.style.overflow =
        "hidden";

}


/* =========================================================
   CLOSE
========================================================= */

function closeArchive() {

    const modal =
        document.getElementById(
            "archiveModal"
        );


    if (!modal) return;


    modal.classList.remove(
        "active"
    );


    document.body.style.overflow =
        "";

}