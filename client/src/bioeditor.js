import { Component } from "react";

export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textareaVisible: false,
            bioEditorIsVisible: false,
            draftBio: "",
            // draftBio with onChange handler
        };
    }

    toggleTextarea() {
        this.setState({
            textareaVisible: !this.state.textareaVisible,
        });
    }

    // function post request to server to update value of the bio through the database
    // if successcull call function passed down by app updating the value of bio in state in app

    render() {
        return (
            <div>
                <h1>bio editor</h1>
                {this.state.textareaVisible && <textarea />}
                <button onClick={() => this.toggleTextarea()}>edit bio</button>
            </div>
        );
    }
}
