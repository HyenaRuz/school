import { format } from "date-fns";
import styles from "./Table.module.scss";
import { ReactComponent as Call } from "../../images/svg/icon-call.svg";
import { ReactComponent as Email } from "../../images/svg/icon-email.svg";
import InfoButton from "../InfoButton/InfoButton";

const MyCell = ({ cell }) => {
  const contactInfo = cell.getValue();

  return (
    <div className={styles.myCell}>
      <InfoButton svg={<Call />} text={contactInfo.phone} />
      <InfoButton svg={<Email />} text={contactInfo.email} />
    </div>
  );
};

export const COLUMNS = [
  {
    header: "Name",
    accessorFn: (row) => ({
      firstName: row.firstName,
      lastName: row.lastName,
      avatar: row.avatar,
    }),
    cell: (cell) => {
      const contactInfo = cell.getValue();

      return (
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* <img srcSet={contactInfo.avatar} className={styles.table_img} /> */}
          <div className={styles.table_img}>
            <h5>
              {contactInfo.firstName[0]}. {contactInfo.lastName[0]}
            </h5>
          </div>

          <h5>
            {contactInfo.firstName} {contactInfo.lastName}
          </h5>
        </div>
      );
    },
    size: 30,
  },

  {
    header: "Birthday",
    accessorFn: (row) => format(row.birthday, "MMMM dd, yyyy"),
    cell: (cell) => <h6 style={{ fontWeight: 400 }}>{cell.getValue()}</h6>,
    id: "birthday",
    size: 20,
  },

  {
    header: "Contact",
    accessorFn: (row) => ({
      email: row.email,
      phone: row.phone,
    }),
    cell: MyCell,
    size: 10,
    minSize: 10,
  },

  // {
  //   header: "Parent Name",
  //   accessorFn: (row) => `${row.parent.firstName} ${row.parent.lastName}`,
  //   cell: (cell) => <h6 style={{ fontWeight: 400 }}>{cell.getValue()}</h6>,
  // },

  // columnHelper.display({
  //   header: "Action",
  //   id: "action",
  //   cell: (cell) => {
  //     const cellInfo = cell.row.original.id;
  //     // console.log(contactInfo);

  //     return (
  //       <button
  //         className={styles.table_button}
  //         onClick={() => createConnection({ id: cellInfo.id })}
  //       >
  //         {/* <Dots />{" "} */}
  //         <StudentPlus />
  //       </button>
  //     );
  //   },
  //   size: 1,
  //   minSize: 1,
  // }),
];
