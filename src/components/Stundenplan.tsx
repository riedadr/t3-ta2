import { Button, Modal, Text, UnstyledButton } from "@mantine/core";
import { type TstdNrs, type TgrWoche, type TgrStunde } from "~/types/db";
import { type Dispatch, type SetStateAction, useState } from "react";
import Link from "next/link";
import { addWeeks } from "date-fns";

export default function Stundenplan({
    wocheData,
    firstMonday,
    kw,
}: {
    wocheData?: TgrWoche;
    firstMonday: Date;
    kw: string;
}) {
    const [showInfo, setShowInfo] = useState<boolean | TgrStunde>(false);
    const [datesOfWeek, setDatesOfWeek] = useState(getStartDate());
    const getTimes = (stdNo: number) => {
        let times = "";

        switch (stdNo) {
            case 1:
                times = "08:00 - 08:45";
                break;
            case 2:
                times = "08:45 - 09:30";
                break;
            case 3:
                times = "10:00 - 10:45";
                break;
            case 4:
                times = "10:45 - 11:30";
                break;
            case 5:
                times = "12:00 - 12:45";
                break;
            case 6:
                times = "12:45 - 13:30";
                break;
            case 7:
                times = "13:30 - 14:15";
                break;
            case 8:
                times = "14:30 - 15:15";
                break;
            case 9:
                times = "15:15 - 16:00";
                break;
            case 10:
                times = "16:15 - 17:00";
                break;
            case 11:
                times = "17:00 - 17:45";
                break;
        }

        return times;
    };

    function getStartDate() {
        const fm = new Date(firstMonday);
        const monday = addWeeks(fm, parseInt(kw) - 1);
        const mondayString = `${monday.getDate()}.${
            monday.getMonth() + 1
        }.${monday.getFullYear()}`;

        const friday = new Date(monday);
        friday.setDate(friday.getDate() + 4);
        const fridayString = `${friday.getDate()}.${
            friday.getMonth() + 1
        }.${friday.getFullYear()}`;

        console.log("woche", kw, mondayString, fridayString);
        return `${mondayString} - ${fridayString}`;
    }

    const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((std) => (
        <tr key={std}>
            <td>{getTimes(std)}</td>
            <td>
                {wocheData?.mo && wocheData?.mo[std as TstdNrs] ? (
                    <TableCell
                        data={wocheData?.mo[std as TstdNrs] as TgrStunde}
                        setInfo={setShowInfo}
                    />
                ) : (
                    <Text fs="italic" color="gray">
                        frei
                    </Text>
                )}
            </td>
            <td>
                {wocheData?.di && wocheData?.di[std as TstdNrs] ? (
                    <TableCell
                        data={wocheData?.di[std as TstdNrs] as TgrStunde}
                        setInfo={setShowInfo}
                    />
                ) : (
                    <Text fs="italic" color="gray">
                        frei
                    </Text>
                )}
            </td>
            <td>
                {wocheData?.mi && wocheData?.mi[std as TstdNrs] ? (
                    <TableCell
                        data={wocheData?.mi[std as TstdNrs] as TgrStunde}
                        setInfo={setShowInfo}
                    />
                ) : (
                    <Text fs="italic" color="gray">
                        frei
                    </Text>
                )}
            </td>
            <td>
                {wocheData?.do && wocheData?.do[std as TstdNrs] ? (
                    <TableCell
                        data={wocheData?.do[std as TstdNrs] as TgrStunde}
                        setInfo={setShowInfo}
                    />
                ) : (
                    <Text fs="italic" color="gray">
                        frei
                    </Text>
                )}
            </td>
            <td>
                {wocheData?.fr && wocheData.fr[std as TstdNrs] ? (
                    <TableCell
                        data={wocheData.fr[std as TstdNrs] as TgrStunde}
                        setInfo={setShowInfo}
                    />
                ) : (
                    <Text fs="italic" color="gray">
                        frei
                    </Text>
                )}
            </td>
        </tr>
    ));
    return (
        <>
            <thead>
                <tr>
                    <th className="pt-8 text-xl" colSpan={6}>
                        KW {kw} ({datesOfWeek})
                    </th>
                </tr>
                <tr>
                    <th>Zeit</th>
                    <th>Mo</th>
                    <th>Di</th>
                    <th>Mi</th>
                    <th>Do</th>
                    <th>Fr</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
            <Modal
                opened={showInfo ? true : false}
                onClose={() => setShowInfo(false)}
                title={
                    typeof showInfo !== "boolean"
                        ? showInfo.kurz
                        : "Keine Daten vorhanden"
                }
            >
                {typeof showInfo !== "boolean" && (
                    <>
                        <dl>
                            <dt>Fach</dt>
                            <dd className="ml-8">
                                <code>{showInfo.fach}</code>
                            </dd>
                            <dt>Dozent</dt>
                            <dd className="ml-8">
                                <code>{showInfo.dozent}</code>
                            </dd>
                            <dt>Raum</dt>
                            <dd className="ml-8">
                                <code>{showInfo.raum}</code>
                            </dd>
                        </dl>

                        <div className="mt-4 text-right">
                            {showInfo.ilias && (
                                <Link href={showInfo.ilias} target="_blank">
                                    <Button variant="outline">Ilias</Button>
                                </Link>
                            )}
                        </div>
                    </>
                )}
            </Modal>
        </>
    );
}

function TableCell({
    data,
    setInfo,
}: {
    data: TgrStunde;
    setInfo: Dispatch<SetStateAction<boolean | TgrStunde>>;
}) {
    const getColor = () => {
        if (!data.status) return "";
        if (data.status === "+") return "green"; // Vorlesung entfällt
        if (data.status === "-") return "red"; // Vorlesung hinzugefügt/verschoben
        if (data.status === "0") return "yellow"; // Änderung, z.B. Raum
    };
    return (
        <UnstyledButton
            style={{ wordBreak: "break-all" }}
            fz="sm"
            onClick={() => setInfo(data)}
        >
            <Text
                td={data.status === "-" ? "line-through" : ""}
                color={getColor()}
            >
                {data.kurz}
            </Text>
        </UnstyledButton>
    );
}
