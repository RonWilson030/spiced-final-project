import { Component } from "react";
import axios from "./axios";
export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textareaVisible: false,
            bioEditorIsVisible: false,
            // bio: "",
            draftBio: "",
            editMode: false,
            editButtonVisible: false,
        };
    }

    handleTextChange(e) {
        // console.log("e.target.value: ", e.target.value);
        // console.log("e.target.biotext: ", this.state.draftBio);
        this.setState(
            {
                draftBio: e.target.value,
            },
            () => console.log("this.state in textChange: ", this.state)
        );
    }

    setEditMode(value) {
        this.setState({
            editMode: value,
            draftBio: this.props.currentBio,
        });
    }

    saveBio() {
        this.setEditMode(false);

        axios
            .post("/api/bio", this.state)
            .then((response) => {
                // console.log("bio editor response: ", response);
                this.props.setBio(response.data.bio);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        // console.log(this.props.currentBio);

        return (
            <div>
                <div>{this.props.bio}</div>
                <div>
                    {this.state.editMode ? (
                        <div>
                            <div>
                                <textarea
                                    value={this.state.draftBio}
                                    onChange={(e) => this.handleTextChange(e)}
                                />
                            </div>
                            <button
                                className="hand-cursor"
                                onClick={() => this.saveBio()}
                            >
                                save bio
                            </button>
                        </div>
                    ) : !this.props.currentBio ? (
                        <button
                            className="hand-cursor"
                            onClick={() => this.setEditMode(true)}
                        >
                            add bio
                        </button>
                    ) : (
                        <button
                            className="hand-cursor"
                            onClick={() => this.setEditMode(true)}
                        >
                            edit bio
                        </button>
                    )}
                </div>
            </div>
        );
    }
}

// toggleTextarea() {
//     // if (this.props.currentBio === null) {
//     //     this.setState({
//     //         textareaVisible: !this.state.textareaVisible,
//     //         addButtonVisible: !this.state.addButtonVisible,
//     //         saveButtonVisible: !this.state.saveButtonVisible,
//     //     });
//     // } else {
//     this.setState({
//         draftBio: this.props.currentBio,
//         textareaVisible: !this.state.textareaVisible,
//         editButtonVisible: !this.state.editButtonVisible,
//         saveButtonVisible: !this.state.saveButtonVisible,
//     });
//     // }
// }
//  <div>
//      <h4>bio editor</h4>
//      {this.state.textareaVisible && (
//          <textarea
//              value={this.state.draftBio}
//              onChange={(e) => this.handleTextChange(e)}
//          />
//      )}
//      {this.state.addButtonVisible && (
//          <button className="hand-cursor" onClick={() => this.toggleTextarea()}>
//              add bio
//          </button>
//      )}
//      {this.state.saveButtonVisible && (
//          <button className="hand-cursor" onClick={() => this.saveBio()}>
//              save bio
//          </button>
//      )}

//      {this.state.editButtonVisible && (
//          <button className="hand-cursor" onClick={() => this.toggleTextarea()}>
//              edit bio
//          </button>
//      )}
//  </div>;
