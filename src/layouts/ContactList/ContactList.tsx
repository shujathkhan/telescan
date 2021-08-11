import { NativeStackNavigationHelpers } from '@react-navigation/native-stack/lib/typescript/src/types';
import React, { useEffect, useState } from 'react';
import { FlatList, Platform, RefreshControl, Text, View } from 'react-native';
import { PermissionsAndroid } from 'react-native';
import Contacts, { Contact } from 'react-native-contacts';
import { SafeAreaView } from 'react-native-safe-area-context';
import ContactCard from '../../components/ContactCard';
import FabButton from '../../components/FabButton';
import { wait } from '../../helpers';
import { styles } from './styles';
// import Tissue from '../../assets/Tissue.gif';

type TContactList = {
  navigation: NativeStackNavigationHelpers;
};

const ContactList = (props: TContactList) => {
  const [contactList, setContactList] = useState<Array<Contact>>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const loadContacts = () => {
    Contacts.getAll()
      .then(contacts => {
        setContactList(contacts);
      })
      .catch(err => {
        setContactList([]);
        console.log(err);
      });
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'TeleScan',
        message: 'We would like to request your permission to sync your in-device contacts.',
        buttonPositive: 'Alright 👍',
      })
        .then(authStatus => {
          if (authStatus === 'granted') {
            loadContacts();
          } else {
            setContactList([]);
          }
        })
        .catch(err => {
          setContactList([]);
          console.log(err);
        });
    } else {
      Contacts.requestPermission();
      Contacts.checkPermission()
        .then(() => {
          loadContacts();
        })
        .catch(err => console.log(err));
    }
  }, []);

  const contactItem = (childProps: { item: Contact; index: number }) => {
    return childProps.item.displayName && childProps.item.displayName !== 'undefined' ? (
      <ContactCard
        name={childProps.item.displayName}
        nameIconPath={childProps.item.thumbnailPath}
        onPress={() =>
          props.navigation.navigate('View/Edit Contact', {
            contactId: childProps.item.recordID,
          })
        }
        key={childProps.item.recordID}
      />
    ) : null;
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadContacts();
    wait(250).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Showing {contactList.length} contacts</Text>
        <View style={styles.typeOfView}>
          <Text>😀</Text>
          <View style={styles.separator} />
          <Text>📃</Text>
        </View>
      </View>

      <View style={styles.fabView}>
        <FabButton
          type="add"
          onPress={() => {
            props.navigation.navigate('Add New Contact');
            console.log('aa');
          }}
        />
      </View>
      {contactList.length ? (
        <FlatList
          data={contactList.slice().sort((a, b) => (a.givenName > b.givenName ? 1 : a.givenName < b.givenName ? -1 : 0))}
          extraData={contactList}
          renderItem={contactItem}
          keyExtractor={item => item.recordID}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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
