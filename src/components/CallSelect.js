import  React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import {BACKEND} from '../config';

class CallSelect extends Component {

    state = {
        callId: 1
    }

    chooseCall = (event) => {
        this.setState({callId: Number(event.target.value)});
    }


    removeCall = () => {
        fetch(`${BACKEND.BASE_URL}/calls/remove`, {
            method: 'POST',
            body: JSON.stringify({ callId: this.state.callId }),
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
    
        })
        .then(res => res.json())
        .then(json => {
            if(json.message === "OK"){
                return this.props.update();
            }
        })
        .catch(error => console.log(error));
    }

    render(){
        return(
            <div>
                <select name="calls" id="calls" onChange={this.chooseCall}>
                    {this.props.calls.map((call) => {
                        return <option key={call.id} value={`${call.id}`}>{call.phoneNumber}</option>
                    })}
                </select>
                <Button onClick={this.removeCall}>remove call</Button>
            </div>
        )
    }
}

export default CallSelect;
