const { RESULTS } = require('../node_modules/react-native-permissions/dist/commonjs/results.js');

const androidPermissions = require('../node_modules/react-native-permissions/dist/commonjs/permissions.android.js');
const iosPermissions = require('../node_modules/react-native-permissions/dist/commonjs/permissions.ios.js');

const PERMISSIONS = {
  ANDROID: androidPermissions.PERMISSIONS.ANDROID,
  IOS: iosPermissions.PERMISSIONS.IOS,
  WINDOWS: {},
};

export { PERMISSIONS, RESULTS };

export async function check() {
  jest.fn();
}
