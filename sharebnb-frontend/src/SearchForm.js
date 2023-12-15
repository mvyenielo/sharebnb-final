import React, { useState } from "react";

/** Renders search form for listings.
 *
 * Props:
 * - searchTerm: string inputted from data.
 *
 * ListingList -> SearchForm
 */
function SearchForm({ search }) {
  const [searchTerm, setSearchTerm] = useState("");

  /** Updates search input value */
  function handleChange(evt) {
    setSearchTerm(evt.target.value);
  }

  /** call parent filter function with current search term value. */
  function handleSubmit(evt) {
    evt.preventDefault();

    search(searchTerm);
  }

  //TODO: if no matches, return an element that tells user there are no matches.
  return (
    <div className="SearchForm mt-3 w-50">
      <form className="d-flex" onSubmit={handleSubmit}>
        <input
          className="form-control mx-3"
          placeholder="Enter Location..."
          onChange={handleChange}
          value={searchTerm}
        />
        <div>
          <button className="btn btn-success mt-2">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
