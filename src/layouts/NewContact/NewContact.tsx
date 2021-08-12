import React, { useState } from 'react';
import { View, SafeAreaView, Text, TextInput, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackNavigationHelpers } from '@react-navigation/native-stack/lib/typescript/src/types';
import cloneDeep from 'lodash.clonedeep';
import Contacts, { Contact, EmailAddress, PhoneNumber } from 'react-native-contacts';
import Snackbar from 'react-native-snackbar';
import FabButton from '../../components/FabButton';
import { contactPermissions, requestPermissions } from '../../helpers';
import { styles as contactViewStyles } from '../ContactView/styles';
import { styles } from './styles';
import { Picker } from '@react-native-picker/picker';
import { ItemValue } from '@react-native-picker/picker/typings/Picker';

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
              <View
                style={[contactViewStyles.detailsView, styles.itemContainer]}
                key={`phoneNumber-${contact.recordID}-index-${phoneIndex}`}>
                <Picker
                  selectedValue={phoneNumber.label}
                  style={styles.pickerContainer}
                  dropdownIconColor={'black'}
                  mode={'dropdown'}
                  onValueChange={(itemValue: ItemValue) => handleChangeText(itemValue, 'phoneNumbers', phoneIndex, 'label')}>
                  <Picker.Item label="Home" value="home" style={styles.pickerItem} />
                  <Picker.Item label="Mobile" value="mobile" style={styles.pickerItem} />
                  <Picker.Item label="Work" value="work" style={styles.pickerItem} />
                  <Picker.Item label="Other" value="other" style={styles.pickerItem} />
                </Picker>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
                  <TextInput
                    style={[contactViewStyles.detailsTextInput, styles.customTextInput]}
                    onChangeText={value => handleChangeText(value, 'phoneNumbers', phoneIndex, 'number')}
                    value={phoneNumber.number}
                    keyboardType="numeric"
                    placeholder="Enter Phone Number"
                    placeholderTextColor="grey"
                  />
                </KeyboardAvoidingView>
                <TouchableOpacity
                  activeOpacity={0.75}
                  onPress={() => {
                    let contactClone = cloneDeep(contact);
                    contactClone.phoneNumbers?.splice(phoneIndex, 1);
                    setContact(contactClone);
                  }}>
                  <Text>❌</Text>
                </TouchableOpacity>
              </View>
            );
          })}
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => {
              let contactClone = cloneDeep(contact);
              contactClone.phoneNumbers?.push({ number: '', label: '' });
              setContact(contactClone);
            }}>
            <Text>➕Add New Phone Number</Text>
          </TouchableOpacity>
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
                  mode={'dropdown'}
                  dropdownIconColor={'black'}
                  onValueChange={(itemValue: ItemValue) => handleChangeText(itemValue, 'emailAddresses', emailIndex, 'label')}>
                  <Picker.Item label="Personal" value="personal" style={styles.pickerItem} />
                  <Picker.Item label="Work" value="work" style={styles.pickerItem} />
                  <Picker.Item label="Other" value="other" style={styles.pickerItem} />
                </Picker>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
                  <TextInput
                    style={[contactViewStyles.detailsTextInput, styles.customTextInput]}
                    onChangeText={value => handleChangeText(value, 'emailAddresses', emailIndex, 'email')}
                    value={emailAddress.email}
                    keyboardType="email-address"
                    placeholder="Enter Email ID"
                    placeholderTextColor="grey"
                  />
                </KeyboardAvoidingView>
                <TouchableOpacity
                  activeOpacity={0.75}
                  onPress={() => {
                    let contactClone = cloneDeep(contact);
                    contactClone.emailAddresses?.splice(emailIndex, 1);
                    setContact(contactClone);
                  }}>
                  <Text>❌</Text>
                </TouchableOpacity>
              </View>
            );
          })}
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => {
              let contactClone = cloneDeep(contact);
              contactClone.emailAddresses?.push({ email: '', label: '' });
              setContact(contactClone);
            }}>
            <Text>➕Add New Email Address</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={[contactViewStyles.fabView, styles.customFabView]}>
        <FabButton type="save" onPress={handleFabButtonPress} />
      </View>
    </SafeAreaView>
  );
};

export default NewContact;
