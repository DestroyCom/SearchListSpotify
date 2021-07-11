import '../styles/ResultsArea.css'
import { Link } from "react-router-dom";

function ResultsArea({items, idupdate, displayResultsUpdate, displayResults}) {
    function tesstt(id){
        idupdate(id)
        console.log('apresusdate', id)
        displayResultsUpdate(displayResults + 1)
    }
    return (
      <div id='resultsArea'>
          <p>{items.playlists.items.length} Résultats trouvés</p>
          <div>
              {items.playlists.items.map(item => (
                  <div key={item.id}>
                        <p>{item.name}</p>
                        <Link to={'/playlist/' + item.id } onClick={()=>tesstt(item.id)} >VOIR</Link>  
                  </div>
              ))}
          </div>
      </div>
    );
  }
  
  export default ResultsArea;