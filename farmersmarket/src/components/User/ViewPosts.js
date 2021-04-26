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
            'tags': [],
            id: this.props.match.params.id,
            role: this.props.match.params.role
        };
    }
    async componentDidMount() {
        const url = 'http://localhost:9000/viewPosts/' + this.state.id + '/' + this.state.role
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Access-Control-Allow-origin', url);
        headers.append('Access-Control-Allow-Credentials', 'true');
        headers.append('POST', 'GET');

        await fetch(url, {
            headers: headers,
            method: 'GET',
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(response => this.setState({ 'posts': response }));
        // .then(response => console.log(this.state.posts.length));
        console.log(this.state.posts)

        for (let i = 0; i < this.state.posts.length; i++) {
            let postId = this.state.posts[i].id;
            console.log(postId);
            // this.setState({'tags': [...this.state.tags, "Hello"]});
            // console.log(this.state.tags);
            const url1 = 'http://localhost:9000/getTags/' + postId 
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');
            headers.append('Access-Control-Allow-origin', url1);
            headers.append('Access-Control-Allow-Credentials', 'true');
            headers.append('POST', 'GET');

            await fetch(url1, {
                headers: headers,
                method: 'GET',
                body: JSON.stringify(body)
            })
                .then(response => response.json())
                .then(response => this.setState({'tags': [...this.state.tags, "Hello"]}));
        }


    }

    renderList(farmer) {
        // console.log(this.state.posts)
        return this.state.posts.map(function (item) {
            console.log("in render list: " + farmer);
            return (
                <div className="mb-3">
                    <div key={item.id} className="auth-inner" >

                        <h1> {item.title} </h1>  <hr />
                        {item.body} <br /><br />
                        {item.imageUrl
                            ?
                            <center><img src={item.imageUrl} alt="No image" className="imageUrl" />
                            </center>

                            :
                            <br />
                        }
                        <br />

                        {item.link
                            ?
                            <iframe className="yt-link" width="510" height="315" src={`https://www.youtube.com/embed/${item.link}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            :
                            <br />
                        }

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