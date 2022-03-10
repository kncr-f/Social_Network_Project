import { Component } from "react";
export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            error: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

    }
    componentDidMount() {
        console.log("Login just mounted");
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        }, () => {
            console.log("state updated");
        });

    }

    handleLogin(e) {
        e.preventDefault();
        if (!this.state.email || !this.state.password) {
            this.setState({
                error: "Please fill all the requiered fields",
            });

            return;
        }

        fetch("/user/login.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state)
        })
            .then(resp => resp.json())
            .then(data => {
                console.log("login data..", data);
                if (data.success) {
                    location.reload();
                } else {
                    this.setState({ error: "whooopsieeee..." });
                }
            })
            .catch((err) => {
                console.log("POST/user/login.json failed", err);
                this.setState({ error: "Opppssss...." });
            });

    }


    render() {

        return (
            <>
                <h1>Login!</h1>
                {this.state.error && <h2 style={{ color: "red" }}>
                    {this.state.error} something went wrong
                </h2>}
                <form>

                    <input name="email" type="text" placeholder="email" onChange={this.handleChange}></input>
                    <input name="password" type="password" placeholder="password" onChange={this.handleChange} ></input>
                    <button onClick={this.handleLogin} >Register</button>
                </form>


            </>

        );

    }

}