/* =========================================================
   MADE FOR YOU
   INTERACTION ENGINE
   CORRECTED VERSION
========================================================= */


/* =========================================================
   GLOBAL STATE
========================================================= */

window.siteState = window.siteState || {};

window.siteState.answers =
    window.siteState.answers || {};


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeInteractions
);


function initializeInteractions() {

    console.log(
        "✓ Interaction Engine initialized"
    );


    initializeChoices();

    initializeAnalysis();

    initializeNextSectionButtons();

    initializeHoverFeedback();

}


/* =========================================================
   CHOICE SYSTEM
========================================================= */

function initializeChoices() {

    const questions =
        document.querySelectorAll(
            ".question"
        );


    console.log(
        "Questions found:",
        questions.length
    );


    if (!questions.length) {

        console.warn(
            "No .question elements found."
        );

        return;

    }


    questions.forEach(
        question => {

            const choices =
                question.querySelectorAll(
                    ".choice"
                );


            const questionType =
                question.dataset.question;


            if (!questionType) {

                console.warn(
                    "Question missing data-question:",
                    question
                );

                return;

            }


            console.log(
                `Question "${questionType}": ${choices.length} choices`
            );


            choices.forEach(
                choice => {

                    choice.addEventListener(
                        "click",
                        function () {

                            selectChoice(
                                question,
                                choice,
                                choices,
                                questionType
                            );

                        }
                    );

                }
            );

        }
    );

}


/* =========================================================
   SELECT CHOICE
========================================================= */

function selectChoice(
    question,
    choice,
    choices,
    questionType
) {

    /* -----------------------------------------
       REMOVE OLD SELECTION
    ----------------------------------------- */

    choices.forEach(
        item => {

            item.classList.remove(
                "selected"
            );

            item.classList.remove(
                "choice-confirmed"
            );

            item.removeAttribute(
                "aria-pressed"
            );

        }
    );


    /* -----------------------------------------
       SELECT CURRENT CHOICE
    ----------------------------------------- */

    choice.classList.add(
        "selected"
    );

    choice.setAttribute(
        "aria-pressed",
        "true"
    );


    /* -----------------------------------------
       GET VALUE
    ----------------------------------------- */

    const value =
        choice.dataset.value;


    if (!value) {

        console.warn(
            "Selected choice has no data-value:",
            choice
        );

        return;

    }


    /* -----------------------------------------
       SAVE ANSWER
    ----------------------------------------- */

    window.siteState.answers[
        questionType
    ] = value;


    console.log(
        "Answer saved:",
        questionType,
        value
    );


    /* -----------------------------------------
       FEEDBACK
    ----------------------------------------- */

    choiceFeedback(
        choice
    );

}


/* =========================================================
   CHOICE FEEDBACK
========================================================= */

function choiceFeedback(choice) {

    choice.classList.add(
        "choice-confirmed"
    );


    /* -----------------------------------------
       Remove feedback after short delay.
       IMPORTANT:
       Do NOT replace innerHTML because buttons
       contain their original text.
    ----------------------------------------- */

    setTimeout(
        () => {

            choice.classList.remove(
                "choice-confirmed"
            );

        },
        700
    );

}


/* =========================================================
   ANALYSIS BUTTON
========================================================= */

function initializeAnalysis() {

    const button =
        document.getElementById(
            "calculateButton"
        );


    if (!button) {

        console.warn(
            "Calculate button #calculateButton not found."
        );

        return;

    }


    console.log(
        "✓ Calculate button connected"
    );


    /* -----------------------------------------
       Prevent duplicate listeners
    ----------------------------------------- */

    if (
        button.dataset.analysisConnected ===
        "true"
    ) {

        return;

    }


    button.dataset.analysisConnected =
        "true";


    button.addEventListener(
        "click",
        runAnalysis
    );

}


/* =========================================================
   RUN ANALYSIS
========================================================= */

function runAnalysis(event) {

    if (event) {

        event.preventDefault();

    }


    console.log(
        "Starting analysis..."
    );


    const questions =
        document.querySelectorAll(
            ".question"
        );


    const button =
        document.getElementById(
            "calculateButton"
        );


    if (!questions.length) {

        console.error(
            "No questions found."
        );

        return;

    }


    let answered = 0;


    /* -----------------------------------------
       CHECK ALL QUESTIONS
    ----------------------------------------- */

    questions.forEach(
        question => {

            const selected =
                question.querySelector(
                    ".choice.selected"
                );


            if (selected) {

                answered++;


                const questionType =
                    question.dataset.question;


                const value =
                    selected.dataset.value;


                if (
                    questionType &&
                    value
                ) {

                    window.siteState.answers[
                        questionType
                    ] = value;

                }

            }

        }
    );


    console.log(
        `Answered ${answered} of ${questions.length}`
    );


    /* -----------------------------------------
       INCOMPLETE
    ----------------------------------------- */

    if (
        answered <
        questions.length
    ) {

        showIncompleteMessage(
            button
        );

        return;

    }


    /* -----------------------------------------
       COMPLETE
    ----------------------------------------- */

    console.log(
        "✓ All questions answered"
    );


    console.log(
        "Final answers:",
        window.siteState.answers
    );


    /* -----------------------------------------
       FIND ALGORITHM SECTION
    ----------------------------------------- */

    const algorithm =
        document.getElementById(
            "algorithm"
        );


    if (!algorithm) {

        console.error(
            "Section #algorithm not found."
        );

        return;

    }


    /* -----------------------------------------
       SCROLL TO ALGORITHM
    ----------------------------------------- */

    scrollToElement(
        algorithm
    );


    /* -----------------------------------------
       START ANALYSIS
    ----------------------------------------- */

    setTimeout(
        () => {

            startAnalysisAnimation();

        },
        650
    );

}


/* =========================================================
   INCOMPLETE MESSAGE
========================================================= */

function showIncompleteMessage(
    button
) {

    if (!button) {

        return;

    }


    /* -----------------------------------------
       Prevent stacking messages
    ----------------------------------------- */

    if (
        button.dataset.incompleteRunning ===
        "true"
    ) {

        return;

    }


    button.dataset.incompleteRunning =
        "true";


    const originalHTML =
        button.innerHTML;


    const originalBorder =
        button.style.borderColor;


    button.innerHTML = `
        <span>ANSWER EVERYTHING FIRST</span>
        <span>!</span>
    `;


    button.style.borderColor =
        "rgba(199,167,106,0.8)";


    button.classList.remove(
        "incomplete"
    );


    /* Force animation restart */

    void button.offsetWidth;


    button.classList.add(
        "incomplete"
    );


    /* -----------------------------------------
       Restore button
    ----------------------------------------- */

    setTimeout(
        () => {

            button.innerHTML =
                originalHTML;


            button.style.borderColor =
                originalBorder;


            button.classList.remove(
                "incomplete"
            );


            button.dataset.incompleteRunning =
                "false";

        },
        1600
    );

}


/* =========================================================
   SCROLL HELPER
========================================================= */

function scrollToElement(
    element
) {

    if (!element) {

        return;

    }


    /*
       Account for browser viewport
       and keep the section centered.
    */

    element.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* =========================================================
   ANALYSIS ANIMATION
========================================================= */

function startAnalysisAnimation() {

    console.log(
        "Running analysis animation..."
    );


    const analysis =
        document.getElementById(
            "analysisScreen"
        );


    const result =
        document.getElementById(
            "resultScreen"
        );


    /* -----------------------------------------
       CHECK ELEMENTS
    ----------------------------------------- */

    if (!analysis) {

        console.error(
            "#analysisScreen not found."
        );

        return;

    }


    if (!result) {

        console.error(
            "#resultScreen not found."
        );

        return;

    }


    /* -----------------------------------------
       RESET ANALYSIS
    ----------------------------------------- */

    analysis.style.display =
        "block";

    analysis.style.opacity =
        "1";

    analysis.style.transform =
        "translateY(0)";


    result.style.display =
        "none";

    result.style.opacity =
        "0";

    result.style.transform =
        "translateY(30px)";


    /* -----------------------------------------
       FIND BARS
    ----------------------------------------- */

    const bars =
        analysis.querySelectorAll(
            ".analysis-bar span"
        );


    const statuses =
        analysis.querySelectorAll(
            ".analysis-status"
        );


    console.log(
        "Analysis bars:",
        bars.length
    );


    console.log(
        "Analysis statuses:",
        statuses.length
    );


    /* -----------------------------------------
       RESET BARS
    ----------------------------------------- */

    bars.forEach(
        bar => {

            bar.style.transition =
                "none";

            bar.style.width =
                "0%";

        }
    );


    /* -----------------------------------------
       RESET STATUS
    ----------------------------------------- */

    statuses.forEach(
        status => {

            status.style.transition =
                "none";

            status.style.opacity =
                "0.4";

        }
    );


    /* -----------------------------------------
       FORCE REFLOW
    ----------------------------------------- */

    void analysis.offsetWidth;


    /* -----------------------------------------
       ANIMATE EACH BAR
    ----------------------------------------- */

    bars.forEach(
        (bar, index) => {

            setTimeout(
                () => {

                    bar.style.transition =
                        "width 0.85s cubic-bezier(.22,1,.36,1)";

                    bar.style.width =
                        "100%";

                },
                index * 850
            );

        }
    );


    /* -----------------------------------------
       ANIMATE STATUS TEXT
    ----------------------------------------- */

    statuses.forEach(
        (status, index) => {

            setTimeout(
                () => {

                    status.style.transition =
                        "opacity 0.5s ease";

                    status.style.opacity =
                        "1";

                },
                index * 850 + 300
            );

        }
    );


    /* -----------------------------------------
       FADE ANALYSIS OUT
    ----------------------------------------- */

    setTimeout(
        () => {

            analysis.style.transition =
                "opacity 0.8s ease, transform 0.8s ease";

            analysis.style.opacity =
                "0";

            analysis.style.transform =
                "translateY(-20px)";

        },
        3350
    );


    /* -----------------------------------------
       SHOW RESULT
    ----------------------------------------- */

    setTimeout(
        () => {

            analysis.style.display =
                "none";


            result.style.display =
                "block";


            result.style.opacity =
                "0";


            result.style.transform =
                "translateY(30px)";


            /* Force browser to recognize
               the initial state */

            void result.offsetWidth;


            requestAnimationFrame(
                () => {

                    result.style.transition =
                        "opacity 1s cubic-bezier(.22,1,.36,1), " +
                        "transform 1s cubic-bezier(.22,1,.36,1)";


                    result.style.opacity =
                        "1";


                    result.style.transform =
                        "translateY(0)";

                }
            );


            console.log(
                "✓ Analysis complete"
            );

        },
        4200
    );

}


/* =========================================================
   NEXT SECTION BUTTONS
========================================================= */

function initializeNextSectionButtons() {

    const buttons =
        document.querySelectorAll(
            ".next-section"
        );


    console.log(
        "Next section buttons:",
        buttons.length
    );


    if (!buttons.length) {

        return;

    }


    buttons.forEach(
        button => {

            button.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    const targetId =
                        button.dataset.target;


                    if (!targetId) {

                        console.warn(
                            "Next button has no data-target:",
                            button
                        );

                        return;

                    }


                    const target =
                        document.getElementById(
                            targetId
                        );


                    if (!target) {

                        console.error(
                            `Target section #${targetId} not found.`
                        );

                        return;

                    }


                    console.log(
                        "Moving to:",
                        targetId
                    );


                    scrollToElement(
                        target
                    );

                }
            );

        }
    );

}


/* =========================================================
   HOVER FEEDBACK
========================================================= */

function initializeHoverFeedback() {

    const interactiveElements =
        document.querySelectorAll(
            ".choice, .primary-button"
        );


    if (!interactiveElements.length) {

        return;

    }


    interactiveElements.forEach(
        element => {

            element.addEventListener(
                "mouseenter",
                () => {

                    element.style.transition =
                        "all 0.3s ease";

                }
            );

        }
    );

}


/* =========================================================
   PUBLIC FUNCTIONS
========================================================= */

window.runAnalysis =
    runAnalysis;


window.startAnalysisAnimation =
    startAnalysisAnimation;


window.scrollToElement =
    scrollToElement;


/* =========================================================
   DEBUG HELPER
========================================================= */

console.log(
    "✓ interaction.js loaded successfully"
);