import React, {useState} from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Box = styled.TouchableOpacity`
  background-color: tomato;
  width: 200px;
  height: 200px;
`;

function App(): React.JSX.Element {
  const [y, setY] = useState(0);
  const moveUp = () => {
    setInterval(() => setY(prev => prev + 1), 500);
  };
  return (
    <Container>
      <Box
        onPress={moveUp}
        style={{
          transform: [{translateY: y}],
        }}
      />
    </Container>
  );
}

export default App;
