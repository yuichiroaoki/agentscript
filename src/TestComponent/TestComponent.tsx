import React from "react";

import { TestComponentProps } from "./TestComponent.types";

import "./TestComponent.scss";

import Model from '../models/AntsModel'

const TestComponent: React.FC<TestComponentProps> = ({ heading, content }) => {
  return (
    <div data-testid="test-component" className="test-component">
      <h1 data-testid="test-component__heading" className="heading">
        {heading}
      </h1>
      <div data-testid="test-component__content">{content}</div>
    </div>
  )
};

export default TestComponent;
