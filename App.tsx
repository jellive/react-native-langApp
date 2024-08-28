import React, {useRef, useState} from 'react';
import {Animated, Dimensions, PanResponder, View} from 'react-native';
import styled from 'styled-components/native';
import Ionicons from '@expo/vector-icons/Ionicons';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #00a8ff;
`;

const Card = styled.View`
  background-color: white;
  width: 300px;
  height: 300px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
`;

const AnimatedCard = Animated.createAnimatedComponent(Card);

function App(): React.JSX.Element {
  return (
    <Container>
      <AnimatedCard>
        <Ionicons name="pizza" color="#192a56" size={98} />
      </AnimatedCard>
    </Container>
  );
}

export default App;
