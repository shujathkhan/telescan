import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import { styles } from './style';

type TFabButton = {
  onPress: () => void;
  type: 'add' | 'edit' | 'save';
  isActive?: boolean;
};

const FabButton = (props: TFabButton) => {
  const { onPress, isActive, type } = props;

  const handlePress = () => {
    onPress && onPress();
  };

  return (
    <TouchableOpacity activeOpacity={0.75} style={styles.fabButton} onPress={handlePress} accessibilityRole="button">
      {type === 'edit' ? (
        isActive ? (
          <Text style={styles.fabText}>💾</Text>
        ) : (
          <Text style={[styles.fabText, styles.fabPencilButton]}>✏️</Text>
        )
      ) : type === 'add' ? (
        <Image source={require('../../assets/add.png')} style={styles.fabImage} />
      ) : (
        <Text style={styles.fabText}>💾</Text>
      )}
    </TouchableOpacity>
  );
};

export default FabButton;
