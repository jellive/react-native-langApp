import React, {useRef, useState} from 'react';
import {Animated, Dimensions, PanResponder} from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #00a8ff;
`;

function App(): React.JSX.Element {
  return <Container></Container>;
}

export default App;
