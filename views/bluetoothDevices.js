import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Button,
  StatusBar,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import { inject, observer } from "mobx-react";
import deviceStore from "../stores/DeviceStore";

function BluetoothDevices() {
  const { bluetoothState, localDevices } = deviceStore;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.titleText}>BLE Tester</Text>
        <Text style={styles.sectionPropertyText}>
          BlueTooth State: {bluetoothState}
        </Text>
        <Button
          title="Press me"
          onPress={() =>
            Alert.alert(
              "BLE State=" +
                deviceStore.bluetoothState +
                ", DeviceCount=" +
                localDevices.count
            )
          }
        />
      </View>

      {/*==================== Device List ========================*/}

      <View style={styles.blueToothListView}>
        <FlatList
          data={localDevices}
          keyExtractor={(device) => device.id}
          renderItem={({ item }) => (
            <Text>
              ID: {item.id}, Name: {item.name}
            </Text>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gold",
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  titleView: {
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontFamily: "Optima",
    fontSize: 60,
    fontWeight: "bold",
    color: "darkblue",
  },
  blueToothListView: {
    display: "flex",
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    margin: 20,
  },
  devicePropsView: {
    display: "flex",
    flex: 0,
    alignItems: "flex-start",
    justifyContent: "center",
    margin: 20,
  },
  sectionView: {
    display: "flex",
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    margin: 20,
  },
  sectionTitleText: {
    fontFamily: "Optima",
    fontSize: 50,
    fontWeight: "bold",
    color: "darkblue",
  },
  sectionPropertyText: {
    fontFamily: "Optima",
    fontSize: 30,
    fontWeight: "bold",
    color: "darkblue",
  },
});

// inject Store as props to ImageList and make it observe changes in Store
export default inject("deviceStore")(observer(BluetoothDevices));
