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
  onPressNavigateUpdate(weight, id, props) {
    props.passWeightAndID({weight: weight, id: id})
    props.navigation.navigate(routes.UPDATE_WEIGHT)
  }

  componentDidMount() {
    // this.props.navigation.dangerouslyGetParent().setOptions({
    //   tabBarVisible: true,
    // });
    this.props.loadInitialWeights(this.props.token,this.props.user);
  }

  render() {
    const { error, weights } = this.props;
    if (!error && weights.length === 0)
      return (
        <View>
          <Button
            transparent
            styles={{ textAlign: "right" }}
            onPress={() => this.props.navigation.goBack()}
          >
            <Icon style={{ color: "#5DB075" }} name="arrowleft" size={50} />
          </Button>

          <Text>You have no weights yet</Text>
          <Button
            transparent
            style={{ position: "absolute", right: 0 }}
            onPress={() => this.props.navigation.navigate(routes.ADD_WEIGHT)}
          >
            <Icon style={{ color: "#5DB075" }} name="plussquareo" size={50} />
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
      <Container>
        <View style={styles.container}>
          <Button
            transparent
            style={{ position: "absolute", right: 0 }}
            onPress={() => this.props.navigation.navigate(routes.ADD_WEIGHT)}
          >
            <Icon style={{ color: "#5DB075" }} name="plussquareo" size={50} />
          </Button>

          <Button transparent onPress={() => this.props.navigation.goBack()}>
            <Icon style={{ color: "#5DB075" }} name="arrowleft" size={50} />
          </Button>
          <FlatList
            data={weights}
            renderItem={({ item }) => (
              <WeightsItem
                weight={item}
                token={this.props.token}
                navigation={this.props.navigation}
                onPressNavigateUpdate={this.onPressNavigateUpdate}
                passWeightAndID={this.props.passWeightAndID}
              />
            )}
            keyExtractor={(weight, index) => index.toString()}
            deleteWeight={this.props.deleteWeight}
          />
        </View>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    weights: state.weight.weights,
    loading: state.weight.loading,
    error: state.weight.error,
    token: state.people.token,
    user: state.people._id
  };
};

export default connect(mapStateToProps, actions)(WeightsHome);
