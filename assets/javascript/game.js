var startTemp = 0;
/* var words = ['direct', 'pollution', 'Koran', 'enjoy', 'fat', 'oil', 'launch', 'spite', 'imagine', 'urge', 'suffering', 'material', 'faint', 'dribble', 'sofa', 'harm', 'gloom', 'conference', 'warning', 'chief', 'discriminate', 'identification', 'bottom', 'pool', 'weak', 'valid', 'insight', 'deprivation', 'frighten', 'offense', 'flatware', 'lawyer', 'rear', 'imperial', 'cabin', 'curve', 'ankle', 'outfit', 'voice', 'beard', 'panel', 'joy', 'apathy', 'interest', 'appetite', 'road', 'socialist', 'man', 'welfare', 'star', 'panic', 'kinship', 'track', 'comfort', 'nun', 'way', 'economic', 'argument', 'unfortunate', 'monster', 'forest', 'conscience', 'fabricate', 'negotiation', 'fade', 'missile', 'crutch', 'method', 'bridge', 'resident', 'metal', 'authorise', 'bring', 'courage', 'development', 'broken', 'fitness', 'reflection', 'wreck', 'constant', 'penny', 'inquiry', 'firefighter', 'obligation', 'pioneer', 'solve', 'prisoner', 'humanity', 'mile', 'formulate', 'encourage', 'pawn', 'save', 'outlook', 'charter', 'document', 'element', 'javascript', 'hello', 'world', 'coding', 'cascade', 'develop', 'meowmix', 'eleven', 'power', 'knowledge', 'experience', 'experiment', 'control', 'africa', 'lemons', 'pomegranite', 'fusion', 'cold', 'elephant']; */
var words = ['the cow jumped over the moon', 'legend says i am a boss', 'entertainment', 'oppose', 'hard', 'justice', 'format', 'you win some you lose some', 'element', 'formal', 'coding boot camp', 'this is fun'];
var rand = Math.floor(Math.random() * words.length);
var word = words[rand];
var main = document.getElementById('main');
var key = '';
var rem = document.getElementById('guessesLeft');
var score = 10;
var tempScore = 0;
var lettersUsed = [];
var wins = 0;
var loses = 0;
var letters = /[\w]/img;
var time = 3000;
var restarting = false;
var img = document.getElementById('hangImg');
var checkSpaces = true;
var spaces = 0;
if(word.match(/[\s]/g) !== null) {
    spaces = word.match(/[\s]/g).length;
}
/* 
for (var i = 0; i < word.length; i++) {
    var x = document.createElement('span');
    x.id = "letter" + i;
    x.textContent = '_';
    main.append(x);
}
 */
for (var i = 0; i < word.length; i++) {
    var x = document.createElement('span');
    x.id = "letter" + i;
    x.textContent = '_';
    if(word[i] === " ") {
        x.textContent = " ";
    } 
    main.append(x);
}
img.src = 'assets/images/hang0.png';

document.addEventListener('keyup', function() {
    if(score === 9) {
        img.src = 'assets/images/hang1.png';
    }
    if(score === 8) {
        img.src = 'assets/images/hang2.png';
    }
    if(score === 7) {
        img.src = 'assets/images/hang3.png';
    }
    if(score === 6) {
        img.src = 'assets/images/hang4.png';
    }
    if(score === 5) {
        img.src = 'assets/images/hang5.png';
    }
    if(score === 4) {
        img.src = 'assets/images/hang6.png';
    }
    if(score === 3) {
        img.src = 'assets/images/hang7.png';
    }
    if(score === 2) {
        img.src = 'assets/images/hang8.png';
    }
    if(score === 1) {
        img.src = 'assets/images/hang9.png';
    }
    if(score === 0) {
        img.src = 'assets/images/hang10.png';
    }
});


document.addEventListener('keydown', function (e) {
    if(startTemp === 0) {
        document.getElementById('game').style.display = 'block';
        document.getElementById('pregame').style.display = 'none';
        tempScore += spaces;
    }
    startTemp += 1;
    if(startTemp > 1) {
        key = e.key.toLowerCase();
        var keyNum = key.match(/[a-z]/img);
        if(keyNum !== null) {
            keyNum = keyNum.toString();
        }
        if (key === keyNum && !restarting) {
            if (lettersUsed.indexOf(key) > -1) {
                alert('You already guessed ' + key);
            }
            if (lettersUsed.indexOf(key) <= -1) {
                document.getElementById('used').textContent += key + ' ';
                for (var i = 0; i < word.length; i++) {
                    if (key === word[i]) {
                        document.getElementById('letter' + i).textContent = key;
                        tempScore += 1;
                        if (tempScore >= word.length) {
                            win();
                        }
                    }
                }
                if (word.indexOf(key) === -1) {
                    score -= 1;
                    rem.innerText = score;
                }
                if (word.indexOf(key) > -1) {
                    //console.log('correct');
                }

                if (score <= 0) {
                    lose();
                }
            } else {
                //Do nothing
            }
        }
    }
    lettersUsed.push(key);
});

function win() {            
    document.getElementById('dec').innerText = 'You Win! ' + 'Restarting now...';
    wins += 1;
    document.getElementById('wins').innerText = wins;
    newWin();
}

function lose() {
    document.getElementById('dec').innerText = 'You Lose! The Word was ' + '-' + word.toUpperCase() + '- ' + 'Restarting now...';
    loses += 1;            
    document.getElementById('loses').innerText = loses;
    newLose();
}

function newWin() {
    setTimeout(tempWrite, 3500);
    tempScore = 0;
    restarting = true;
    document.getElementById('used').innerText = '';
    document.getElementById('guessesLeft').innerText = score;
    lettersUsed = [];
}

function newLose() {
    setTimeout(tempWrite, 3500);            
    tempScore = 0;
    restarting = true;
    document.getElementById('used').innerText = '';
    document.getElementById('guessesLeft').innerText = score;
    lettersUsed = [];
}

function tempWrite() {
    img.src = 'assets/images/hang0.png';
    rand = Math.floor(Math.random() * words.length);
    word = words[rand];
    if(word.match(/[\s]/g) !== null) {
        spaces = word.match(/[\s]/g).length;
        tempScore += spaces;
    }
    restarting = false;
    lettersUsed = [];
    main.innerHTML = '';
    document.getElementById('dec').innerText = '';
/*     for (var i = 0; i < word.length; i++) {
        var x = document.createElement('span');
        x.id = "letter" + i;
        x.textContent = '_';               
        main.append(x);
    } */
    for (var i = 0; i < word.length; i++) {
        var x = document.createElement('span');
        x.id = "letter" + i;
        x.textContent = '_';
        if(word[i] === " ") {
            x.textContent = " ";
        } 
        main.append(x);
    }
    console.log(word);
    score = 10;
    rem.innerText = score;
}
