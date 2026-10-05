const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 5001

// Middleware
app.use(cors())
app.use(express.json())

// Video data
const videos = [
    {
        id: 1,
        title: 'Exploring the Beautiful Mountains and Lake',
        channel: 'Travel Vibes',
        category: 'Blogs',
        views: '100k',
        time: '2 days ago'
    },
    {
        id: 2,
        title: 'Beautiful Beach Ride Along the Coast',
        channel: 'Travel Vibes',
        category: 'Sports',
        views: '85k',
        time: '3 days ago'
    },
    {
        id: 3,
        title: 'Exploring One of the Biggest Shopping Malls',
        channel: 'Travel Explorer',
        category: 'Entertainment',
        views: '120k',
        time: '5 days ago'
    },
    {
        id: 4,
        title: 'Hidden Mountain Lake You Must Visit',
        channel: 'Nature World',
        category: 'News',
        views: '200k',
        time: '1 week ago'
    },
    {
        id: 5,
        title: 'A Perfect Day Out With Friends',
        channel: 'Travel With Us',
        category: 'Entertainment',
        views: '75k',
        time: '1 week ago'
    },
    {
        id: 6,
        title: 'Dream Supercar: Lamborghini Aventador',
        channel: 'Auto World',
        category: 'Cars',
        views: '150k',
        time: '2 weeks ago'
    },
    {
        id: 7,
        title: 'Inside DCU University Campus',
        channel: 'Campus Tours',
        category: 'Technology',
        views: '95k',
        time: '2 weeks ago'
    },
    {
        id: 8,
        title: 'Yellow Lamborghini: A Stunning Supercar',
        channel: 'Supercar Central',
        category: 'Cars',
        views: '60k',
        time: '3 weeks ago'
    },
    {
        id: 9,
        title: 'Top Mountain Destinations You Should Visit',
        channel: 'Travel Vibes',
        category: 'Music',
        views: '110k',
        time: '3 weeks ago'
    },
    {
        id: 10,
        title: 'Best Coastal Cycling Routes',
        channel: 'Adventure Life',
        category: 'Sports',
        views: '90k',
        time: '1 month ago'
    },
    {
        id: 11,
        title: 'A Day of Shopping and Exploring',
        channel: 'Travel Explorer',
        category: 'Entertainment',
        views: '130k',
        time: '1 month ago'
    },
    {
        id: 12,
        title: 'Beautiful Places Around the Mountains',
        channel: 'Nature World',
        category: 'News',
        views: '180k',
        time: '1 month ago'
    },
    {
        id: 13,
        title: 'Walking Around the City With Friends',
        channel: 'Travel With Us',
        category: 'Entertainment',
        views: '105k',
        time: '1 month ago'
    },
    {
        id: 14,
        title: 'Top Luxury Sports Cars',
        channel: 'Auto World',
        category: 'Cars',
        views: '160k',
        time: '1 month ago'
    },
    {
        id: 15,
        title: 'Exploring the DCU Campus',
        channel: 'Campus Tours',
        category: 'Technology',
        views: '80k',
        time: '2 months ago'
    },
    {
        id: 16,
        title: 'Lamborghini Huracan: Ultimate Driving Experience',
        channel: 'Supercar Central',
        category: 'Cars',
        views: '180k',
        time: '2 months ago'
    }
]

// Home route
app.get('/', (req, res) => {
    res.json({
        message: 'VidTube Express API is running!'
    })
})

// Get all videos
app.get('/api/videos', (req, res) => {
    res.json(videos)
})

// Get one video
app.get('/api/videos/:id', (req, res) => {
    const id = Number(req.params.id)

    const video = videos.find(video => video.id === id)

    if (!video) {
        return res.status(404).json({
            message: 'Video not found'
        })
    }

    res.json(video)
})

// Search videos
app.get('/api/search', (req, res) => {
    const query = (req.query.q || '').toLowerCase()

    const results = videos.filter(video =>
        video.title.toLowerCase().includes(query) ||
        video.channel.toLowerCase().includes(query) ||
        video.category.toLowerCase().includes(query)
    )

    res.json(results)
})

// Get videos by category
app.get('/api/videos/category/:category', (req, res) => {
    const category = req.params.category.toLowerCase()

    const results = videos.filter(video =>
        video.category.toLowerCase() === category
    )

    res.json(results)
})

// Add a comment
app.post('/api/comments', (req, res) => {
    const { username, text, videoId } = req.body

    if (!text || !text.trim()) {
        return res.status(400).json({
            message: 'Comment cannot be empty'
        })
    }

    const newComment = {
        id: Date.now(),
        username: username || 'Guest',
        text: text.trim(),
        videoId: videoId || null
    }

    res.status(201).json({
        message: 'Comment added successfully',
        comment: newComment
    })
})

// Start server
app.listen(PORT, () => {
    console.log(`VidTube API running at http://localhost:${PORT}`)
})