import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

let audio1
let audio2
let audio3

function IzoCompare() {
  const searchParams = new URLSearchParams(window.location.search)
  const theme = searchParams.get('theme') || 'light'
  const label1 = searchParams.get('label1') || 'Original'
  const label2 =
    searchParams.get('label2') ||
    (searchParams.get('src3') ? 'RX8' : 'Processed')
  const label3 = searchParams.get('label3') || 'RX9'
  const [src1] = useState(searchParams.get('src1'))
  const [canPlay1, setCanPlay1] = useState(false)
  const [src2] = useState(searchParams.get('src2'))
  const [canPlay2, setCanPlay2] = useState(false)
  const [src3] = useState(searchParams.get('src3'))
  const [canPlay3, setCanPlay3] = useState(false)

  const [duration, setDuration] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [active, setActive] = useState(1)
  const [lastActive, setLastActive] = useState()

  useEffect(() => {
    // handle loading audio1
    if (src1) {
      audio1 = new Audio(src1)
      audio1.load()
      audio1.addEventListener('loadeddata', () => {
        setDuration((duration) => Math.max(duration, audio1.duration))
      })
      audio1.addEventListener('canplay', () => {
        setCanPlay1(true)
      })
      audio1.addEventListener('timeupdate', () => {
        setElapsed(audio1.currentTime)
      })
    }
  }, [src1]) // eslint-disable-line

  useEffect(() => {
    // handle loading audio2
    if (src2) {
      audio2 = new Audio(src2)
      audio2.load()
      audio2.addEventListener('loadeddata', () => {
        setDuration((duration) => Math.max(duration, audio2.duration))
      })
      audio2.addEventListener('canplay', () => {
        setCanPlay2(true)
      })
      audio2.addEventListener('timeupdate', () => {
        setElapsed(audio2.currentTime)
      })
    }
  }, [src2]) // eslint-disable-line

  useEffect(() => {
    // handle loading audio3
    if (src3) {
      audio3 = new Audio(src3)
      audio3.load()
      audio3.addEventListener('loadeddata', () => {
        setDuration((duration) => Math.max(duration, audio3.duration))
      })
      audio3.addEventListener('canplay', () => {
        setCanPlay3(true)
      })
      audio3.addEventListener('timeupdate', () => {
        setElapsed(audio3.currentTime)
      })
    }
  }, [src3]) // eslint-disable-line

  useEffect(() => {
    // handle switching active source during playback
    if (active !== lastActive && playing) {
      play()
      setLastActive(active)
    }
  }, [active, lastActive, playing]) // eslint-disable-line

  function play() {
    audio1.currentTime = elapsed
    audio2.currentTime = elapsed
    if (active === 1) {
      audio1.volume = 1
      audio2.volume = 0
      if (audio3) audio3.volume = 0
    } else if (active === 2) {
      audio1.volume = 0
      audio2.volume = 1
      if (audio3) audio3.volume = 0
    } else if (active === 3) {
      audio1.volume = 0
      audio2.volume = 0
      if (audio3) audio3.volume = 1
    }
    audio1.play()
    audio2.play()
    if (audio3) audio3.play()
    setPlaying(true)
  }

  function pause() {
    audio1.pause()
    audio2.pause()
    if (audio3) audio3.pause()
    setPlaying(false)
  }

  function scrub(event) {
    const time = event.target.value
    audio1.currentTime = time
    audio2.currentTime = time
    if (audio3) audio3.currentTime = time
    setElapsed(time)
  }

  function formatTime(seconds) {
    if (seconds === null) return '-:--'
    const mins = Math.floor(seconds / 60)
    seconds = Math.floor(seconds % 60)
    if (seconds < 10) seconds = '0' + seconds
    return mins + ':' + seconds
  }

  const canPlay = canPlay1 && canPlay2 && (canPlay3 || !src3) // 3rd src is optional

  return (
    <div
      id="IzoCompare"
      className={`${theme}-theme ${canPlay ? 'playable' : 'loading'} ${
        playing ? 'playing' : 'paused'
      } source-${active}`}
    >
      <div id="IzoCompare-playhead">
        <button
          id="IzoCompare-playhead-button"
          onClick={playing ? pause : play}
          disabled={!canPlay}
        >
          <img
            src={
              canPlay ? (playing ? '/pause.svg' : '/play.svg') : '/izotope.png'
            }
            alt={canPlay ? (playing ? 'Pause' : 'Play') : 'Loading'}
          />
        </button>
        <div className="IzoCompare-shadow-ring" id="IzoCompare-shadow-1" />
        <div className="IzoCompare-shadow-ring" id="IzoCompare-shadow-2" />
        <div className="IzoCompare-shadow-ring" id="IzoCompare-shadow-3" />
        <div className="IzoCompare-shadow-ring" id="IzoCompare-shadow-4" />
      </div>
      <div id="IzoCompare-timeline">
        <p id="IzoCompare-timeline-elapsed">{formatTime(elapsed)}</p>
        <input
          id="IzoCompare-timeline-slider"
          type="range"
          min={0}
          max={duration}
          onChange={scrub}
          value={elapsed}
        />
        <p id="IzoCompare-timeline-duration">{formatTime(duration)}</p>
      </div>
      <div id="IzoCompare-toggle-container">
        {src1 && (
          <button
            id="IzoCompare-toggle-original"
            onClick={() => setActive(1)}
            disabled={active === 1}
          >
            {label1}
          </button>
        )}
        {src2 && (
          <button
            id="IzoCompare-toggle-rx8"
            onClick={() => setActive(2)}
            disabled={active === 2}
          >
            {label2}
          </button>
        )}
        {src3 && (
          <button
            id="IzoCompare-toggle-rx9"
            onClick={() => setActive(3)}
            disabled={active === 3}
          >
            {label3}
          </button>
        )}
      </div>
    </div>
  )
}

ReactDOM.render(<IzoCompare />, document.getElementById('root'))
