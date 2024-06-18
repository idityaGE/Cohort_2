import Card from "@/components/Card";
import Link from "next/link";

export default function Notifications() {
  return (
    <Card>
      <div>Users</div>
      <div>
        <Link href='/complexDash/admin'>@ Admin</Link>
      </div>
    </Card>
  );
}