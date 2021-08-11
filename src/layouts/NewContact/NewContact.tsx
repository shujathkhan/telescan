import { Picker } from '@react-native-community/picker';
import { ItemValue } from '@react-native-community/picker/typings/Picker';
import { NativeStackNavigationHelpers } from '@react-navigation/native-stack/lib/typescript/src/types';
import cloneDeep from 'lodash.clonedeep';
import React, { useState } from 'react';
import { View, SafeAreaView, Text, TextInput, PermissionsAndroid, Platform } from 'react-native';
import Contacts, { Contact, EmailAddress, PhoneNumber } from 'react-native-contacts';
import FabButton from '../../components/FabButton';
import { styles as contactViewStyles } from '../ContactView/styles';
import { styles } from './styles';

type TNewContact = {
  navigation: NativeStackNavigationHelpers;
};

const NewContact = (props: TNewContact) => {
  const newContact = {
    emailAddresses: [{ label: '', email: '' }],
    phoneNumbers: [{ label: '', number: '' }],
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

  const handleFabButtonPress = () => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS, {
        title: 'TeleScan',
        message: 'We would like to request your permission to modify your in-device contacts.',
        buttonPositive: 'Alright 👍',
      })
        .then(authStatus => {
          if (authStatus === 'granted') {
            Contacts.addContact(contact as Contact)
              .then(() => {
                props.navigation.navigate('All Contacts');
              })
              .catch(err => console.error(err));
          } else {
            setContact(newContact);
          }
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      Contacts.requestPermission();
      Contacts.checkPermission()
        .then(authStatus => {
          if (authStatus === 'authorized') {
            Contacts.addContact(contact as Contact)
              .then(() => {
                props.navigation.navigate('All Contacts');
              })
              .catch(err => console.error(err));
          } else {
            setContact(newContact);
          }
        })
        .catch(err => console.error(err));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 30, marginHorizontal: '7.5%' }}>
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
      <View style={styles.groupContainer}>
        <Text style={contactViewStyles.detailsTextLabel}>Phone Numbers</Text>
        {contact?.phoneNumbers?.map((phoneNumber: PhoneNumber, phoneIndex: number) => {
          return (
            <View style={[contactViewStyles.detailsView, styles.itemContainer]} key={`phoneNumber-${contact.recordID}-index-${phoneIndex}`}>
              <Picker
                selectedValue={phoneNumber.label}
                style={styles.pickerContainer}
                onValueChange={(itemValue: ItemValue) => handleChangeText(itemValue, 'phoneNumbers', phoneIndex, 'label')}>
                <Picker.Item label="Home" value="home" />
                <Picker.Item label="Mobile" value="mobile" />
                <Picker.Item label="Work" value="work" />
                <Picker.Item label="Other" value="other" />
              </Picker>
              <TextInput
                style={[contactViewStyles.detailsTextInput, styles.customTextInput]}
                onChangeText={value => handleChangeText(value, 'phoneNumbers', phoneIndex, 'number')}
                value={phoneNumber.number}
                keyboardType="numeric"
              />
            </View>
          );
        })}
      </View>
      <View style={styles.groupContainer}>
        <Text style={contactViewStyles.detailsTextLabel}>Email Addresses</Text>
        {contact?.emailAddresses?.map((emailAddress: EmailAddress, emailIndex: number) => {
          return (
            <View
              style={[contactViewStyles.detailsView, styles.itemContainer]}
              key={`emailAddress-${contact.recordID}-index-${emailIndex}`}>
              <Picker
                selectedValue={emailAddress.label}
                style={styles.pickerContainer}
                onValueChange={(itemValue: ItemValue) => handleChangeText(itemValue, 'emailAddresses', emailIndex, 'label')}>
                <Picker.Item label="Personal" value="personal" />
                <Picker.Item label="Work" value="work" />
                <Picker.Item label="Other" value="other" />
              </Picker>
              <TextInput
                style={[contactViewStyles.detailsTextInput, styles.customTextInput]}
                onChangeText={value => handleChangeText(value, 'emailAddresses', emailIndex, 'email')}
                value={emailAddress.email}
                keyboardType="email-address"
              />
            </View>
          );
        })}
      </View>
      <View style={[contactViewStyles.fabView, styles.customFabView]}>
        <FabButton type="save" onPress={handleFabButtonPress} />
      </View>
    </SafeAreaView>
  );
};

export default NewContact;
