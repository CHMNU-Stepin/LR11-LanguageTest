$(document).ready(function () {
    const words = [
        { word: "apple", translation: "яблуко" },
        { word: "banana", translation: "банан" },
        { word: "cat", translation: "кіт" },
        { word: "dog", translation: "пес" },
        { word: "sun", translation: "сонце" },
        { word: "moon", translation: "місяць" },
        { word: "water", translation: "вода" },
        { word: "tree", translation: "дерево" },
        { word: "book", translation: "книга" },
        { word: "flower", translation: "квітка" }
    ];
    let shuffledWords = [];
    let currentWordIndex = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    function initializeGame() {
        shuffledWords = words.sort(() => Math.random() - 0.5);
        currentWordIndex = 0;
        correctCount = 0;
        incorrectCount = 0;
        updateStats();
        showWord();
    }
    function updateStats() {
        $(".correct .value").text(correctCount);
        $(".incorrect .value").text(incorrectCount);
        $(".progress").text(`${currentWordIndex + 1}/${shuffledWords.length}`);
    }
    function showWord() {
        const currentWord = shuffledWords[currentWordIndex];
        $(".card").text(currentWord.word);
        $("#translation-input").val("").focus();
    }
    function checkAnswer() {
        const userAnswer = $("#translation-input").val().trim().toLowerCase();
        const correctAnswer = shuffledWords[currentWordIndex].translation;
        if (userAnswer === correctAnswer) {
            correctCount++;
        } else {
            incorrectCount++;
        }
        currentWordIndex++;
        if (currentWordIndex < shuffledWords.length) {
            updateStats();
            showWord();
        } else {
            showResult();
        }
    }
    function showResult() {
        const percentage = Math.round((correctCount / shuffledWords.length) * 100);
        $("#result-message").text(`Ви знаєте англійську на ${percentage}%!`);
        $(".modal").removeClass("hidden");
    }
    $("#restart-button").click(function () {
        $(".modal").addClass("hidden");
        initializeGame();
    });
    $("#check-button").click(checkAnswer);
    $("#translation-input").keypress(function (e) {
        if (e.which === 13) {
            checkAnswer();
        }
    });
    $(".card").click(showWord);
    initializeGame();
});
