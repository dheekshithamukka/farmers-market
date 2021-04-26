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

class Newsfeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'posts': [],
            'tags': [],
            postTags: [],
            id: this.props.match.params.id,
            role: this.props.match.params.role

        };
    }
    async componentDidMount() {
        let postVar = [];
        const url = 'http://localhost:9000/newsfeed/' + this.props.match.params.id  //+ this.state.tags
        console.log(url)
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
            .then(response => {
                postVar = response;
            });

            for (let i = 0; i < postVar.length; i++) {
                let postId = postVar[i].id;
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
                    .then(response => this.setState({'posts': postVar,'tags': [...this.state.tags, response]}));
                }
                let tagsArray = [];
            

        for(let i=0;i<this.state.tags.length;i++) {
            let tagsString = "";
            for(let j=0;j<this.state.tags[i].length;j++) {
                tagsString += this.state.tags[i][j].tags + "\n";
            }
            tagsArray[i] = tagsString.replace(/\n*$/, "");
        }
        for(let i=0;i<this.state.posts.length;i++) {
         this.setState({postTags: [...this.state.postTags, [this.state.posts[i], tagsArray[i]]]});
        }

        console.log(this.state.postTags)
    
    }


    renderList(farmer) {
        return this.state.postTags.map(function (item) {
            console.log("in render list: " + farmer);
            
            return (
                <div className="mb-3">
                    <div key={item[0].id} className="auth-inner" >
                    
                        <h1> {item[0].title} </h1>  <hr />
                        {item[0].body}
                        {item[0].imageUrl
                            ?
                            <center><br /><br /><img src={item[0].imageUrl} alt="No image" className="imageUrl" />
                            </center>

                            :
                            <></>
                        }
                        <br />

                        {item[0].link
                            ?
                            <iframe className="yt-link" width="510" height="315" src={`https://www.youtube.com/embed/${item.link}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            :
                            <></>
                        }
                        <br />

                        <br />


                        {item[1].split("\n").map(str => <span className="mr-3 tags">{str}</span>)}

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
                <Nav uid={uid} />
                <br />
                {this.state.posts.length == 0 && <h3 className="auth-inner">No Posts Yet</h3>}
                <hr />
                <ul>
                    {this.renderList(this.state.id)}
                </ul>
                <br />
            </div>
        );
    }
}

export default Newsfeed;
