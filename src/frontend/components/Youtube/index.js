import React from 'react'
import VideoList from 'components/Youtube/VideoList'
import DebouncedInput from 'components/Youtube/DebouncedInput'

const KEY = 'AIzaSyBQ0inJMYo3nyDlSs5KnDtRQl86kpsRNqI'

export default class Youtube extends React.Component {
  state = {
    results: []
  }

  searchVideo = (term) => {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=24&type=video&q=${term}&key=${KEY}`
    window.fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({ results: data.items.map(item => ({
          id: item.id.videoId,
          url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.high.url
        }))})
      })
  }

  render () {
    return (
      <div>
        <h1>Youtube</h1>
        <DebouncedInput autoFocus placeholder='Search...' onChange={this.searchVideo} />
        <VideoList results={this.state.results} />
      </div>
    )
  }
}
