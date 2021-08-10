import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

type TContactCard = {
  name: string;
  nameIconPath: string;
  onPress?: () => void;
};

const ContactCard = (props: TContactCard) => {
  const { name, onPress, nameIconPath } = props;
  const handlePress = () => {
    onPress && onPress();
  };
  let nameInitials: string | Array<string> = name.split(' ');
  if (nameInitials.length > 1) {
    nameInitials =
      nameInitials[0][0].toUpperCase() +
      nameInitials[nameInitials.length - 1][0].toUpperCase();
  }
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={handlePress}>
      {nameIconPath ? (
        <Image
          style={styles.nameIcon}
          source={{
            uri: nameIconPath,
          }}
        />
      ) : (
        <View style={styles.nameInitialsView}>
          <Text style={styles.nameInitialsText}>{nameInitials}</Text>
        </View>
      )}

      <View style={styles.nameView}>
        <Text style={styles.nameText}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ContactCard;
