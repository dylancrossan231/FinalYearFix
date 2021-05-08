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




class UpdateSleeps extends Component {

  onPressUpdateSleep() {
    const { hours,minutes } = this.props;

    this.props.updateSleep({
      minutes,
      hours,
      token: this.props.token,
      id: this.props.updateId,
    });
    this.props.navigation.navigate(routes.SLEEP_HOME);
  }

  render() {
    const{hours,minutes} = this.props;
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Container>
          <View style={styles.form}>
            <Text>Update Sleep</Text>

            <Content>
              <Item rounded style={styles.textFieldStyle}>
                <Input
                  value={hours.toString()}
                  onChangeText={(value) =>
                    this.props.formUpdateSleep({
                      prop: "hours",
                      value,
                    })
                  }
                  placeholder="Enter your Hours"
                />
              </Item>
              <Item rounded style={styles.textFieldStyle}>
                <Input
                  value={minutes.toString()}
                  onChangeText={(value) =>
                    this.props.formUpdateSleep({
                      prop: "minutes",
                      value,
                    })
                  }
                  placeholder="Enter your Minutes"
                />
              </Item>
              <Button
                block
                rounded
                title="Update"
                style={styles.btnStyle}
                onPress={this.onPressUpdateSleep.bind(this)}
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
  const { hours,minutes, updateId } = state.sleep;
  return { hours,minutes, updateId, token: state.people.token };
};

export default connect(mapStateToProps, actions)(UpdateSleeps);
