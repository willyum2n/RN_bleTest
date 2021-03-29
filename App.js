import React from "react";
import { Text } from "react-native";
import BluetoothDevices from "./views/bluetoothDevices";
import { BleManager, BleError } from "react-native-ble-plx";

// imports Provider and store
import { Provider } from "mobx-react";
import deviceStore from "./stores/DeviceStore";

const App = () => {
  // Setup Bluetooth and scanning callbacks
  const bleManager = new BleManager();
  const subscription = bleManager.onStateChange((state) => {
    deviceStore.setBluetoothState(state);
    console.log("Bluetooth State = " + state);
    if (state === "PoweredOn") {
      // Scan for devices and populate the list
      bleManager.startDeviceScan(null, null, bleDeviceFound);
    } else {
      // Stop scanning
      bleManager.stopDeviceScan();
    }
  }, true);

  return (
    <Provider deviceStore={deviceStore}>
      <BluetoothDevices />
    </Provider>
  );
};

bleDeviceFound = (error, device) => {
  if (error) {
    console.log(error);
  }
  if (device !== null) {
    console.log(
      "BLE: id= " + device.id,
      ", " + "name= " + device.name,
      ", " + "localName= " + device.localName,
      ", " + "rssi= " + device.rssi
    );

    deviceStore.addToLocalDevices(device);
  }
};

export default App;
