document.addEventListener('DOMContentLoaded', function() {


  // VARS
  var snd = new Audio('sounds/rifle-cut.mp3');
  var laugh = new Audio('sounds/laugh.mp3');
  var player1 = document.querySelector('#player-1');
  var player2 = document.querySelector('#player-2');
  var players = [player1, player2];
  var player1answers = [];
  var player2answers = [];
  var playersAnswers = [player1answers, player2answers];
  var currentPlayer = 0;
  var randomProblem;
  var actualAnswer;
  var currentCircle;
  var answerArr = [1, 4, 7, 8, 12, 18, 22, 34, 35, 37, 44, 45, 50, 51, 56, 78, 81, 92, 99];
  var questionArr = ['(2*3)/6', '2+2', '(30/2)-8', '2*2*2', '6*2', '(4*4)+2', '44/2', '100-66', '(35/5)+28', '(6*5)+7', '11*4', '90/2', '(100/4)*2', '(2*15)+(3*7)', '(6*9)+2', '((3*3)*2)+60', '9*9', '200-(100+8)', '((3*3)*9)+9+9'];
  var question = document.querySelector('#question')
  var container = document.getElementById('container');
  var boxColors = ['#4AD9D9', '#F5A503', '#F2385A', '#36B1BF', '#2E0927', '#A49A87', '#FF974F', '#BEDB39', '#FFE11A', '#004358', '#3498DB'];



  //CALL MAKE CIRCLES
  makeCircles();

  //GRABS EVERY DIV WITH THE CLASS BOX AND FOR EACH CALLS THE ANIMATE FUNCTION
  $(".box").each(function() {
    animateDiv($(this));
  });
  // CALLS THE RANDOM QUESTION FUNCTION
  getRandomQuestion();
  //PLAYS THE GUNSHOT SOUND WHEN EVER THERE IS A CLICK ANYWHERE
  $("body").on("click", function() {
    snd.play();
    snd.currentTime = 0;
  });
  // MAIN CLICK EVENT THAT CALLS THE CHECKANSWER FUNCTION
  $(".box").click(checkAnswer);
  // CREATED A FOR LOOP SO THAT I CAN RANDOMIZE BACKGROUND COLORS FOR ALL THE CIRCLES
  function makeCircles() {
    for (var i = 0; i < answerArr.length; i++) {
      // CREATE 'div' AND SET ITS CLASS AS BOX
      var div = document.createElement('div')
      div.setAttribute('class', 'box');
      // TAKE A RANDOM INDEX FROM THE 'boxColors' ARRAY AND ASSIGN IT TO THE DIV'S 'backgroundColor'
      div.style.backgroundColor = boxColors[Math.floor(Math.random() * boxColors.length)];

      // THIS TAKES THE ANSWERS ARRAY AND MAKES IT A TEXT NODE AND APPENDS IT INTO THE DIVS THAT WERE CREATED
      // THEN IT ASSIGNS EACH DIV AN ID WITH THE SAME NUMBER

      var answerTextNode = document.createTextNode(answerArr[i]);
      div.appendChild(answerTextNode);
      div.setAttribute('id', (answerArr[i]));
      container.appendChild(div);
      console.log(answerArr[i]);
    }
  };

  // CREATE A RANDOM QUESTION FROM THE 'questionArr' AND APPENDS IT INTO THE QUESTION DIV
  function getRandomQuestion() {
    // GET A RANDOM INDEX OF THE 'questionArr' AND SET IT TO VARIABLE 'questionArrEnd'
    var randomProblemIndex = Math.floor(Math.random() * questionArr.length);
    var questionArrEnd = questionArr.splice(randomProblemIndex);
    //SHIFT TAKES THE FIRST INDEX OF 'questionArrEnd', STORES IT, AND REMOVES IT FROM ARRAY
    randomProblem = questionArrEnd.shift();
    // GLUE ARRAY BACK TOGETHER
    questionArr = questionArr.concat(questionArrEnd);
    console.log(randomProblem);
    var h2 = document.createElement('h2')
    h2.appendChild(document.createTextNode('What is' + " " + randomProblem + " ?"));
    question.appendChild(h2);
    // EVAL RUNS THE STRING ('randomProblem') AS CODE
    actualAnswer = eval(randomProblem);
  }

  function checkAnswer() {
    //FINDS THE CURRENT CIRCLE THAT WAS CLICKED AND GETS THE VALUE FROM THE CIRCLE
    currentCircle = $(this);
    var currentAnswer = parseInt(currentCircle.text());
    console.log(randomProblem);
    console.log(currentAnswer);

    if (currentAnswer === actualAnswer) {
      markAnswerCorrect(currentAnswer);
      getRandomQuestion();
    } else {
      markAnswerIncorrect();
    }
    checkRemainingProblems();
  }

  function checkRemainingProblems () {
    if (($.trim($("#container").html())=='')) {
      endGame();
    }
  }

  function endGame () {
    var h2 = document.createElement('h2');
    // COMPARE PLAYER SCORES AND ALERT WINNER
    if (player1answers.length > player2answers.length) {
      $('h2').empty();
      h2.appendChild(document.createTextNode('Player 1 Wins!'));
      question.appendChild(h2);
    } else if (player2answers.length > player1answers.length) {
      $('h2').empty();
      h2.appendChild(document.createTextNode('Player 2 Wins!'));
      question.appendChild(h2);
    } else if (player1answers.length == player2answers.length) {
      $('h2').empty();
      h2.appendChild(document.createTextNode('It\'s a tie!!'));
      question.appendChild(h2);
    }
  }

  function markAnswerCorrect (currentAnswer) {
    // alert('yay')
    playersAnswers[currentPlayer].push(currentAnswer);
    players[currentPlayer].querySelector('.score').innerHTML = playersAnswers[currentPlayer].length;
    $('h2').remove();
    currentCircle.toggle('explode').remove();
  }

  function markAnswerIncorrect () {
    // alert('oops!')
    $('.dog').addClass('dog-move');
    // SET TIME OUT IS A FUNCTION THAT TAKES 2 ARGUMENTS,
    // ONE IS THE FUNCTION TO RUN, TWO IS THE DELAY
    setTimeout(function removeDog () {
      $('.dog').removeClass('dog-move')

    }, 2000)
    laugh.play();
    laugh.currentTime = 0;
    // alert('You missed!');
    togglePlayer();
  }

  // IF THE PLAYER GUESSES WRONG THEN THE CURRENT PLAYER
  // IS SET TO THE ABSOLUTE VALUE OF IT - 1
  function togglePlayer () {
    currentPlayer = Math.abs(currentPlayer - 1);
  };

  // FOUND THIS CODE ON JSFIDDLE ON HOW TO ANIMATE DIVS IN A RANDOM POSITION
  // USING POSITION FIXED AND RANDOMIZING THE Y AND X AXIS,
  // WHILE ALSO RANDOMIZING THE SPEED AT WHICH IT TRAVELS.

  // CITATION: http://jsfiddle.net/Xw29r/15/
  function makeNewPosition($container) {

    // Get viewport dimensions (remove the dimension of the div)
    var h = $container.height() - 125;
    var w = $container.width() - 125;

    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);

    return [nh, nw];
  }

  function animateDiv($target) {
    var newq = makeNewPosition($target.parent());
    var oldq = $target.offset();
    var speed = calcSpeed([oldq.top, oldq.left], newq);

    $target.animate({
      top: newq[0],
      left: newq[1]
    }, speed, function() {
      animateDiv($target);
    });
  };

  function calcSpeed(prev, next) {
    var x = Math.abs(prev[1] - next[1]);
    var y = Math.abs(prev[0] - next[0]);

    var greatest = x > y ? x : y;

    var speedModifier = 0.1;

    var speed = Math.ceil(greatest / speedModifier);

    return speed;
  }
});
