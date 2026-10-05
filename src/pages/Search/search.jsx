import React, { useEffect, useState } from 'react'
import './search.css'
import Feed from '../../components/feed/feed'
import { useSearchParams } from 'react-router-dom'

const Search = ({ sidebarOpen }) => {

    const [searchParams] = useSearchParams()
    const query = searchParams.get('q') || ''

    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const searchVideos = async () => {

            try {

                setLoading(true)

                const response = await fetch(
                    `http://localhost:5001/api/search?q=${encodeURIComponent(query)}`
                )

                const data = await response.json()

                setVideos(data)

            } catch (error) {

                console.error('Search error:', error)
                setVideos([])

            } finally {

                setLoading(false)

            }
        }

        if (query.trim() !== '') {
            searchVideos()
        } else {
            setVideos([])
            setLoading(false)
        }

    }, [query])

    return (
        <div className={sidebarOpen ? 'container' : 'container large-container'}>

            <h2 className="search-heading">
                Search results for: "{query}"
            </h2>

            {loading && (
                <p className="search-message">
                    Searching...
                </p>
            )}

            {!loading && videos.length === 0 && (
                <p className="search-message">
                    No videos found.
                </p>
            )}

            {!loading && videos.length > 0 && (
                <Feed videos={videos} />
            )}

        </div>
    )
}

export default Search