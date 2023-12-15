import React, { useState, useContext } from 'react';
import userContext from './userContext';
import FormData from "form-data";
import { useNavigate } from 'react-router-dom';
import Alert from './Alert';
import { Card, CardBody } from "reactstrap";

import "./ListingForm.css";

/** Renders Form for adding a listing.
 *
 * Props:
 * - upload(): function that adds listing to database (from parent).
 *
 * State:
 * - listingData: { title, description, price, location, listedBy }
 * - fileData: { photofile }
 * - formErrors: ["errors", ...]
 *
 * RoutesList -> ListingForm
 */

function ListingForm({ upload }) {
  const navigate = useNavigate();

  const { currentUser } = useContext(userContext);
  const [listingData, setListingData] = useState({
    title: "",
    description: "",
    price: 0,
    location: "",
    listedBy: currentUser.user.username
  });
  const [fileData, setFileData] = useState(null);
  const [formErrors, setFormErrors] = useState([]);

  /** Update filedata input */
  function handleFileChange(evt) {
    setFileData(evt.target.files[0]);
  }

  /** Update formData inputs */
  function handleChange(evt) {
    const { name, value } = evt.target;

    setListingData(fData => ({
      ...fData,
      [name]: value
    }));
  }

  /** Handles submit event. Calls on parent function to add listing to database.
   *
   * If data is bad, throws error.
   */

  async function handleSubmit(evt) {
    evt.preventDefault();

    try {
      const form = new FormData();

      form.append("photoFile", fileData);
      form.append("title", listingData.title);
      form.append("description", listingData.description);
      form.append("price", listingData.price);
      form.append("location", listingData.location);
      form.append("listedBy", listingData.listedBy);

      await upload(form);
      navigate("/listings");
    } catch (err) {
      let errors = err.message;
      setFormErrors(errors);
    }
  }

  return (
    <div className="ListingForm">
      <Card className="ListingForm-card">
        <CardBody>
          <h2>Add Listing</h2>
          <form onSubmit={handleSubmit}>
            <div className="ListingForm-title">
              <label htmlFor="title" className="form-label">Title</label>
              <input
                name="title"
                value={listingData.title}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="ListingForm-description">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                name="description"
                value={listingData.description}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="ListingForm-price">
              <label htmlFor="price" className="form-label">Price</label>
              <input
                name="price"
                value={listingData.price}
                onChange={handleChange}
                className="form-control"
                type="number"
                required
              />
            </div>
            <div className="ListingForm-location">
              <label htmlFor="location" className="form-label">Location</label>
              <input
                name="location"
                value={listingData.location}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="ListingForm-photoFile">
              <label htmlFor="photoFile" className="form-label">Photo:</label>
              <input
                name="photoFile"
                type="file"
                onChange={handleFileChange}
              />
            </div>
            <div className="ListingForm-listedBy">
              <label htmlFor="listedBy" className="form-label">Listed By</label>
              <input
                name="listedBy"
                value={listingData.listedBy}
                className="form-control"
                disabled
              />
            </div>
            <button className="btn btn-success">Submit</button>
          </form>
        </CardBody>
      </Card>
      <div>
        {formErrors.length !== 0 && <Alert messages={formErrors} type={"danger"} />}
      </div>
    </div>
  );


}

export default ListingForm;