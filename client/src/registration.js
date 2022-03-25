
import { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Form, Button } from "react-bootstrap";
import Error from "./components/Error";


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

        this.setState({
            [e.target.name]: e.target.value,
        }, () => {
            console.log(" state updated");
        });
    }

    handleSubmit(e) {
        e.preventDefault();


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
                <h3>Registration!</h3>
                {this.state.error && <Error variant="danger"> Please fill all the requiered fields</Error>}

                <Form onSubmit={this.handleSubmit}>

                    <Form.Group as={Col} sm="5" className="mb-3" controlId="formBasicEmail">
                        <Form.Label >First Name</Form.Label>
                        <Form.Control name="first" type="first" placeholder="Enter Your First Name" onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group as={Col} sm="5" className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control name="last" type="text" placeholder="Enter Your Last Name" onChange={this.handleChange} />

                    </Form.Group>




                    <Form.Group as={Col} sm="5" className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email Address</Form.Label>
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

                    <Button className="mb-4" variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>

                <Link className="p-6 linkcenter" to="/login"> Click here to login...</Link>
            </>

        );
    }

}