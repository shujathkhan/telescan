import { RouteProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Contacts, { Contact, EmailAddress, PhoneNumber } from 'react-native-contacts';
import { RootStackParamList } from '../../../App';
import FabButton from '../../components/FabButton';
import { getInitials } from '../../helpers';
import { styles } from './styles';
import cloneDeep from 'lodash.clonedeep';
import Snackbar from 'react-native-snackbar';
import { NativeStackNavigationHelpers } from '@react-navigation/native-stack/lib/typescript/src/types';
import { launchImageLibrary } from 'react-native-image-picker';

type TContactView = {
  route: RouteProp<RootStackParamList, 'View/Edit Contact'>;
  navigation: NativeStackNavigationHelpers;
};

const ContactView = (props: TContactView) => {
  let { contactId } = props.route.params;
  const [contact, setContact] = useState<Contact | any>();
  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    contactId &&
      Contacts.getContactById(contactId).then((contactResponse: Contact) => {
        setContact(contactResponse);
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

  const updateContact = (contactToUpdate: Contact) => {
    Contacts.updateContact(contactToUpdate)
      .then(data => {
        // record updated
        const updatedContact: Contact | any = data;

        setContact(updatedContact);
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

    // Contacts.writePhotoToPath(contactToUpdate.recordID, contactToUpdate.thumbnailPath)
    //   .then(data => console.log(data))
    //   .catch(err => console.error(err));
  };

  const handleFabButtonPress = async () => {
    setEditMode(!editMode);
    if (editMode && contact) {
      console.log(contact);
      updateContact(contact);
      Snackbar.show({
        text: 'Successfully updated contacts ✔️',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#29BB89',
        textColor: 'white',
      });
    }
  };

  const chooseImage = () => {
    launchImageLibrary(
      {
        selectionLimit: 1,
        mediaType: 'photo',
      },
      response => {
        console.info('Response = ', response);

        if (response.didCancel) {
          console.info('User cancelled image picker');
        } else {
          if (response.assets) {
            let contactClone = cloneDeep(contact);
            contactClone.thumbnailPath = response?.assets[0]?.uri;
            contactClone.hasThumbnail = true;
            setContact(contactClone);
          }
        }
      },
    );
  };

  return contact ? (
    <View style={styles.container}>
      {contact.hasThumbnail ? (
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

      {editMode && (
        <View style={styles.editPhotoContainer}>
          <Text style={styles.detailsTextLabel}>Edit Photo</Text>

          <View style={styles.editPhotoButtonContainer}>
            <TouchableOpacity style={styles.editPhotoButton}>
              <Text style={styles.detailsTextValue}>📷</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.editPhotoButton} onPress={chooseImage}>
              <Text style={styles.detailsTextValue}>🖼️</Text>
            </TouchableOpacity>
          </View>
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
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
              <TextInput
                key="giveName"
                style={styles.detailsTextInput}
                onChangeText={value => handleChangeText(value, 'givenName')}
                defaultValue={contact.givenName}
                placeholder="Enter Given Name"
                placeholderTextColor="grey"
              />
            </KeyboardAvoidingView>
            <Text style={styles.detailsTextLabel}>Family name</Text>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
              <TextInput
                key="familyName"
                style={styles.detailsTextInput}
                onChangeText={value => handleChangeText(value, 'familyName')}
                defaultValue={contact.familyName}
                placeholder="Enter Family Name"
                placeholderTextColor="grey"
              />
            </KeyboardAvoidingView>
          </View>
        )}
        {contact.phoneNumbers.map((phoneNumber: PhoneNumber, phoneIndex: number) => {
          const label = phoneNumber.label.slice(0, 1).toUpperCase() + phoneNumber.label.slice(1);
          return !editMode ? (
            <View style={styles.detailsView} key={`phoneNumber-${phoneIndex}`}>
              <Text style={styles.detailsTextLabel}>{label}</Text>
              <Text style={styles.detailsTextValue}>{phoneNumber.number}</Text>
            </View>
          ) : (
            <View style={styles.detailsView} key={`phoneNumber-${phoneIndex}`}>
              <Text style={styles.detailsTextLabel} key={`phoneNumber-${phoneIndex}-label`}>
                {label}
              </Text>
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
                key={`phoneNumber-${phoneIndex}-keyboardView`}>
                <TextInput
                  style={styles.detailsTextInput}
                  key={`phoneNumber-${phoneIndex}-input`}
                  onChangeText={value => handleChangeText(value, 'phoneNumbers', phoneIndex, 'number')}
                  defaultValue={phoneNumber.number}
                  keyboardType="numeric"
                  placeholder="Enter Phone Number"
                  placeholderTextColor="grey"
                />
              </KeyboardAvoidingView>
            </View>
          );
        })}
        {contact.emailAddresses.map((emailAddress: EmailAddress, emailIndex: number) => {
          const label = emailAddress.label.slice(0, 1).toUpperCase() + emailAddress.label.slice(1);
          return !editMode ? (
            <View style={styles.detailsView} key={`emailAddress-${emailIndex}`}>
              <Text style={styles.detailsTextLabel}>{label}</Text>
              <Text style={styles.detailsTextValue}>{emailAddress.email}</Text>
            </View>
          ) : (
            <View style={styles.detailsView} key={`emailAddress-${emailIndex}`}>
              <Text style={styles.detailsTextLabel} key={`emailAddress-${emailIndex}-label`}>
                {label}
              </Text>
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
                key={`emailAddress-${emailIndex}-keyboardView`}>
                <TextInput
                  style={styles.detailsTextInput}
                  key={`emailAddress-${emailIndex}-input`}
                  onChangeText={value => handleChangeText(value, 'emailAddresses', emailIndex, 'email')}
                  defaultValue={emailAddress.email}
                  keyboardType="email-address"
                  placeholder="Enter Email ID"
                  placeholderTextColor="grey"
                />
              </KeyboardAvoidingView>
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
