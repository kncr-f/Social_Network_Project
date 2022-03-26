import React from 'react';
import { Container, Row, Col, Form, Button } from "react-bootstrap";


export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            draftBio: ''
        };
        // this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(e) {
        //console.log('user typed:', e.target.value);

        this.setState({

            //[e.target.name]: e.target.value,
            draftBio: e.target.value

        }, () => {
            console.log(" state updated");
        });

    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("user clicked the button");

        this.setState({
            editMode: false
        }, () => {
            console.log('save click');
        });

        fetch("/user/profile/bio", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then(resp => resp.json())
            .then(data => {
                //console.log("biotext here seccess.....", data);
                this.props.setBio(data);

            })
            .catch((err) => {
                console.log("/user/profile/bio getting biotext failed", err);
                this.setState({ error: "Opppssss...." });
            });

    }

    handleClick() {
        this.setState({
            draftBio: this.props.bio,
            editMode: true

        }, () => {
            console.log(" editmode updated as true");
        });

    }
    render() {
        return (
            <>
                <Container >
                    {this.state.editMode && (
                        <Form onSubmit={(e) => this.handleSubmit(e)}>
                            <Form.Control
                                as="textarea"

                                placeholder='Add your bio here'
                                style={{ height: "200px" }}
                                name="bio_text"
                                type="text"
                                onChange={this.handleChange}
                                defaultValue={this.props.bio}
                            >
                            </Form.Control>


                            <Button sm="3" type='submit' className="mb-4 mt-2" variant="primary">
                                Save
                            </Button>
                        </Form>
                    )}
                    {!this.state.editMode && this.props.bio && (
                        <>
                            <Row>
                                {this.props.bio}
                            </Row>
                            <Row className="d-flex justify-content-center">
                                <Button as={Col} sm="3" onClick={() => this.handleClick()} className="mb-4 mt-2" variant="primary"> Edit </Button >

                            </Row>


                        </>


                    )}
                    {!this.state.editMode && !this.props.bio && (

                        <>
                            <Row as={Col} className="d-flex justify-content-center">
                                <Button as={Col} sm="5" onClick={() => this.handleClick()} className="mb-2" variant="primary"> Add Bio </Button >

                            </Row>
                        </>

                    )}


                </Container>
            </>
        );
    }
}