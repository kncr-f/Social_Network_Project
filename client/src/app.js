import { Component } from "react";
import { ProfilePic } from "./components/profile_pic";
import { Uploader } from "./components/uploader";
import Logo from "./components/logo";
import Footer from "../src/components/footer";
import Header from "../src/components/Header";
import { Container } from "react-bootstrap";


export class App extends Component {
    constructor() {
        super();
        this.state = {
            first: "",
            last: "",
            profile_pic: "",
            uploaderVisible: false
        };
        this.toggleUploader = this.toggleUploader.bind(this);
        this.updateProfilePic = this.updateProfilePic.bind(this);
    }

    componentDidMount() {
        fetch("/user")
            .then(resp => resp.json())
            .then((data) => {
                console.log('data...', data);

                this.setState({

                    profile_pic: data.profile_pic,

                });

            }).catch(err => console.log(" getting user failed:", err));
    }

    toggleUploader() {
        this.setState((currentState) => ({
            uploaderVisible: !currentState.uploaderVisible
        }));
    }

    updateProfilePic(newProfilePicUrl) {
        this.setState({ profile_pic: newProfilePicUrl }, () => {
            console.log('profile_pic updated');
        });
    }


    render() {
        return (
            <>

                <Header />
                <main>
                    <Container>


                        <Logo />
                        <ProfilePic
                            url={this.state.profile_pic}
                            first={this.state.first}
                            last={this.state.last}
                            showUploader={this.toggleUploader} />

                        {this.state.uploaderVisible &&
                            <Uploader
                                id={this.state.id}
                                hideUploader={this.toggleUploader}
                                updateProfilePic={this.updateProfilePic}
                                url={this.state.profile_pic}
                            />}
                    </Container>
                </main>
                <Footer />
            </>
        );

    }
}