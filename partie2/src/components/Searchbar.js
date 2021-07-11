//Imports lié a React
import {React} from 'react';

//Import du CSS
import '../styles/SearchBar.css';

function Searchbar({displayResults, displayResultsUpdate, searchInputUpdate}) {
    return ( 
        <section id='searchBar'>
            <h3>Rechercher des playlists dans Spotify: </h3>
            <div>
                <input type = 'text' placeholder='Votre magnifique mot-clé' onChange = { (e) => searchInputUpdate(e.target.value) } /> 
                <p onClick = {() => displayResultsUpdate(displayResults + 1)} >Rechercher</p> 
            </div>
        </section>
        );
}

export default Searchbar;