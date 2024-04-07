import {useState} from "react";

export interface scheduleForm {
    name: string;
    priority: string;
    location: string;
    date: Date;
    time: string;
    note: string;
    status: string;
}

export const SheduleContent = () => {
    const [form , setForm] = useState<scheduleForm> ({
        name: "",
        priority: "",
        location: "",
        date: new Date,
        time: "",
        note: "",
        status: "",
    });



};
