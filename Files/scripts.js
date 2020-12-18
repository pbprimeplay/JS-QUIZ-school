var name;
var username;
const startingMinutes = 12;
let time = startingMinutes * 60;

const countdownEl = document.getElementById("time");

let minutes;
let seconds;

var answerList = [];

function updateCountdown() {
    minutes = Math.floor(time/60);
    seconds = padding(time % 60);

    countdownEl.innerHTML = `${minutes}:${seconds}`;
    time--;

    if (minutes == 0 && seconds == 0) {
        showScores();
    }

    if (minutes == 0 && 10 > seconds) {
        countdownEl.style.color = "red";
    }
}

function padding(n){
    return n > 9 ? "" + n : "0" + n;
}

function startQuiz() {
    setInterval(updateCountdown, 1000)
    name = document.getElementById('name').value;
    var errormsg = document.getElementById('errormsg')

    if (name != "") {
        var x = document.getElementById("grid")
        x.style.display = "block";
        var y = document.getElementById("welcome")
        var z = document.getElementById("hello")
        y.style.display = "none"
        z.style.display = "block"

        populate();
    }

    else {
        errormsg.innerHTML = "Please enter your name to continue"
    }
  }

function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        username = document.getElementById("username");
        element.innerHTML = quiz.getQuestionIndex().text;
        username.innerHTML = "Hello, " + name + "!";

        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        answerList.push(guess);
        populate();
    }
};


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    var response;
    var addMoreRes = '';
    gameOverHTML += "<h2 id='score' style='margin: 0px; text-align: center;'> Your score: " + quiz.score + "/" + quiz.questions.length + "</h2>";
    gameOverHTML += "<br><br><table id='results'><tr><td colspan='3' style='text-align : center'><p>Your Performance</p></td></tr>";
    gameOverHTML += "<tr><td><p>Question</p></td><td><p>Your answer</p></td><td><p>Correct answer</p></td></tr>";
    var element = document.getElementById("quiz");
    var grid = document.getElementById("grid");
    grid.style.height = "700px";

    var image;

    for (i=1; i <= questions.length; i++) {

        if (answerList[i-1] == questions[i-1].answer) {
            image = '<img src="tick.png" alt="" style="height: 20px; width: 20px;">'
        }

        else{
            image = '<img src="cross.png" alt="" style="height: 20px; width: 20px;">'
        }

        addMoreRes += `<tr><td>${image} Question ${i}</td><td>${answerList[i-1]}</td><td>${questions[i-1].answer}</td></tr>`
    }

    // resultTable.innerHTML += addMoreRes
    gameOverHTML += addMoreRes;
    gameOverHTML += "</table>";
    element.innerHTML = gameOverHTML;

    if (quiz.score == 10) {
        response = "All correct!! That's stupendous, " + name + "! Hope you enjoyed playing!"
    }

    else if (quiz.score >= 7) {
        response = "Great going, " + name + "! Hope you enjoyed playing!"
    }

    else if (quiz.score >= 4) {
        response = "You tried well, " + name + ". Better luck next time!"
    }

    else {
        response = "It doesn't seem to be your day, " + name + ". Try to improve next time!"
    }

    username.innerHTML = response
};

// create questions
var questions = [
    new Question("A quadrilateral has 3 acute angles each measuring 80°. What is the measure of the 4th angle?", ["A. 120°", "B. 180°","C. 90°", "D. 270°"], "A. 120°"),
    new Question("Find the area of an equilateral triangle whose perimeter 18 cm", ["A. 36 sq. cm", "B. 18 sq. cm", "C. 9 x √3 sq. cm", "D. √18"], "C. 9 x √3 sq. cm"),
    new Question("The circumference of a circle is 176cm. What is the area?", ["A. 2634 sq. cm", "B. 2464 sq. cm","C. 2364 sq. cm", "D. None of these"], "B. 2464 sq. cm"),
    new Question("What is the measure of each angle in a decagon?", ["A. 1880°", "B. 2200°", "C. 144°", "D. 1440°"], "C. 144°"),
    new Question("What is the area of a rhombus with diagonals 5cm & 4cm respectively?", ["A. 10 sq. cm", "B. 15 sq. cm", "C. 20 sq.cm", "D. Cannot be determined"], "A. 10 sq. cm"),
    new Question("What is the area of a right angled triangle, which has a base of 4cm and hypotenuse of 5cm?", ["A. 6 sq. cm", "B. 3 sq. cm", "C. 18 sq. cm", "D. 12 sq. cm"], "A. 6 sq. cm"),
    new Question("If the two shorter sides of a triangle are 12cm and 8cm, what could be the third and longest side of the triangle?", ["A. 11-13cm", "B. 24-28cm", "C. 15-19cm", "D. Data inadequate"], "C. 15-19cm"),
    new Question("A square has a side of 60m and a rectangle has a height of 80m. Both have equal perimeter. Which of them has a greater area?", ["A. Rectangle", "B. Square", "C. Both are equal", "D. Data inadequate"], "B. Square"),
    new Question("How many revolutions will it take for a wheel with a diameter of 84cm to cover 66m?", ["A. 25", "B. 35", "C. 50", "D. 125"], "A. 25"),
    new Question("If the ratio of the areas of two triangles is 16:9, what is the ratio of their perimeter?", ["A. 16:9", "B. 3:4", "C. 4:3", "D. None of these"], "C. 4:3")
];

// create quiz
var quiz = new Quiz(questions);