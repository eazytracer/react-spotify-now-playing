import { ProgressBar } from "react-bootstrap";
import * as React from "react";
import { MutableRefObject, useEffect, useRef } from "react";
import { useState } from "react";

import { NowPlaying } from "../App";
import { timeConversion } from "../utils/timeUtils";


export function CurrentlyPlaying(nowPlaying: NowPlaying) {
    const titleRef = useRef() as MutableRefObject<HTMLHeadingElement>;
    const [textOverflow, setTextOverflow] = useState<boolean>(false);
    useEffect(() => {
        console.log(titleRef);
        // @ts-ignore
        console.log(titleRef.current.scrollWidth < titleRef.current.parentElement.offsetWidth);
        // @ts-ignore
        setTextOverflow(titleRef.current.scrollWidth < titleRef.current.parentElement.offsetWidth);
    });
    const albumBgStyle = {
        backgroundImage: `url(${nowPlaying.albumArt})`
    };

    return (
        <div className={"NowPlayingContainer"}>
            <div className={"AlbumArt"}>
                <img src={nowPlaying.albumArt} alt={"blah"} />
            </div>
            <div className={"AlbumBg"} style={albumBgStyle}>Blah</div>
            <div className={"TrackTitle"}>
                <div className={"ScrollText"}><h3 ref={titleRef} className={`TrackTitle ${textOverflow ? "A" : "TrackOverflow"}`}>{nowPlaying.trackName}</h3></div>
            </div>
            <div className={"ArtistNames"}>
                <div className={"ScrollText"}><h5>{nowPlaying.artistNames}</h5></div>
            </div>
            <div className={"ProgressTime"}>
                {timeConversion(nowPlaying.progressMs)}
            </div>
            <div className={"ProgressBar"}>
                <ProgressBar now={ nowPlaying.progressMs / nowPlaying.durationMs * 100 } />
            </div>
            <div className={"DurationTime"}>
                {timeConversion(nowPlaying.durationMs)}
            </div>
        </div>
    )
}