import React from "react"

import {Draft, Editor, EditorState, RichUtils, convertToRaw} from 'draft-js';

class Wysiwyg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
  }

  render() {
    return (
      <div>
        <a onClick={this._onBoldClick.bind(this)}>Bold</a>
        <Editor editorState={this.state.editorState} onChange={this.onChange.bind(this)} />
      </div>
    );
  }

  onChange(editorState) {
    this.setState({editorState}, function() {
      console.log(this.state.editorState)
      console.log(editorState.getCurrentContent())
      console.log(convertToRaw(editorState.getCurrentContent()))
      if (this.props.onChange) this.props.onChange("BLAPZ")
    })
  }

  _onBoldClick(e) {
    e.preventDefault()
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      'BOLD'
    ))
  }
}

export default Wysiwyg
