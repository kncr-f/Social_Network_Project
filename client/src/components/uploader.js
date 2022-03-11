import { Component } from "react";

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
                console.log('resp in fetch /profile_pic.......', data);
                // this.images.unshift(resp);

                this.props.updateProfilePic(data.profile_pic);

            })
            .catch(err => console.log('err in upload', err));





        // const data= new FormData
        //append your file to it use the sstate
        // send data over to the serever qith wa fetch request
        // if the request is successful update the profilepic
        //propery form the state of app (use updateProfilePic)
    }

    render() {
        return (
            <div>
                <div onClick={this.props.hideUploader}>❌</div>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <input name="profile_pic" type="file" onChange={this.handleChange} />
                    <button>Upload</button>

                </form>
            </div>
        );
    }
}