var firebaseConfig = 
{
    apiKey: "AIzaSyBEdpYtTdSVWzBzDPvcGVUirpekcDN6JYI",
    authDomain: "quizapp786-aaf31.firebaseapp.com",
    databaseURL: "https://quizapp786-aaf31-default-rtdb.firebaseio.com",
    projectId: "quizapp786-aaf31",
    storageBucket: "quizapp786-aaf31.appspot.com",
    messagingSenderId: "627073389474",
    appId: "1:627073389474:web:ff2e7bf86c2ee8c24d98fb"
};

  var firebase = firebase.initializeApp(firebaseConfig);

//   console.log(firebase.database());

var questionBank= [
    {
        question : 'Javascript is an _______________ language?',
        option : ['Object-Oriented','Object-Based','Procedural','None of the above'],
        answer : 'Object-Oriented'
    },
    {
        question : 'Which of the following keywords is used to define a variable in Javascript?',
        option : ['var',' let','Both A & B','None of the above'],
        answer : 'Both A & B'
    },
    {
        question : 'Which of the following methods can be used to display data in some form using Javascript?',
        option : ['document.write()','console.log()','windows.alert()','All of the above'],
        answer : 'All of the above'
    },
    {
        question : 'Which of the following are not server-side Javascript objects?',
        option : ['Date',"FileUpload",'Function',"All of the above"],
        answer : "All of the above"
    },
    {
        question : 'When an operator’s value is NULL, the typeof returned by the unary operator is:',
        option : ['Boolean','Undefined','Object','Integer'],
        answer : 'Object'
    },
    {
        question : 'What is the output of the following code snippet? (print(NaN === NaN));',
        option : ['True','False','Undefined','Error'],
        answer : 'False'
    },
    {
        question : 'What does the ‘toLocateString()’ method do in JS?',
        option : ['Returns a localised object representation','Returns a parsed String','Returns a localised string representation of an obejct','None of the above'],
        answer : 'Returns a localised string representation of an obejct'
    },
    {
        question : 'Which of the following is not a Javascript framework?',
        option : ['Node','Vue','React','Laravel'],
        answer : 'Laravel'
    },
    {
        question : 'What keyword is used to declare an asynchronous function in Javascript?',
        option : ['async','await','setTimeout','None of the above'],
        answer : 'async'
    },
    {
        question : 'How to stop an interval timer in Javascript?',
        option : ['clearInterval','clearTimer','intervalOver','None of the above'],
        answer : 'clearInterval'
    }

]

var question= document.getElementById('question');
var quizContainer= document.getElementById('quiz-container');
var scorecard= document.getElementById('scorecard');
var option0= document.getElementById('option0');
var option1= document.getElementById('option1');
var option2= document.getElementById('option2');
var option3= document.getElementById('option3');
var next= document.querySelector('.next');
var points= document.getElementById('score');
var span= document.querySelectorAll('span');
var i=0;
var score= 0;

function displayQuestion()
{
    for(var a=0;a<span.length;a++)
    {
        span[a].style.background='none';
    }
    question.innerHTML= 'Q.'+(i+1)+' '+questionBank[i].question;
    option0.innerHTML= questionBank[i].option[0];
    option1.innerHTML= questionBank[i].option[1];
    option2.innerHTML= questionBank[i].option[2];
    option3.innerHTML= questionBank[i].option[3];
    stat.innerHTML= "Question"+' '+(i+1)+' '+'of'+' '+questionBank.length;

    firebase.database().ref('question').push(questionBank[i])

}

function calcScore(e)
{
    if(e.innerHTML===questionBank[i].answer && score<questionBank.length)
    {
        score= score+1;
        document.getElementById(e.id).style.background= 'limegreen';
    }
    else{
        document.getElementById(e.id).style.background= 'tomato';
    }
    setTimeout(nextQuestion,400);
}


function nextQuestion()
{
    if(i<questionBank.length-1)
    {
        i=i+1;
        displayQuestion();
    }
    else
    {
        points.innerHTML= score+ '/'+ questionBank.length;
        quizContainer.style.display= 'none';
        scoreboard.style.display= 'block'
    }
}

next.addEventListener('click',nextQuestion);


function backToQuiz()
{
    location.reload();
}

function checkAnswer()
{
    var answerBank= document.getElementById('answerBank');
    var answers= document.getElementById('answers');
    answerBank.style.display= 'block';
    scoreboard.style.display= 'none';

    for(var a=0;a<questionBank.length;a++)
    {
        var list= document.createElement('li');
        list.innerHTML= questionBank[a].answer;
        answers.appendChild(list);
    }
}

displayQuestion();