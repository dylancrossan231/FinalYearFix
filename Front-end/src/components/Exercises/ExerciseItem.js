import React from 'react';
import {
  View,
  StyleSheet,
  Image
} from 'react-native';
import {connect} from 'react-redux';
import {getTheme} from 'react-native-material-kit';
import Icon from 'react-native-vector-icons/EvilIcons';
import * as actions from '../../actions';
import {
  Text,
  Button,
  Content,
  Card,
  CardItem,
  Body,
  Container
} from "native-base";
import { render } from 'react-dom';

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
    color: "white",
    backgroundColor: "rgba(255,255,255,0)",
  },
  btnStyle: {
    
    backgroundColor: "#5DB075",
  },
  btnText: {
    color: "white",
  },
});

const ExerciseItem = (props) => {
  return (
    <View>
      {props.prevScreen === "ADDWORKOUT" ? (
        <Card>
          <CardItem header>
            <Text>Name:{props.exercises.exercise_name}</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>Instructions: {props.exercises.instructions}</Text>
              <Text>Instructions: {props.exercises.exercise_type}</Text>
            </Body>
          </CardItem>
          <CardItem footer></CardItem>
          <Button
            block
            rounded
            title="Add Exercise"
            style={styles.btnStyle}
            onPress={() =>
              props.navigation.navigate(
                "Main",
                { screen: "ADDWORKOUT" },
                props.addWorkoutExercises(
                  props.exercises.exercise_name,
                  props.exercises._id
                ),
                props.passFormElementsBackToAddWorkout(
                  props.workoutExercises,
                  props.workout_name
                )

              )
            }
          >
            <Text style={styles.btnText}> Add Exercise</Text>
          </Button>
        </Card>
      ) : (
        <Card>
          <CardItem header>
            <Text>Name:{props.exercises.exercise_name}</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>Instructions: {props.exercises.instructions}</Text>
              <Text>Instructions: {props.exercises.exercise_type}</Text>
            </Body>
          </CardItem>
          <CardItem footer></CardItem>
        </Card>
      )}
    </View>
  );
};

export default connect(null, actions)(ExerciseItem);
