# TeleScan


  <table border="0">
  <tr>
  <th  align="left">Introduction</th>
  <th  align="left">Demo</th>
  </tr>
  <tr>
  <td>
  
  TeleScan is a quick prototype contact manager experience built using react-native, typescript, react-native-contacts, react-native-image-picker, react-native-permissions, prettier, jest and react-navigation, which has maximum support for Android for now.
  
  It leverages <b>react-native-contacts</b> to sync and modify in-device contacts. Currently it supports the following, 
  <ul>
    <li>Sync in-device contacts</li>
    <li>View all contacts</li>
    <li>View a single contact</li>
    <li>Edit a contact</li>
    <li>Add a new a contact, add multiple email addresses and phone numbers</li>
  </ul>
  </td>
  
  <td>
  <img src="https://user-images.githubusercontent.com/13440061/129226225-c815e872-b44d-446a-a2ab-e39465ee45eb.gif" width="800" />
  </td>
</tr>
</table>


## Challenges

- One of the major challenges was the permission requests, for both ios and android react native provides different syntax and levels of permissions, `react-native-permissions` played a key role, in quick prototyping it. 
- Another challenge, would be the `react-native-contacts` API functions, are not properly strongly typed in terms of their Promise response, workarounds are available, but I prefer it to be strongly typed in a correct manner. eg: `addContact` promise should resolve with a *Contact* object instead of *void*.
- Currently, I am facing amajor road block with the `react-native-contacts` package in terms of updating the photo of a contact. For some reason while consuming, the `writePhotoToPath` command keeps throwing a File Not Found Exception. I am currently digging into this issue.

Developed with 💖 using react-native.
