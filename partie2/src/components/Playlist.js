//Imports

//Client Http
import axios from 'axios';
//Bibliotheque de mise en forme de strings
import qs from 'qs';
//Composant de loading (trouvé sur npm)
import Loader from "react-loader-spinner";

//Imports lié a React
import React, {
  useState,
  useEffect
} from 'react';
import {
  useParams
} from "react-router-dom";

//Import des composants
import DisplayPlaylist from './DisplayPlaylist';

//Import du CSS
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function Playlist() {
  //Récupération de l'id de la playlist spotify présente dans l'URL
  const {
    id
  } = useParams();

  //Initialisation des useState
  const [reponse, reponseUpdate] = useState();
  const [loaded, loadedUpdate] = useState(false);

  //Effectue l'appel à l'API de Spotify afin de récuperer les infos de la playlist
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

    //Ecriture de l'URL de la requete
    let url = 'https://api.spotify.com/v1/playlists/' + id;

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
            //Récuperation de la réponse de la requete & désactivation du loader
            reponseUpdate(response.data)
            loadedUpdate(true);
            return;
          })
          .catch(function (error) {
            //Si crash envoyer en erreur 404
            console.log(error);
            window.location = '../*';
          })
      })
  }, [])

      
    return (
        <>
          { loaded ? <DisplayPlaylist re={reponse} /> : <Loader type="TailSpin" color="#1DB954" height={500} width={500} timeout={1000} className='loading' />}
        </>
    )
}

export default Playlist;