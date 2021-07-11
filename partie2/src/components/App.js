import {useState, useEffect} from 'react';
import Header from './Header.js';
import ResultsArea from './ResultsArea.js';
import Searchbar from './Searchbar.js';
import Playlist from './Playlist.js';
import axios from 'axios';
import qs from 'qs';
import '../styles/App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";

function App() {
  const [displayResults, displayResultsUpdate] = useState(0);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState(null);
  const [searchInput, searchInputUpdate] = useState(null);
  const [id, idupdate] = useState(null);

  console.log(displayResults);
  console.log(items);

  useEffect(() => {
    const clientId = '8d15b52c72c74971a119714fadd6c015';
    const clientSecret = 'c0b2ff7371d547e8a3b745b7a3c3a232';
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
    console.log(searchInput)
    let url = 'https://api.spotify.com/v1/search?q=' + searchInput + '&type=playlist'
    axios
      .post(
        'https://accounts.spotify.com/api/token',
        qs.stringify(data),
        headers
      )
      .then((reponse) => reponse.data.access_token)
      .then((rep) => {
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
            setItems(response.data)
            return response.data;
          })
          .catch(function (error) {
            console.log(error);
            setIsLoaded(true);
            setError(error);
          })
      })
  }, [displayResults])


  console.log('changeid', id)
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
          { displayResults && isLoaded  ? <ResultsArea items={items} idupdate={idupdate}  displayResultsUpdate={displayResultsUpdate} displayResults={displayResults} /> : <p>pas de données</p>}
          </div>
        </Route>
        <Route path='*'>
          <p>error</p>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
