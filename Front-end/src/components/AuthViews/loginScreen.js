import React, { Component } from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {Container, Header, Content, Item, Input ,Button} from 'native-base';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Icon from 'react-native-vector-icons/EvilIcons';
import {routes} from "../navigation_new/app-routes"

class loginScreen extends Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
        <Icon name={'plus'} size={50} color={tintColor} />
    )
}
  
  onLogin() {
    const { email, password } = this.props;
    this.props.login({ email, password});

            // this.props.navigation.navigate("Main", { screen: "HomeWorkout" });


  }

  render() {
        const { email, password } = this.props;

    return (
      <Container>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.form}>
            <Text style={styles.titleStyle}>Login</Text>

            <Content>
              <Item
                rounded
                style={styles.textFieldStyle}
                placeholder={"Email..."}
                value={email}
              >
                <Input
                  onChangeText={(value) =>
                    this.props.formUpdate({ prop: "email", value })
                  }
                  placeholder="Email Address"
                />
              </Item>
            </Content>
            <Content>
              <Item
                rounded
                style={styles.textFieldStyle}
                placeholder={"Password"}
                value={password}
              >
                <Input
                  onChangeText={(value) =>
                    this.props.formUpdate({ prop: "password", value })
                  }
                  placeholder="Password"
                />
              </Item>
            </Content>

            <View style={styles.addButton}>
              <Button
                block
                rounded
                title="Login"
                style={styles.btnStyle}
                onPress={this.onLogin.bind(this)}
              >
                <Text style={styles.btnText}>Login</Text>
              </Button>
            </View>
            <View style={styles.addButton}>
              <Button
                block
                rounded
                title="Register"
                style={styles.btnStyle}
                onPress={() => this.props.navigation.navigate(routes.SIGN_UP)}
              >
                <Text style={styles.btnText}>
                  Dont have an account? Sign Up here.
                </Text>
              </Button>
            </View>
          </View>
        </ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  useNativeDriver: true,

  form: {
    flex: 1,
    paddingTop: 50,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'space-between',
  },
  fieldStyles: {
    height: 40,
  },
  addButton: {
    marginTop: 40,
    color: '#5DB075',
  },
  btnStyle: {
    backgroundColor: '#5DB075',
  },
  btnText: {
    color: 'white',
  },
  textFieldStyle: {
    backgroundColor: '#F5F5F5',
    marginTop: 40,
  },
  titleStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 40,
  },
});

const mapStateToProps = state => {
    const { email ,password} = state.people;
    return {email ,password  };
}
export default connect(mapStateToProps, actions)(loginScreen);
