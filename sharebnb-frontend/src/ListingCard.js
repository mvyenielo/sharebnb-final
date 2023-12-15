import React from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import "./ListingCard.css";

/**
 * ListingCard:
 *
 * renders listing on ListingList page with link available for more details
 *
 * Props:
 * - listing object with all details about listing
 *  {title:..., }
 *
 */

function ListingCard({ listing }) {
  return (
    <Card className="ListingCard card">
      <CardBody className="card-body">
        <img src={listing.photoUrl} width="400px" />
        <CardTitle><h3>{listing.title}</h3></CardTitle>
        <CardText>{listing.location}</CardText>
        <CardText>${listing.price}</CardText>
      </CardBody>
    </Card>
  );
}

export default ListingCard;