import { Platform } from 'react-native';
import { Contact } from 'react-native-contacts';
import { Permission, PERMISSIONS, requestMultiple, RESULTS } from 'react-native-permissions';

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

export const requestPermissions = async (permissions: Array<Permission>) => {
  let isPermissionGranted = false;
  const statuses = await requestMultiple(permissions);
  for (let index in permissions) {
    if (statuses[permissions[index]] === RESULTS.GRANTED) {
      isPermissionGranted = true;
    } else {
      isPermissionGranted = false;
      break;
    }
  }
  return isPermissionGranted;
};

export const sortByGivenName = (contactList: Array<Contact>) =>
  contactList
    .slice()
    .sort((a, b) =>
      a.givenName.toLowerCase() > b.givenName.toLowerCase() ? 1 : a.givenName.toLowerCase() < b.givenName.toLowerCase() ? -1 : 0,
    );

export const contactPermissions: Array<Permission> =
  Platform.OS === 'ios'
    ? [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.CONTACTS, PERMISSIONS.IOS.PHOTO_LIBRARY, PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY]
    : [
        PERMISSIONS.ANDROID.CAMERA,
        PERMISSIONS.ANDROID.READ_CONTACTS,
        PERMISSIONS.ANDROID.WRITE_CONTACTS,
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      ];
