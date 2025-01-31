import React from "react";
import { Card, Header, Icon, Image } from "semantic-ui-react";
// Import CountUp for IPK



const AttendanceCardgu = ({ title, value, children, type }) => {
  return (
    <Card className={type === "student" ? "student-card" : ""}>
      <Card.Content>
        <Header as="h3">
          {title}
          <Icon name="random" style={{ float: "right" }} />
        </Header>
        <Card.Description>
          {value}
          {children}
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default AttendanceCardgu;
