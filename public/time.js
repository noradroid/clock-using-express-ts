const timeChars = ["0", "0", ":", "0", "0", ":", "0", "0"];

const yearInString = (year) => {
  return year;
};
const monthInString = (month) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[month];
};
const dayInString = (day) => {
  return day;
};
const hoursInString = (hours) => {
  if (hours < 10) {
    return "0" + String(hours);
  } else {
    return String(hours);
  }
};
const minutesInString = (minutes) => {
  if (minutes < 10) {
    return "0" + String(minutes);
  } else {
    return String(minutes);
  }
};
const secondsInString = (seconds) => {
  if (seconds < 10) {
    return "0" + String(seconds);
  } else {
    return String(seconds);
  }
};

const updateTime = () => {
  const date = new Date();
  const timeStr =
    hoursInString(date.getHours()) +
    ":" +
    minutesInString(date.getMinutes()) +
    ":" +
    secondsInString(date.getSeconds());
  for (let i = 0; i < timeStr.length; ++i) {
    timeChars[i] = timeStr.charAt(i);
    document.getElementById("t".concat(String(i))).innerHTML = timeChars[i];
  }
  document.getElementById("date").innerHTML =
    "<i>" +
    monthInString(date.getMonth()) +
    " " +
    dayInString(date.getDate()) +
    " " +
    yearInString(date.getFullYear()) +
    "</i>";
  document.title = "Current time: " + timeStr.substring(0, 5);
};

updateTime();

const interval = setInterval(() => updateTime(), 1000);
