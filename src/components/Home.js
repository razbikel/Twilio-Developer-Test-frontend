import React, {Component} from 'react';
import Calls from './Calls'
import CallSelect from './CallSelect';
import {BACKEND} from '../config';
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import './Home.css';

class Home extends Component{

    state= {
        calls: [],
        phoneNumber: '',
        callerName: '',
    }

    componentDidMount(){
        this.updateCalls();
    }

    updateCalls = () => {
        fetch(`${BACKEND.BASE_URL}/calls/get-calls`)
        .then(res => res.json())
        .then(json => {
            this.setState({calls: json.calls});
        })
        .catch(error => console.log(error));
    }

    setPhoneNumber = (event) => {
        this.setState({ phoneNumber: event.target.value })
    }

    setCallerName = (event) => {
        this.setState({ callerName: event.target.value })
    }

    addCall = () => {
        fetch(`${BACKEND.BASE_URL}/calls/add`, {
            method: 'POST',
            body: JSON.stringify({ phoneNumber: this.state.phoneNumber, callerName:this.state.callerName }),
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
    
        })
        .then(res => res.json())
        .then(json => {
            if (json.message !== 'error'){
                return fetch(`${BACKEND.BASE_URL}/calls/get-calls`)
            }
        })
        .then(res => res.json())
        .then(json => {
            this.setState({calls: json.calls});
        })
        .catch(error => console.log(error));
    }
   
    render(){
        
        return(
            <div>
                <div className="container-main">
                <h2>call history</h2>
                    <Calls calls={this.state.calls}/>
                    <br />
                    <hr />
                    <h3>call select</h3>
                    <CallSelect calls={this.state.calls} update={this.updateCalls}/>
                    <br />
                    <hr />
                    <FormGroup>
                        <FormControl 
                            type = 'text'
                            value = {this.state.phoneNumber}
                            placeholder = 'enter phone number'
                            onChange = {this.setPhoneNumber}
                     />
                    </FormGroup>
                    <FormGroup>
                        <FormControl 
                            type = 'text'
                            value = {this.state.setCallerName}
                            placeholder = 'enter caller name'
                            onChange = {this.setCallerName}
                     />
                    </FormGroup>
                    <Button onClick={this.addCall}>add call</Button>
                </div>
 
            </div>
        )
    }
}

export default Home;