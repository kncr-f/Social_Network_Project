import { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Form, Col, Button } from "react-bootstrap";
import Error from "./components/Error";


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
                <Container>
                    <Form>
                        <Form.Group as={Col} sm="5" className="mb-3" controlId="formBasicEmail">
                            <h3>Reset Password</h3>
                            <Form.Text className="text-muted ">
                                Please enter the email address with which you registered
                            </Form.Text>

                            <Form.Control className="mb-4" name="email" type="email" placeholder="Enter email" onChange={this.handleChange} />

                        </Form.Group>
                        <Button className="mb-4" variant="primary" type="submit" onClick={this.handleSubmit}>
                            Submit
                        </Button>
                    </Form>


                    <Link className="linkcenter" to="/"> click here return to register?</Link>
                </Container>
            );
        } else if (this.state.view === 2) {
            return (
                <>

                    <Container>
                        <Form>
                            <Form.Group as={Col} sm="5" className="mb-3" controlId="formBasicEmail">
                                <h3>Reset Password</h3>
                                <Form.Text className="text-muted ">
                                    Please enter the 6 digit security code we sent you.
                                </Form.Text>

                                <Form.Control className="mb-4" name="code" type="text" placeholder="code" onChange={this.handleChange} />

                            </Form.Group>
                            <Form.Group as={Col} sm="5" className="mb-3" controlId="formBasicEmail">

                                <Form.Text className="text-muted ">
                                    Please enter your new Password.
                                </Form.Text>

                                <Form.Control className="mb-4" name="new_password" type="password" placeholder="new password" onChange={this.handleChange} />

                            </Form.Group>
                            <Button className="mb-4" variant="primary" type="submit" onClick={this.handleReset}>
                                Submit
                            </Button>
                        </Form>


                        <Link className="linkcenter" to="/"> click here return to register?</Link>
                    </Container>
                    {/* <div>
                        <h3>Reset Password</h3>
                        <form>
                            <input name="code" type="text" placeholder="code" onChange={this.handleChange}></input>
                            <input name="new_password" type="password" placeholder="new password" onChange={this.handleChange} ></input>
                            <button onClick={this.handleReset} >Submit</button>
                        </form>
                    </div> */}
                </>
            );
        } else if (this.state.view === 3) {
            // remember to also add a link to login ;)
            return (
                <Container>
                    <h3>Your Password has been successfully changed</h3>
                    <Link className="linkcenter" to="/login"> click here to login</Link>

                </Container>
            );
        }
    }




    render() {
        return (
            <div>

                {this.state.error && <Error variant="danger"> {this.state.error} something went wrong</Error>}
                {/* call the method */}
                {this.determineViewToRender()}
            </div>
        );
    }

}