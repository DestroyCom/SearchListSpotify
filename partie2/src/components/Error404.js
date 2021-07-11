//Imports lié a ReactRouter
import { Link } from "react-router-dom";

//Import du CSS
import '../styles/Error404.css';
import logo from '../img/logo.svg';

function Error404(){
    return(
        <section id='error404'>
            <p>404</p>
            <img src={logo} />
            <div>
                <h1>UH-OH !</h1>
                <p>Il semblerait que vous soyez arrivé la ou vous n'auriez pas du...</p>
                <Link to='/'>RETOURNER A L'ACCUEIL</Link>
            </div>
        </section>
    )
}

export default Error404;