import React from 'react';
import { connect } from 'react-redux';
import Nav from './Nav';


export class EditBook extends React.Component {
    render(){
        return (
            <div>
                <Nav />
                <h1>Edit</h1>
                <button onClick={() => this.props.history.goBack()}>Back</button>
            </div>
        )
    }

}
export default connect(null, {})(EditBook);