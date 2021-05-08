import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/EvilIcons';
import * as actions from '../../actions';
import {Container, Header, Content, Item, Input, Button} from 'native-base';


const styles = StyleSheet.create({
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


let Image_Http_URL ={ uri: 'https://avatars.githubusercontent.com/u/1250478?s=400&u=a3d8c44bcef6911a6905c60c10daaa463cb8a520&v=4'};


class AddPerson extends Component {
    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icon name={'plus'} size={50} color={tintColor} />
        )
    }

    onAddPress() {
        const {email, password} = this.props;

        this.props.createNewContact({email, password});
        this.props.navigation.navigate('Login');
    }

    render() {
        return (
        <Container>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.form}>
              <Text style= {styles.titleStyle}>Register</Text>

              <Content>
                <Image source={Image_Http_URL} style={{height: 150, width: 150, resizeMode: 'stretch'}} />
                <Item
                  rounded
                  style={styles.textFieldStyle}
                  placeholder={'Email...'}
                  value={this.props.email}>
                  <Input
                    onChangeText={(value) =>
                      this.props.formUpdate({prop: 'email', value})
                    }
                    placeholder="Email Address"
                  />
                </Item>
              </Content>
              <Content>
                <Item
                  rounded
                  style={styles.textFieldStyle}
                  placeholder={'Password'}
                  value={this.props.password}>
                  <Input
                    onChangeText={(value) =>
                      this.props.formUpdate({prop: 'password', value})
                    }
                    placeholder="Password"
                  />
                </Item>
              </Content>

              <View style={styles.addButton}>
                <Button
                  block
                  rounded
                  title="Register"
                  style={styles.btnStyle}
                  onPress={this.onAddPress.bind(this)}>
                  <Text style={styles.btnText}>Register</Text>
                </Button>
              </View>
            </View>
          </ScrollView>
        </Container>

        );
    }
}

const mapStateToProps = state => {
    const {email, password} = state.people;
    return {email, password };
}

export default connect(mapStateToProps, actions)(AddPerson);
