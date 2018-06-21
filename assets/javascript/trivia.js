$(document).ready(function () {
    $("#theBeginning").hide();
    $("#messageSection").hide();
    $('#instructionModal').modal();
    $('.parallax').parallax(); 
    $('.tooltipped').tooltip({ 
        delay: 50
    });


    $("#introSection").fadeIn(1000 * 5, function () { 
    });

    $("#questionSpace").hide()
    var correctCounter = 0,
        incorrectCounter = 0,
        unansweredCounter = 0,
        currentQuestionIndex = 0;


    var congratsMessages = ['Way to go', 'Kind of nice being smart and stuff', "Yes Sir"];

    function randomNum(x) {
        var roll = Math.floor(Math.random() * x);
        return roll;
    }

    function randomCongrats() {
        var messageRoll = randomNum(congratsMessages.length);
    }

    function countDown() {
        $('.pickAnswer').click(function () {
            $(this).data('clicked', true);
        });
        var i = 30;
        var myInterval = setInterval(function () {

            if (i < 10) {
                $('#timerSeconds').html("0" + i);
                $(".pickAnswer").on("click", function () {
                    clearInterval(myInterval);
                })
            } else {
                $('#timerSeconds').html(i);
                $(".pickAnswer").on("click", function () {
                    clearInterval(myInterval);
                })
            }

            if (i === 0) {
                unansweredCounter++;
                clearInterval(myInterval);
                currentQuestionIndex++;
                $('#timer').effect("pulsate", {
                    times: 25
                }, 1000 * 5);
                i = 30;
                postQuestion(currentQuestionIndex);
            } else {
                i--;
            }
        }, 1000);
    }

    var questions = [
        {
            "q": "Which artist painted a mustache and goatee on the Mona Lisa?",
            "c": ["Van Gogh", "Marcel Duchamp", "Pablo Picasso"],
            "answer": 1
        },
        {
            "q": "In which country would one find 8 of the world's 10 highest mountains?",
            "c": ["Pakistan", "Budapest", "Nepal"],
            "answer": 2
        },
        {
            "q": "Which is the only vowel on a standard keyboard that is not on the top line of letters",
            "c": ["a", "e", "i", "o","u"],
            "answer": 0
        },
        {
            "q": "What is the most popular drink in the world that does not contain alcohol?",
            "c": ["water", "coke", "coffee", "tea"],
            "answer": 2
        },
        {
            "q": "Does sound travel faster through?",
            "c": ["air", "steel", "water"],
            "answer": 2
        },
        {
            "q": "What is the capital of Australia",
            "c": ["Sydney", "Canberra", "London"],
            "answer": 1
        },
        {
            "q": "What is the largest fish in the ocean?",
            "c": ["A Blue Whale", "A Whale Shark", "A Killer Whale"],
            "answer": 1
        },
        {
            "q": "What was the first planet to be discovered using the telescope, in 1781?",
            "c": ["Uranus", "Jupiture", "Pluto"],
            "answer": 0
        },
        {
            "q": "What is the most common blood type in humans?",
            "c": ["Type O", "Type A", "Type B", "Type AB"],
            "answer": 0
        },
        {
            "q": "Which is the largest planet in the solar system",
            "c": ["Pluto", "Saturn", "Jupiter"],
            "answer": 2
        }
    ];


    function postQuestion(n) {

        if (currentQuestionIndex < questions.length) {
            $('#question').remove();
            $('.pickAnswer').remove();
            countDown();
            $('#questionContainer').append("<div id='question'>" + questions[n].q + "</div>");
            for (var i = 0; i < questions[n].c.length; i++) {
                var newDiv = $("<div>");
                newDiv.addClass("pickAnswer").attr("indexnum", i).text(questions[n].c[i]);
                $('#choices').append(newDiv);
            }


        } else {
            resetGame(); 
        }

        $(".pickAnswer").on("click", function () {
            var userChoice = $(this).attr('indexnum'); 
            userChoice = parseInt(userChoice);

            if (userChoice === questions[currentQuestionIndex].answer) {
                correctCounter++;
                currentQuestionIndex++;
                randomCongrats();

            } else {
                incorrectCounter++;
                currentQuestionIndex++;

            }
            postQuestion(currentQuestionIndex);
        })
    }

    function startTrivia() {
        $('#messageSection').hide();
        $('#gameMessage').empty()
        $('#questionContainer').show();
        $('#choices').show();
        $("#timer").show();
        correctCounter = 0;
        incorrectCounter = 0;
        unansweredCounter = 0;
        currentQuestionIndex = 0;

        postQuestion(currentQuestionIndex);

    }

    function resetGame() {
        $('#messageSection').show();
        $('#questionContainer').hide();
        $('#choices').hide();
        $('#timer').hide()

        $('#gameMessage').append("<h2>You have completed the game!</h2>");
        $('#gameMessage').append("<h4>Total Correct: " + correctCounter + "</h4>");
        $('#gameMessage').append("<h4>Total Incorrect: " + incorrectCounter + "</h4>");
        $('#gameMessage').append("<h4>Total Unanswered: " + unansweredCounter + "</h4>");

        setTimeout(startTrivia, 1000 * 10);

    }



    $("#startButton").on("click", function () {
        $("#buttonRow").hide();
        $("#introCard").remove();
        $("#timer").append("<span id='timerMinutes'>00</span>:<span id='timerSeconds'>00</span>");
        $("#questionSpace").show();

        startTrivia();


    })


});