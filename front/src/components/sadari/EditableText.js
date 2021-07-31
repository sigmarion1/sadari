import React, { useState, useRef, useEffect } from "react";

import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Segment,
    Sidebar,
    Visibility,
    Dropdown,
    Feed,
    Label,
    Input,
    Transition
  } from 'semantic-ui-react'

const EditableInput = props => {
  // We use hooks to declare "initial" states
  const inputRef = useRef(null);
  const [inputVisible, setInputVisible] = useState(false);
  const [text, setText] = useState(props.text);

  function onClickOutSide(e) {
    // Check if user is clicking outside of <input>
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setInputVisible(false); // Disable text input
    }
  }

  useEffect(() => {
    // Handle outside clicks on mounted state
    if (inputVisible) {
      document.addEventListener("mousedown", onClickOutSide);
    }

    // This is a necessary step to "dismount" unnecessary events when we destroy the component
    return () => {
      document.removeEventListener("mousedown", onClickOutSide);
    };
  });

  return (
    <React.Fragment>
      {inputVisible ? (
        <input
          ref={inputRef} // Set the Ref
          value={text} // Now input value uses local state
          onChange={e => {
            setText(e.target.value);
          }}
          style={{width:'100%'}}
        />
      ) : (
        <Label onClick={() => setInputVisible(true)}>{text}</Label>
      )}
    </React.Fragment>
  );
};

export default EditableInput; // We got our component!
