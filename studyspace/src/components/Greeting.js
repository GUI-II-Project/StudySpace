import React from "react";

class Greeting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTime: new Date(), // new Date gets current system time
        };
    }

    componentDidMount() {
        // update the clock every second by getting the system clock
        this.timerID = setInterval(() => {
            this.setState({ currentTime: new Date() });
        }, 1000);
    }

    // just clears the timer before the component leaves the DOM
    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    // picks the greeting based on the time of day
    getGreeting() {
        const hour = this.state.currentTime.getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 18) return "Good Afternoon";
        return "Good Evening";
    }

    // format time as h:mm:ss
    formatTime(date) {
        let hours = date.getHours() % 12; // converts from 24 hour to 12 hour
        hours = hours || 12; // convert 0 to 12
        const minutes = date.getMinutes().toString().padStart(2, "0"); // ensures 2 digits
        // for seconds if we want to
        // const seconds = date.getSeconds().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
    }

    render() {
        const { currentTime } = this.state;

        // getDay returns the current day of the week as an integer
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        // getMonth also returns as an integer
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        // gets all 
        const dayName = dayNames[currentTime.getDay()];
        const monthName = monthNames[currentTime.getMonth()];
        const day = currentTime.getDate(); // returns day of the month
        const year = currentTime.getFullYear(); // returns four-digit year

        return (
            <div>
                <div id="greeting">
                    {this.getGreeting()}, Quackington
                </div>
                <div id="time">
                    {this.formatTime(currentTime)}
                </div>
                <div id="date">
                    {dayName}, {monthName} {day}, {year}
                </div>
            </div>
        );
    }
}

export default Greeting;
