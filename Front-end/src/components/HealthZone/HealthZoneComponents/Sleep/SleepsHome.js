import React, { Component } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { connect } from "react-redux";
import * as actions from "../../../../actions";
import {routes} from "../../../navigation_new/app-routes"
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Button,
  Right

} from "native-base";
import Icon from "react-native-vector-icons/AntDesign";
import SleepsItem from "./SleepsItem";


const styles = StyleSheet.create({
  useNativeDriver: true,

  form: {
    flex: 1,
    paddingTop: 50,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "space-between",
  },
  fieldStyles: {
    height: 40,
  },
  addButton: {
    marginTop: 40,
    color: "#5DB075",
  },
  btnStyle: {
    backgroundColor: "#5DB075",
  },
  btnText: {
    color: "white",
  },
  textFieldStyle: {
    backgroundColor: "#F5F5F5",
    marginTop: 40,
  },
  titleStyle: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 40,
  },
});
class SleepsHome extends Component {
  onPressNavigateUpdate(hours,minutes, id, props) {
    props.passHoursMinutesAndID({ hours: hours, minutes, id: id });
    props.navigation.navigate(routes.UPDATE_SLEEP)
  }

  componentDidMount() {
    // this.props.navigation.dangerouslyGetParent().setOptions({
    //   tabBarVisible: true,
    // });
    this.props.loadInitialSleeps(this.props.token,this.props.user);
  }
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name={"archive"} size={50} color={tintColor} />
    ),
  };
  render() {
    const { error, sleeps } = this.props;
    if (!error && sleeps.length === 0)
      return (
        <View>
          <Button
            styles={{ textAlign: "right" }}
            onPress={() => this.props.navigation.goBack()}
          >
            <Icon name="arrowleft" size={50} />
          </Button>

          <Text>You have no Sleep recorded yet</Text>
          <Button
            style={{ position: "absolute", right: 0 }}
            onPress={() => this.props.navigation.navigate(routes.ADD_SLEEP)}
          >
            <Icon name="plussquareo" size={50} />
          </Button>
        </View>
      );
    if (error)
      return (
        <View>
          <Text>{error}</Text>
          <Button
            title="Retry"
            onPress={() => this.props.loadInitialSleeps(token)}
          />
        </View>
      );
    return (
      <Container>
        <View style={styles.container}>
          <Button
            style={{ position: "absolute", right: 0 }}
            onPress={() => this.props.navigation.navigate(routes.ADD_SLEEP)}
          >
            <Icon name="plussquareo" size={50} />
          </Button>

          <Button onPress={() => this.props.navigation.goBack()}>
            <Icon name="arrowleft" size={50} />
          </Button>
          <FlatList
            data={sleeps}
            renderItem={({ item }) => (
              <SleepsItem
                sleep={item}
                token={this.props.token}
                navigation={this.props.navigation}
                onPressNavigateUpdate={this.onPressNavigateUpdate}
                passHoursMinutesAndID={this.props.passHoursMinutesAndID}
              />
            )}
            keyExtractor={(hours, index) => index.toString()}
            deleteSleep={this.props.deleteSleep}
          />
        </View>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sleeps: state.sleep.sleeps,
    loading: state.sleep.loading,
    error: state.sleep.error,
    token: state.people.token,
    user: state.people._id,
  };
};

export default connect(mapStateToProps, actions)(SleepsHome);
