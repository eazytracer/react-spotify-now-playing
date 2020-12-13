import {NowPlaying} from "../App";
import {CurrentlyPlayingResponse} from "../models/SpotifyCurrentlyPlaying";
import * as React from "react";

export const getCurrentlyPlayingAsync = (accessToken: string, setNowPlaying: React.Dispatch<React.SetStateAction<NowPlaying | null>>): Promise<any> => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + accessToken);
    myHeaders.append('Accept', 'application/json');

    return fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        method: 'GET',
        headers: myHeaders,
    }).then(response => response.json())
        .then((data: CurrentlyPlayingResponse) => {
            const multiArtist = data.item.artists.length > 1;
            let artistNames = "";
            if (multiArtist) {
                data.item.artists.map((artist, i, arr) => {
                    if (arr.length - 1 === i) {
                        artistNames += artist.name;
                    } else {
                        artistNames += artist.name + ", ";
                    }
                });
            } else {
                artistNames = data.item.artists[0].name;
            }
            const nowPlaying: NowPlaying = {
                albumArt: data.item.album.images[1].url,
                artistNames: artistNames,
                durationMs: data.item.duration_ms,
                isPlaying: data.is_playing,
                progressMs: data.progress_ms,
                trackName: data.item.name,
                updateTime: data.timestamp
            };
            setNowPlaying(nowPlaying);
        }).catch((error) => {
        console.log(error);
        if (error instanceof XMLHttpRequest) {
            if (error.status === 401) {
                console.log("fucked")
            }
        }
    });
};