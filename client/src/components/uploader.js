import { Component } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

export class Uploader extends Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        console.log(e.target.files);

        this.setState({
            [e.target.name]: e.target.files[0],
        }, () => {
            console.log('this.state...', this.state);
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        console.log("upload image");

        const fd = new FormData();
        // console.log('fd', fd)
        fd.append("file", this.state.profile_pic);



        fetch("/profile_pic", {
            method: "POST",
            body: fd,
        })
            .then(resp => resp.json())
            .then((data) => {

                this.props.updateProfilePic(data.profile_pic);

            })
            .catch(err => console.log('err in upload', err));


    }

    render() {
        return (
            <>

                <Modal.Dialog>
                    <Modal.Header onClick={this.props.hideUploader} closeButton>
                        <Modal.Title>Change Your Image</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p> Do you want to change your image? We'll never share your Information with anyone else.</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Form onSubmit={(e) => this.handleSubmit(e)}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Upload an Image</Form.Label>
                                <Form.Control name="profile_pic" type="file" placeholder="Upload an Image" onChange={this.handleChange} />
                            </Form.Group>
                            <Button variant="primary" type="submit" >
                                Upload
                            </Button>
                            <Button variant="secondary" onClick={this.props.hideUploader}>Cancel</Button>
                        </Form>
                    </Modal.Footer>
                </Modal.Dialog>

                {/* <div>
                    <div onClick={this.props.hideUploader}>❌</div>
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <input name="profile_pic" type="file" onChange={this.handleChange} />
                        <button>Upload</button>

                    </form>
                </div> */}
            </>


        );
    }
}