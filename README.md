# TeleScan

  <table border="0">
  <tr>
  <th  align="left">Introduction</th>
  <th  align="left">Demo</th>
  </tr>
  <tr>
  <td>

TeleScan is a quick prototype contact manager experience built using react-native, typescript, react-native-contacts, react-native-gesture-handler, react-native-image-picker, react-native-permissions, prettier, jest and react-navigation, which has maximum support for Android for now.

It leverages <b>react-native-contacts</b> to sync and modify in-device contacts. Currently it supports the following,

  <ul>
    <li>Sync in-device contacts</li>
    <li>View all contacts</li>
    <li>View a single contact</li>
    <li>Edit a contact</li>
    <li>Swipe to Delete a contact</li>
    <li>Add a new a contact, add multiple email addresses and phone numbers</li>
  </ul>
  </td>

  <td>
  <img src="https://user-images.githubusercontent.com/13440061/129457159-84a49c25-813c-46e0-af5b-43ef684d0d57.gif" width="800" />
  </td>
</tr>
</table>

## Setup

### Pre-requisites
- Android Studio ( with an AVD available preferably greater than Android 10 )
- VScode or any IDE/text editor to view/edit source code
- NodeJS >16.0.0
- Git version control

### Steps
To run the application, please follow the below steps using a powershell or bash,
- Clone the application, `git clone https://github.com/shujathkhan/TeleScan.git`
- Move into its directory, `cd telescan`
- Intall node_modules, `npm install`
- Run the application for android, `npm run android`

## Architecture
This app consists of the following folders in `src` ,
    <details open>
      <summary>**layouts** (Feature screens)</summary>
      Following are the created screens in the application,
      <ul>
        <li>`ContactList` (aka All Contacts screen, displays all synced contacts using a FlatList)</li>
        <li>`ContactView` (aka View/Edit Contact screen, uses contactId fetched from route param from All contacts screen and using Contacts API to update details for a contact, by leveraging MultiForm component)</li>
        <li>`NewContact` (aka Add New Contact screen, creates a new contact by leveraging MultiForm and Contacts API)</li>
      </ul>
    </details>
    <details>
      <summary>**components** (Re-usable components)</summary>
      Following are the created re-usable components used in the screens of the application,
      <ul>
        <li>`ContactCard` (List Item used in the All contacts screen)</li>
        <li>`FabButton` (Icon fab button used in all contacts, view/edit and add new contact screen)</li>
        <li>`MultiForm` (Switchable form components for phoneNumbers, emailAddresses and displayName comprises of Text, TextInput and Picker)</li>
      </ul>
    </details>
    <details>
      <summary>**helpers**</summary>
      Following are the created helpers used in the application,
      <ul>
        <li>`getInitials` (Function to get initals from a name)</li>
        <li>`wait` (Function to wait for X milliseconds)</li>
        <li>`requestPermissions` (Function to request permission using react-native-permissions API)</li>
        <li>`sortByGivenName` (Sort an array of contacts by given name)</li>
        <li>`contactPermissions` (Read/Write Contacts)</li>
      </ul>
    </details>

## Challenges

- One of the major challenges was the permission requests, for both ios and android react native provides different syntax and levels of permissions, `react-native-permissions` played a key role, in quick prototyping it.
- Another challenge, would be the `react-native-contacts` API functions, are not properly strongly typed in terms of their Promise response, workarounds are available, but I prefer it to be strongly typed in a correct manner. eg: `addContact` promise should resolve with a _Contact_ object instead of _void_.
- Currently, I am facing amajor road block with the `react-native-contacts` package in terms of updating the photo of a contact. For some reason while consuming, the `writePhotoToPath` command keeps throwing a File Not Found Exception. I am currently digging into this issue.

Developed with 💖 using react-native.
