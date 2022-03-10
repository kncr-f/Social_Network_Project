import { Component } from "react";
import { Link } from "react-router-dom";

export default class Reset extends Component {
    constructor() {
        super();
        this.state = {
            view: 1,
            error: ""
        };
        this.determineViewToRender = this.determineViewToRender.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    componentDidMount() {
        console.log("reset just mounted");
    }

    handleChange(e) {

        this.setState({
            [e.target.name]: e.target.value,
        }, () => {
            console.log(" state updated");
        });
    }

    handleSubmit(e) {
        e.preventDefault();


        fetch("/reset", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then(resp => resp.json())
            .then(data => {
                console.log("resetRequest successed", data);

                if (data.success) {
                    this.setState({
                        view: 2
                    });
                } else {
                    this.setState({ error: "whooopsieeee..." });
                }

            })
            .catch(() => {
                this.setState({ error: "whooopsieeee..." });
            });

    }

    handleReset(e) {
        e.preventDefault();


        fetch("/verify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then(resp => resp.json())
            .then(data => {

                if (data.success) {

                    this.setState({
                        view: 3
                    });
                } else {
                    this.setState({ error: "...whoopssss" });
                }

            })
            .catch(() => {
                this.setState({ error: "whooopsieeee..." });
            });



    }

    determineViewToRender() {
        // this method determines what the render! 
        if (this.state.view === 1) {
            return (
                <div>

                    <h2>Reset Password</h2>
                    <h3>Please enter the email address with which you registered</h3>
                    <form>
                        <input name="email" type="text" placeholder="email" onChange={this.handleChange}></input>
                        <button onClick={this.handleSubmit} >Submit</button>
                    </form>
                </div>
            );
        } else if (this.state.view === 2) {
            return (
                <div>
                    <h3>Reset Password</h3>
                    <form>
                        <input name="code" type="text" placeholder="code" onChange={this.handleChange}></input>
                        <input name="new_password" type="password" placeholder="new password" onChange={this.handleChange} ></input>
                        <button onClick={this.handleReset} >Submit</button>
                    </form>
                </div>
            );
        } else if (this.state.view === 3) {
            // remember to also add a link to login ;)
            return (
                <div>
                    <h3>your password has been successfully changed</h3>
                    <Link to="/login"> click here to login</Link>

                </div>
            );
        }
    }




    render() {
        return (
            <div>
                {this.state.error && <h2 style={{ color: "red" }}>
                    {this.state.error} something went wrong
                </h2>}
                {/* call the method */}
                {this.determineViewToRender()}
            </div>
        );
    }

}