function showPage(id) {
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active')
  })

  document.getElementById(id).classList.add('active')
}

async function downloadTikTok() {
  const url = document.getElementById('ttUrl').value
  const res = await fetch(`/api/tiktok?url=${encodeURIComponent(url)}`)
  const data = await res.json()

  if (!data.status) {
    return alert(data.message)
  }

  document.getElementById('ttResult').innerHTML = `
  <div class="card">
    <h3>${data.result.title}</h3>
    <video controls width="100%" src="${data.result.play}"></video>
  </div>`
}

async function downloadInstagram() {
  const url = document.getElementById('igUrl').value
  const res = await fetch(`/api/instagram?url=${encodeURIComponent(url)}`)
  const data = await res.json()

  document.getElementById('igResult').innerHTML = `
  <div class="card">
    <a href="${data.data[0].url}" target="_blank">Download Media</a>
  </div>`
}

async function downloadYoutube() {
  const url = document.getElementById('ytUrl').value
  const res = await fetch(`/api/youtube?url=${encodeURIComponent(url)}`)
  const data = await res.json()

  document.getElementById('ytResult').innerHTML = `
  <div class="card">
    <h3>${data.data.title}</h3>
    <a href="${data.data.download}" target="_blank">Download Video</a>
  </div>`
}

async function spotifySearch() {
  const q = document.getElementById('spQuery').value
  const res = await fetch(`/api/spotify?q=${q}`)
  const data = await res.json()

  let html = ''

  data.data.forEach(v => {
    html += `
    <div class="card">
      <h3>${v.title}</h3>
      <p>${v.artist}</p>
    </div>`
  })

  document.getElementById('spResult').innerHTML = html
}

async function musicSearch() {
  const q = document.getElementById('musicQuery').value
  const res = await fetch(`/api/music?q=${q}`)
  const data = await res.json()

  let html = ''

  data.data.slice(0, 5).forEach(v => {
    html += `
    <div class="card">
      <h3>${v.title}</h3>
      <p>${v.author.name}</p>
    </div>`
  })

  document.getElementById('musicResult').innerHTML = html
}

function generateIQC() {
  const text = document.getElementById('iqcText').value

  document.getElementById('iqcResult').innerHTML = `
  <div class="card">
    <h3>IQC Result</h3>
    <p>${btoa(text)}</p>
  </div>`
}

async function debugError() {
  const text = document.getElementById('debugText').value

  const res = await fetch('/api/debug', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text })
  })

  const data = await res.json()

  document.getElementById('debugResult').innerHTML = `
  <div class="card">
    <p>${data.result}</p>
  </div>`
}