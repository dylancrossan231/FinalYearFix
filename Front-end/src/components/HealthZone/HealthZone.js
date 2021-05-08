import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { Container, Header, Content, Card, CardItem, Text, Body, Button } from 'native-base';
import {routes} from "../navigation_new/app-routes"
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
class HealthZone extends Component {
    
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name={"archive"} size={50} color={tintColor} />
    ),
  };
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Card>
            <CardItem header>
              <Text>Calorie Tracking</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Button
                  block
                  rounded
                  title="Calorie Tracking"
                  style={styles.btnStyle}
                >
                  <Text>Calorie Zone</Text>
                </Button>
              </Body>
            </CardItem>
          </Card>
        </Content>
        <Content>
          <Card>
            <CardItem header>
              <Text>Sleep Zone</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Button
                  block
                  rounded
                  title="Sleep Zone"
                  style={styles.btnStyle}
                  onPress={() =>
                    this.props.navigation.navigate(routes.SLEEP_HOME)
                  }
                >
                  <Text>Sleep Zone</Text>
                </Button>
              </Body>
            </CardItem>
          </Card>
        </Content>
        <Content>
          <Card>
            <CardItem header>
              <Text>Weight Tracking</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Button
                  block
                  rounded
                  title="Weight Zone"
                  style={styles.btnStyle}
                  onPress={() =>
                    this.props.navigation.navigate(routes.WEIGHTS_HOME)
                  }
                >
                  <Text>Weight Tracking</Text>
                </Button>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

export default connect(null, actions)(HealthZone);
