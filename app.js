function calculateShare() {
    const totalAmount = document.getElementById('totalAmount').value;
    const numberOfPeople = document.getElementById('numberOfPeople').value;

    if (totalAmount === '' || numberOfPeople === '' || numberOfPeople <= 0) {
        document.getElementById('result').textContent = '有効な金額と人数を入力してください。';
        return;
    }

    const share = totalAmount / numberOfPeople;
    document.getElementById('result').textContent = `一人当たりの金額は ¥${parseFloat(share).toFixed(2)} です。`;
}

const words = [
    '今日はいい天気ですね',
    '朝ごはんは何を食べましたか',
    '昨日の映画は面白かったです',
    '週末はどこに行きますか',
    '新しい本を読み始めました',
    'コーヒーが好きですか',
    '次の休暇はどこに行きたいですか',
    '最近運動していますか',
    '好きな音楽は何ですか',
    'ペットを飼っていますか',
    '趣味は何ですか',
    '仕事はどうですか',
    '家族と過ごす時間が大切です',
    '友達と会うのが楽しみです',
    '新しいレストランを試してみました',
    '旅行の計画を立てています',
    '最近見たドラマは何ですか',
    'スポーツ観戦が好きです',
    '料理をするのが好きです',
    '新しいスキルを学びたいです'
];
let currentWordIndex = 0;
let score = 0;
let time = 60;
let timer;

const wordDisplay = document.getElementById('word');
const input = document.getElementById('input');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const startButton = document.querySelector('.start');

function displayNewWord() {
    const word = words[currentWordIndex];
    wordDisplay.textContent = word;
    input.value = '';
    input.focus();
}

function startGame() {
    currentWordIndex = 0;
    score = 0;
    time = 60;
    scoreDisplay.textContent = `正当数: ${score}`;
    timerDisplay.textContent = `残り時間: ${time}秒`;
    wordDisplay.style.display = 'block';
    input.style.display = 'block';
    scoreDisplay.style.display = 'block';
    timerDisplay.style.display = 'block';
    startButton.style.display = 'none';
    displayNewWord();
    timer = setInterval(() => {
        time--;
        timerDisplay.textContent = `残り時間: ${time}秒`;
        if (time <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}

function endGame() {
    wordDisplay.style.display = 'none';
    input.style.display = 'none';
    timerDisplay.style.display = 'none';
    startButton.style.display = 'block';
    startButton.textContent = '再スタート';
    let rank;
    if (score >= 18) {
        rank = 'S';
    } else if (score >= 15) {
        rank = 'A';
    } else if (score >= 12) {
        rank = 'B';
    } else if (score >= 9) {
        rank = 'C';
    } else if (score >= 6) {
        rank = 'D';
    } else if (score >= 3) {
        rank = 'E';
    } else {
        rank = 'F';
    }
    scoreDisplay.textContent = `ゲーム終了！正当数: ${score} ランク: ${rank}`;
}

input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const word = words[currentWordIndex];
        if (input.value.trim() === word) {
            score++;
            scoreDisplay.textContent = `正当数: ${score}`;
            currentWordIndex++;
            if (currentWordIndex < words.length) {
                displayNewWord();
            } else {
                clearInterval(timer);
                endGame();
            }
        }
    }
});
