import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import * as actions from "../../../../actions";
import {
  Content,
  Item,
  Input,
  Container,
  Button
} from "native-base";
import {routes} from "../../../navigation_new/app-routes"
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

class AddNutrition extends Component {
  onPressAddNutrition() {
    const { protein, carbohydrate, fats } = this.props;
    this.props.createNutrition({
      protein,
      carbohydrate, 
      fats,
      token: this.props.token
    });
    this.props.navigation.navigate(routes.NUTRITION_HOME);
 
  }

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Container>
          <View style={styles.form}>
            <Text>Add Nutrition</Text>

            <Content>
              <Item
                rounded
                style={styles.textFieldStyle}
                value={this.props.protein}
              >
                <Input
                  placeholder={"How much protein?"}
                  onChangeText={(value) =>
                    this.props.formUpdateNutrition({
                      prop: "protein",
                      value,
                    })
                  }
                />
              </Item>
              <Item
                rounded
                style={styles.textFieldStyle}
                value={this.props.carbohydrate}
              >
                <Input
                  placeholder={"How much carbohydrates?"}
                  onChangeText={(value) =>
                    this.props.formUpdateNutrition({
                      prop: "carbohydrate",
                      value,
                    })
                  }
                />
              </Item>
              <Item
                rounded
                style={styles.textFieldStyle}
                value={this.props.fats}
              >
                <Input
                  placeholder={"How much fats"}
                  onChangeText={(value) =>
                    this.props.formUpdateNutrition({
                      prop: "fats",
                      value,
                    })
                  }
                />
              </Item>
              <Button
                block
                rounded
                title="Finish"
                style={styles.btnStyle}
                onPress={this.onPressAddNutrition.bind(this)}
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
    const { protein ,carbohydrate, fats  } = state.nutrition;
    return { protein, carbohydrate, fats, token: state.people.token };
};

export default connect(mapStateToProps, actions)(AddNutrition);
