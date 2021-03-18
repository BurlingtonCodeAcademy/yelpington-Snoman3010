import { useEffect, useState } from "react";

function Restaurant(props) {
  const [restData, setRestData] = useState(null);
  const [commentsPage, setCommentsPage] = useState(0);
    //fetch restaurant data on load and on change
  useEffect(() => {
    if (!restData || restData.id !== props.restId) {
      fetch(`/api/${props.restId}`)
        .then((res) => res.json())
        .then((jsonRes) => {
          setRestData(jsonRes);
          //loop through locations list to find location of current restaurant and recenter map with new data
          props.locations.forEach((location) => {
            if (jsonRes.name === location.name) {
              props.mapObj.setView([location.lat, location.long], 18);
            }
          });
        });
    }
  });
  //functions for displaying different sections of the page
  //display basic restaurant data
  function dataToJSX() {
    if (restData) {
      return (
        <div id="data-display">
          <h4>{restData.name}</h4>
          <p>{restData.address + ", South Burlington, Vermont"}</p>
          <p>{"802-" + restData.phone}</p>
          <div>
            <p>Hours</p>
            <ul>
              <li>Monday: {restData.hours.mon}</li>
              <li>Tuesday: {restData.hours.tue}</li>
              <li>Wednesday: {restData.hours.wed}</li>
              <li>Thursday: {restData.hours.thu}</li>
              <li>Friday: {restData.hours.fri}</li>
              <li>Saturday: {restData.hours.sat}</li>
              <li>Sunday: {restData.hours.sun}</li>
            </ul>
          </div>
        </div>
      );
    } else {
      return "";
    }
  }
  //display up to 4 comments and enable/disable buttons to cycle through as needed
  function commentsDisplay() {
    if (restData) {
      let prevButton = false;
      let nextButton = false;
      //determine if buttons need to activate
      if (restData.notes.length > 4) {
        if (commentsPage > 0) {
          prevButton = true;
        }
        if (restData.notes.length > 4 * (commentsPage + 1)) {
          nextButton = true;
        }
      }
      //slice comments array to just comments displayed on current page
      let displayedComments = restData.notes.slice(
        commentsPage * 4,
        (commentsPage + 1) * 4
      );
      return (
        <div id="comments-display">
          <h4>Comments:</h4>
          <div id="comments-display-text">
            {displayedComments.map((comment, index) => {
                //map current comments array
              return <p key={index}>"{comment}"</p>;
            })}
          </div>
          <div id="comments-display-control">
              {/* set up buttons to adjust current page and use fancy unicode arrows */}
            <button
              disabled={!prevButton}
              onClick={() => setCommentsPage(commentsPage - 1)}
            >
              <b>{"\u2190"}</b>
            </button>
            <button
              disabled={!nextButton}
              onClick={() => setCommentsPage(commentsPage + 1)}
            >
              <b>{"\u2192"}</b>
            </button>
          </div>
        </div>
      );
    } else {
      return "";
    }
  }
  //set up form for new comments
  function newCommentForm() {
    if (restData) {
      return (
        <div id="new-comment-holder">
          <h4>Add a comment:</h4>
          <form method="POST" action={`/comment/${props.restId}`}>
            <input type="text" name="comment" />
            {/* create hidden input to send original json data to back end for updating */}
            <input
              name="jsonOriginal"
              value={JSON.stringify(restData)}
              style={{ display: "none" }}
            />
            <br />
            <input type="submit" value="Submit" />
          </form>
        </div>
      );
    } else {
      return "";
    }
  }
  //assemble page from section functions
  return (
    <div id="restaurant-display">
      {dataToJSX()}
      {commentsDisplay()}
      {newCommentForm()}
    </div>
  );
}

export default Restaurant;
