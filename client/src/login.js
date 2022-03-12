import { Component } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";


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
                <Form>

                    <Form.Group as={Col} sm="5" className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control name="email" type="email" placeholder="Enter email" onChange={this.handleChange} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group as={Col} sm="5" className="mb-3" controlId="formBasicPassword">
                        <Form.Label >Password</Form.Label>
                        <Form.Control name="password" type="password" placeholder="Password" onChange={this.handleChange} />
                    </Form.Group>



                    <Button className="mb-4" variant="primary" type="submit" onClick={this.handleLogin}>
                        Submit
                    </Button>
                </Form>

                {/* <h1>Login!</h1>
                {this.state.error && <h2 style={{ color: "red" }}>
                    {this.state.error} something went wrong
                </h2>}
                <form>

                    <input name="email" type="text" placeholder="email" onChange={this.handleChange}></input>
                    <input name="password" type="password" placeholder="password" onChange={this.handleChange} ></input>
                    <button onClick={this.handleLogin} >Register</button>
                </form> */}
                <Link className=" linkcenter" to="/">Return Registration</Link>
                <Link className=" linkcenter" to="/reset">Reset Password</Link>



            </>

        );

    }

}