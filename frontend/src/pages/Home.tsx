import DashBoard from '../components/DashBoard';
import {App} from '../components/AppBar';
export function Home() {
  return (
    <div className="h-screen overflow-y-scroll overflow-hidden">
      <App/>
      <DashBoard/>
    </div>
  )
}

