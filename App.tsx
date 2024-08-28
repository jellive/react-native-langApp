import React, {useRef, useState} from 'react';
import {Animated, TouchableOpacity, Pressable} from 'react-native';
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
  const [up, setUp] = useState(false);
  const Y_POSITION = useRef(new Animated.Value(-200)).current; // 재렌더링 방지(재렌더링 되면 이게 다시 0이 되면서 애니메이션이 끝나면 원래대로 돌아옴)
  const toggleUp = () => setUp(prev => !prev);
  const moveUp = () => {
    Animated.timing(Y_POSITION, {
      toValue: up ? 200 : -200,
      useNativeDriver: true,
    }).start(toggleUp);
    // Animated.spring은 bounciness, easing 혹은 tension, friction을 써서 스프링처럼 마지막에 튕기는 애니메이션을 줄 수 있음.
  };
  // const opacity = Y_POSITION.interpolate({
  //   inputRange: [-200, 0, 200], // 입력 값의 범위, 항상 음수부터 양수로 올라가야 함.
  //   outputRange: [1, 0, 1], // 출력 값의 범위
  // });
  const rotation = Y_POSITION.interpolate({
    inputRange: [-200, 300],
    outputRange: ['-360deg', '360deg'],
  });
  const borderRadius = Y_POSITION.interpolate({
    inputRange: [-200, 200],
    outputRange: [100, 0],
  });
  return (
    <Container>
      <Pressable onPress={moveUp}>
        <AnimatedBox
          style={{
            // opacity,
            borderRadius,

            transform: [{rotateY: rotation}, {translateY: Y_POSITION}],
          }}
        />
      </Pressable>
    </Container>
  );
}

export default App;
