import React, { FC } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { getInitials } from '../../helpers';
import { styles } from './styles';

type TContactCard = {
  name: string;
  nameIconPath: string;
  onPress?: () => void;
};

/**
 * @description Contact card component
 * @param {TContactCard} props
 * @returns {FC<TContactCard>}
 */
const ContactCard: FC<TContactCard> = (props: TContactCard) => {
  const { name, onPress, nameIconPath } = props;

  /**
   * @description Function to handle press event
   * @returns {void}
   */
  const handlePress = (): void => {
    onPress && onPress();
  };

  let nameInitials: string | Array<string> = getInitials(name);

  return (
    <TouchableOpacity
      style={styles.container}
      accessibilityRole="link"
      activeOpacity={0.7}
      importantForAccessibility="yes"
      onPress={handlePress}
      accessibilityLabel={`Tap to access ${name} contact`}>
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
