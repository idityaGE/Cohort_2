import { title } from "process"
import Linechart from "./line-chart"

export function Page() {
  return (
    <div>
      <h1>DashBorad</h1>
      <br /><br /><br /><br /><br />
      <Linechart />
    </div>
  )
}

// In nextjs, inside page.tsx file only 'export default' is rendered on the browser

export const metadata = {
  title : "Dashboard",
}



export default function page() {
  return (
    <div>
      <h1>DashBorad</h1>
      <br /><br /><br /><br />
      <h2>Exported Default</h2>
      <Linechart />
    </div>
  )
}