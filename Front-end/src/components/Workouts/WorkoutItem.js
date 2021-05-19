import React from 'react';
import {
 
  StyleSheet,

} from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Button,
  Right,
} from "native-base";
import {connect} from 'react-redux';
import {getTheme} from 'react-native-material-kit';
import * as actions from '../../actions';
import Icon from "react-native-vector-icons/AntDesign";

const theme = getTheme();

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
  },
  title: {
    top: 20,
    left: 80,
    fontSize: 24,
  },
  image: {
    height: 100,
  },
  action: {
    backgroundColor: "black",
    color: "white",
  },
  icon: {
    position: "absolute",
    top: 15,
    left: 0,
    backgroundColor: "#5DB075",
  },

});

const WorkoutItem = (props) => {
  return (
    <Content>
      <Card>
        <CardItem header>
          <Text>Date Created: {props?.workout?.created_date}</Text>
        </CardItem>
        <CardItem>
          <Body>
            <Text>{props?.workout?.workout_name}</Text>
          </Body>
        </CardItem>
        <CardItem footer>
          <Button
            transparent
            style={{ color: "#5DB075" }}
            onPress={() => props.deleteWorkout(props.token, props.workout._id)}
          >
            <Icon
              style={{ color: "#5DB075" }}
              name="delete"
              size={40}
            />
          </Button>
        </CardItem>
      </Card>
    </Content>
  );
};

export default connect(null, actions)(WorkoutItem);
