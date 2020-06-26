import React, { Component } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { fScale, hScale, vScale, sWidth, crScale } from "step-scale";
import strings from "../strings";
import { languageSwitcher } from "../helpers/Language";
import LinearGradient from 'react-native-linear-gradient';
import Icon1 from 'react-native-vector-icons/AntDesign';

export default class LangSwitcher extends Component {
  state = {
    langSelectionID: null,
    currentLang: ''
  };

  static navigationOptions = () => ({
    title: strings.languages
  });

  async componentWillMount() {
    alert((await AsyncStorage.getItem("languageCode")).toString())
    if ((await AsyncStorage.getItem("languageCode")).toString() == 'ar') {
      this.setState({
        currentLang: 'ar'
      })
    } else {
      this.setState({
        currentLang: 'en'
      })
    }
  }

  async componentDidMount() {
    const langCode = await languageSwitcher.getCurrentLanguageCode();
    await languageSwitcher.switchTo(langCode);
    this.setState({ langSelectionID: langCode });
  }

  render() {
    const {
      container,
      checkContainer,
      headViewStyle,
      headContainer,
      headTextStyle
    } = styles;
    const { langSelectionID } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <LinearGradient colors={['rgba(0,0,0,0)', '#000']} style={{ position: 'absolute', bottom: 0, width: '120%', height: '100%', marginLeft: -40, zIndex: -100 }} />

        <TouchableOpacity style={styles.backButton} onPress={() => this.props.navigation.navigate('Home')}>
          {/* <Icon1 name='left' size={30} color="gray" /> */}
          <Icon name={this.state.currentLang == 'ar' ? "arrow-right" : "arrow-left"} size={20} style={styles.menu} color="grey" />
        </TouchableOpacity>
        <View style={headContainer}>
          <Text style={headTextStyle}>
            {/* {strings.langSetting} */}
          </Text>
        </View>
        <FlatList
          data={_data}
          keyExtractor={(item, index) => index.toString()}
          extraData={this.state}
          style={{ marginTop: 70 }}
          renderItem={({ item }) => {
            const { langType, id } = item;
            const isSelected = langSelectionID == id;
            return (
              <TouchableOpacity
                disabled={isSelected}
                style={container}
                onPress={() =>
                  this.setState(
                    { langSelectionID: id },
                    async () => await languageSwitcher.switchTo(id)
                  )
                }
              >
                <View
                  style={[
                    checkContainer,
                    isSelected && { backgroundColor: 'orange' }
                  ]}
                >
                  {isSelected && (
                    <Icon name="check" color={'orange'} size={fScale(20)} />
                  )}
                </View>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: '700' }}>{langType}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: hScale(332),
    height: vScale(49),
    borderWidth: hScale(1),
    borderColor: 'gray',
    flexDirection: "row",
    alignItems: "center",
    marginVertical: vScale(5),
    alignSelf: "center"
  },
  checkContainer: {
    ...crScale(25.7),
    borderWidth: hScale(1),
    borderColor: 'gray',
    marginHorizontal: hScale(29.2)
  },
  headViewStyle: {
    width: sWidth,
    height: vScale(19),
    backgroundColor: 'gray'
  },
  headContainer: {
    width: hScale(375),
    height: hScale(40),
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: vScale(5)
  },
  headTextStyle: {
    color: 'gray',
    start: hScale(18)
  },
  backButton: {
    position: 'absolute',
    left: '5%',
    zIndex: 1000,
    top: '2%',
    marginTop: 50
  },
});

const _data = [
  { id: "ar", langType: 'العربية' },
  { id: "en", langType: 'English' }
];
