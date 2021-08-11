import { RouteProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TextInput, View } from 'react-native';
import Contacts, { Contact, EmailAddress, PhoneNumber } from 'react-native-contacts';
import { RootStackParamList } from '../../../App';
import FabButton from '../../components/FabButton';
import { getInitials } from '../../helpers';
import { styles } from './styles';
import cloneDeep from 'lodash.clonedeep';

type TContactView = {
  route: RouteProp<RootStackParamList, 'View/Edit Contact'>;
};

const ContactView = (props: TContactView) => {
  let { contactId } = props.route.params;
  const [contact, setContact] = useState<Contact | void>();
  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    contactId &&
      Contacts.getContactById(contactId).then((contactResponse: Contact) => {
        setContact(contactResponse);
        console.log(contactResponse);
      });
  }, [contactId]);

  const handleChangeText = (value: string, type: string, index: number = -1, key?: string) => {
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
    setEditMode(!editMode);
    if (editMode) {
      contact &&
        Contacts.updateContact(contact).then(data => {
          // record updated
          console.log('SSS', data);
          const updatedContact = data;
          setContact(updatedContact);
        });
    }
  };

  return contact ? (
    <View style={styles.container}>
      {contact.thumbnailPath ? (
        <Image
          style={styles.nameIcon}
          source={{
            uri: contact.thumbnailPath,
          }}
        />
      ) : (
        <View style={styles.nameInitialsView}>
          <Text style={styles.nameInitialsText}>{getInitials(contact.displayName)}</Text>
        </View>
      )}

      <ScrollView style={styles.detailsContainer}>
        {!editMode ? (
          <View style={styles.detailsView}>
            <Text style={styles.detailsTextLabel}>Name</Text>
            <Text style={styles.detailsTextValue}>{contact.displayName}</Text>
          </View>
        ) : (
          <View style={styles.detailsView}>
            <Text style={styles.detailsTextLabel}>Given name</Text>
            <TextInput
              style={styles.detailsTextInput}
              onChangeText={value => handleChangeText(value, 'givenName')}
              value={contact.givenName}
            />
            <Text style={styles.detailsTextLabel}>Family name</Text>
            <TextInput
              style={styles.detailsTextInput}
              onChangeText={value => handleChangeText(value, 'familyName')}
              value={contact.familyName}
            />
          </View>
        )}
        {contact.phoneNumbers.map((phoneNumber: PhoneNumber, phoneIndex: number) => {
          const label = phoneNumber.label.slice(0, 1).toUpperCase() + phoneNumber.label.slice(1);
          return !editMode ? (
            <View style={styles.detailsView} key={`phoneNumber-${contact.recordID}-index-${phoneIndex}`}>
              <Text style={styles.detailsTextLabel}>{label}</Text>
              <Text style={styles.detailsTextValue}>{phoneNumber.number}</Text>
            </View>
          ) : (
            <View style={styles.detailsView} key={`phoneNumber-${contact.recordID}-index-${phoneIndex}`}>
              <Text style={styles.detailsTextLabel}>{label}</Text>
              <TextInput
                style={styles.detailsTextInput}
                onChangeText={value => handleChangeText(value, 'phoneNumbers', phoneIndex, 'number')}
                value={phoneNumber.number}
              />
            </View>
          );
        })}
        {contact.emailAddresses.map((emailAddress: EmailAddress, emailIndex: number) => {
          const label = emailAddress.label.slice(0, 1).toUpperCase() + emailAddress.label.slice(1);
          return !editMode ? (
            <View style={styles.detailsView} key={`emailAddress-${contact.recordID}-index-${emailIndex}`}>
              <Text style={styles.detailsTextLabel}>{label}</Text>
              <Text style={styles.detailsTextValue}>{emailAddress.email}</Text>
            </View>
          ) : (
            <View style={styles.detailsView} key={`emailAddress-${contact.recordID}-index-${emailIndex}`}>
              <Text style={styles.detailsTextLabel}>{label}</Text>
              <TextInput
                style={styles.detailsTextInput}
                onChangeText={value => handleChangeText(value, 'emailAddresses', emailIndex, 'email')}
                value={emailAddress.email}
              />
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.fabView}>
        <FabButton type="edit" onPress={handleFabButtonPress} isActive={editMode} />
      </View>
    </View>
  ) : (
    <></>
  );
};

export default ContactView;
