## DUCK HUNT: MATH EDITION
---
**Overview**

The game that I built is basically the game Duck Hunt but with math problems, where there are floating circles with numbers inside them and a random problem at the bottom. You have to fire (click on the circle with the correct answer) to get a point and a new question. If you miss, the turn switches and the next player goes until we have no more circles and a winner is declared.

---
**How it works and the technologies it relies on.**

Technology used:
- html
- css
- javascript
- jquery
- also looked up the code on JSFiddle on how to make the elements move randomly. Citation: ``http://jsfiddle.net/Xw29r/15/``

How it works

- The HTML has just a container and a couple divs in a footer for the question, player scores, and image.
- The CSS had a little more styling, with basic colors, fonts set up, and making sure things were centered.
- Javascript:
  1. After setting up all my global variables, I created the array for the answers (answerArr) and an array for the questions (questionArr). I then called a function to makeCircles, which creates a loop that goes through the answer array, creates a div with a class and randomly assigns it a color from the boxColors array. Then call the animateDiv function that targets all divs with the class .box and for each one animates them randomly using the function cited above.

  2. Then I called getRandomQuestion which picked a random problem, created an h2 element and appended that problem inside a string.

  3. I set a click event on the circle that was being clicked using Jquery and ran a checkAnswer function, which evaluated the number inside the circle and the question. The checkAnswer function then call an if else statement. Then it gets evaluated and either marked correct (deleting that circle div) or incorrect (and switching turns), and then checks the amount of problems remaining. When the container div is empty (meaning that there are no more floating circles), then you run the endgame function which compares the scores (based on the array.length of each players array) of the players and declares a winner.
