const BASE_URL = process.env.REACT_APP_BASE_URL;

/** Class for API methods. */

class SharebnbApi {
  /** user token stored in localStorage. */
  static token = localStorage.getItem("token");

  /** logins in user. { username, password } => { token } */

  static async login(user) {
    const { username, password } = user;
    const response = await fetch(`${BASE_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        })
      }
    );
    const tokenResponse = await response.json();

    this.token = tokenResponse.token;

    return this.token;
  }

  /** registers user.
   *
   *  { username, firstName, lastName, password, email, phone } => { token }
   */

  static async register(user) {
    const { username,
      firstName,
      lastName,
      password,
      email,
      phone } = user;

    const response = await fetch(`${BASE_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          firstName,
          lastName,
          password,
          email,
          phone
        })
      }
    );
    const tokenResponse = await response.json();

    this.token = tokenResponse.token;

    return this.token;
  }

  /** Grabs user data with username.
   *
   * Returns user object { username, firstName, lastName, password, email, phone }
   */

  static async getUser(username) {
    console.log("username in getUser", username);
    const response = await fetch(`${BASE_URL}/users/${username}`,
      {
        headers: {
          "authorization": this.token,
        }
      }
    );

    console.log("response in getUser", response);


    const user = await response.json();
    console.log(user);

    return user;
  }

  /** Grabs all listings from server.
   *
   * Returns [{ id, title, description, price, location, photoUrl, listedBy }, ...]
   */

  static async getListings(searchTerm) {
    let response, data;
    if (searchTerm) {
      let params = new URLSearchParams({ location: searchTerm }).toString();
      response = await fetch(`${BASE_URL}/listings?${params}`);
      data = await response.json();

    } else {
      response = await fetch(`${BASE_URL}/listings`);
      data = await response.json();
    }

    return data.listings;
  }

  /**
   * getListing:
   *
   * Makes fetch request for listing based on given id
   *
   * Returns listing
   *
   */

  static async getListing(id) {
    const response = await fetch(`${BASE_URL}/listings/${id}`);
    const data = await response.json();

    return data.listing;
  }


  /**
   * addListing: Posts data from form to API to create new listing
   *
   * Returns new listing
   *
   */

  static async addListing(formData) {

    const response = await fetch(`${BASE_URL}/listings/create`,
      {
        method: "POST",
        headers: {
          "authorization": this.token
        },
        body: formData,
      }
    );

    const data = await response.json();

    return data.listing;
  }
}


export default SharebnbApi;