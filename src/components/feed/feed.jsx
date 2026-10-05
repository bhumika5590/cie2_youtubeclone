import React from 'react'
import './feed.css'
import { Link } from 'react-router-dom'

import thumbnail1 from '../../assets/thumbnail1.png'
import thumbnail2 from '../../assets/thumbnail2.png'
import thumbnail3 from '../../assets/thumbnail3.png'
import thumbnail4 from '../../assets/thumbnail4.png'
import thumbnail5 from '../../assets/thumbnail5.png'
import thumbnail6 from '../../assets/thumbnail6.png'
import thumbnail7 from '../../assets/thumbnail7.png'
import thumbnail8 from '../../assets/thumbnail8.png'

const Feed = ({ videos = [], category }) => {

    const thumbnails = [
        thumbnail1,
        thumbnail2,
        thumbnail3,
        thumbnail4,
        thumbnail5,
        thumbnail6,
        thumbnail7,
        thumbnail8
    ]

    return (
        <div className="feed">

            {videos.map((video) => {

                const thumbnail =
                    thumbnails[(video.id - 1) % thumbnails.length]

                return (
                    <Link
                        to={`/video/${video.id}/4521`}
                        className="card"
                        key={video.id}
                    >

                        <img
                            src={thumbnail}
                            alt={video.title}
                        />

                        <h2>{video.title}</h2>

                        <h3>{video.channel}</h3>

                        <p>
                            {video.views} views • {video.time}
                        </p>

                    </Link>
                )
            })}

        </div>
    )
}

export default Feed