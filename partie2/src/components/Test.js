import * as React from 'react'
import {CallSpotify} from '../API/CallSpotify';


export default class PersonList extends React.Component{
    state = {
        reponse:' ',
    }

    test = async () =>{
        let res = await CallSpotify();
        console.log(res)
    }

    render() {
        return ( 
            <div>
                <h3> Rechercher une playlist dans Spotify: </h3>
                <div>
                    <a> Rechercher </a> 
                </div> 
            </div>
        );
    }
}