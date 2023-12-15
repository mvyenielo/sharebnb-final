import React from "react";


/** Alert: component that renders error/success messages.
 *
 * Props:
 * - errors: [msg, msg, ....]
 * - type: danger or success (depending on success or error)
 *
 * { LoginForm, SignupForm } -> Alert
 */
function Alert({ messages, type }) {

  return (
    <div className={`alert alert-${type}`}>
      {Array.isArray(messages)
        ? messages.map((err, i) => {
          return (
            <p key={i}>{err}</p>
          );
        })
        : <p>{messages}</p>}
    </div>
  );
}

export default Alert;