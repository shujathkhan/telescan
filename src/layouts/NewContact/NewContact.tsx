import { Picker } from '@react-native-community/picker';
import { ItemValue } from '@react-native-community/picker/typings/Picker';
import { NativeStackNavigationHelpers } from '@react-navigation/native-stack/lib/typescript/src/types';
import cloneDeep from 'lodash.clonedeep';
import React, { useState } from 'react';
import { View, SafeAreaView, Text, TextInput } from 'react-native';
import Contacts, { Contact, EmailAddress, PhoneNumber } from 'react-native-contacts';
import FabButton from '../../components/FabButton';
import { styles as contactViewStyles } from '../ContactView/styles';

type TNewContact = {
  navigation: NativeStackNavigationHelpers;
};

const NewContact = (props: TNewContact) => {
  const [contact, setContact] = useState<Partial<Contact>>({
    emailAddresses: [{ label: '', email: '' }],
    phoneNumbers: [{ label: '', number: '' }],
    givenName: '',
    familyName: '',
  });

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

  const handleFabButtonPress = () => {
    Contacts.addContact(contact as Contact).then(() => {
      props.navigation.navigate('All Contacts');
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', marginTop: 30 }}>
      <View style={contactViewStyles.detailsView}>
        <Text style={contactViewStyles.detailsTextLabel}>Given name</Text>
        <TextInput
          style={contactViewStyles.detailsTextInput}
          value={contact.givenName}
          onChangeText={value => handleChangeText(value, 'givenName')}
        />
      </View>
      <View style={contactViewStyles.detailsView}>
        <Text style={contactViewStyles.detailsTextLabel}>Family name</Text>
        <TextInput
          style={contactViewStyles.detailsTextInput}
          value={contact.familyName}
          onChangeText={value => handleChangeText(value, 'familyName')}
        />
      </View>
      {contact?.phoneNumbers?.map((phoneNumber: PhoneNumber, phoneIndex: number) => {
        return (
          <View style={contactViewStyles.detailsView} key={`phoneNumber-${contact.recordID}-index-${phoneIndex}`}>
            <Picker
              selectedValue={phoneNumber.label}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue: ItemValue) => handleChangeText(itemValue, 'phoneNumbers', phoneIndex, 'label')}>
              <Picker.Item label="Home" value="home" />
              <Picker.Item label="Mobile" value="mobile" />
              <Picker.Item label="Work" value="work" />
              <Picker.Item label="Other" value="other" />
            </Picker>
            <TextInput
              style={contactViewStyles.detailsTextInput}
              onChangeText={value => handleChangeText(value, 'phoneNumbers', phoneIndex, 'number')}
              value={phoneNumber.number}
            />
          </View>
        );
      })}
      {contact?.emailAddresses?.map((emailAddress: EmailAddress, emailIndex: number) => {
        return (
          <View style={contactViewStyles.detailsView} key={`emailAddress-${contact.recordID}-index-${emailIndex}`}>
            <Picker
              selectedValue={emailAddress.label}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue: ItemValue) => handleChangeText(itemValue, 'emailAddresses', emailIndex, 'label')}>
              <Picker.Item label="Personal" value="personal" />
              <Picker.Item label="Work" value="work" />
              <Picker.Item label="Other" value="other" />
            </Picker>
            <TextInput
              style={contactViewStyles.detailsTextInput}
              onChangeText={value => handleChangeText(value, 'emailAddresses', emailIndex, 'email')}
              value={emailAddress.email}
            />
          </View>
        );
      })}
      <View style={contactViewStyles.fabView}>
        <FabButton type="save" onPress={handleFabButtonPress} />
      </View>
    </SafeAreaView>
  );
};

export default NewContact;
