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
const Box = styled.TouchableOpacity`
  background-color: tomato;
  width: 200px;
  height: 200px;
`;

const AnimatedBox = Animated.createAnimatedComponent(Box);

function App(): React.JSX.Element {
  const Y = new Animated.Value(0);

  const moveUp = () => {};
  return (
    <Container>
      <AnimatedBox
        onPress={moveUp}
        style={{
          transform: [{translateY: Y}],
        }}
      />
    </Container>
  );
}

export default App;
