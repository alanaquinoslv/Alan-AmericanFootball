var poll = {
    question: "Qual o escudo mais bonito da conferência americana?",
    answers: [
        "Baltimore Ravens", "Buffalo Bills", "Cincinanati Bengals", "Cleveland Browns", "Denver Broncos", "Houston Texans", "Indianapolis Colts", "Jacksonville Jaguars", "Kansas City Chiefs", "Las Vegas Raiders", "Los Angeles Chargers", "Miami Dolphins", "New England Patriots", "New York Jets", "Pittsburgh Steelers", "Tennessee Titans"
    ],
    pollCount: 20,
    answersWeight: [4, 4, 5, 1, 3, 3, 2, 10, 7, 8, 5, 12, 11, 6, 5, 3],
    selectedAnswer: -1
};

var pollDOM = {
    question: poll.question,
    answers: poll.answers
};

console.log(pollDOM);


pollDOM.question.innerText = poll.question;
pollDOM.answers.innerHTML = poll.answers.map(function (answer, i) {
    return (
        `
        <div class="answer" onclick="markAnswer('${i}')">
          ${answer}
          <span class="percentage-bar"></span>
          <span class="percentage-value"></span>
        </div>
      `
    );
}).join("");

function markAnswer() {
    let answers = document.querySelectorAll(".poll .answers .answer")

    for (let i = 0; i < answers.length; i++) {
        let percentage = 0;
        if (i == poll.selectAnswer) {
            percentage = Math.round(
                (poll.answersWeight[i] + 1 * 100 / (poll.pollCount + 1))
            );
        }
        else {
            percentage = Math.round(
                (poll.answersWeight[i] * 100 / (poll.pollCount + 1))
            );
        }

        answers[i].querySelector(percentage-bar).style.width = percentage + '%';
        answers[i].querySelector(percentage-bar).innerText = percentage + '%';
    }
}


