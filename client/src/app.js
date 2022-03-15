import { Component } from "react";
import Profile from "./components/Profile";
import { ProfilePic } from "./components/profile_pic";
import { Uploader } from "./components/uploader";
import Logo from "./components/logo";
import Footer from "../src/components/footer";
import Header from "../src/components/Header";
import { Container, Row, Col } from "react-bootstrap";
import FindPeople from "./components/FindPeople";
import { BrowserRouter, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';




export class App extends Component {
    constructor() {
        super();
        this.state = {
            first: "",
            last: "",
            profile_pic: "",
            uploaderVisible: false,
            bio: ""

        };
        this.toggleUploader = this.toggleUploader.bind(this);
        this.updateProfilePic = this.updateProfilePic.bind(this);
        this.setBio = this.setBio.bind(this);
    }

    componentDidMount() {
        fetch("/user.json")
            .then(resp => resp.json())
            .then((data) => {
                console.log('data fetch /user in app', data);

                this.setState({
                    first: data.first,
                    last: data.last,
                    profile_pic: data.profile_pic,
                    bio: data.bio_text
                });

            }).catch(err => console.log(" getting user failed:", err));
    }

    toggleUploader() {
        this.setState((currentState) => ({
            uploaderVisible: !currentState.uploaderVisible
        }));
    }

    updateProfilePic(newProfilePicUrl) {
        this.setState({
            profile_pic: newProfilePicUrl
        }, () => {
            console.log('profile_pic updated');
        });
    }

    setBio(newBioText) {
        console.log('this', this, newBioText);
        this.setState({
            bio: newBioText
        }, () => {
            console.log('biotext updated');
        });
    }


    render() {
        return (
            <>
                <Header />
                <main>
                    <Container>
                        <Row>
                            <Col>
                                <Logo />
                            </Col>

                            <Col>

                                <ProfilePic
                                    style={{ width: "100px", height: "100px", cursor: "pointer" }}
                                    url={this.state.profile_pic}
                                    first={this.state.first}
                                    last={this.state.last}
                                    showUploader={this.toggleUploader}

                                />
                            </Col>
                        </Row>
                        <BrowserRouter>
                            <Route exact path="/">
                                <Profile
                                    id={this.state.id}
                                    url={this.state.profile_pic}
                                    first={this.state.first}
                                    last={this.state.last}
                                    showUploader={this.toggleUploader}
                                    bio={this.state.bio}
                                    setBio={this.setBio}

                                />
                                <Link className="p-6 linkcenter" to="/users"> Click here to find more people...</Link>

                            </Route>

                            <Route path="/users">
                                <FindPeople />
                            </Route>


                        </BrowserRouter>


                        {this.state.uploaderVisible &&
                            <Uploader
                                id={this.state.id}
                                //profile_pic={this.state.profile_pic}
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