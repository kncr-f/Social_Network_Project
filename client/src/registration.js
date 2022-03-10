
import { Component } from "react";
import { Link } from "react-router-dom";

export class Registration extends Component {
    constructor() {
        super();
        this.state = {
            error: ""
        };
        //method 1
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount() {
        console.log("registration mounted");
    }

    handleChange(e) {
        //console.log("user changed the input");
        //console.log('user typed:', e.target.value);
        //console.log("which input field got updated", e.target.name);
        //setState takes an object contaiiing a satate update that we want  to run and takes an optional second argument, that is a callback function
        this.setState({
            [e.target.name]: e.target.value,
        }, () => {
            console.log(" state updated");
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        // console.log("user clicked the button", this.state);

        if (!this.state.first || !this.state.last || !this.state.email || !this.state.password) {
            this.setState({
                error: "Please fill all the requiered fields",
            });

            return;
        }

        fetch("/user/register.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then(resp => resp.json())
            .then(data => {
                console.log("registration seccess.....", data);
                if (data.success) {
                    location.reload();
                } else {
                    this.setState({ error: "whooopsieeee..." });
                }

            })
            .catch((err) => {
                console.log("POST/user/register.json failed", err);
                this.setState({ error: "Opppssss...." });
            });

    }

    render() {
        return (
            <>
                <h1>Registration!</h1>
                {this.state.error && <h2 style={{ color: "red" }}>
                    {this.state.error} something went wrong
                </h2>}
                <form>

                    <input name="first" type="text" placeholder="first" onChange={this.handleChange}></input>
                    <input name="last" type="text" placeholder="last" onChange={this.handleChange}></input>
                    <input name="email" type="text" placeholder="email" onChange={this.handleChange}></input>
                    <input name="password" type="password" placeholder="password" onChange={this.handleChange}></input>
                    <button onClick={this.handleSubmit}>Register</button>
                </form>
                <Link to="/login"> got already account, Why don't you login?</Link>
            </>

        );
    }

}