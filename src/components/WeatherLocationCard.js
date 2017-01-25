import React from 'react';

import FlatButton from 'material-ui/FlatButton';
import {
  Card,
  CardActions,
  CardHeader,
  CardTitle,
  CardText
} from 'material-ui/Card';

const cardStyles = {
  width: 300,
  display: 'inline-block',
  margin: '0 10px 10px'
};

const WeatherLocationCard = () => (
  <Card style={cardStyles}>
    <CardTitle title="City" subtitle="Something" />
    <CardText>
      Temps here
    </CardText>
    <CardActions>
      <FlatButton label="Refresh" />
      <FlatButton label="Remove" />
    </CardActions>
  </Card>
);

export default WeatherLocationCard;
