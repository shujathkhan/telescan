import { NativeStackNavigationHelpers } from '@react-navigation/native-stack/lib/typescript/src/types';
import React, { useEffect, useState } from 'react';
import { FlatList, Platform, Text, View } from 'react-native';
import { PermissionsAndroid } from 'react-native';
import Contacts, { Contact } from 'react-native-contacts';
import { SafeAreaView } from 'react-native-safe-area-context';
import ContactCard from '../../components/ContactCard';
import { styles } from './styles';
// import Tissue from '../../assets/Tissue.gif';

type TContactList = {
  navigation: NativeStackNavigationHelpers;
};

const ContactList = (props: TContactList) => {
  const [contactList, setContactList] = useState<Array<Contact>>([]);
  const loadContacts = () => {
    Contacts.getAll()
      .then(contacts => {
        setContactList(contacts);
        console.log(contacts[0]);
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

  const contactItem = (childProps: { item: Contact; index: number }) => {
    return childProps.item.displayName &&
      childProps.item.displayName !== 'undefined' ? (
      <ContactCard
        name={childProps.item.displayName}
        nameIconPath={childProps.item.thumbnailPath}
        onPress={() =>
          props.navigation.navigate('ContactView', {
            contactId: childProps.item.recordID,
          })
        }
        key={childProps.item.recordID}
      />
    ) : null;
  };

  return (
    <SafeAreaView style={styles.container}>
      {contactList.length ? (
        <FlatList
          data={contactList}
          renderItem={contactItem}
          keyExtractor={item => item.recordID}
        />
      ) : (
        <View style={styles.fallbackStatusView}>
          {/* <Image source={Tissue} /> */}
          <Text style={styles.fallbackStatusText}>No contacts to display</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ContactList;
