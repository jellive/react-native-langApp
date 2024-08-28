import React, {useRef, useState} from 'react';
import {Animated, TouchableOpacity, Pressable, Dimensions} from 'react-native';
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

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

function App(): React.JSX.Element {
  // const [up, setUp] = useState(false);
  // const POSITION = useRef(new Animated.ValueXY({x: 0, y: 0})).current; // 재렌더링 방지(재렌더링 되면 이게 다시 0이 되면서 애니메이션이 끝나면 원래대로 돌아옴)
  const POSITION = useRef(
    new Animated.ValueXY({
      x: -SCREEN_WIDTH / 2 + 100,
      y: -SCREEN_HEIGHT / 2 + 100,
    }),
  ).current;
  // const toggleUp = () => setUp(prev => !prev);
  const topLeft = Animated.timing(POSITION, {
    toValue: {
      x: -SCREEN_WIDTH / 2 + 100,
      y: -SCREEN_HEIGHT / 2 + 100,
    },
    useNativeDriver: false,
  });

  const bottomLeft =
    // Animated.timing(POSITION, {
    //   toValue: up ? 200 : -200,
    //   useNativeDriver: false,
    // }).start(toggleUp);
    // Animated.spring은 bounciness, easing 혹은 tension, friction을 써서 스프링처럼 마지막에 튕기는 애니메이션을 줄 수 있음.

    Animated.timing(POSITION, {
      toValue: {
        x: -SCREEN_WIDTH / 2 + 100,
        y: SCREEN_HEIGHT / 2 - 100,
      },
      useNativeDriver: false,
    });
  const bottomRight = Animated.timing(POSITION, {
    toValue: {
      x: SCREEN_WIDTH / 2 - 100,
      y: SCREEN_HEIGHT / 2 - 100,
    },
    useNativeDriver: false,
  });

  const topRight = Animated.timing(POSITION, {
    toValue: {
      x: SCREEN_WIDTH / 2 - 100,
      y: -SCREEN_HEIGHT / 2 + 100,
    },
    useNativeDriver: false,
  });

  const sequence = () => {
    Animated.loop(
      Animated.sequence([bottomLeft, bottomRight, topRight, topLeft]),
    ).start();
  };
  // const opacity = Y_POSITION.interpolate({
  //   inputRange: [-200, 0, 200], // 입력 값의 범위, 항상 음수부터 양수로 올라가야 함.
  //   outputRange: [1, 0, 1], // 출력 값의 범위
  // });
  const rotation = POSITION.y.interpolate({
    inputRange: [-200, 300],
    outputRange: ['-360deg', '360deg'],
  });
  const borderRadius = POSITION.y.interpolate({
    inputRange: [-200, 200],
    outputRange: [100, 0],
  });
  const bgColor = POSITION.y.interpolate({
    inputRange: [-200, 200],
    outputRange: ['rgb(255, 99, 71)', 'rgb(71, 166, 255)'],
  });
  POSITION.addListener(() => console.log(POSITION.getTranslateTransform()));
  return (
    <Container>
      <Pressable onPress={sequence}>
        <AnimatedBox
          style={{
            // opacity,
            borderRadius,
            backgroundColor: bgColor,
            transform: [
              // {rotateY: rotation},
              {translateX: POSITION.x},
              {translateY: POSITION.y},
            ],
          }}
        />
      </Pressable>
    </Container>
  );
}

export default App;
