import React, { useEffect, useState } from 'react';
import { FlatList, Platform } from 'react-native';
import { PermissionsAndroid } from 'react-native';
import Contacts, { Contact } from 'react-native-contacts';
import { SafeAreaView } from 'react-native-safe-area-context';
import ContactCard from '../../components/ContactCard';
import { styles } from './styles';

const ContactList = () => {
  const [contactList, setContactList] = useState<Array<Contact>>([]);
  const loadContacts = () => {
    Contacts.getAll()
      .then(contacts => {
        setContactList(contacts);
        console.log(contacts[2]);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
        buttonPositive: 'Please accept bare mortal',
      }).then(() => loadContacts());
    } else {
      Contacts.requestPermission();
      Contacts.checkPermission().then(() => {
        Contacts.getAll()
          .then(contacts => {
            setContactList(contacts);
            console.log(contacts[0]);
          })
          .catch(err => {
            console.log(err);
          });
      });
    }
  }, []);

  const contactItem = (props: { item: any; index: number }) => {
    return (
      props.item.displayName &&
      props.item.displayName !== 'undefined' && (
        <ContactCard
          name={props.item.displayName}
          nameIconPath={props.item.thumbnailPath}
          key={props.item.recordID}
        />
      )
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={contactList}
        renderItem={contactItem}
        keyExtractor={item => item.recordID}
      />
    </SafeAreaView>
  );
};

export default ContactList;
