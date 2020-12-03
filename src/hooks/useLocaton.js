import { useState, useEffect } from "react";
import {
  Accuracy,
  requestPermissionsAsync,
  watchPositionAsync,
} from "expo-location";

export default (shouldTrack, callback) => {
  const [err, setErr] = useState(null);
  // const [subscriber, setSubscriber] = useState(null);
  let subscriber = "";

  useEffect(() => {
    const startWacthing = async () => {
      try {
        await requestPermissionsAsync();
        subscriber = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 10,
          },
          // (location) => {
          //   addLocation(location);
          // }
          callback
        );
        // setSubscriber(sub);
        subscriber = null;
      } catch (e) {
        setErr(e);
      }
    };

    if (shouldTrack) {
      startWacthing();
    } else {
      // stop watching
      if (subscriber) {
        subscriber.remove();
      }
      // setSubscriber(null);
      subscriber = null;
    }

    return () => {
      if (subscriber) {
        subscriber.remove();
      }
    };
  }, [shouldTrack, callback, subscriber]);

  return [err];
};
