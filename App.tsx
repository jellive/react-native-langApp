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

const Card = styled.View``;

const AnimatedCard = Animated.createAnimatedComponent(Card);

function App(): React.JSX.Element {
  return (
    <Container>
      <AnimatedCard>
        <Ionicons name="pizza" color="#192a56" />
      </AnimatedCard>
    </Container>
  );
}

export default App;
