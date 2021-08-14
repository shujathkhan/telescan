import React from 'react';
import { styles } from './styles';
import { Picker } from '@react-native-picker/picker';
import { ItemValue } from '@react-native-picker/picker/typings/Picker';
import { View, Text, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import cloneDeep from 'lodash.clonedeep';
import { Contact, EmailAddress, PhoneNumber } from 'react-native-contacts';
import { useRef } from 'react';

export const newPhoneNumber: PhoneNumber = { label: 'home', number: '' };
export const newEmailAddress: EmailAddress = { label: 'home', email: '' };

export type THandleChangeText = {
  value: string | number;
  type: string;
  index: number;
  key?: string;
};

type TMultiForm = {
  contact: Contact | Partial<Contact>;
  setContact: React.Dispatch<Contact | any>;
  type: 'phoneNumbers' | 'emailAddresses' | 'displayName';
  handleChangeText: (args: THandleChangeText) => void;
};

const MultiForm = (props: TMultiForm) => {
  const pickerRef = useRef<any>();

  const openPicker = () => {
    pickerRef.current.focus();
  };

  const onChangeValue = (args: THandleChangeText) => {
    props.handleChangeText && props.handleChangeText(args);
  };

  /**
   * @description Switch case to handle custom form elements
   * @param {'phoneNumbers' | 'emailAddresses' | 'displayName'} props.type
   * @returns {JSX.Element}
   */
  switch (props.type) {
    case 'phoneNumbers':
      return (
        <View style={styles.groupContainer}>
          <View style={styles.emojiContainer}>
            <View style={styles.emoji}>
              <Text style={styles.detailsTextLabel}>📞</Text>
            </View>
            <Text style={styles.detailsTextLabel}>Phone Numbers</Text>
          </View>
          {props?.contact?.phoneNumbers?.map((phoneNumber: PhoneNumber, phoneIndex: number) => {
            return (
              <View style={[styles.detailsView, styles.itemContainer]} key={`phoneNumber-${props.contact.recordID}-index-${phoneIndex}`}>
                <TouchableOpacity activeOpacity={1} onPress={openPicker} style={styles.pickerContainer}>
                  <Picker
                    ref={pickerRef}
                    selectedValue={phoneNumber.label}
                    dropdownIconColor={'black'}
                    mode={'dropdown'}
                    enabled={false}
                    onValueChange={(itemValue: ItemValue) =>
                      onChangeValue({ value: itemValue, type: 'phoneNumbers', index: phoneIndex, key: 'label' })
                    }>
                    <Picker.Item label="Home" value="home" style={styles.pickerItem} />
                    <Picker.Item label="Mobile" value="mobile" style={styles.pickerItem} />
                    <Picker.Item label="Work" value="work" style={styles.pickerItem} />
                    <Picker.Item label="Other" value="other" style={styles.pickerItem} />
                  </Picker>
                </TouchableOpacity>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
                  <TextInput
                    style={[styles.detailsTextInput, styles.customTextInput]}
                    onChangeText={value => onChangeValue({ value, type: 'phoneNumbers', index: phoneIndex, key: 'number' })}
                    value={phoneNumber.number}
                    keyboardType="numeric"
                    placeholder="Enter Phone Number"
                    placeholderTextColor="grey"
                  />
                </KeyboardAvoidingView>
                <TouchableOpacity
                  activeOpacity={0.75}
                  onPress={() => {
                    let contactClone = cloneDeep(props.contact);
                    contactClone.phoneNumbers?.splice(phoneIndex, 1);
                    props.setContact(contactClone);
                  }}>
                  <Text>❌</Text>
                </TouchableOpacity>
              </View>
            );
          })}
          <TouchableOpacity
            activeOpacity={0.75}
            accessibilityRole="button"
            accessibilityLabel="Add new phone number"
            onPress={() => {
              let contactClone = cloneDeep(props.contact);
              contactClone.phoneNumbers?.push(newPhoneNumber);
              props.setContact(contactClone);
            }}>
            <Text>➕Add New Phone Number</Text>
          </TouchableOpacity>
        </View>
      );
    case 'emailAddresses':
      return (
        <View style={styles.groupContainer}>
          <View style={styles.emojiContainer}>
            <View style={styles.emoji}>
              <Text style={styles.detailsTextLabel}>✉️</Text>
            </View>
            <Text style={styles.detailsTextLabel}>Email Addresses</Text>
          </View>
          {props.contact?.emailAddresses?.map((emailAddress: EmailAddress, emailIndex: number) => {
            return (
              <View style={[styles.detailsView, styles.itemContainer]} key={`emailAddress-${props.contact.recordID}-index-${emailIndex}`}>
                <Picker
                  selectedValue={emailAddress.label}
                  style={styles.pickerContainer}
                  mode={'dropdown'}
                  dropdownIconColor={'black'}
                  onValueChange={(value: ItemValue) => onChangeValue({ value, type: 'emailAddresses', index: emailIndex, key: 'label' })}>
                  <Picker.Item label="Home" value="home" style={styles.pickerItem} />
                  <Picker.Item label="Work" value="work" style={styles.pickerItem} />
                  <Picker.Item label="Other" value="other" style={styles.pickerItem} />
                </Picker>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
                  <TextInput
                    style={[styles.detailsTextInput, styles.customTextInput]}
                    onChangeText={value => onChangeValue({ value, type: 'emailAddresses', index: emailIndex, key: 'email' })}
                    value={emailAddress.email}
                    keyboardType="email-address"
                    placeholder="Enter Email ID"
                    placeholderTextColor="grey"
                  />
                </KeyboardAvoidingView>
                <TouchableOpacity
                  activeOpacity={0.75}
                  onPress={() => {
                    let contactClone = cloneDeep(props.contact);
                    contactClone.emailAddresses?.splice(emailIndex, 1);
                    props.setContact(contactClone);
                  }}>
                  <Text>❌</Text>
                </TouchableOpacity>
              </View>
            );
          })}
          <TouchableOpacity
            activeOpacity={0.75}
            accessibilityRole="button"
            accessibilityLabel="Add new email address"
            onPress={() => {
              let contactClone = cloneDeep(props.contact);
              contactClone.emailAddresses?.push(newEmailAddress);
              props.setContact(contactClone);
            }}>
            <Text>➕Add New Email Address</Text>
          </TouchableOpacity>
        </View>
      );

    case 'displayName':
      return (
        <>
          <View style={styles.emojiContainer}>
            <View style={styles.emoji}>
              <Text style={styles.detailsTextLabel}>😀</Text>
            </View>
            <View style={styles.detailsView}>
              <Text style={styles.detailsTextLabel}>Given name</Text>
              <TextInput
                style={styles.detailsTextInput}
                value={props.contact.givenName}
                onChangeText={value => onChangeValue({ value, type: 'givenName', index: -1 })}
              />
            </View>
          </View>

          <View style={styles.emojiContainer}>
            <View style={styles.emoji}>
              <Text style={styles.detailsTextLabel}>😀</Text>
            </View>
            <View style={styles.detailsView}>
              <Text style={styles.detailsTextLabel}>Family name</Text>
              <TextInput
                style={styles.detailsTextInput}
                value={props.contact.familyName}
                onChangeText={value => onChangeValue({ value, type: 'familyName', index: -1 })}
              />
            </View>
          </View>
        </>
      );

    default:
      return (
        <View style={styles.fallbackTypeView}>
          <Text>Please supply a proper type</Text>
        </View>
      );
  }
};

export default MultiForm;
