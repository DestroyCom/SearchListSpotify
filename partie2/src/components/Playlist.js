import React, { useState } from 'react';
import {useEffect} from 'react';
import axios from 'axios';
import qs from 'qs';
import DisplayPlaylist from './DisplayPlaylist';
import {
    useParams
  } from "react-router-dom";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function Playlist() {

    const {id} = useParams();
    const [reponse, reponseUpdate] = useState();
    const [loaded, loadedUpdate] = useState(false);

    useEffect(() => {
      const clientId = process.env.REACT_APP_CLIENT_ID;
      const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
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
    
        let url = 'https://api.spotify.com/v1/playlists/' +  id;
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
                reponseUpdate(response.data)
                loadedUpdate(true);
              })
              .catch(function (error) {
                console.log(error);
              })
          })
      }, [])

      
    return (
        <div>
        { loaded ? <DisplayPlaylist re={reponse} /> : <Loader type="TailSpin" color="#1DB954" height={500} width={500} timeout={1000} className='loading' />}
        
        </div>
    )
}

export default Playlist;