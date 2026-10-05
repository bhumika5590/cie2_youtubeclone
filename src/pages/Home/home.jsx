import React, { useEffect, useState } from 'react'
import './home.css'
import Feed from '../../components/feed/feed'
import ErrorMessage from '../../components/errorMessage/errorMessage'

const Home = ({ sidebarOpen, category }) => {

    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const categoryMap = {
        0: '',
        1: 'Sports',
        2: 'Cars',
        3: 'Technology',
        4: 'Entertainment',
        5: 'Music',
        6: 'News',
        7: 'Blogs'
    }

    useEffect(() => {

        const fetchVideos = async () => {

            try {
                setLoading(true)
                setError('')

                const selectedCategory = categoryMap[category]

                const url = selectedCategory
                    ? `http://localhost:5001/api/videos/category/${selectedCategory}`
                    : 'http://localhost:5001/api/videos'

                const response = await fetch(url)

                if (!response.ok) {
                    throw new Error('Failed to fetch videos')
                }

                const data = await response.json()

                setVideos(data)

            } catch (error) {

                console.error(error)
                setError('Unable to load videos from server')

            } finally {

                setLoading(false)

            }
        }

        fetchVideos()

    }, [category])

    return (
        <div className={sidebarOpen ? 'container' : 'container large-container'}>

            {loading && (
                <p style={{ padding: '20px' }}>
                    Loading videos...
                </p>
            )}

            {error && (
                 <ErrorMessage message={error} />
                 )}

            {!loading && !error && videos.length === 0 && (
                <p style={{ padding: '20px' }}>
                    No videos found in this category.
                </p>
            )}

            {!loading && !error && videos.length > 0 && (
                <Feed
                    category={category}
                    videos={videos}
                />
            )}

        </div>
    )
}

export default Home