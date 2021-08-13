import React, { FC } from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import { styles } from './style';

type TFabButton = {
  onPress: () => void;
  type: 'add' | 'edit' | 'save';
  isActive?: boolean;
};

/**
 * @description Fab Button component for add, edit and save
 * @param {TFabButton} props
 * @returns {FC<TFabButton>}
 */
const FabButton: FC<TFabButton> = (props: TFabButton) => {
  const { onPress, isActive, type } = props;

  /**
   * @description Function to handle press event
   * @returns {void}
   */
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
