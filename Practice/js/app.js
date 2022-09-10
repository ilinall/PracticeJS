window.addEventListener('load', function () {

    let countUser = document.querySelector('.count-user'),
        countComp = document.querySelector('.count-comp'),
        userField = document.querySelector('.user-field'),
        compField = document.querySelector('.comp-field'),
        sound = document.querySelector('.sound'),
        res = document.querySelector('.result'),
        play = document.querySelector('.play'),
        fields = document.querySelectorAll('.field'),
        userStep, compStep, countU = 0, countC = 0, blocked = false;



    function choiceUser(e) {
        if (blocked) return;
        let target = e.target;
        if (target.classList.contains('field')) {
            userStep = target.dataset.field;
            fields.forEach(item => item.classList.remove('active', 'error'));
            target.classList.add('active');
            choiceComp();
        }

    }

    function choiceComp() {
        blocked = true;
        let rand = Math.floor(Math.random() * 3);
        compField.classList.add('blink');
        let compFields = compField.querySelectorAll('.field');

        setTimeout(() => {
            compField.classList.remove('blink');
            compStep = compFields[rand].dataset.field;
            compFields[rand].classList.add('active');
            winner()
        }, 3000);
    }

    function winner() {
        blocked = false;

        let comb = userStep + compStep;

        switch (comb) {
            case 'rr':
            case 'ss':
            case 'pp':
            case 'll':
            case 'spsp':
                res.innerText = 'Ничья';
                sound.setAttribute('src', 'audio/draw.mp3');
                sound.play();
                break;


            case 'rs':
            case 'sp':
            case 'pr':
            case 'sps':
            case 'lsp':
            case 'sl':
            case 'spr':
            case 'lp':
            case 'rl':
            case 'psp':
                res.innerText = 'Молодец, как соленый огурец!';
                sound.setAttribute('src', 'audio/gta.mp3');
                sound.play();
                countU++;
                countUser.innerText = countU;
                compField.querySelector('[data-field=' + compStep + ']').classList.add('error');
                break;


            case 'sr':
            case 'ps':
            case 'rp':
            case 'ssp':
            case 'spl':
            case 'ls':
            case 'rsp':
            case 'pl':
            case 'lr':
            case 'pps':
                res.innerText = 'Неудача';
                sound.setAttribute('src', 'audio/fail.mp3');
                sound.play();
                countC++;
                countComp.innerText = countC;
                userField.querySelector('[data-field=' + userStep + ']').classList.add('error');
                break;


        }

    }

    function playGame() {
        countU = countC = 0;
        res.innerText = 'Сделайте выбор';
        countUser.innerText = '0';
        countComp.innerText = '0';
        fields.forEach(item => item.classList.remove('active', 'error'));

    }

    play.addEventListener('click', playGame);
    userField.addEventListener('click', choiceUser);


});