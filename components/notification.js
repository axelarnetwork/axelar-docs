import { Component, useEffect, useState } from "react";

let shimmedLocalStorage =
  typeof window !== "undefined" ? window.localStorage : {};

export class Notification extends Component {
  notifications = [
    {
      key: "dev-survey-2022",
      html: (
        <div>
          Make your voice heard in our{" "}
          <b>
            <a href="https://bit.ly/axelar-developer-2022">1 minute survey</a>
          </b>
          !
        </div>
      ),
      start: "2022-12-12T08:00:00Z",
      end: "2023-01-12T08:00:00Z",
    },
  ];

  // Find the first notification we should be rendering right now
  notification = this.notifications.find((item) => {
    const now = new Date();
    const start = new Date(item.start);
    const end = new Date(item.end);
    if (now >= start && now <= end) {
      return true;
    }
    return false;
  });
  key = this.notification.key;

  constructor(props) {
    super(props);
    this.state = {status: 'seen'};


    if (this.notification) {
      console.log("found a valid notification");
      let state = shimmedLocalStorage[`notification-${this.key}`];
      this.state = {status: state};
      console.log("notification state is ", state);
      if (!state) {
        shimmedLocalStorage[`notification-${this.key}`] = "seen";
        this.state = {status: 'seen'};
        // ((prevState) => ({ status: "seen" }));
      } else if (state === "seen") {
        // Show it without transition
        //   getStyleBox.maxHeight = "100px";
        //   getStyleBox.transition = "none";
      } else {
        //console.log("state didn't match",state);
      }
    }
  }

  close = () => {
    // state =
    shimmedLocalStorage[`notification-${this.key}`] = "dismissed";
    this.setState((prevState) => ({ status: "dismissed" }));
    // getStyleBox.maxHeight = "0";
    //  = { "max-height": "0" };
  };

  render() {
    console.log(this.state,'Is my state');
    return this.notification ? (
      <div
        id="notification"
        style={{
          maxHeight: this.state.status === "dismissed" ? "0" : "100px",
        }}
      >
        <div className="notification-info">
          <span id="notification-close" onClick={this.close}>
            X
          </span>
          <span className="notification-text">{this.notification.html}</span>
        </div>
      </div>
    ) : null;
  }
}
