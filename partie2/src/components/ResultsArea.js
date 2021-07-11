//Imports lié a ReactRouter
import { Link } from "react-router-dom";

//Import du CSS
import '../styles/ResultsArea.css'


function ResultsArea({items}) {

    return (
      <section id='resultsArea'>
          <p>{items.playlists.items.length} Résultats trouvés</p>
          <div>
              {items.playlists.items.map(item => (
                  <div key={item.id}>
                        <p>{item.name}</p>
                        <Link to={'/playlist/' + item.id }  >VOIR</Link>  
                  </div>
              ))}
          </div>
      </section>
    );
  }
  
  export default ResultsArea;