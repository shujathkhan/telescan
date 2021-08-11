import { RouteProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TextInput, View } from 'react-native';
import Contacts, { Contact } from 'react-native-contacts';
import { RootStackParamList } from '../../../App';
import FabButton from '../../components/FabButton';
import { getInitials } from '../../helpers';
import { styles } from './styles';

type TContactView = {
  route: RouteProp<RootStackParamList, 'View/Edit Contact'>;
};

const ContactView = (props: TContactView) => {
  const { contactId } = props.route.params;
  const [contact, setContact] = useState<Contact>();
  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    contactId &&
      Contacts.getContactById(contactId).then((contactResponse: Contact) => {
        setContact(contactResponse);
        console.log(contactResponse);
      });
  }, [contactId]);

  // const;

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
      <ScrollView
        style={{
          marginVertical: 50,
          width: '85%',
          marginBottom: 70,
        }}>
        {contact.phoneNumbers.map(phoneNumber => {
          const label = phoneNumber.label.slice(0, 1).toUpperCase() + phoneNumber.label.slice(1);
          return !editMode ? (
            <View style={{ marginVertical: 10 }}>
              <Text style={{ fontSize: 15, color: 'grey' }}>{label}</Text>
              <Text style={{ fontSize: 25 }}>{phoneNumber.number}</Text>
            </View>
          ) : (
            <View>
              <Text style={{ fontSize: 15, color: 'grey' }}>{label}</Text>
              <TextInput style={{ fontSize: 25, height: 50, width: 330, borderWidth: 1, padding: 10 }} value={phoneNumber.number} />
            </View>
          );
        })}
        {contact.emailAddresses.map(emailAddress => {
          const label = emailAddress.label.slice(0, 1).toUpperCase() + emailAddress.label.slice(1);
          return !editMode ? (
            <View style={{ marginVertical: 10 }}>
              <Text style={{ fontSize: 15, color: 'grey' }}>{label}</Text>
              <Text style={{ fontSize: 25 }}>{emailAddress.email}</Text>
            </View>
          ) : (
            <View>
              <Text style={{ fontSize: 15, color: 'grey' }}>{label}</Text>
              <TextInput style={{ fontSize: 25, height: 50, width: 330, borderWidth: 1, padding: 10 }} value={emailAddress.email} />
            </View>
          );
        })}
      </ScrollView>
      <FabButton onPress={() => setEditMode(!editMode)} isActive={editMode} />
    </View>
  ) : (
    <></>
  );
};

export default ContactView;
