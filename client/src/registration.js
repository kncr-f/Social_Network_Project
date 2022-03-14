
import { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Form, Button } from "react-bootstrap";


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
                    {this.state.error}
                </h2>}

                <Form>

                    <Form.Group as={Col} sm="5" className="mb-3" controlId="formBasicEmail">
                        <Form.Label >First Name</Form.Label>
                        <Form.Control name="first" type="first" placeholder="Enter Your First Name" onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group as={Col} sm="5" className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control name="last" type="text" placeholder="Enter Your Last Name" onChange={this.handleChange} />

                    </Form.Group>




                    <Form.Group as={Col} sm="5" className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control name="email" type="email" placeholder="Enter Your Email" onChange={this.handleChange} />
                    </Form.Group>


                    <Form.Group as={Col} sm="5" className="mb-3" controlId="formBasicPassword">
                        <Form.Label >Password</Form.Label>
                        <Form.Control name="password" type="password" placeholder="Enter Your Password" onChange={this.handleChange} />

                    </Form.Group>


                    <Form.Group className="mb-3">
                        <Form.Text className="text-muted">
                            We will never share your information with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Button className="mb-4" variant="primary" type="submit" onClick={this.handleSubmit}>
                        Submit
                    </Button>
                </Form>
                {/* {this.state.error && <h2 style={{ color: "red" }}>
                    {this.state.error} something went wrong
                </h2>}
                <form>

                    <input name="first" type="text" placeholder="first" onChange={this.handleChange}></input>
                    <input name="last" type="text" placeholder="last" onChange={this.handleChange}></input>
                    <input name="email" type="text" placeholder="email" onChange={this.handleChange}></input>

                    <input name="password" type="password" placeholder="password" onChange={this.handleChange}></input>
                    <button onClick={this.handleSubmit}>Register</button>
                </form> */}
                <Link className="p-6 linkcenter" to="/login"> Click here to login...</Link>
            </>

        );
    }

}