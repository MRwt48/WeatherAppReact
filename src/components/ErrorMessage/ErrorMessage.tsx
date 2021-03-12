import React from "react";
import styles from "./ErrorMessage.module.css";

const ErrorMessage = () => {
  return (
    <div className={styles.errorWrapper}>
      <h3>Error</h3>
      <p>
        An error occurred while servicing your request. <br />
      </p>
      You can try the following to resolve the error:
      <ul>
        <li>Please check your internet connection.</li>
        <li>
          If you have denied the location permission, please allow it in the
          settings and refresh the page
        </li>
        <li>
          If the location is allowed, there might be some issue from our side.
          Please try again later.
        </li>
      </ul>
      <strong>You can still use the search bar to search for locations.</strong>
    </div>
  );
};

export default ErrorMessage;
