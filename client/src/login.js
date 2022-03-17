import { Component } from "react";
import { Link } from "react-router-dom";
import { Form, Col, Button } from "react-bootstrap";
import Error from "./components/Error";

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
                    location.replace("/");
                } else {
                    this.setState({ error: "whooopsieee something went wrong..." });
                }
            })
            .catch((err) => {
                console.log("POST/user/login.json failed", err);
                this.setState({ error: "Opppssss.... something went wrong" });
            });

    }


    render() {

        return (
            <>
                <h1>Login!</h1>
                {this.state.error && <Error variant="danger"> {this.state.error}</Error>}

                <Form onSubmit={this.handleLogin}>

                    <Form.Group as={Col} sm="5" className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control name="email" type="email" placeholder="Enter email" onChange={this.handleChange} />
                        <Form.Text className="text-muted">
                            We  will never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group as={Col} sm="5" className="mb-3" controlId="formBasicPassword">
                        <Form.Label >Password</Form.Label>
                        <Form.Control name="password" type="password" placeholder="Password" onChange={this.handleChange} />
                    </Form.Group>

                    <Button className="mb-4" variant="primary" type="submit" >
                        Submit
                    </Button>
                </Form>


                <Link className=" linkcenter" to="/">Return Registration</Link>
                <Link className=" linkcenter" to="/reset">Reset Password</Link>



            </>

        );

    }

}