import {React} from 'react';
import '../styles/SearchBar.css'

function Searchbar({displayResults, displayResultsUpdate, searchInputUpdate}) {
    return ( 
        <div id='searchBar'>
            <h3> Rechercher des playlists dans Spotify: </h3>
            <div>
                <input type = 'text' onChange = { (e) => searchInputUpdate(e.target.value) } /> 
                <p onClick = {() => displayResultsUpdate(displayResults + 1)} > Rechercher </p> 
            </div>
        </div>
        );
}

export default Searchbar;