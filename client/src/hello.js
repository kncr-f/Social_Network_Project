import React from 'react';
import Greetee from './greetee';

export default class HelloWorld extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            greetee: props.greetee
        };
    }
    handleChange(val) {
        this.setState({
            greetee: val
        }, () => console.log(this.state.greetee));

    }
    render() {
        return (
            <div className="funky">
                Hello, {this.state.greetee}?!
                {this.props.greetee == 'kitty' &&
                    <Greetee name={this.state.greetee} />}
                <div>
                    <input
                        defaultValue={this.props.greetee}
                        onChange={
                            ({ target }) => this.handleChange(target.value)
                        }
                    />
                </div>
            </div>
        );
    }
}
