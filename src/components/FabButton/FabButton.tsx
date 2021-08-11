import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from './style';

type TFabButton = {
  onPress: () => void;
  isActive: boolean;
};

const FabButton = (props: TFabButton) => {
  const { onPress, isActive } = props;

  const handlePress = () => {
    onPress && onPress();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      style={styles.fabButton}
      onPress={handlePress}>
      <Text style={styles.fabText}>{isActive ? '❌' : '✏️'}</Text>
    </TouchableOpacity>
  );
};

export default FabButton;
