import React, {useState} from 'react';
import {Animated, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
// Animated는 무조건 Animated.Value로 써야 함. Animated API와 함께 함.
// animated value는 절대 직접적으로 수정하면 안된다.
// animated compoment는 image, scrollview, text, view, flatlist, sectionlist 로만 기본으로 되며, 다른 것은 createAnimatedComponen로 만들어야함.
const Box = styled.View`
  background-color: tomato;
  width: 200px;
  height: 200px;
`;

const AnimatedBox = Animated.createAnimatedComponent(Box);

function App(): React.JSX.Element {
  const Y = new Animated.Value(0);

  const moveUp = () => {
    Animated.timing(Y, {
      toValue: -200,
      useNativeDriver: true,
    }).start();
    // Animated.spring은 bounciness 혹은 tension, friction을 써서 스프링처럼 마지막에 튕기는 애니메이션을 줄 수 있음.
  };
  return (
    <Container>
      <TouchableOpacity onPress={moveUp}>
        <AnimatedBox
          style={{
            transform: [{translateY: Y}],
          }}
        />
      </TouchableOpacity>
    </Container>
  );
}

export default App;
