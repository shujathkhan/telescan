import { Contact } from 'react-native-contacts';

export const getInitials = (name: string) => {
  let initials: string | Array<string> = name.split(' ');
  if (initials.length > 1) {
    initials = initials[0][0].toUpperCase() + initials[initials.length - 1][0].toUpperCase();
  } else if (initials.length === 1) {
    initials = initials[0][0].toUpperCase();
  }
  return initials;
};

export const wait = (timeout: number) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export const sortByGivenName = (contactList: Array<Contact>) =>
  contactList
    .slice()
    .sort((a, b) =>
      a.givenName.toLowerCase() > b.givenName.toLowerCase() ? 1 : a.givenName.toLowerCase() < b.givenName.toLowerCase() ? -1 : 0,
    );
