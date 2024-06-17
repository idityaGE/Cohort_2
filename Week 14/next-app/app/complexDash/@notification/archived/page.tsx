import Card from "@/components/Card";
import Link from "next/link";

export default function Notifications() {
  return (
    <Card>
      <div>Archived</div>
      <div>
        <Link href="/complexDash/dashborad">Notifications</Link>
      </div>
    </Card>
  );
}