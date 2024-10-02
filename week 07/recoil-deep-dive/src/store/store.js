import { atom, selector } from 'recoil';


const networkAtom = atom({
    key: 'networkAtom',
    default: 12,
});

const jobsAtom = atom({
    key: 'jobsAtom',
    default: 0,
});

const msgAtom = atom({
    key: 'msgAtom',
    default: 0,
});

const notificationAtom = atom({
    key: 'notificationAtom',
    default: 102,
});

const allNotifications = selector({
    key: 'allNotifications',
    get: ({get}) => {
        const network = get(networkAtom);
        const jobs = get(jobsAtom);
        const msg = get(msgAtom);
        const notification = get(notificationAtom);

        return network + jobs + msg + notification;
    }
});

export { networkAtom, jobsAtom, msgAtom, notificationAtom, allNotifications };