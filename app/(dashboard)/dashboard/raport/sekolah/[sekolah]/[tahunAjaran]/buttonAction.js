const { FaBook, FaUser, FaChartBar, FaPen } = require("react-icons/fa");

export const buttonData = [
    {
        label: "Mata Pelajaran",
        value:"mapel",
        color: "bg-blue-500 hover:bg-blue-600",
        icon: <FaBook />,

    },
    {
        label: "Data Siswa",
        value:'siswa',
        color: "bg-green-500 hover:bg-green-600",
        icon: <FaUser />,

    },
   
    {
        label: "Input Raport",
        value:'inputRaport',
        color: "bg-red-500 hover:bg-red-600",
        icon: <FaPen />,

    },
    {
        label: "Raport",
        value:"raport",
        color: "bg-purple-500 hover:bg-purple-600",
        icon: <FaChartBar />,

    },
];