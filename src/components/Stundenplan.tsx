import { Text } from "@mantine/core";
import { type TstdNrs, type TgrWoche, type TkwNrs } from "~/server/api/routers/db";

export default function Stundenplan({ wocheData, kw }: { wocheData?: TgrWoche, kw: string }) {
  const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((std) => (
    <tr key={std}>
      <td>{std}</td>
      <td>
        {(wocheData?.mo && wocheData?.mo[std as TstdNrs]?.kurz) || <Text fs="italic" color="dimmed">frei</Text>}
      </td>
      <td>
        {(wocheData?.di && wocheData?.di[std as TstdNrs]?.kurz) || <Text fs="italic" color="dimmed">frei</Text>}
      </td>
      <td>
        {(wocheData?.mi && wocheData?.mi[std as TstdNrs]?.kurz) || <Text fs="italic" color="dimmed">frei</Text>}
      </td>
      <td>
        {(wocheData?.do && wocheData?.do[std as TstdNrs]?.kurz) || <Text fs="italic" color="dimmed">frei</Text>}
      </td>
      <td>
        {(wocheData?.fr && wocheData?.fr[std as TstdNrs]?.kurz) || <Text fs="italic" color="dimmed">frei</Text>}
      </td>
    </tr>
  ));
  return (
    <>
      <thead>
		<tr><th className="text-xl pt-8" colSpan={6}>Woche {kw}</th></tr>
        <tr>
          <th>Zeit</th>
          <th>Montag</th>
          <th>Dienstag</th>
          <th>Mittwoch</th>
          <th>Donnerstag</th>
          <th>Freitag</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </>
  );
}
