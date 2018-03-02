'use strict';
// React library
import React from 'react';
// Axios for Ajax
import Axios from 'axios';
// Sound component
import Sound from 'react-sound';

/** Custom Components */
// Search components
import Search from '../components/search.component';
// Details components
import Details from '../components/details.component';
// Player components
import Player from '../components/player.component';
// Progress components
import Progress from '../components/progress.component';
// Footer components
import Footer from '../components/footer.component';

// Soundcloud playlists api url
const API_URL = 'https://api.soundcloud.com/playlists/209262931?client_id=';

class AppContainer extends React.Component {
  
  constructor(props){
    super(props);

    // Client ID
    this.client_id = '3GtnQtvbxU1K5jhCPJcq2xyZ6xtctDIc';
    //'2f98992c40b8edf17423d93bda2e04ab';

    // Initial State
    this.state = {
      // What ever is returned, we just need these 3 values
      track: {stream_url: '', title: '', artwork_url: ''},
      playStatus: Sound.status.STOPPED,
      elapsed: '00:00',
      total: '00:00',
      position: 0,
      playFromPosition: 0,
      autoCompleteValue: '',
      tracks: []
    }
    //this.randomTrack = this.randomTrack.bind(this);
  }

  // componentDidMount lifecycle method. Called once a component is loaded
  
  componentDidMount() {
    this.randomTrack();
  }
  
  
   randomTrack() {
     console.log('randomTrack Function');
    
   let _this = this;
    // Request for a playlist via Soundcloud using a client id
    Axios.get(`${API_URL}${this.client_id}`)
    .then(response => {
      // Store the length of the tracks
      console.log('Response:',response.data.tracks);
      const trackLength = response.data.tracks.length;

      // Pick a random number
      const randomNumber = Math.floor((Math.random()*trackLength )+1);

      // Set the track state with a random track from the playlist
    
        // Finaly set state after click.
        _this.setState({track: response.data.tracks[randomNumber]});
      
      
    })
    .catch(err => {
      // If something goes wrong, let us know
      console.log(err);
    }); 
     
  }

  // A method in the AppContainer class
  prepareUrl(url) {
    // Attach client id to stream url
    return `${url}?client_id=${this.client_id}`;
  }

  handleSongPlaying(audio) {

      // Finaly set state after click.
      this.setState({elapsed: this.formatMilliSeconds(audio.position),total: this.formatMilliSeconds(audio.duration),position: audio.position / audio.duration});
    
    
  }

  formatMilliSeconds(milliseconds) {
    // Format hours
    let hours = Math.floor(milliseconds / 3600000);
    milliseconds = milliseconds % 3600000;
    // Format minutes
    let minutes = Math.floor(milliseconds / 60000);
    milliseconds = milliseconds % 60000;
    // Format seconds
    let seconds = Math.floor(milliseconds / 1000);
    milliseconds = milliseconds % 1000;
    // Return as string
    return (minutes < 10 ? '0' : '') + minutes + ':' +
    (seconds < 10 ? '0' : '') + seconds;
  }

  handleSongFinished() {
    // Call random Track
    this.randomTrack();
  }

  handleSelect(value,item) {
  
      // Finaly set state after click.
     this.setState({autoCompleteValue: value, track: item});
    
    
  }

  handleChange(event, value) {
    console.log('handleChange: ',event.target.value);
    // Update input box
    
    this.setState({autoCompleteValue: event.target.value});
    let _this = this;
    // Search for song with entered value
    Axios.get(`https://api.soundcloud.com/tracks?client_id=${this.client_id}&q=${value}`)
    .then(response => {
      // Update track state
      console.log('handleChangeResponse: ',response);
     
      _this.setState({
          tracks: response.data
        }); 

    })
    .catch(err => {
      console.log('handleChangeResponseError: ',err);
    });
    
    
  }

  togglePlay() {
    // Check current playing state
  
    if(this.state.playStatus === Sound.status.PLAYING) {
    // Pause if playing
    this.setState({playStatus: Sound.status.PAUSED});
    } else{
    // Resume if paused
    this.setState({playStatus: Sound.status.PLAYING});
    }
   
      
  }

  stop() {
    // Stop sound
    this.setState({playStatus: Sound.status.STOPPED});
  }

  forward() {
    // Push the song +10 sec
    this.setState({playFromPosition: this.state.playFromPosition+=1000*10});
  }

  backward() {
    // Push the song -10 sec
    this.setState({playFromPosition: this.state.playFromPosition-=1000*10});
  }

  xlArtwork(url) {
    // replace it with a large one (Soundcloud calls it t500)
    console.log('artwork url', url);
    let modifiedUrl = url ? url.replace(/large/, 't500x500') : '';
    console.log('modified url', modifiedUrl);

    return modifiedUrl;
  }

  render() {
    const scotchStyle = {
      width: '500px',
      height: '500px',
      backgroundImage: `linear-gradient(
        rgba(0,0,0,0.7),
        rgba(0,0,0,0.7)
      ), url(${this.xlArtwork(this.state.track.artwork_url)})`
    };
    return(
      <div className="scotch_music" style={scotchStyle}>

      {/*
          
        */}
        <Search
         autoCompleteValue={this.state.autoCompleteValue}
         tracks={this.state.tracks}
         handleSelect={this.handleSelect.bind(this)}
         handleChange={this.handleChange.bind(this)}
       />
        
        {/*
          
        */}
        <Sound 
          url={this.prepareUrl(this.state.track.stream_url)}
          playStatus={this.state.playStatus}
          onPlaying={this.handleSongPlaying.bind(this)}
          playFromPosition={this.state.playFromPosition}
          onFinishedPlaying={this.handleSongFinished.bind(this)}
        />

        <Details
          title={this.state.track.title}
        />
        {/*
          
        */}
        <Player
          togglePlay={this.togglePlay.bind(this)}
          stop={this.stop.bind(this)}
          playStatus={this.state.playStatus}
          forward={this.forward.bind(this)}
          backward={this.backward.bind(this)}
          random={this.randomTrack.bind(this)}
        />
        
        {/*
          
        */} 
        <Progress
          elapsed={this.state.elapsed}
          total={this.state.total}
          position={this.state.position}
        />
        {/*
          <Footer />
        */} 

        
      </div>
    );
  }
}

export default AppContainer;