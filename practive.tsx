import React, {useRef, useState} from 'react';
import {Animated, Dimensions, PanResponder} from 'react-native';
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
  // const POSITION = useRef(new Animated.ValueXY({x: 0, y: 0})).current; // 재렌더링 방지(재렌더링 되면 이게 다시 0이 되면서 애니메이션이 끝나면 원래대로 돌아옴)
  const POSITION = useRef(
    new Animated.ValueXY({
      x: 0,
      y: 0,
    }),
  ).current;
  const sequence = () => {
    Animated.loop(Animated.sequence([])).start();
  };
  const borderRadius = POSITION.y.interpolate({
    inputRange: [-200, 200],
    outputRange: [100, 0],
  });
  const bgColor = POSITION.y.interpolate({
    inputRange: [-200, 200],
    outputRange: ['rgb(255, 99, 71)', 'rgb(71, 166, 255)'],
  });
  POSITION.addListener(() => console.log(POSITION.getTranslateTransform()));
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true, // PanResponder 사용 여부
      onPanResponderGrant: () => {
        // 시작될떄 켜짐
        POSITION.setOffset({
          // POSITION의 마지막 터치부분을 기준으로 설정하는 함수
          x: POSITION.x._value,
          y: POSITION.y._value,
        });
      },
      onPanResponderMove: (evt, {dx, dy}) => {
        // 이동시
        console.log(dx, dy); // dx, dy는 항상 0에서 시작한다. 그래서 위의 offset과 더해야한다.
        POSITION.setValue({x: dx, y: dy});
      },
      onPanResponderRelease: (_, {dx, dy}) => {
        // // 놓을 시
        // console.log('touch end');
        // Animated.spring(POSITION, {
        //   toValue: {
        //     x: 0,
        //     y: 0,
        //   },
        //   bounciness: 20,
        //   useNativeDriver: false,
        // }).start();
        POSITION.flattenOffset(); // offset에 있을떄에는 0이 아닌 다른 곳에서 시작한다. (손가락이 움직인 이전거리들의 합)
        // offset을 비우고(0,0) offset의 값을 x, y에 대입한다.
      },
    }),
  ).current;
  console.log(panResponder);
  return (
    <Container>
      <AnimatedBox
        {...panResponder.panHandlers} // react에서는 이렇게 상세정보를 그냥 넣을 수 있음.
        style={{
          // opacity,
          borderRadius,
          backgroundColor: bgColor,
          transform: POSITION.getTranslateTransform(),
        }}
      />
    </Container>
  );
}

export default App;
