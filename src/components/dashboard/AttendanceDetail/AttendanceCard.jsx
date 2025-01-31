import React from "react";
import { Card, Header, Icon } from "semantic-ui-react";

const AttendanceCard = ({ subject, present, absent, excused }) => {
  return (
    <Card>
      <Card.Content>
        <Header as="h3">
          {subject}
          <Icon name="random" style={{ float: "right" }} />
        </Header>
        <Card.Description>
          <p>
            <strong>Hadir:</strong> {present} kali
          </p>
          <p>
            <strong>Tidak Hadir:</strong> {absent} kali
          </p>
          <p>
            <strong>Izin:</strong> {excused} kali
          </p>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default AttendanceCard;