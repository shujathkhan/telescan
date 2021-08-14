import { NativeStackNavigationHelpers } from '@react-navigation/native-stack/lib/typescript/src/types';
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, Text, View, Image, SafeAreaView, TouchableOpacity, ListRenderItem } from 'react-native';
import Contacts, { Contact } from 'react-native-contacts';

import { contactPermissions, requestPermissions, sortByGivenName, wait } from '../../helpers';
import ContactCard from '../../components/ContactCard';
import FabButton from '../../components/FabButton';
import { styles } from './styles';
import Snackbar from 'react-native-snackbar';
import Swipeable from 'react-native-gesture-handler/Swipeable';

type TContactList = {
  navigation: NativeStackNavigationHelpers | any;
};

type TFlatListItem = { item: Contact; index: number };

/**
 * @description All Contacts screen component
 * @param {TContactList} props
 * @returns {any}
 */
const ContactList = (props: TContactList) => {
  const [contactList, setContactList] = useState<Array<Contact>>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  /**
   * @description Function to call getAll API
   * @returns {void}
   */
  const loadContacts = () => {
    Contacts.getAll()
      .then(contacts => {
        let sortedContact = sortByGivenName(contacts);
        setContactList(sortedContact);
        Snackbar.show({
          text: `Successfully loaded ${contacts.length} contacts 💯`,
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: '#29BB89',
          textColor: 'white',
        });
      })
      .catch(err => {
        setContactList([]);
        console.error(err);
        Snackbar.show({
          text: 'Oops, we have a situation! 🚧',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: 'red',
          textColor: 'white',
        });
      });
  };

  /**
   * @description Function to request access permissions
   * @returns {void}
   */
  const handleRequestAccess = async () => {
    const isPermissionGranted = await requestPermissions(contactPermissions);
    if (isPermissionGranted) {
      loadContacts();
    } else {
      setContactList([]);
      Snackbar.show({
        text: 'Well, feel free to explore 👍',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#185ADB',
        textColor: 'white',
      });
    }
  };

  useEffect(() => {
    handleRequestAccess();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * @description Function to handle delete button press event
   * @param {TFlatListItem} childProps
   * @returns {void}
   */
  const handleDelete = (childProps: TFlatListItem) => {
    const contactName = childProps.item.displayName;
    Contacts.deleteContact(childProps.item)
      .then(() => {
        loadContacts();
        Snackbar.show({
          text: `Successfully deleted ${contactName} ✔️`,
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
  };

  /**
   * @description List item component to be passed to Flat List
   * @param {TFlatListItem} childProps
   * @returns {ListRenderItem<Contact>}
   */
  const contactItem: ListRenderItem<Contact> = (childProps: TFlatListItem) => {
    /**
     * @description Render on swipe right delete button
     * @returns {JSX.Element}
     */
    const handleRightSwipe = () => (
      <TouchableOpacity style={styles.deleteView} activeOpacity={0.75} onPress={() => handleDelete(childProps)}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    );

    return childProps.item.displayName && childProps.item.displayName !== 'undefined' ? (
      <Swipeable renderRightActions={handleRightSwipe} onSwipeableLeftOpen={() => console.log('Swiped')}>
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
      </Swipeable>
    ) : null;
  };

  /**
   * @description onRefresh function passed to FlatList
   * @param {any} (
   * @returns {React.EffectCallback}
   */
  const onRefresh: React.EffectCallback = React.useCallback(() => {
    setRefreshing(true);
    loadContacts();
    wait(250).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Showing {contactList.length} contacts</Text>
      </View>

      {contactList.length ? (
        <>
          <FlatList
            testID="flat-list"
            data={contactList}
            renderItem={contactItem}
            initialNumToRender={10}
            keyExtractor={item => item.recordID}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          />

          <View
            style={styles.fabView}
            accessibilityLabel="Add new contact"
            testID="addButton"
            accessible
            accessibilityHint="Navigates to new contact screen">
            <FabButton
              type="add"
              onPress={() => {
                props.navigation.navigate('NewContact');
              }}
            />
          </View>
        </>
      ) : (
        <View style={styles.fallbackStatusView}>
          <Image source={require('../../assets/blank.png')} />
          <View style={styles.fallbackStatusTextView}>
            <Text style={styles.fallbackStatusText}>No contacts to display</Text>
            <TouchableOpacity activeOpacity={0.75} onPress={handleRequestAccess} testID="syncContacts">
              <Text style={styles.syncText}>Sync device contacts</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ContactList;
