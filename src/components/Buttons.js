import React from "react";
import { ButtonToolbar, MenuItem, DropdownButton } from "react-bootstrap";
import "./Universal.css";

const Buttons = (props) => {
  const handleSelect = (eventKey) => {
    props.gridSize(eventKey);
  };

  return (
    <div className="center">
      <ButtonToolbar>
        <button className="btn btn-default" onClick={() => props.playButton()}>
          Play
        </button>
        <button className="btn btn-default" onClick={() => props.pauseButton()}>
          Stop
        </button>
        <button className="btn btn-default" onClick={() => props.clear()}>
          Clear
        </button>
        <button className="btn btn-default" onClick={() => props.slow()}>
          Slow
        </button>
        <button className="btn btn-default" onClick={() => props.normal()}>
          Normal
        </button>
        <button className="btn btn-default" onClick={() => props.fast()}>
          Fast
        </button>
        <button className="btn btn-default" onClick={() => props.random()}>
          Random
        </button>
        <DropdownButton
          title="Grid Size"
          id="size-menu"
          onSelect={handleSelect}
        >
          <MenuItem eventKey="1">25x25</MenuItem>
          <MenuItem eventKey="2">50x50</MenuItem>
          <MenuItem eventKey="3">75x75</MenuItem>
        </DropdownButton>
      </ButtonToolbar>
    </div>
  );
};

export default Buttons;
