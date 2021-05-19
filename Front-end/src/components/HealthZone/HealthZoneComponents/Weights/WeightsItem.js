
import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {connect} from 'react-redux';
import {getTheme} from 'react-native-material-kit';
import * as actions from '../../../../actions';
import {
    Button,
  Container,
  Content,
  Header,
  Card,
  Body,
  CardItem,
  Text,
} from "native-base";
import {routes} from "../../../navigation_new/app-routes"
import Icon from "react-native-vector-icons/AntDesign";


const theme = getTheme();

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    
  },
  buttonSpacing:{
    marginLeft: 30,
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
    backgroundColor: 'black',
    color: 'white',
  },
  icon: {
    position: 'absolute',
    top: 15,
    left: 0,
    color: 'white',
    backgroundColor: 'rgba(255,255,255,0)',
  },
});

const WeightsItem = (props) => {
  
  return (
    <Content>
      <Card>
        <CardItem header>
          <Text>Date Created: {props.weight.created_date}</Text>
        </CardItem>
        <CardItem>
          <Body>
            <Text>{props.weight.weight} KG</Text>
          </Body>
        </CardItem>
        <CardItem footer>
          <Button transparent
            onPress={() => props.deleteWeight(props.token, props.weight._id)}
          >
            <Icon style={{ color: "#5DB075" }} name="delete" size={40} />
          </Button>
          <Button
            transparent
            style={styles.buttonSpacing}
            onPress={() =>
              props.onPressNavigateUpdate(
                props.weight.weight,
                props.weight._id,
                props
              )
            }
          >
            <Icon style={{ color: "#5DB075" }} name="edit" size={40} />
          </Button>
        </CardItem>
      </Card>
    </Content>
  );
};

export default connect(null, actions)(WeightsItem);
            