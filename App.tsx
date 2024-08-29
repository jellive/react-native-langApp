import React, {useRef, useState} from 'react';
import {Animated, Dimensions, PanResponder, View, Text} from 'react-native';
import styled from 'styled-components/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import icons from './icons';

type IoniconsIconNames = keyof typeof Ionicons;
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
  position: absolute;
  /* 카드를 겹치게 두기 위해 absolute를 넣음 */
`;

const Btn = styled.TouchableOpacity`
  margin: 0px 10px;
`;
const BtnContainer = styled.View`
  flex-direction: row;
  flex: 1;
`;

const CardContainer = styled.View`
  flex: 3;
  justify-content: center;
  align-items: center;
`;

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('screen');

function App(): React.JSX.Element {
  // Values
  const scale = useRef(new Animated.Value(1)).current;
  const position = useRef(new Animated.Value(0)).current;
  const rotation = position.interpolate({
    inputRange: [-200, 200],
    outputRange: ['-15deg', '15deg'],
    // extrapolate: 'clamp', // -200, 200와 같은 inputRange를 넘어설때 추가로 해줄 수 설정할 수 있는(무시하거나 계속하거나) 옵션. clamp는 제시한 최소, 최대값을 넘지 않는다. extend는 넘어서도 진행함.
  });

  const secondScale = position.interpolate({
    inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
    outputRange: [1, 0.7, 1],
    extrapolate: 'clamp',
  });
  // 첫 카드를 밀면 뒤에서 천천히 커지는 효과를 가져옴.

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
          goLeft.start(onDismiss);
        } else if (dx > 200) {
          console.log('dismiss to the right');
          goRight.start(onDismiss);
        } else {
          Animated.parallel([onPressOut, goCenter]).start();
        }
      },
    }),
  ).current; // current 중요하다!
  // State
  const [index, setIndex] = useState(0);
  const onDismiss = () => {
    scale.setValue(1);
    position.setValue(0);
    setIndex(prev => prev + 1);
  };

  const closePress = () => {
    goLeft.start(onDismiss);
  };
  const checkPress = () => {
    goRight.start(onDismiss);
  };

  return (
    <Container>
      <CardContainer>
        <Card style={{transform: [{scale: secondScale}]}}>
          {/* <Text>Back card</Text> */}
          <Ionicons name={icons[index + 1]} color="#192a56" size={98} />
        </Card>
        <Card
          {...panResponder.panHandlers}
          style={{
            transform: [{scale}, {translateX: position}, {rotateZ: rotation}],
          }}>
          <Ionicons name={icons[index]} color="#192a56" size={98} />

          {/* <Text>Front card</Text> */}
        </Card>
      </CardContainer>
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
