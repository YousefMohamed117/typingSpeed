/*
  Advices
  - Always Check The Console
  - Take Your Time To Name The Identifiers
  - DRY

  Steps To Create The Project
  [01] Create HTML Markup
  [02] Add Styling And Separate From Logic
  [03] Create The App Logic
  ---- [01] Add Levels
  ---- [02] Show Level And Seconds
  ---- [03] Add Array Of Words
  ---- [04] ِAdd Start Game Button
  ---- [05] Generate Upcoming Words
  ---- [06] Disable Copy Word And Paste Event + Focus On Input
  ---- [07] Start Play Function
  ---- [08] Start The Time And Count Score
  ---- [09] Add The Error And Success Messages
  [04] Your Trainings To Add Features
  ---- [01] Save Score To Local Storage With Date
  ---- [02] Choose Levels From Select Box
  ---- [03] Break The Logic To More Functions
  ---- [04] Choose Array Of Words For Every Level
  ---- [05] Write Game Instruction With Dynamic Values
  ---- [06] Add 3 Seconds For The First Word
*/

// Array Of Words
const words = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
];

/////////////////////////////////////////////////
let lvl = document.querySelector(".message .lvl");
let seconds = document.querySelector(".message .seconds");
let start = document.querySelector(".start");
let theWord = document.querySelector(".the-word");
let input = document.querySelector("input");
let comingWords = document.querySelector(".upcoming-words");
let timeLeft = document.querySelector(".time span");
let score = document.querySelector(".score .got");
let fScore = document.querySelector(".score .total");
let finish = document.querySelector(".finish");
let comp = document.getElementById("comp");
/////////////////////////////////////////////////
const lvls = {
  easy: 5,
  normal: 3,
  hard: 2,
};
///////////////////////////////////////////////
let def;
comp.onclick = function (e) {
  def = e.target.dataset.id;
  comp.parentElement.remove()
  /////////////////////////
  let defaultLvl = def;
  let dafaultTime = lvls[defaultLvl];

  /////////////////////////////////////////////////
  lvl.innerHTML = defaultLvl;
  seconds.innerHTML = dafaultTime;
  fScore.innerHTML = words.length;
  timeLeft.innerHTML = dafaultTime;
  ////////////////////////////////////////////////
  start.onclick = function () {
    start.remove();
    input.focus();
    genWords();
  };
  input.onpaste = () => false;
  //////////////////////////////////////////////
  function genWords() {
    comingWords.innerHTML = "";
    let randomWord = words[Math.floor(Math.random() * words.length)];
    let randomWordIndex = words.indexOf(randomWord);
    words.splice(randomWordIndex, 1);
    ///
    for (i = 0; i < words.length; i++) {
      let div = document.createElement("div");
      div.append(document.createTextNode(words[i]));
      comingWords.append(div);
    }
    ///
    theWord.innerHTML = randomWord;
    play();
  }
  ////////////////////////////////////////////
  function play() {
    timeLeft.innerHTML = dafaultTime;
    if(words.length = 29){
        timeLeft.innerHTML = dafaultTime + 3;
    }
    let int = setInterval(() => {
      timeLeft.innerHTML--;
      if (timeLeft.innerHTML == "0") {
        clearInterval(int);
        if (input.value.toLowerCase() == theWord.innerHTML.toLowerCase()) {
          score.innerHTML++;
          input.value = ''


            localStorage.setItem('score' , score.innerHTML)


          if (words.length > 0) {
            genWords();
          } else {
            let div = document.createElement("div");
            div.className = "finish";
            let span = document.createElement("span");
            span.append(document.createTextNode("Congratz"));
            span.className = "good";
            div.append(span);
            finish.append(div);
            setTimeout(()=> location.reload() , 2000)
          }
        } else {
          let div = document.createElement("div");
          div.className = "finish";
          let span = document.createElement("span");
          span.append(document.createTextNode("Game Over"));
          span.className = "bad";
          div.append(span);
          finish.append(div);
          setTimeout(()=> location.reload() , 2000)
        }
      }
    }, 1000);
  }
  ////////////////////////////////
};
