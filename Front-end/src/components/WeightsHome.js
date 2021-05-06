import React, { Component } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { connect } from "react-redux";
import * as actions from "../actions";
import {routes} from "./navigation_new/app-routes"
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Button,
  Icon
  
} from "native-base";
import WeightsItem from "./WeightsItem";


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
class WeightsHome extends Component {
  componentDidMount() {
    // this.props.navigation.dangerouslyGetParent().setOptions({
    //   tabBarVisible: true,
    // });
    this.props.loadInitialWeights(this.props.token);
  }
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name={"archive"} size={50} color={tintColor} />
    ),
  };
  render() {
    const { error, weights } = this.props;
    if ((!error && weights.length === 0))
      return (
        <View>
          <Button onPress={() => this.props.navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
          <Text>You have no weights yet</Text>
          <Button onPress={() => this.props.navigation.navigate(routes.ADD_WEIGHT)}>
            <Icon name="arrow-forward" />
          </Button>
        </View>
      );
          if (error)
            return (
              <View>
                <Text>{error}</Text>
                <Button
                  title="Retry"
                  onPress={() => this.props.loadInitialWorkouts(token)}
                />
              </View>
            );
    return (
      <View style={styles.container}>
        <Button
          onPress={() => this.props.navigation.navigate(routes.ADD_WEIGHT)}
        >
          <Icon name="arrow-forward" />
        </Button>
        <Button onPress={() => this.props.navigation.goBack()}>
          <Icon name="arrow-back" />
        </Button>
        <FlatList
          data={weights}
          renderItem={({ item }) => (
            <WeightsItem weights={item} token={this.props.token} />
          )}
          keyExtractor={(weight, index) => index.toString()}
          deleteWeight={this.props.deleteWeight}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    weights: state.weight.weights,
    loading: state.weight.loading,
    error: state.weight.error,
    token: state.people.token,
  };
};

export default connect(mapStateToProps, actions)(WeightsHome);
