import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SharebnbApi from "./api";
import { Card, CardBody } from "reactstrap";

import "./ListingDetail.css";

/** Renders component for a single listing.
 *
 * State:
 * - listing: { id, title, description, price, location, photoUrl, listedBy  }
 *
 * RoutesList -> ListingDetail
 */

function ListingDetail() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);

  useEffect(function getListingOnMount() {
    async function fetchListing() {
      try {
        const listingData = await SharebnbApi.getListing(id);
        setListing(listingData);
      } catch (err) {
        console.error(err);
      }
    }
    fetchListing();
  }, [id]);

  if (!listing) return <h1>Loading...</h1>;

  return (
    <div className="ListingDetail">
      <Card className="ListingDetail-card">
        <CardBody className="ListingDetail-body">
          <img src={listing.photoUrl} className="ListingDetail-img" width="500px" />
          <h2>{listing.title}</h2>
          <h4>{listing.location}</h4>
          <p>Host: {listing.listedBy}</p>
          <p>Price: ${listing.price}</p>
          <p>Description: {listing.description}</p>
        </CardBody>
        <div>
          <form>
            <h4>Message the host!</h4>
            <textarea />
            <div>
              <button className="btn btn-success">Send</button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );

}

export default ListingDetail;