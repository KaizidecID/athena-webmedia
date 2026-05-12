const express = require('express')
const axios = require('axios')
const cors = require('cors')
const path = require('path')

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

// TIKTOK
app.get('/api/tiktok', async (req, res) => {
  try {
    const url = req.query.url

    if (!url) {
      return res.json({ status: false, message: 'Masukkan URL TikTok' })
    }

    const api = await axios.get(`https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`)

    res.json({
      status: true,
      result: api.data.data
    })
  } catch (e) {
    res.json({ status: false, message: e.message })
  }
})

// INSTAGRAM
app.get('/api/instagram', async (req, res) => {
  try {
    const url = req.query.url

    if (!url) {
      return res.json({ status: false, message: 'Masukkan URL Instagram' })
    }

    const api = await axios.get(`https://api.agatz.xyz/api/igdl?url=${encodeURIComponent(url)}`)

    res.json(api.data)
  } catch (e) {
    res.json({ status: false, message: e.message })
  }
})

// YOUTUBE
app.get('/api/youtube', async (req, res) => {
  try {
    const url = req.query.url

    if (!url) {
      return res.json({ status: false, message: 'Masukkan URL YouTube' })
    }

    const api = await axios.get(`https://api.agatz.xyz/api/ytmp4?url=${encodeURIComponent(url)}`)

    res.json(api.data)
  } catch (e) {
    res.json({ status: false, message: e.message })
  }
})

// SPOTIFY SEARCH
app.get('/api/spotify', async (req, res) => {
  try {
    const q = req.query.q

    const api = await axios.get(`https://api.agatz.xyz/api/spotifysearch?message=${q}`)

    res.json(api.data)
  } catch (e) {
    res.json({ status: false, message: e.message })
  }
})

// MUSIC SEARCH
app.get('/api/music', async (req, res) => {
  try {
    const q = req.query.q

    const api = await axios.get(`https://api.agatz.xyz/api/ytsearch?message=${q}`)

    res.json(api.data)
  } catch (e) {
    res.json({ status: false, message: e.message })
  }
})

// TERMINAL DEBUG
app.post('/api/debug', async (req, res) => {
  try {
    const text = req.body.text

    if (!text) {
      return res.json({
        status: false,
        message: 'Masukkan error'
      })
    }

    let result = 'Kemungkinan error berasal dari syntax atau module tidak ditemukan.'

    if (text.includes('MODULE_NOT_FOUND')) {
      result = 'Install module menggunakan npm install'
    }

    if (text.includes('EADDRINUSE')) {
      result = 'Port sedang digunakan. Ganti PORT atau kill process lama.'
    }

    if (text.includes('ReferenceError')) {
      result = 'Ada variable/function yang belum didefinisikan.'
    }

    res.json({
      status: true,
      result
    })
  } catch (e) {
    res.json({ status: false, message: e.message })
  }
})

app.listen(PORT, () => {
  console.log(`ATHENA running on http://localhost:${PORT}`)
})