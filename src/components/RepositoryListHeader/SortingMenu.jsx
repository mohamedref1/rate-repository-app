import { useState } from "react";
import { I18nManager, View } from "react-native";
import { Button, Menu, Provider } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";

import { sortOptions } from "../../hooks/useRepository";

const SortingMenu = ({ setSortBy }) => {
  const [selection, setSelection] = useState("Latest Repositories");
  const [stretch, setStrech] = useState("auto");
  const [arrow, setArrow] = useState("caretdown");
  const [visible, setVisible] = useState(false);

  const openMenu = () => {
    setVisible(true);
    setStrech(280);
    setArrow("caretup");
  };
  const closeMenu = () => {
    setVisible(false);
    setStrech("auto");
    setArrow("caretdown");
  };

  return (
    <Provider>
      <View
        style={{
          display: "flex",
          flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
          paddingVertical: 20,
          paddingHorizontal: 10,
          height: stretch,
        }}
      >
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Button onPress={openMenu} color="black">
              {selection + "  "}
              <AntDesign name={arrow} size={18} color="black" />
            </Button>
          }
          style={{
            marginHorizontal: 12,
          }}
        >
          <Menu.Item
            onPress={() => {
              setSelection("Latest Repositories");
              setSortBy(sortOptions.latest);
              closeMenu();
            }}
            title="Latest Repositories"
            style={{
              display: "flex",
              flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
            }}
          />
          <Menu.Item
            onPress={() => {
              setSelection("Highest Rating Repositories");
              setSortBy(sortOptions.highestRate);
              closeMenu();
            }}
            title="Highest Rating Repositories"
          />
          <Menu.Item
            onPress={() => {
              setSelection("Lowest Rating Repositories");
              setSortBy(sortOptions.lowestRate);
              closeMenu();
            }}
            title="Lowest Rating Repositories"
          />
        </Menu>
      </View>
    </Provider>
  );
};

export default SortingMenu;
