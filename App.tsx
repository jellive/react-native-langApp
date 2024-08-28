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

const Card = styled(Animated.createAnimatedComponent(View))`
  background-color: white;
  width: 300px;
  height: 300px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
`;

function App(): React.JSX.Element {
  // Values
  const scale = useRef(new Animated.Value(1)).current;
  const position = useRef(new Animated.Value(0)).current;

  // Animations
  const onPressIn = Animated.spring(scale, {
    toValue: 0.95,
    useNativeDriver: true,
  });
  const onPressOut = Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true,
  });
  const goCenter = Animated.spring(position, {
    toValue: 0,
    useNativeDriver: true,
  });
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, {dx, dy}) => {
        console.log('touch');
        position.setValue(dx);
      },
      onPanResponderGrant: () => onPressIn.start,
      onPanResponderRelease: () => {
        Animated.parallel([onPressOut, goCenter]).start();
      },
    }),
  ).current; // current 중요하다!

  return (
    <Container>
      <Card
        {...panResponder.panHandlers}
        style={{transform: [{scale}, {translateX: position}]}}>
        <Ionicons name="pizza" color="#192a56" size={98} />
      </Card>
    </Container>
  );
}

export default App;
