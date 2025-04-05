import { Link } from "react-router-dom";

export const leavecolumns = [
    {
        title: "Type",
        dataIndex: "shiftname",
        sorter: (a, b) => a.shiftname.length - b.shiftname.length,
    },


    {
        title: "Employee",
        dataIndex: "time",
        sorter: (a, b) => a.time.length - b.time.length,
    },
    {
        title: "Team",
        dataIndex: "weekoff",
        sorter: (a, b) => a.weekoff.length - b.weekoff.length,
    },
    {
        title: "Work Location",
        dataIndex: "createdon",
        sorter: (a, b) => a.createdon.length - b.createdon.length,
    },
    {
        title: "Status",
        dataIndex: "status",
        render: (text) => (
            <span className="badge badge-linesuccess">
                <Link to="#"> {text}</Link>
            </span>
        ),
        sorter: (a, b) => a.status.length - b.status.length,
    },
    {
        title: "Day",
        dataIndex: "createdon",
        sorter: (a, b) => a.createdon.length - b.createdon.length,
    },
    {
        title: "From",
        dataIndex: "createdon",
        sorter: (a, b) => a.createdon.length - b.createdon.length,
    },
    {
        title: "To",
        dataIndex: "createdon",
        sorter: (a, b) => a.createdon.length - b.createdon.length,
    },
    {
        title: "Work Date",
        dataIndex: "createdon",
        sorter: (a, b) => a.createdon.length - b.createdon.length,
    },
    {
        title: "Duration",
        dataIndex: "createdon",
        sorter: (a, b) => a.createdon.length - b.createdon.length,
    },
    {
        title: "Action on",
        dataIndex: "createdon",
        sorter: (a, b) => a.createdon.length - b.createdon.length,
    },
    {
        title: "Action by",
        dataIndex: "createdon",
        sorter: (a, b) => a.createdon.length - b.createdon.length,
    },
    {
        title: "Applied on",
        dataIndex: "createdon",
        sorter: (a, b) => a.createdon.length - b.createdon.length,
    },
];

export const leavebalance = [
    {
        title: "Employee Name",
        dataIndex: "shiftname",
        sorter: (a, b) => a.shiftname.length - b.shiftname.length,
    },


    {
        title: "Leave Type",
        dataIndex: "time",
        sorter: (a, b) => a.time.length - b.time.length,
    },
    {
        title: "Balance",
        dataIndex: "weekoff",
        sorter: (a, b) => a.weekoff.length - b.weekoff.length,
    },
    {
        title: "Leave Session",
        dataIndex: "createdon",
        sorter: (a, b) => a.createdon.length - b.createdon.length,
    },
    
    {
        title: "Date/Time",
        dataIndex: "createdon",
        sorter: (a, b) => a.createdon.length - b.createdon.length,
    },
];
export const Expenses = [
    {
        title: "Title",
        dataIndex: "shiftname",
        sorter: (a, b) => a.shiftname.length - b.shiftname.length,
    },


    {
        title: "Id",
        dataIndex: "time",
        sorter: (a, b) => a.time.length - b.time.length,
    },
    {
        title: "Employee",
        dataIndex: "weekoff",
        sorter: (a, b) => a.weekoff.length - b.weekoff.length,
    },
    {
        title: "Team",
        dataIndex: "createdon",
        sorter: (a, b) => a.createdon.length - b.createdon.length,
    },
    
    {
        title: "WorkLocation",
        dataIndex: "createdon",
        sorter: (a, b) => a.createdon.length - b.createdon.length,
    },
    
    {
        title: "Type",
        dataIndex: "createdon",
        sorter: (a, b) => a.createdon.length - b.createdon.length,
    },
    {
        title: "Status",
        dataIndex: "status",
        render: (text) => (
            <span className="badge badge-linesuccess">
                <Link to="#"> {text}</Link>
            </span>
        ),
        sorter: (a, b) => a.status.length - b.status.length,
    },
    {
        title: "Claimed",
        dataIndex: "createdon",
        sorter: (a, b) => a.createdon.length - b.createdon.length,
    },
    
    {
        title: "Approved",
        dataIndex: "createdon",
        sorter: (a, b) => a.createdon.length - b.createdon.length,
    },
    {
        title: "Comment",
        dataIndex: "createdon",
        sorter: (a, b) => a.createdon.length - b.createdon.length,
    },
    {
        title: "Status Updated On",
        dataIndex: "createdon",
        sorter: (a, b) => a.createdon.length - b.createdon.length,
    },
    {
        title: "Status Updated By",
        dataIndex: "createdon",
        sorter: (a, b) => a.createdon.length - b.createdon.length,
    },
    {
        title: "Downloads",
        dataIndex: "createdon",
        sorter: (a, b) => a.createdon.length - b.createdon.length,
    },
    {
        title: "Created On",
        dataIndex: "createdon",
        sorter: (a, b) => a.createdon.length - b.createdon.length,
    },
];
export const ExpensesDelete = [
    {
        title: "Title",
        dataIndex: "shiftname",
        sorter: (a, b) => a.shiftname.length - b.shiftname.length,
    },


    {
        title: "Id",
        dataIndex: "time",
        sorter: (a, b) => a.time.length - b.time.length,
    },
    {
        title: "Employee",
        dataIndex: "weekoff",
        sorter: (a, b) => a.weekoff.length - b.weekoff.length,
    },
    {
        title: "Team",
        dataIndex: "createdon",
        sorter: (a, b) => a.createdon.length - b.createdon.length,
    },
    
    {
        title: "WorkLocation",
        dataIndex: "createdon",
        sorter: (a, b) => a.createdon.length - b.createdon.length,
    },
    {
        title: "Type",
        dataIndex: "createdon",
        sorter: (a, b) => a.createdon.length - b.createdon.length,
    },
    {
        title: "Status",
        dataIndex: "status",
        render: (text) => (
            <span className="badge badge-linesuccess">
                <Link to="#"> {text}</Link>
            </span>
        ),
        sorter: (a, b) => a.status.length - b.status.length,
    },
    {
        title: "Claimed",
        dataIndex: "createdon",
        sorter: (a, b) => a.createdon.length - b.createdon.length,
    },
   
    {
        title: "Approved",
        dataIndex: "createdon",
        sorter: (a, b) => a.createdon.length - b.createdon.length,
    },
    {
        title: "Comment",
        dataIndex: "createdon",
        sorter: (a, b) => a.createdon.length - b.createdon.length,
    },
    {
        title: "Status Updated On",
        dataIndex: "createdon",
        sorter: (a, b) => a.createdon.length - b.createdon.length,
    },
    {
        title: "Status Updated By",
        dataIndex: "createdon",
        sorter: (a, b) => a.createdon.length - b.createdon.length,
    },
    {
        title: "Downloads",
        dataIndex: "createdon",
        sorter: (a, b) => a.createdon.length - b.createdon.length,
    },
    {
        title: "Created On",
        dataIndex: "createdon",
        sorter: (a, b) => a.createdon.length - b.createdon.length,
    },
    {
        title: "Deleted On",
        dataIndex: "createdon",
        sorter: (a, b) => a.createdon.length - b.createdon.length,
    },
    {
        title: "Deleted By",
        dataIndex: "createdon",
        sorter: (a, b) => a.createdon.length - b.createdon.length,
    },
];
export const Payments = [
    {
        title: "Employee",
        dataIndex: "shiftname",
        sorter: (a, b) => a.shiftname.length - b.shiftname.length,
    },


    {
        title: "Reference Id",
        dataIndex: "time",
        sorter: (a, b) => a.time.length - b.time.length,
    },
    {
        title: "Recorded By",
        dataIndex: "weekoff",
        sorter: (a, b) => a.weekoff.length - b.weekoff.length,
    },
    {
        title: "Paid Through",
        dataIndex: "createdon",
        sorter: (a, b) => a.createdon.length - b.createdon.length,
    },
    
    {
        title: "Source",
        dataIndex: "createdon",
        sorter: (a, b) => a.createdon.length - b.createdon.length,
    },
    {
        title: "Amount",
        dataIndex: "createdon",
        sorter: (a, b) => a.createdon.length - b.createdon.length,
    },
    {
        title: "Notes",
        dataIndex: "createdon",
        sorter: (a, b) => a.createdon.length - b.createdon.length,
    },
];
export const PaymentsDelete = [
    {
        title: "Employee",
        dataIndex: "shiftname",
        sorter: (a, b) => a.shiftname.length - b.shiftname.length,
    },


    {
        title: "Reference Id",
        dataIndex: "time",
        sorter: (a, b) => a.time.length - b.time.length,
    },
    {
        title: "Recorded By",
        dataIndex: "weekoff",
        sorter: (a, b) => a.weekoff.length - b.weekoff.length,
    },
    {
        title: "Paid Through",
        dataIndex: "createdon",
        sorter: (a, b) => a.createdon.length - b.createdon.length,
    },
    
    {
        title: "Source",
        dataIndex: "createdon",
        sorter: (a, b) => a.createdon.length - b.createdon.length,
    },
    {
        title: "Amount",
        dataIndex: "createdon",
        sorter: (a, b) => a.createdon.length - b.createdon.length,
    },
    {
        title: "Notes",
        dataIndex: "createdon",
        sorter: (a, b) => a.createdon.length - b.createdon.length,
    },
    {
        title: "Deleted On",
        dataIndex: "createdon",
        sorter: (a, b) => a.createdon.length - b.createdon.length,
    },
    {
        title: "Deleted By",
        dataIndex: "createdon",
        sorter: (a, b) => a.createdon.length - b.createdon.length,
    },
];