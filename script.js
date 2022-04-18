const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author');
const quoteBtn = document.querySelector('#new-quote');
const twitterBtn = document.querySelector('#twitter');
const loader = document.querySelector('#loader');

const showLoadingSpinner = function () {
	loader.hidden = false;
	quoteContainer.hidden = true;
};

const hideLoadingSpinner = function () {
	loader.hidden = true;
	quoteContainer.hidden = false;
};

const getQuotes = async function () {
	const apiURL = 'https://type.fit/api/quotes';
	showLoadingSpinner();
	try {
		const response = await fetch(apiURL);
		const data = await response.json();
		const quote = data[Math.floor(Math.random() * data.length)];

		quote.text.length > 70
			? quoteText.classList.add('long-quote')
			: quoteText.classList.remove('long-quote');
		quoteText.textContent = quote.text;

		!quote.author
			? (authorText.textContent = 'Unknown')
			: (authorText.textContent = quote.author);
		hideLoadingSpinner();
	} catch (error) {
		console.error(error);
	}
};

const tweetQuote = function () {
	const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
	window.open(twitterURL, '_blank');
};

getQuotes();
quoteBtn.addEventListener('click', getQuotes);
twitterBtn.addEventListener('click', tweetQuote);
