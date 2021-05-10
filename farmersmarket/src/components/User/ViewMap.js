import React, { Component } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Nav from './nav.js';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './map.css';


var myIcon = L.icon({
    iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=',
    iconSize: [25, 41],
});



// const position = [17.440081, 78.348915];
const position = [20.5937, 78.9629];




class ViewMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stateName: '',
            cropName: '',
            tp: 0,
            locations: [],

        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleStateNameChange = this.handleStateNameChange.bind(this);
        this.handleCropNameChange = this.handleCropNameChange.bind(this);
        this.handleTpChange = this.handleTpChange.bind(this);

    }

    handleStateNameChange(event) {
        console.log(event.target.value);
        this.setState({
            stateName: event.target.value
        });
    }

    handleCropNameChange = event => {
        this.setState({
            cropName: event.target.value
        })
    }
    handleTpChange = event => {
        this.setState({
            tp: event.target.value
        })
    }

    // handleClick = (e) => {
    //     this.props.setMarker({
    //         latitude: e.latlng.lat,
    //         longitude: e.latlng.lng
    //     });
    // };

    async handleSubmit(event) {
        event.preventDefault();
        if (this.state.stateName == "") {
            alert('Please enter the state name')

        }
        else if (this.state.cropName == "") {
            alert('Please enter the crop name')
        }

        else if (this.state.tp == "") {
            alert('Please enter the time period')
        }

        else {
            const url = "http://localhost:9000/viewMap/" + this.state.stateName + '/' + this.state.cropName + '/' + this.state.tp;
            let headers = new Headers();

            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');
            headers.append('Access-Control-Allow-origin', url);
            headers.append('Access-Control-Allow-Credentials', 'true');
            headers.append('POST', 'GET');

            await fetch(url, {
                headers: headers,
                method: 'GET',
                // body: JSON.stringify(body)
            })

                .then(response => response.json())
                .then(data => {
                    this.setState({ locations: data })
                });
        }


    }




    render() {
        return (
            <div className="container">
                <Nav />
                <form className="map">
                    <div className="row">
                        <div className="col-4 mt-5">

                            <div className="ml-5">
                                <label>State Name: </label>
                                <input type="Text" name="name" id="examplename" placeholder="Enter state name"
                                    value={this.state.name} onChange={this.handleStateNameChange}
                                />
                            </div>
                        </div>
                        <div className="col-4 mt-5">

                            <div >
                                <label>Crop Name: </label>
                                <input type="Text" name="name" id="examplename" placeholder="Enter crop name"
                                    value={this.state.name} onChange={this.handleCropNameChange}
                                />
                            </div>
                        </div>
                        <div className="col-4 mt-5">

                            <div >
                                <label for="tp">Choose time period: </label>

                                <select name="tp" id="tp" onChange={this.handleTpChange} >
                                    <option value=""></option>
                                    <option value="1">1 month</option>
                                    <option value="2">2 months</option>
                                    <option value="3">3 months</option>
                                    <option value="4">4 months</option>
                                    <option value="5">5 months</option>
                                    <option value="4">6 months</option>

                                </select>
                            </div>

                        </div>
                    </div>

                    <center>  
                    <button type="submit" className="btn btn-primary btn-xs mb-3 mt-3" onClick={this.handleSubmit}>SUBMIT</button>
                    </center> 
                </form>


                <MapContainer
                    ref={this.mapRef}
                    center={position}
                    zoom={6}
                    onClick={this.handleClick}
                >

                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />


                    {
                        this.state.locations.map((m, index) => (
                            <Marker position={[m[3], m[4]]} icon={myIcon}>
                                <Popup>Location: {m[0]}<br />Quantity: {parseInt(m[2])} quintals<br />Area: {m[1]} acres</Popup>
                            </Marker>
                        ))
                    }
                </MapContainer>
            </div>

        );
    }
}

export default ViewMap;