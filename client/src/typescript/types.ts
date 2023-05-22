import { Dispatch, SetStateAction } from "react";

export interface tasksLists {
    _id: string;
    name: string;
    date: string;
    status: string;
    priority: boolean;
    description?: string;
}

export interface props {
    text?: string;
    task?: tasksLists;
    variant?: any;
    color?: any; 
    onClick?: any; 
    fullWidth?: boolean; 
}

export interface modalProps {
    openModal: boolean;
    setOpenModal: Dispatch<SetStateAction<boolean>>;
    title: string;
    task?: tasksLists;
}

export interface authparam {
    username?: string;
    email: string;
    password: string;
}

export interface paginationtypes {
    pages: number;
    limit: number;
    total: number;
}

export interface taskfiltertypes {
    status: string;
    priority: string;
    pageNum: number;
    search?: string
}

export interface searchparams {
    search?: string | any;
    setSearch?: Dispatch<SetStateAction<string>> | any;
}