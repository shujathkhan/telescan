import { RouteProp } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import Contacts, { Contact } from 'react-native-contacts';
import { RootStackParamList } from '../../../App';

type TContactView = {
  route: RouteProp<RootStackParamList, 'ContactView'>;
};

const ContactView = (props: TContactView) => {
  const { contactId } = props.route.params;

  useEffect(() => {
    Contacts.getContactById(contactId).then((contact: Contact) => {
      console.log(contact);
    });
  }, [contactId]);

  return <View />;
};

export default ContactView;
