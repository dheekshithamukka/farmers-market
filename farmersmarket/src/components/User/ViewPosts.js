import React, { Component } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './UserHome.css'
import { Container } from "react-bootstrap";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Nav from './nav.js';


var body
var result
var key

class ViewPosts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'posts': [],
            id: this.props.match.params.id,
            role: this.props.match.params.role
        };
    }
    componentDidMount() {
        const url = 'http://localhost:9000/viewPosts/' + this.state.id +'/'+ this.state.role
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Access-Control-Allow-origin', url);
        headers.append('Access-Control-Allow-Credentials', 'true');
        headers.append('POST', 'GET');

        fetch(url, {
            headers: headers,
            method: 'GET',
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(response => this.setState({ 'posts': response }));
            // .then(response => console.log(this.state.posts.length));
            console.log(this.state.posts)
    }

    renderList(farmer) {
        console.log(this.state.posts)
        return this.state.posts.map(function (item) {
            // <br/>
            console.log("in render list: " + farmer);
            // <br />
            return (
                <div className="mb-3">
                <div key={item.id} className="auth-inner" >
                    {/* <br /> */}
                    Title : {item.title} <br />
                    Body : {item.body} 
                </div>
                </div>
            )
        })
    }

    render() {
        var uid = this.props.match.params.id
        var role = this.props.match.params.role


        return (

            <div 
            // className="auth-inner"
            >
                
                <Nav uid={uid} role={role} />

                <br />
                <br />
                
                {this.state.posts.length == 0 && <h3 className="auth-inner">No Posts Yet</h3>}
                {/* {this.state.posts.length > 0 &&
                    <Row>
                        <Col xs="1">CROP</Col><Col xs="1"></Col><Col xs="2">AREA</Col><Col xs="2">LOCATION</Col><Col xs="1"></Col><Col xs="2">PRICE</Col><Col xs="3">ACTION</Col>
                    </Row>
                    } */}
                <hr /> 
                <ul className="mt-3">
                    {this.renderList(this.state.id)}
                </ul>
                <br />

            </div>
        );
    }
}

export default ViewPosts;