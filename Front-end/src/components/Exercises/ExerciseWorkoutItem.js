import React from "react";
import { View, StyleSheet, Image, FlatList } from "react-native";
import { connect } from "react-redux";
import { ColoredRaisedButton, getTheme } from "react-native-material-kit";
import Icon from "react-native-vector-icons/EvilIcons";
import * as actions from "../../actions";
import { Text, Button,Label,Input,Form,Content,Item } from "native-base";
import { render } from "react-dom";
import log from "react-native-log-to-file";

const theme = getTheme();

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
const ExerciseWorkoutItem = (props) => {
  console.log(props)
  const exerciseArrayIndex = props.workoutExercises.findIndex(
    (item) => item.exercise === props.workoutExercise.exercise
  );

  const generateHandleChangeOnReps=(index)=>(val)=>{ 
    
    props.formUpdateWorkoutRep({
      prop: [exerciseArrayIndex,index],
      value: val,
    });

  }
    const generateHandleChangeOnWeights = (index) => (val) => {
      

      props.formUpdateWorkoutWeight({
        prop: [exerciseArrayIndex, index],
        value: val,
      });
    };
const mapThroughArray = (index) => (val) => {

        props.formUpdateWorkoutWeight({
          prop: [exerciseArrayIndex, index],
          value: val,
        });
};

  return (
    <View style={[theme.cardStyle, styles.card]} >
      {props.workoutExercise.sets.map((setItem, index) => {
        return (
          <Content>
            <Text style={{ paddingBottom: 0 }}>
              {" "}
              {props.workoutExercise.exercise_name}
            </Text>
            <Form style={{ flexDirection: "row" }} key={index}>
              <Content>
                <Item rounded style={styles.textFieldStyle}>
                  <Input disabled style={{ textAlign: "center" }}>
                    Set: {index + 1}
                  </Input>
                </Item>
              </Content>
              <Content>
                <Item
                  rounded
                  style={styles.textFieldStyle}
                  placeholder={"rep field"}
                  value=""
                >
                  <Label htmlFor={index}>
                    <Text>Reps</Text>
                  </Label>
                  {console.log(
                    props.workoutExercises[exerciseArrayIndex].sets[index].rep
                  )}
                  <Input
                    type="text"
                    name={index}
                    data-id={index}
                    id={index}
                    className="rep"
                    value={
                      props.workoutExercises[exerciseArrayIndex].sets[index].rep
                    }
                    onChangeText={generateHandleChangeOnReps(index)}
                  />
                </Item>
              </Content>
              <Content>
                <Item
                  rounded
                  style={styles.textFieldStyle}
                  placeholder={"weight field"}
                  value=""
                >
                  <Label htmlFor={index}>
                    <Text>Weight</Text>
                  </Label>
                  <Input
                    type="text"
                    name={index}
                    data-id={index}
                    id={index}
                    className="weight"
                    value={
                      props.workoutExercises[exerciseArrayIndex].sets[index].weight
                    }
                    onChangeText={generateHandleChangeOnWeights(index)}
                  />
                </Item>
              </Content>
            </Form>
          </Content>
        );
      })}
      <Button
        block
        rounded
        title="Add Set"
        style={styles.btnStyle}
        onPress={() => props.addSet(props.workoutExercise.exercise)}
      >
        <Text>Add Set</Text>
      </Button>
    </View>
  );
};

export default connect(null, actions)(ExerciseWorkoutItem);


