const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answers");
const nextBtn = document.getElementById("next");
const scoreEl = document.getElementById("score");
const questionCount = document.getElementById("count");
const finalScore = document.getElementById("final-score");

const API_URL = "https://opentdb.com/api.php?amount=10";

let currentQuestion = 0;
let questions = [
  {
    category: "Science: Mathematics",
    type: "boolean",
    difficulty: "medium",
    question:
      "The proof for the Chinese Remainder Theorem used in Number Theory was NOT developed by its first publisher, Sun Tzu.",
    correct_answer: "True",
    incorrect_answers: ["False"],
  },
  {
    category: "General Knowledge",
    type: "multiple",
    difficulty: "medium",
    question:
      "What did the Spanish autonomous community of Catalonia ban in 2010, that took effect in 2012?",
    correct_answer: "Bullfighting",
    incorrect_answers: ["Fiestas", "Flamenco", "Mariachi"],
  },
  {
    category: "Entertainment: Video Games",
    type: "multiple",
    difficulty: "easy",
    question: "What year did the game &quot;Overwatch&quot; enter closed beta?",
    correct_answer: "2015",
    incorrect_answers: ["2013", "2011", "2016"],
  },
  {
    category: "Entertainment: Music",
    type: "multiple",
    difficulty: "hard",
    question:
      "What is the English title of the vaporwave track &quot;リサフランク420 / 現代のコンピュー&quot; by Macintosh Plus (Vektroid)?",
    correct_answer: "Lisa Frank 420 / Modern Computing",
    incorrect_answers: [
      "Smoke Weed 420 / Everyday",
      "Make Your Move 420 / My Mind",
      "It&#039;s All In Your Head 420 / Understand",
    ],
  },
  {
    category: "Entertainment: Japanese Anime & Manga",
    type: "multiple",
    difficulty: "medium",
    question:
      "The main antagonist of the second part of JoJo&#039;s Bizarre Adventure is which of the following?",
    correct_answer: "Kars",
    incorrect_answers: ["Erina Joestar", "Santana", "Wired Beck"],
  },
  {
    category: "Entertainment: Film",
    type: "boolean",
    difficulty: "medium",
    question:
      "Sean Connery wasn&#039;t in &quot;Indiana Jones and the Kingdom of the Crystal Skull&quot; because he found retirement too enjoyable.",
    correct_answer: "True",
    incorrect_answers: ["False"],
  },
  {
    category: "Mythology",
    type: "multiple",
    difficulty: "easy",
    question: "In Greek mythology, who is the god of wine?",
    correct_answer: "Dionysus",
    incorrect_answers: ["Hephaestus", "Demeter", "Apollo"],
  },
  {
    category: "Entertainment: Video Games",
    type: "multiple",
    difficulty: "medium",
    question:
      "Who voices the infamous Citadel Station A.I known as S.H.O.D.A.N, in the System Shock games?",
    correct_answer: "Terri Brosius",
    incorrect_answers: [" Jennifer Hale", "Jenn Taylor", "Lori Alan"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does LTS stand for in the software market?",
    correct_answer: "Long Term Support",
    incorrect_answers: [
      "Long Taco Service",
      "Ludicrous Transfer Speed",
      "Ludicrous Turbo Speed",
    ],
  },
  {
    category: "Politics",
    type: "boolean",
    difficulty: "hard",
    question: "Joko Widodo has appeared in the cover of a TIME magazine.",
    correct_answer: "True",
    incorrect_answers: ["False"],
  },
  {
    category: "Entertainment: Cartoon & Animations",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is lost in Hawaiian and is also the name of a little girl in a 2002 film which features a alien named &quot;Stitch&quot;?",
    correct_answer: "Lilo",
    incorrect_answers: ["Lolo", "Lucy", "Lulu"],
  },
  {
    category: "Entertainment: Film",
    type: "boolean",
    difficulty: "easy",
    question:
      "Brandon Routh plays the titular character in the movie &quot;John Wick&quot;.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Entertainment: Video Games",
    type: "multiple",
    difficulty: "hard",
    question:
      "In Super Smash Bros. for Nintendo 3DS and Nintendo Wii U, who was the sixth fighter to be added to the game post-launch?",
    correct_answer: "Corrin",
    incorrect_answers: ["Cloud", "Bayonnetta", "Ryu"],
  },
  {
    category: "Entertainment: Japanese Anime & Manga",
    type: "multiple",
    difficulty: "easy",
    question: "Which of the following originated as a manga?",
    correct_answer: "Akira",
    incorrect_answers: ["Cowboy Bebop", "High School DxD", "Gurren Lagann"],
  },
  {
    category: "Entertainment: Video Games",
    type: "multiple",
    difficulty: "medium",
    question:
      "In &quot;Call of Duty: Black Ops III&quot; Zombies, what does completing all the main easter eggs reward you with?",
    correct_answer: "1,000,000 XP",
    incorrect_answers: [
      "Juggernog at the start of each game",
      "50 Liquid Diviniums",
      "All three options.",
    ],
  },
  {
    category: "Entertainment: Video Games",
    type: "multiple",
    difficulty: "medium",
    question:
      "In the beginning of the game &quot;Sonic Adventure&quot;, what color Chaos Emerald does Tails own?",
    correct_answer: "Purple",
    incorrect_answers: ["Red", "Green", "Blue"],
  },
  {
    category: "Entertainment: Video Games",
    type: "multiple",
    difficulty: "hard",
    question:
      "In &quot;Team Fortress 2&quot;, how much health does a scout have when overhealed?",
    correct_answer: "185",
    incorrect_answers: ["215", "195", "225"],
  },
  {
    category: "Geography",
    type: "multiple",
    difficulty: "medium",
    question: "Which of the following is the longest river in Europe?",
    correct_answer: "Volga",
    incorrect_answers: ["Danube", "Ural", "Dnieper"],
  },
  {
    category: "Entertainment: Music",
    type: "multiple",
    difficulty: "medium",
    question: "What country did Shirley Bassey originate from?",
    correct_answer: "Wales",
    incorrect_answers: ["America", "England", "Canada"],
  },
  {
    category: "Geography",
    type: "multiple",
    difficulty: "hard",
    question: "What is the capital of Wisconsin, USA?",
    correct_answer: "Madison",
    incorrect_answers: ["Milwaukee", "Wisconsin Dells", "Green Bay"],
  },
];
let score = 0;
let answers = [];

function showQuestion() {
  questionEl.innerHTML = questions[currentQuestion].question;
  answerEl.innerHTML = "";

    questionCount.innerHTML = `Question ${currentQuestion + 1} of ${questions.length}`;
    scoreEl.innerText = `Score: ${score}`;


  for (let answer of questions[currentQuestion].incorrect_answers) {
    answerEl.innerHTML += `<p class="answer-btn">${answer}</p>`;
  }

  answerEl.innerHTML += `<p class="answer-btn">${questions[currentQuestion].correct_answer}</p>`;

  const answerBtns = document.querySelectorAll(".answer-btn");

  answerBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (btn.innerText === questions[currentQuestion].correct_answer) {
        score++;
        scoreEl.innerText = `Score: ${score}`;
        e.target.style.backgroundColor = "green";
        e.target.style.color = "white";
      } else {
        e.target.style.backgroundColor = "red";
        e.target.style.color = "white";
      }
    });
  });
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion >= questions.length) {
    alert("You have answered all of the questions");
  } else {
    showQuestion();
  }
}

nextBtn.addEventListener("click", nextQuestion);

showQuestion();

