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

const Btn = styled.TouchableOpacity`
  margin: 0px 10px;
`;
const BtnContainer = styled.View`
  flex-direction: row;
  margin-top: 100px;
`;

function App(): React.JSX.Element {
  // Values
  const scale = useRef(new Animated.Value(1)).current;
  const position = useRef(new Animated.Value(0)).current;
  const rotation = position.interpolate({
    inputRange: [-200, 200],
    outputRange: ['-15deg', '15deg'],
    // extrapolate: 'clamp', // -200, 200와 같은 inputRange를 넘어설때 추가로 해줄 수 설정할 수 있는(무시하거나 계속하거나) 옵션. clamp는 제시한 최소, 최대값을 넘지 않는다. extend는 넘어서도 진행함.
  });

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

  const goLeft = Animated.spring(position, {
    toValue: -400,
    tension: 5, // 느리게 애니메이션
    useNativeDriver: true,
  });

  const goRight = Animated.spring(position, {
    toValue: 400,
    tension: 5,
    useNativeDriver: true,
  });
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, {dx, dy}) => {
        console.log(dx);
        position.setValue(dx);
      },
      onPanResponderGrant: () => onPressIn.start,
      onPanResponderRelease: (_, {dx}) => {
        console.log('release', dx);
        if (dx < -200) {
          console.log('dismiss to the left');
          goLeft.start();
        } else if (dx > 200) {
          console.log('dismiss to the right');
          goRight.start();
        } else {
          Animated.parallel([onPressOut, goCenter]).start();
        }
      },
    }),
  ).current; // current 중요하다!
  const closePress = () => {
    goLeft.start();
  };
  const checkPress = () => {
    goRight.start();
  };

  return (
    <Container>
      <Card
        {...panResponder.panHandlers}
        style={{
          transform: [{scale}, {translateX: position}, {rotateZ: rotation}],
        }}>
        <Ionicons name="pizza" color="#192a56" size={98} />
      </Card>
      <BtnContainer>
        <Btn onPress={closePress}>
          <Ionicons name="close-circle" color="white" size={58} />
        </Btn>
        <Btn onPress={checkPress}>
          <Ionicons name="checkmark-circle" color="white" size={58} />
        </Btn>
      </BtnContainer>
    </Container>
  );
}

export default App;
