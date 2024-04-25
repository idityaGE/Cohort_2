import { atom, selector } from "recoil";
import axios from "axios";

export const notifications = atom({
    key: "networkAtom",
    default: selector({
        key: "networkSelector",
        get: async () => {
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, 5000);
            }); // sleep for 5 seconds
            console.log("fetching data...")
            const res = await axios.get("https://sum-server.100xdevs.com/notifications");
            return res.data;
        }
    })
});

// Api data:
// {
//     "network": 3,
//     "jobs": 3,
//     "messaging": 1,
//     "notifications": 5
// }


export const totalNotificationSelector = selector({
    key: "totalNotificationSelector",
    get: ({ get }) => {
        const allNotifications = get(notifications);
        return allNotifications.network +
            allNotifications.jobs +
            allNotifications.notifications +
            allNotifications.messaging
    }
})