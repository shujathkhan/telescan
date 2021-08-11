import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
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
    <TouchableOpacity
      activeOpacity={0.75}
      style={[styles.fabButton, (type === 'save' || type === 'add') && styles.fabSaveButton]}
      onPress={handlePress}>
      {type === 'edit' ? (
        <Text style={styles.fabText}>{isActive ? '❌' : '✏️'}</Text>
      ) : type === 'add' ? (
        <Text style={styles.fabText}>➕</Text>
      ) : (
        <Text style={styles.fabText}>💾</Text>
      )}
    </TouchableOpacity>
  );
};

export default FabButton;
