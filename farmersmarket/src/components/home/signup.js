import React, { Component } from "react";
import { useHistory, withRouter, Link } from "react-router-dom";
import './home.css';
import Navigation from './Nav.js';
import Form from 'react-bootstrap/Form';
import TandC from './tandcSU.js';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

var result;
var body;
const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validMobileRegex = RegExp(/^[6-9]{1}[0-9]{9}$/);

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmpasswordChange = this.handleConfirmpasswordChange.bind(this);
        this.handleMobileChange = this.handleMobileChange.bind(this);
        this.handleRoleChange = this.handleRoleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.state = {
            n: false,
            e: false,
            p: false,
            cp: false,
            m: false,
            r: false,
            name: "",
            email: "",
            password: "",
            confirmpassword: "",
            mobile: "",
            interests: [],
            role: "",
            uid: "",
            errors: {
                name: '',
                email: '',
                password: '',
                confirmpassword: '',
                mobile: '',
                role: '',
                checkbx: false,
            }
        };
    }

    validateForm() {
        return this.state.name.length > 0 && this.state.password.length > 5;
    }

    componentDidMount() {
        window.localStorage.removeItem('uid')
    }

    handleNameChange = event => {
        const { name, value } = event.target;
        let errors = this.state.errors;
        errors.name = value.length < 5 ? 'Full Name must be 5 characters long' : '';
        if (errors.name == '') {
            this.setState({ n: true });
        }
        this.setState({ errors, [name]: value });
    }

    handleEmailChange = event => {
        const { name, value } = event.target;
        let errors = this.state.errors;
        errors.email = validEmailRegex.test(value) ? '' : 'Email is not valid';
        if (errors.email == '') {
            this.setState({ e: true });
        }
        this.setState({ errors, [name]: value });
    }

    handlePasswordChange = event => {
        const { name, value } = event.target;
        let errors = this.state.errors;
        errors.password = value.length < 8 ? 'Password must be 8 characters long' : '';
        if (errors.password == '') {
            this.setState({ p: true });
        }
        this.setState({ errors, [name]: value });
    }

    handleConfirmpasswordChange = event => {
        const { name, value } = event.target;
        let errors = this.state.errors;
        errors.confirmpassword = this.state.password != value ? 'Passwords don\'t match' : '';
        if (errors.password == '') {
            this.setState({ cp: true });
        }
        this.setState({ errors, [name]: value });
    }

    handleMobileChange = event => {
        const { name, value } = event.target;
        let errors = this.state.errors;
        errors.mobile = (validMobileRegex.test(value)) ? '' : 'Enter a valid phone number';
        if (errors.mobile == '') {
            this.setState({ m: true });
        }
        this.setState({ errors, [name]: value });
    }

    handleRoleChange(event) {
        this.setState({
            role: event.target.value,
            r: true
        });
    }

    handleCheckboxChange(event) {
        const target = event.target;
        var value = target.value;

        if (target.checked) {
            this.state.interests[value] = value;
        } else {
            this.state.interests.splice(value, 1);
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        var body = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            mobile: this.state.mobile,
            role: this.state.role,
            rating: 6.0,
            numrating: 0,
            status: 'unauthenticated',
        }
        console.log(body);
        if (this.state.name == "") {
            alert('Please enter the name')
        }
        else if (this.state.email == "") {
            alert('Please enter the email')
        }
        else if (this.state.password == "") {
            alert('Please enter the password')
        }
        else if (this.state.confirmpassword == "") {
            alert('Please confirm the password')
        }
        else if (this.state.mobile == "") {
            alert('Please enter the phone number')
        }
        else if (this.state.role == "") {
            alert('Please enter the role')
        }

        else {

            if (this.state.r == true && this.state.n == true && this.state.e == true && this.state.m == true && this.state.p == true && this.state.cp == true) {
                const url = "http://localhost:9000/register";
                let headers = new Headers();
                headers.append('Content-Type', 'application/json');
                headers.append('Accept', 'application/json');
                headers.append('Access-Control-Allow-origin', url);
                headers.append('Access-Control-Allow-Credentials', 'true');
                headers.append('POST', 'GET');
                // console.log(body);
                await fetch(url, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify(body)
                })
                    .then(response => {
                        if (response.ok) {
                            alert("Registration successful!\nA verification link is sent to your email. You can login in after activating your account with the link.\n\nYou will be redirected to login page.");
                            result = response.json();
                            console.log(result);
                            window.location.href = '/login'
                        }
                    })
                    .catch(() => console.log("Can't access " + url + " response. "))
            }
        }
        await fetch('http://localhost:9000/getUserId/' + this.state.email)
            .then(response => response.json())
            .then(data => {
                this.setState({ uid: data.userId })
            });
        console.log(this.state.uid)

        var interestsArray = [];
        Object.entries(this.state.interests).map(([key, value]) => {
            interestsArray.push(key);
        })
        console.log(interestsArray);
        console.log()
        var body1 = {
            uid: this.state.uid,
            interests: interestsArray
        }
        const url1 = 'http://localhost:9000/registerInterests';
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Access-Control-Allow-origin', url1);
        headers.append('Access-Control-Allow-Credentials', 'true');
        headers.append('POST', 'GET');
        console.log(body1);
        await fetch(url1, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify(body1)
        })
            .then(response => {
                if (response.ok) {
                    //alert("Registration successful!\nA verification link is sent to your email. You can login in after activating your account with the link.\n\nYou will be redirected to login page.");
                    alert("Registered");
                    result = response.json();
                    console.log(result);
                    window.location.href = '/login'
                }
            })
            .catch(() => console.log("Can't access " + url1 + " response. "))

    }

    render() {
        const { errors } = this.state;
        return (<div className="bg">
            <Navigation />
            <br /><br /><br /><br />
            <Row>

                <Col>

                    <div className="auth-wrapper1">
                        <div className="auth-inner-half">
                            <form>
                                <h1>SIGN UP</h1><hr />

                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="name" name="name" id="examplename" className="form-control" placeholder="Enter name" value={this.state.name} onChange={this.handleNameChange} required />
                                    <span className='error'>{errors.name}</span>
                                </div>

                                <div className="form-group">
                                    <label>Email address</label>
                                    <input type="email" name="email" id="exampleEmail" className="form-control" placeholder="mygmail@gmail.com" value={this.state.email} onChange={this.handleEmailChange} required />
                                    <span className='error'>{errors.email}</span>
                                </div>

                                <div className="form-group">
                                    <label>Mobile</label>
                                    <input type="phone" name="mobile" className="form-control" id="examplePhone" placeholder="Enter mobile number" value={this.state.phoneNumber} onChange={this.handleMobileChange} required />
                                    <span className='error'>{errors.mobile}</span>
                                </div>

                                <div key={'inline-radio'} className='form-group'>
                                    <Form.Label>Role</Form.Label><br />
                                    <Form.Check inline type='radio' name='role' value='farmer' label='Farmer' onChange={this.handleRoleChange} />
                                    <Form.Check inline type='radio' name='role' value='buyer' label='Buyer' onChange={this.handleRoleChange} />
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label>Interests :</label><br />
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" name="hobbies" id="inlineCheckboxh1" value="Reading" onChange={this.handleCheckboxChange} />
                                            <label class="form-check-label" for="inlineCheckboxh1">Reading</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" name="hobbies" id="inlineCheckboxh2" value="Developing" onChange={this.handleCheckboxChange} />
                                            <label class="form-check-label" for="inlineCheckboxh2">Developing</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" name="hobbies" id="inlineCheckboxh3" value="Designing" onChange={this.handleCheckboxChange} />
                                            <label class="form-check-label" for="inlineCheckboxh3">Desiging</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" name="hobbies" id="inlineCheckboxh4" value="Drawing" onChange={this.handleCheckboxChange} />
                                            <label class="form-check-label" for="inlineCheckboxh4">Drawing</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" name="hobbies" id="inlineCheckboxh5" value="Painting" onChange={this.handleCheckboxChange} />
                                            <label class="form-check-label" for="inlineCheckboxh5">Painting</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" name="password" id="examplePassword" placeholder="********" className="form-control" value={this.state.psw} onChange={this.handlePasswordChange} required />
                                    <span className='error'>{errors.password}</span>
                                </div>

                                <div className="form-group">
                                    <label>Confirm password</label>
                                    <input type="password" name="confirmpassword" id="exampleConfirmPassword" placeholder="********" className="form-control" value={this.state.confirmpsw} onChange={this.handleConfirmpasswordChange} required />
                                    <span className='error'>{errors.confirmpassword}</span>
                                </div>

                                <div className="form-group">
                                    <input type="checkbox" onChange={() => this.setState({ checkbx: !this.state.checkbx })} /><span className='error'>  I accept the terms and conditions.</span>
                                </div>

                                <button type="submit" className="btn btn-primary btn-block btn-lg" onClick={this.handleSubmit} disabled={!this.state.checkbx}>SIGN UP</button>
                                <p className="forgot-password text-right"> Already registered? <a href="/Login">Login</a></p>
                            </form>
                        </div>

                    </div>
                </Col>
                <Col>
                    <TandC />
                </Col>
            </Row>
            <br /><br /><br /><br /><br />
        </div>
        );
    }
}