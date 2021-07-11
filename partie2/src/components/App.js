//Imports

//Client Http
import axios from 'axios';
//Bibliotheque de mise en forme de strings
import qs from 'qs';

//Imports lié a React
import {
  useState,
  useEffect
} from 'react';

//Imports lié a ReactRouter
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

//Import des composants
import Header from './Header.js';
import ResultsArea from './ResultsArea.js';
import Searchbar from './Searchbar.js';
import Playlist from './Playlist.js';
import Error404 from './Error404.js';

//Import du CSS
import '../styles/App.css';




function App() {
  //Initialisation des useState
  const [displayResults, displayResultsUpdate] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState(null);
  const [searchInput, searchInputUpdate] = useState(null);

  //Effectue l'appel à l'API de Spotify afin de rechercher les playlist en rapport avec les mots-clés
  useEffect(() => {
    //Passe de sécurité des clés
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

    //Préparation de l'en-tete pour l'authentification a l'API spotify
    const headers = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: clientId,
        password: clientSecret,
      },
    };
    const data = {
      grant_type: 'client_credentials',
    };

    if (searchInput === null) {
      searchInputUpdate('null')
    }

    //Ecriture de l'URL de la requete
    let url = 'https://api.spotify.com/v1/search?q=' + searchInput + '&type=playlist'

    //Requete d'authentification
    axios
      .post(
        'https://accounts.spotify.com/api/token',
        qs.stringify(data),
        headers
      )
      .then((reponse) => reponse.data.access_token)
      .then((rep) => {
        //Apres avoir récuperer le token d'authentifications récuperations de la requete principale
        const headers = {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Bearer ' + rep,
          }
        };
        axios.get(
            url,
            headers
          ).then(function (response) {
            setIsLoaded(true);
            //Récuperation de la réponse de la requete
            setItems(response.data)
            return;
          })
          .catch(function (error) {
            //Si crash ne pas afficher de résultats
            console.log(error);
            setIsLoaded(false);
          })
      })
  }, [displayResults])


  return (
    <Router>
      <Switch>
        <Route path='/playlist/:id' >
            <Playlist />
        </Route>
        <Route exact path='/'>
          <div id='home'>
            <Header />
            <Searchbar displayResults={displayResults} displayResultsUpdate={displayResultsUpdate} items={items}  searchInput={searchInput} searchInputUpdate={searchInputUpdate} />
            { displayResults && isLoaded  ? <ResultsArea items={items} displayResultsUpdate={displayResultsUpdate} displayResults={displayResults} /> : <div id='explication'><h4>Explications :</h4><p>Rentrez simplement des mots clés dans la barre de recherche et cliquez sur "Rechercher"</p></div>}
          </div>
        </Route>
        <Route path='*'>
          <Error404 />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
