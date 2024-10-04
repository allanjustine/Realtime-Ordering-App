import Echo from "laravel-echo";
import Pusher from "pusher-js";
import Cookies from "js-cookie";

const token = Cookies.get("APP-TOKEN");

window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: process.env.REACT_APP_BROADCAST_CONNECTION,
  key: process.env.REACT_APP_PUSHER_APP_KEY,
  cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER,
  forceTLS: true,
  authEndpoint: process.env.REACT_APP_AUTH_END_POINT,
  auth: {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  },
});

export default echo;
