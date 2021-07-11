import axios from 'axios';
import qs from 'qs';

require('dotenv').config()

export function CallSpotify() {
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


  return axios
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
        'https://api.spotify.com/v1/search?q=Dance&type=playlist&market=US&limit=10&offset=5',
        headers
      ).then(function(response){ 
        return JSON.parse(response); })
      .then(function(data) {
          const items = data;
          console.log(items)
      }).catch(function (error) {
        console.log(error)
      })
    })
}