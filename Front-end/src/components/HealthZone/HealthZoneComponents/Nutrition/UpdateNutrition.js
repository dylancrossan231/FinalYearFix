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

class UpdateNutrition extends Component {
  onPressUpdateNutrition() {
    const { protein, carbohydrate, fats } = this.props;
    this.props.updateNutrition({
      protein,
      carbohydrate,
      fats,
      token: this.props.token,
      id: this.props.updateId,
    });
    this.props.navigation.navigate(routes.NUTRITION_HOME);
  }

  render() {
    const { protein, carbohydrate, fats } = this.props;
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Container>
          <View style={styles.form}>
            <Text>Update Nutrition</Text>

            <Content>
              <Item rounded style={styles.textFieldStyle}>
                <Input
                  value={protein.toString()}
                  onChangeText={(value) =>
                    this.props.formUpdateNutrition({
                      prop: "protein",
                      value,
                    })
                  }
                  placeholder="Enter your protein"
                />
              </Item>
              <Item rounded style={styles.textFieldStyle}>
                <Input
                  value={carbohydrate.toString()}
                  onChangeText={(value) =>
                    this.props.formUpdateNutrition({
                      prop: "carbohydrate",
                      value,
                    })
                  }
                  placeholder="Enter your carbohydrate"
                />
              </Item>
              <Item rounded style={styles.textFieldStyle}>
                <Input
                  value={fats.toString()}
                  onChangeText={(value) =>
                    this.props.formUpdateNutrition({
                      prop: "fats",
                      value,
                    })
                  }
                  placeholder="Enter your fats"
                />
              </Item>
              <Button
                block
                rounded
                title="Update"
                style={styles.btnStyle}
                onPress={this.onPressUpdateNutrition.bind(this)}
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
  const { protein,carbohydrate,fats, updateId } = state.nutrition;
  return { protein, carbohydrate, fats, updateId, token: state.people.token };
};

export default connect(mapStateToProps, actions)(UpdateNutrition);
