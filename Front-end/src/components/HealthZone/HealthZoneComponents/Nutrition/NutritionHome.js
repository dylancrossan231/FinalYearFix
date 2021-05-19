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
import NutritionItem from "./NutritionItem";


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
class NutritionHome extends Component {
  onPressNavigateUpdate(protein,carbohydrate,fats, id, props) {
    props.passNutritionVariables({
      protein: protein,
      carbohydrate: carbohydrate,
      fats: fats,
      id: id,
    });
    props.navigation.navigate(routes.UPDATE_NUTRITION)
  }

  componentDidMount() {
    // this.props.navigation.dangerouslyGetParent().setOptions({
    //   tabBarVisible: true,
    // });
    this.props.loadInitialNutritions(this.props.token,this.props.user);
  }

  render() {
    const { error, nutritions } = this.props;
    if (!error && nutritions.length === 0)
      return (
        <View>
          <Button transparent
            styles={{ textAlign: "right" }}
            onPress={() => this.props.navigation.goBack()}
          >
            <Icon style={{ color: "#5DB075" }} name="arrowleft" size={50} />
          </Button>

          <Text>You have no nutrition recorded yet</Text>
          <Button transparent
            style={{ position: "absolute", right: 0 }}
            onPress={() => this.props.navigation.navigate(routes.ADD_NUTRITION)}
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
            onPress={() => this.props.loadInitialNutritions(token)}
          />
        </View>
      );
    return (
      <Container>
        <View style={styles.container}>
          <Button transparent
            style={{ position: "absolute", right: 0 }}
            onPress={() => this.props.navigation.navigate(routes.ADD_NUTRITION)}
          >
            <Icon style={{ color: "#5DB075" }} name="plussquareo" size={50} />
          </Button>

          <Button transparent onPress={() => this.props.navigation.goBack()}>
            <Icon style={{ color: "#5DB075" }} name="arrowleft" size={50} />
          </Button>
          <FlatList
            data={nutritions}
            renderItem={({ item }) => (
              <NutritionItem
                nutrition={item}
                token={this.props.token}
                navigation={this.props.navigation}
                onPressNavigateUpdate={this.onPressNavigateUpdate}
                passNutritionVariables={this.props.passNutritionVariables}
              />
            )}
            keyExtractor={(calories, index) => index.toString()}
            deleteNutrition={this.props.deleteNutrition}
          />
        </View>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    nutritions: state.nutrition.nutritions,
    loading: state.nutrition.loading,
    error: state.nutrition.error,
    token: state.people.token,
    user: state.people._id,
  };
};

export default connect(mapStateToProps, actions)(NutritionHome);
