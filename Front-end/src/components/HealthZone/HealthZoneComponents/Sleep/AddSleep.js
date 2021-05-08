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

class AddSleep extends Component {
  onPressAddSleep() {
    const { hours, minutes } = this.props;
    this.props.createNewSleep({
      hours,
      minutes,

      token: this.props.token,
    });
    this.props.navigation.navigate(routes.SLEEP_HOME);
 
  }

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Container>
          <View style={styles.form}>
            <Text>Add a new Sleep</Text>
            
            <Content>
              <Item
                rounded
                style={styles.textFieldStyle}
                value={this.props.hours}
              >
                <Input
                  placeholder={"How Many hours of sleep did you get ?"}
                  onChangeText={(value) =>
                    this.props.formUpdateSleep({
                      prop: "hours",
                      value,
                    })
                  }
                />
              </Item>
              <Item
                rounded
                style={styles.textFieldStyle}
                value={this.props.minutes}
              >
                <Input
                  placeholder={"How Many hours of sleep did you get ?"}
                  onChangeText={(value) =>
                    this.props.formUpdateSleep({
                      prop: "minutes",
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
                onPress={this.onPressAddSleep.bind(this)}
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
    const { hours ,minutes  } = state.sleep;
    return { hours ,minutes  ,token: state.people.token};
};

export default connect(mapStateToProps, actions)(AddSleep);
