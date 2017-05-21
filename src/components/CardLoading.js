import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import {
  Card,
  CardText
} from 'material-ui/Card';

const CardLoading = () => (
  <Card className="location-card">
    <CardText style={{ textAlign: 'center' }}>
      <CircularProgress />
    </CardText>
  </Card>
);

export default CardLoading;
