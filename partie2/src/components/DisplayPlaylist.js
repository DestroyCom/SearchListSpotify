import '../styles/Playlist.css';
import image from '../img/button.svg';

function DisplayPlaylist(reponse){
    console.log(reponse)

    function displaySongs(item){
        if(item.track === null){
            return;
        }
        return (
            <div class="song">
                    <div>
                        <p>{item.track.name}</p>
                        <p>{item.track.artists.map((artist)=>(artist.name + ' ' ))}</p>
                    </div>
                    <img src={image} alt='moreInfo' />
                </div>
        )
    }

    return(
        <div id='Playlist'>
            <div>
                <img src={reponse.re.images[0].url} alt='Playlist screen' />
                <h1>{reponse.re.name}</h1>
                <a>FOLLOWING</a>
                <h3>{reponse.re.owner.display_name} • {reponse.re.followers.total} FOLLOWERS</h3>
                <a>SHUFFLE PLAY</a>
            </div>
            <div class="songlist">
                <div>
                    <p>Download</p>
                    <div>
                        <div></div>
                        <div></div>
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