import React, { useState } from 'react'
import image from './img/loading.gif.gif'

export default function Weather() {

  let [city, setCity] = useState('')
  let [wDetails, setWdeatails] = useState()
  let [isLoading, setIsloading] = useState(false)

  let handleSubmit = async (event) => {
    setIsloading(true)

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d67619db77416206g8f2340877e0aaff&units=metric`

    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData)

    if (parsedData.cod === '404') {
      setWdeatails(undefined)
    } else {
      setWdeatails(parsedData)
    }
    setIsloading(false)

    event.preventDefault();
    setCity('')
  }

  return (
    <>
      <h1 className='heading'>Weather Checked</h1>
      <div className='small-container'>
        <input
          type='text'
          value={city}
          onChange={(event) => setCity(event.target.value)}
          placeholder='Enter the cityName.......'
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>

      <div className='large-container'>
        {/* Loading Spinner */}
        {isLoading && (
          <img
            src={image}
            width={'150px'}
            height={'150px'}
            className="position-absolute"
            style={{ marginLeft: '8rem', marginTop: "4rem" }}
          />
        )}

        {/* Weather Info */}
        {wDetails
          ? (
            <>
              <h2>{wDetails?.name}</h2>
              <h4>{wDetails?.sys?.country}</h4>

              <div className='temp-container'>
                <p>{wDetails?.main?.temp}</p>
                <p>°C</p>
              </div>

              <div className='img-Container'>
                <img src={`http://openweathermap.org/img/w/${wDetails?.weather?.[0]?.icon}.png`} alt="Weather Icon" />
              </div>

              <div className='noraml-container'>
                <p>{wDetails?.weather?.[0]?.description}</p>
              </div>
            </>
          )
          : (!isLoading && <p>City not found.</p>)
        }
      </div>
    </>
  )
}
