//Dwa razy kliknieta karta uznaje jako dwie inne POPRAWIĆ
const cards = [
	{
		id: 1,
		name: 'present',
		image: './images/1.png',
	},
	{
		id: 2,
		name: 'present',
		image: './images/1.png',
	},
	{
		id: 3,
		name: 'island',
		image: './images/2.png',
	},
	{
		id: 4,
		name: 'island',
		image: './images/2.png',
	},
	{
		id: 5,
		name: 'earth',
		image: './images/3.png',
	},
	{
		id: 6,
		name: 'earth',
		image: './images/3.png',
	},
	{
		id: 7,
		name: 'flowers',
		image: './images/4.png',
	},
	{
		id: 8,
		name: 'flowers',
		image: './images/4.png',
	},
	{
		id: 9,
		name: 'surfing',
		image: './images/5.png',
	},
	{
		id: 10,
		name: 'surfing',
		image: './images/5.png',
	},
	{
		id: 11,
		name: 'bomb',
		image: './images/6.png',
	},
	{
		id: 12,
		name: 'bomb',
		image: './images/6.png',
	},
];

const level2 = [
	{
		id: 13,
		name: 'money',
		image: './images/7.png',
	},
	{
		id: 14,
		name: 'money',
		image: './images/7.png',
	},
	{
		id: 15,
		name: 'clown',
		image: './images/8.png',
	},
	{
		id: 16,
		name: 'clown',
		image: './images/8.png',
	},
	{
		id: 17,
		name: 'ghost',
		image: './images/9.png',
	},
	{
		id: 18,
		name: 'ghost',
		image: './images/9.png',
	},
	{
		id: 19,
		name: 'star',
		image: './images/10.png',
	},
	{
		id: 20,
		name: 'star',
		image: './images/10.png',
	},
];

const level3 = [
	{
		id: 21,
		name: 'heart',
		image: './images/11.png',
	},
	{
		id: 22,
		name: 'heart',
		image: './images/11.png',
	},
	{
		id: 23,
		name: 'handsHeart',
		image: './images/12.png',
	},
	{
		id: 24,
		name: 'handsHeart',
		image: './images/12.png',
	},
	{
		id: 25,
		name: 'student',
		image: './images/13.png',
	},
	{
		id: 26,
		name: 'student',
		image: './images/13.png',
	},
	{
		id: 27,
		name: 'fairy',
		image: './images/14.png',
	},
	{
		id: 28,
		name: 'fairy',
		image: './images/14.png',
	},
	{
		id: 29,
		name: 'dancer',
		image: './images/15.png',
	},
	{
		id: 30,
		name: 'dancer',
		image: './images/16.png',
	},
];

//Mieszanie wszystkich kart

cards.forEach((card) => {
	const div = document.createElement('div');
	div.classList.add('card');
	document.querySelector('.grid').appendChild(div);
});

const mixCards = () => {
	cards.sort(() => 0.5 - Math.random());
};
mixCards();

let guessedCard = [];
let clickedCard = [];
let htmlCard = [];
let score = 0;

let time = 0;
let startTime = true;

let level = 0;
let levelArray = [];

let interval = '';

let click = 0;

let allCards = [...document.querySelectorAll('.card')];
const result = document.querySelector('.result');
const timeHTML = document.querySelector('.time');

//Funkcja ustawiająca zdjęcie po obróceniu dwóch kart
const setPhoto = (image, htmlCards) => {
	setTimeout(() => {
		htmlCards.forEach((card) => {
			card.style.backgroundImage = `url('./images/${image}')`;
		});
	}, 500);
};

const createHTMLCards = () => {
	document.querySelector('.grid').innerHTML = '';
	document
		.querySelector('.grid')
		.classList.add(level === 1 ? 'level1' : 'level2');
	cards.forEach((card) => {
		const div = document.createElement('div');
		div.classList.add('card');
		document.querySelector('.grid').appendChild(div);
	});
	allCards = [...document.querySelectorAll('.card')];
	allCards.forEach((card, index) => {
		card.setAttribute('data-name', cards[index].name);
		card.setAttribute('data-image', cards[index].image);
		card.addEventListener('click', clickMemory);
	});
};

const nextLevel = (level) => {
	if (level === 1) {
		level2.forEach((el) => {
			cards.push(el);
		});
	} else if (level === 2) {
		level3.forEach((el) => {
			cards.push(el);
		});
	}
	guessedCard = [];
	mixCards();
	createHTMLCards();
};

//Sprawdzenie czy gracz wygrał
const checkWin = () => {
	if (guessedCard.length === cards.length) {
		level++;
		document.querySelector('.level').textContent = level;
		if (level === 3) {
			clearInterval(interval);
			document.querySelector('.level').textContent = 2;
			document.querySelector(
				'.resultTime'
			).textContent = `Twój czas to: ${time} sekund`;
			setTimeout(() => {
				if (
					confirm(
						'`Wygrywasz! Twój czas: ${time} sekund, Liczba kliknięć: ${click}`. Chcesz zagrać ponownie?'
					)
				) {
					window.location.reload;
				}
			}, 100);
		}
		levelArray.push(level);
		nextLevel(level);
	}
};

const cancelClick = (target) => {
	target.removeEventListener('click', clickMemory);
};

//WCIŚNIĘCIE KARTY
// czyszczenie za każdym razem tablic (jedna z nazwami kart , druga z klikniętymi kartami (DOM))
//Zrobić nowy poziom po wygranej stworzenie wiekszej liczby kart, uzycie funkcji clickMemory(wybranaTablica)
const clickMemory = (e) => {
	cancelClick(e.target);
	click++;
	document.querySelector('.click').textContent = click;
	countTime();
	startTime = false;
	//Pobranie danych zdjęcia
	const image = e.target.getAttribute('data-image');
	const name = e.target.getAttribute('data-name');
	//Zamiana zdjęcia po kliknięciu karty
	e.target.style.backgroundImage = `url('${image}')`;
	clickedCard.push(name);
	htmlCard.push(e.target);
	console.log(e.target);

	checkYourCard(clickedCard, htmlCard);
	if (clickedCard.length === 2) {
		clickedCard = [];
		htmlCard = [];
	}
	checkWin();
};

//Funkcja licząca czas gry
const countTime = () => {
	if (startTime) {
		interval = setInterval(() => {
			time++;
			timeHTML.textContent = time;
		}, 1000);
	}
};

//Sprawdzenie czy 2 klikniete karty są takie same, jeżeli TAK to ustawienie białego tła i zdobycie punktu. Jeżeli NIE ustawienie tła początkowego
function checkYourCard(clickedCards, htmlCards) {
	if (clickedCards.length === 2) {
		htmlCards.forEach((card) => {
			card.addEventListener('click', clickMemory);
		});
		if (clickedCards[0] === clickedCards[1]) {
			console.log('pasują');
			setPhoto('whiteImage.png', htmlCards);
			score++;
			clickedCards.forEach((card) => {
				guessedCard.push(card);
			});
			htmlCards.forEach((card) => {
				card.removeEventListener('click', clickMemory);
			});
		} else {
			setPhoto('backImage.png', htmlCards);
		}
	}
}

//Add event listener na wszystkie karty + dodanie atrybutow data-name i data-image
allCards.forEach((card, index) => {
	card.setAttribute('data-name', cards[index].name);
	card.setAttribute('data-image', cards[index].image);
	card.addEventListener('click', clickMemory);
});
