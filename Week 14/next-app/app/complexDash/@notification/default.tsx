import Card from "@/components/Card";
import Link from "next/link";

export default function Notifications() {
  return (
    <Card>
      <div>Notifications</div>
      <br />
      <div>
        <Link href="/complexDash/archived">  @Archived</Link>
      </div>
    </Card>
  );
}