import Card from "@/components/Card";
import Link from "next/link";

export default function Notifications() {
  return (
    <Card>
      <div>Archived</div>
      <br />
      <div>
        <Link href="/complexDash">   @Notifications</Link>
      </div>
    </Card>
  );
}