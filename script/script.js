//定数と変数を定義します。

//randomNumberの定義（1-100までの整数から生成される乱数＝正解）
let randomNumber = Math.floor(Math.random() * 100) + 1;

//guesses, lastResult, lowOrHiの定義（あとで追加される段落）
const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');

//送信ボタン(submit)とテキスト入力フォーム(field)への参照
const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');

let guessCount = 1;//n回目の予想
let resetButton;//リセットボタン
let wrapper = document.querySelector('.wrapper');

guessField.focus();


//checkGuess()関数の実装
function checkGuess() {
    let userGuess = Number(guessField.value);
    //userGuessとは、ユーザーが入力した数字です。

    if (guessCount === 1) {
        guesses.textContent = 'これまでの予想 : ';
    }
    guesses.textContent += userGuess + '  ';


    if (userGuess === randomNumber) {
        lastResult.textContent = 'おめでとう！正解です！';
        lastResult.style.backgroundColor = "green";
        lowOrHi.textContent = '';
        setGameOver();
    } else if (guessCount === 10) {
        lastResult.textContent = '!!!ゲームオーバー!!!';
        setGameOver();
    } else {
        lastResult.textContent = '間違いです！';
        lastResult.style.backgroundColor = "red";
        if (userGuess < randomNumber) {
            lowOrHi.textContent = "もう少し大きいよ";
        } else if (userGuess > randomNumber) {
            lowOrHi.textContent = 'もう少し小さいよ';
        }
    }
    guessCount++;//回数はクリックごとに1つずつ増えていきます。
    guessField.value = '';//フィールドは空欄になります。
    guessField.focus();//フィールドをフォーカスします。
}


//サブミットボタンが押されると、イベントリスナーが発生し、checkGuessが実行されます。
guessSubmit.addEventListener('click', checkGuess, false);

//setGameOver＝ゲームオーバーを定義します。
function setGameOver() {
    guessField.disabled = true; //フィールドへの入力ができなくなります。
    guessSubmit.disabled = true;//サブミットボタンが押せなくなります。
    resetButton = document.createElement('button');//resetButtonを定義します。
    resetButton.textContent = 'もういちどやる';//resetButtonに新しくゲームを始める、という文字を入れます。
    document.querySelector('.resultParas').appendChild(resetButton);//リセットボタンを作ります。
    resetButton.addEventListener('click', resetGame);//resetButtonがクリックされるとresetGameがリセットされます。

}

//resetGame=ゲームをリセットを定義します。
function resetGame() {
    guessCount = 1;

    const resetParas = document.querySelectorAll('.resultParas p');


    //resetParasにテキストが残っていたら全て消去します
    for (let i = 0; i < resetParas.length; i++) {
        resetParas[i].textContent = '';
    }

    //作られたリセットボタンを消去します。

    resetButton.parentNode.removeChild(resetButton);

    //フィールドへの入力、ボタンの押下が再びできるようにします。

    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();

    //lastResultの背景を白くします。

    lastResult.style.backgroundColor = 'white';

    //正解を設定します。

    randomNumber = Math.floor(Math.random() * 100) + 1;
}


