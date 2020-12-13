import React, {useState, useEffect} from 'react';
import { getCurrentlyPlayingAsync } from "./services/SpotifyServices";
import { getAuthorizeHref } from './oauthConfig';
import { getHashParams, removeHashParamsFromUrl } from './utils/hashUtils';
import { CurrentlyPlaying } from "./components/CurrentlyPlaying";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const hashParams = getHashParams();
console.log("them hash params", hashParams);
const access_token = hashParams.get("access_token");
const expires_in = hashParams.get("expires_in");
removeHashParamsFromUrl();


export interface AuthData {
  loggedIn: boolean;
  authToken: string;
  refreshToken: string;
  expirationTime: number;
}

export interface NowPlaying {
  updateTime: number;
  progressMs: number;
  durationMs: number;
  isPlaying: boolean;
  albumArt: string;
  artistNames: string;
  trackName: string;
}

function App() {
  const [authData, setAuthData] = useState<AuthData>({loggedIn: false, authToken: '', refreshToken: '', expirationTime: 0});
  const [nowPlaying, setNowPlaying] = useState<NowPlaying | null>(null);

  useEffect(() => {
    if (access_token) {
      const newAuthData: AuthData = {
        loggedIn: true,
        authToken: access_token,
        expirationTime: Number(expires_in),
        refreshToken: access_token
      };
      setAuthData(newAuthData);
    } else if (!authData.loggedIn) {
      window.open(getAuthorizeHref(), '_self');
    }
  }, []);

  useEffect(() => {
    if (authData.loggedIn) {
      const interval = setInterval(() => {
        {
          getCurrentlyPlayingAsync(authData.authToken, setNowPlaying)
        }
      }, 1000);
      return () => clearInterval(interval);
    }
    }, [authData]);


  return (
    <div className="App">
      <div className="NowPlaying">
        {nowPlaying &&
            <CurrentlyPlaying albumArt={nowPlaying.albumArt}
                              artistNames={nowPlaying.artistNames}
                              durationMs={nowPlaying.durationMs}
                              isPlaying={nowPlaying.isPlaying}
                              progressMs={nowPlaying.progressMs}
                              trackName={nowPlaying.trackName}
                              updateTime={nowPlaying.updateTime}/>
        }
      </div>
    </div>
  );
}

export default App;
