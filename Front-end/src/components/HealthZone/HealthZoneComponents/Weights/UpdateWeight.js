import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { connect } from "react-redux";
import * as actions from "../../../../actions";
import { Content, Item, Input, Container, Button } from "native-base";
import { routes } from "../../../navigation_new/app-routes";
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




class UpdateWeight extends Component {

  onPressUpdateWeight() {
    const { weight } = this.props;
    // const previousScreen = this.props.navigation.dangerouslyGetState().routes;
    // const id = previousScreen[2].params._id;
    console.log(weight, this.props.updateId, this.props.token);
    this.props.updateWeight({
      weight,
      token: this.props.token,
      id: this.props.updateId,
    });
    this.props.navigation.navigate(routes.WEIGHTS_HOME);
  }
  componentWillUnmount() {

    
    // let previousScreen = this.props.navigation.dangerouslyGetState().routes;
    // console.log(previousScreen);
    // const routeName = previousScreen[2].name;
    // console.log(routeName);
    // if (routeName === routes.UPDATE_WEIGHT) {
    //   console.log(JSON.stringify(previousScreen[2].params.weight));
    //   let value = JSON.stringify(previousScreen[2].params.weight);
    //   this.props.formUpdateWeight({ prop: "weight", value });

    // }
  }
  render() {
    const{weight} = this.props;
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Container>
          <View style={styles.form}>
            <Text>Update Weight</Text>

            <Content>
              <Item rounded style={styles.textFieldStyle}>
                <Input
                  value={weight.toString()}
                  onChangeText={(value) =>
                    this.props.formUpdateWeight({
                      prop: "weight",
                      value,
                    })
                  }
                  placeholder="Enter your Weight"
                />
              </Item>
              <Button
                block
                rounded
                title="Update"
                style={styles.btnStyle}
                onPress={this.onPressUpdateWeight.bind(this)}
              >
                <Text style={styles.btnText}>Finish</Text>
              </Button>
            </Content>
          </View>
        </Container>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  const { weight, updateId } = state.weight;
  return { weight, updateId, token: state.people.token };
};

export default connect(mapStateToProps, actions)(UpdateWeight);
