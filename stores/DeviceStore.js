// importing observables and decorate
import { decorate, observable, action } from "mobx";

class DeviceStore {
  @observable bluetoothState = "Unknown";
  @action setBluetoothState = (state) => {
    this.bluetoothState = state;
  };

  @observable localDevices = []; // array to save local bluetooth devices
  @action addToLocalDevices = (device) => {
    // Bluetooth annoucements can happen several times.
    // Make sure this device is not already in the list
    // TODO: check list for device

    if (
      !this.localDevices.some(
        (existingDevice) => existingDevice.id === device.id
      )
    ) {
      this.localDevices.push(device);
    }
  };
}

// another way to decorate variables with observable
// decorate(DeviceStore, {
//   bluetoothState: observable,
//   setBluetoothState: action,
//   localDevices: observable,
//   addToLocalDevices: action,
//   clampDevice: observable,
//   setClampDevice: action,
//   odometerDevice: observable,
//   setOdometerDevice: action
//   etc etc etc
// });

const deviceStore = new DeviceStore();
export default deviceStore;
