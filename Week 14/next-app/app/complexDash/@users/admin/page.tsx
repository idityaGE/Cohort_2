import Card from "@/components/Card";
import Link from "next/link";

export default function Notifications() {
  return (
    <Card>
      <div>Admin</div>
      <br />
      <div>
        <Link href="/complexDash">  @User</Link>
      </div>
    </Card>
  );
}