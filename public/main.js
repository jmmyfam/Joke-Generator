// USE WITH FIREBASE AUTH
// import ViewDirectorBasedOnUserAuthStatus from '../utils/viewDirector';
import 'bootstrap'; // import bootstrap elements and js
import '../styles/main.scss';
import getJoke from '../api/promises';

const htmlStructure = () => {
  document.querySelector('#jokeContainer').innerHTML = `
    <button class="btn btn-warning" id="get-joke">Get a Joke</button>
  `;
};

const events = () => {
  const jokeContainer = document.querySelector('#jokeContainer');

  const displaySingleJoke = (joke) => {
    jokeContainer.innerHTML = `
      <p>${joke}</p>
      <button class="btn btn-warning" id="get-another-joke">Get Another Joke</button>
    `;
    document.querySelector('#get-another-joke').addEventListener('click', () => {
      htmlStructure();
      events();
    });
  };

  const displayTwoPartJoke = (setup, delivery) => {
    jokeContainer.innerHTML = `
      <p>${setup}</p>
      <button class="btn btn-warning" id="get-punchline">Get Punchline</button>
    `;
    document.querySelector('#get-punchline').addEventListener('click', () => {
      jokeContainer.innerHTML += `
        <p>${delivery}</p>
        <button class="btn btn-warning" id="get-another-joke">Get Another Joke</button>
      `;
      document.querySelector('#get-punchline').remove();
      document.querySelector('#get-another-joke').addEventListener('click', () => {
        htmlStructure();
        events();
      });
    });
  };

  document.querySelector('#get-joke').addEventListener('click', () => {
    getJoke().then((joke) => {
      switch (joke.type) {
        case 'single':
          displaySingleJoke(joke.joke); // directly display joke for single part
          break;
        case 'twopart':
          displayTwoPartJoke(joke.setup, joke.delivery); // display setup & delivery for twopart
          break;
        default:
          console.error('Invalid joke type:', joke.type);
          break;
      }
    }).catch((error) => {
      console.error('Error fetching joke:', error);
    });
  });
};

const startApp = () => {
  htmlStructure();
  events();
};

startApp();
