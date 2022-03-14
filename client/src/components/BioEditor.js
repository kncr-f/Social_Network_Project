import React from 'react';

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
        console.log('user typed:', e.target.value);

        this.setState({

            //[e.target.name]: e.target.value,
            draftBio: e.target.value

        }, () => {
            console.log(" state updated");
        });

    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("user clicked the button", this.state);

        this.setState({
            editMode: false
        }, () => {
            console.log('save click', this.props.bio);
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
                console.log("biotext here seccess.....", data);
                this.props.setBio(data);

            })
            .catch((err) => {
                console.log("/user/profile/bio getting biotext failed", err);
                this.setState({ error: "Opppssss...." });
            });

    }

    handleClick() {
        this.setState({

            editMode: true

        }, () => {
            console.log(" editmode updated as true");
        });

    }
    render() {
        return (
            <>

                {this.state.editMode && (
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <textarea
                            name="bio_text"
                            type="text"
                            onChange={this.handleChange}
                            defaultValue={this.props.bio}
                        >
                        </textarea>
                        <button>save</button>
                    </form>
                )}
                {!this.state.editMode && this.props.bio && (
                    <div>
                        {this.props.bio}
                        <button onClick={() => this.handleClick()}>edit</button>
                    </div>
                )}
                {!this.state.editMode && !this.props.bio && (
                    <div>
                        <button onClick={() => this.handleClick()}>Add</button>
                    </div>
                )}
            </>
        );
    }
}