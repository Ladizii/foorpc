const client = require('discord-rich-presence')('id')
const { FoobarControl } = require('foobar-control-http')
const foobar = new FoobarControl()

console.log('------------')

async function test() {
  let interval = setInterval(async function() {
    let state = await foobar.getStatus()
    let song = state.playingItem
  
    if (state.isPlaying) {
      console.log(`Currently playing: ${song.artist} - ${song.title}`)
      client.updatePresence({
        state: song.title,
        details: song.artist,
        startTimestamp: Date.now() - state.itemPlayingPos,
        largeImageKey: 'foobar2020',
        smallImageKey: 'play_icon',
        instance: true
      })
    } else {
      console.log(`Paused: ${song.artist} - ${song.title}`)
      client.updatePresence({
        state: song.title,
        details: `Paused`,
        largeImageKey: 'foobar2020',
        smallImageKey: 'play_icon',
        instance: true
      })
    }
  }, 5000)
}

test()