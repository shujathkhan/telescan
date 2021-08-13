import React, { useState } from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import { NativeStackNavigationHelpers } from '@react-navigation/native-stack/lib/typescript/src/types';
import cloneDeep from 'lodash.clonedeep';
import Contacts, { Contact } from 'react-native-contacts';
import Snackbar from 'react-native-snackbar';
import FabButton from '../../components/FabButton';
import { contactPermissions, requestPermissions } from '../../helpers';
import { styles } from './styles';
import MultiForm, { newEmailAddress, newPhoneNumber } from '../../components/MultiForm/MultiForm';

type TNewContact = {
  navigation: NativeStackNavigationHelpers;
};

const NewContact = (props: TNewContact) => {
  const newContact = {
    emailAddresses: [newEmailAddress],
    phoneNumbers: [newPhoneNumber],
    givenName: '',
    familyName: '',
  };
  const [contact, setContact] = useState<Partial<Contact>>(newContact);

  const handleChangeText = (value: string | number, type: string, index: number = -1, key?: string) => {
    if (contact) {
      let contactClone: Contact | any = cloneDeep(contact);
      if (key && index !== -1) {
        contactClone[type][index][key] = value;
      } else {
        contactClone[type] = value;
      }
      setContact(contactClone);
    }
  };

  const handleFabButtonPress = async () => {
    const isPermissionGranted = await requestPermissions(contactPermissions);
    if (isPermissionGranted) {
      Contacts.addContact(contact as Contact)
        .then((addedContact: any) => {
          props.navigation.navigate('All Contacts');
          Snackbar.show({
            text: `Successfully added ${addedContact.displayName} contact.`,
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: '#29BB89',
            textColor: 'white',
          });
        })
        .catch(err => {
          console.error(err);
          Snackbar.show({
            text: 'Oops, we have a situation! 🚧',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: 'red',
            textColor: 'white',
          });
        });
    } else {
      setContact(newContact);
      props.navigation.navigate('All Contacts');
      Snackbar.show({
        text: 'Well, feel free to explore 👍',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#185ADB',
        textColor: 'white',
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <MultiForm type="displayName" contact={contact} setContact={setContact} handleChangeText={handleChangeText} />
        <MultiForm type="phoneNumbers" contact={contact} setContact={setContact} handleChangeText={handleChangeText} />
        <MultiForm type="emailAddresses" contact={contact} setContact={setContact} handleChangeText={handleChangeText} />
      </ScrollView>
      <View style={styles.fabView} accessibilityLabel="Save contact" accessibilityHint="Navigates to list all contacts screen">
        <FabButton type="save" onPress={handleFabButtonPress} />
      </View>
    </SafeAreaView>
  );
};

export default NewContact;
