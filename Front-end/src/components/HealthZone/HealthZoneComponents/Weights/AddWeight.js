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

class AddWeight extends Component {
  onPressAddWeight() {
    const { weight } = this.props;
    this.props.createNewWeight({
         weight,
      token: this.props.token,
    });
    this.props.navigation.navigate(routes.WEIGHTS_HOME);
 
  }

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Container>
          <View style={styles.form}>
            <Text>Add a new Weight</Text>

            <Content>
              <Item
                rounded
                style={styles.textFieldStyle}
                placeholder={"weight"}
                value={this.props.weight}
              >
                <Input
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
                title="Finish"
                style={styles.btnStyle}
                onPress={this.onPressAddWeight.bind(this)}
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
    const { weight  } = state.weight;
    return { weight  ,token: state.people.token};
};

export default connect(mapStateToProps, actions)(AddWeight);
