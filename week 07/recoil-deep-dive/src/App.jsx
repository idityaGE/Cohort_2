import './App.css'
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil'
import { networkAtom, jobsAtom, msgAtom, notificationAtom, allNotifications } from './store/store';


function App() {
  return (
      <div>
        <RecoilRoot>
          <MainApp />
        </RecoilRoot>
      </div>
  )
}

function MainApp() {
  const network = useRecoilValue(networkAtom);
  const jobs = useRecoilValue(jobsAtom);
  const setJobs = useSetRecoilState(jobsAtom);
  const msg = useRecoilValue(msgAtom);
  const notification = useRecoilValue(notificationAtom);

  const allNotificationsCount = useRecoilValue(allNotifications);
  return (
    <div>
      <button className="ml-3">Home</button>
      <button className="ml-3">My Network ({network})</button>
      <button className="ml-3">Jobs ({jobs}) <button onClick={()=> setJobs(p => p+ 1)}>+</button></button>
      <button className="ml-3">Messaging ({msg})</button>
      <button className="ml-3">Notification ({notification >= 100 ? "99+" : notification})</button>
      <button className="ml-3">Me ({allNotificationsCount})</button>
    </div>
  )
}



export default App