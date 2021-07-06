import  React, {Component} from 'react';

class Calls extends Component {

    render(){
        const calls = this.props.calls;
        return(
            <div>
                {
                   calls.map((call) => {
                        return(
                            <div key={call.id}>
                                caller: {call.callerName}  &nbsp;&nbsp;&nbsp; phone: {call.phoneNumber}  &nbsp;&nbsp;&nbsp; time: {call.arriveTime}
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default Calls;