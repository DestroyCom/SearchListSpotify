//Imports lié a React
import {
    useState
  } from 'react';

//Import du CSS & des images
import '../styles/Playlist.css';
import image from '../img/button.svg';

function DisplayPlaylist(reponse){
    //Initialisation des useState
    const [activateFollow, activateFollowUpdate] = useState(false)

    //Gestion de l'animation du bouton follow
    function activeFollow(){
        if(activateFollow){
            activateFollowUpdate(false);
        }
        else{
            activateFollowUpdate(true);
        }
        document.querySelector('.follow').classList.toggle('followOn')
    }

    //Gestion de l'animation du bouton download
    function activeSlide(){
        document.querySelector('.slideTwo').classList.toggle('slideTwoOn');
        document.querySelector('.slideOne').classList.toggle('slideOneOn');
    }

    //Affichage du titre et de l'artiste des chansons
    function displaySongs(item){
        if(item.track === null){
            return;
        }
        return (
            <div className="song" key={item.track.id + item.added_at}>
                <div>
                    <p>{item.track.name}</p>
                    <p>{item.track.artists.map((artist)=>(artist.name + ' ' ))}</p>
                </div>
                <img src={image} alt='moreInfo' className='moreInfo' />
            </div>
        )
    }

    return(
        <div id='Playlist'>
            <div>
                <img src={reponse.re.images[0].url} alt='Playlist screen' />
                <h1>{reponse.re.name}</h1>
                <a onClick={() => activeFollow()} className='follow followOff'>{ activateFollow ? 'FOLLOWING' : 'FOLLOW' }</a>
                <h3>{reponse.re.owner.display_name} • {reponse.re.followers.total} FOLLOWERS</h3>
                <a href={reponse.re.uri + ':play'}>SHUFFLE PLAY</a>
            </div>
            <div className="songlist">
                <div>
                    <p>Download</p>
                    <div onClick={()=>activeSlide()} className='slide'>
                        <div className='slideOne'></div>
                        <div className='slideTwo'></div>
                    </div>
                </div>
                {reponse.re.tracks.items.map((item) => (
                    displaySongs(item)
                ))}
            </div>
        </div>
        
    )
}

export default DisplayPlaylist;