import { Platform } from 'react-native';
import { Contact } from 'react-native-contacts';
import { Permission, PERMISSIONS, requestMultiple, RESULTS } from 'react-native-permissions';

/**
 * @description Function to get initals from a name
 * @param {string} name
 * @returns {string | string[]}
 */
export const getInitials = (name: string): string | string[] => {
  let initials: string | Array<string> = name.split(' ');
  if (initials.length > 1) {
    initials = initials[0][0].toUpperCase() + initials[initials.length - 1][0].toUpperCase();
  } else if (initials.length === 1) {
    initials = initials[0][0].toUpperCase();
  }
  return initials;
};

/**
 * @description function to wait for X milliseconds
 * @param {number} timeout
 * @returns {Promise}
 */
export const wait = (timeout: number) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

/**
 * @description Function to request permission using react-native-permissions API
 * @param {Array<Permission>} permissions
 * @returns {Promise<boolean>}
 */
export const requestPermissions = async (permissions: Array<Permission>): Promise<boolean> => {
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

/**
 * @description Sort an array of contacts by given name
 * @param {Array<Contact>} contactList
 * @returns {Array<Contact>}
 */
export const sortByGivenName = (contactList: Array<Contact>): Array<Contact> =>
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
