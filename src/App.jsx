import { useState } from 'react'
import { getLocation } from './assets/ip-finder';
import { MapContainer, TileLayer, useMap,  Marker, Popup} from 'react-leaflet'
import './App.scss'
import "leaflet/dist/leaflet.css";

function App() {
  const [address, setAddress] = useState("");
  const [ip, setIp] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [isp, setIsp] = useState("");
  const [latlon, setLatlon] = useState();

  const submit = async () => {
    let response = await getLocation(address);
    let data = await response.json();
    setIp(data.ip);
    setIsp(data.isp);
    setLocation(data.location.country + ", " + data.location.region);
    setTime(data.location.timezone);
    setLatlon([parseFloat(data.location.lat), parseFloat(data.location.lon)]);
    setAddress("");
  }

  return (
    <>
      <div className="container">
        <div className="p1">
          <h1 className="title">IP Address Tracker</h1>
          <div className="form">
            <input type="text" className="ip-grabber" placeholder='Search for any IP address or domain' value={address} onChange={
              (e) => {
                e.preventDefault();
                setAddress(e.target.value)
              }}
            />
            <button type='submit' className='submit' onClick={submit}>
              <img src="icon-arrow.svg" alt="submit" />
            </button>
          </div>
          <div className="output">
            <div className="ip o">
              <div className="head">
                IP ADDRESS
              </div>
              <div className="val">
                {ip}
              </div>
            </div>
            <div className="location o">
              <div className="head">
                LOCATION
              </div>
              <div className="val">
                {location}
              </div>
            </div>
            <div className="time o">
              <div className="head">
                TIMEZONE
              </div>
              <div className="val">
                {time}
              </div>
            </div>
            <div className="isp o">
              <div className="head">
                ISP
              </div>
              <div className="val">
                {isp}
              </div>
            </div>
          </div>
        </div>
        <div className="p2">
          <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true} style={{height: "70vh", width: "100vw"}}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]}>
              <Popup>
                {ip} <br /> {location}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </>
  )
}

export default App
