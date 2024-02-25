import dayjs from "dayjs";

export const ONE_DAY = 86400000;

export const nowTime = () => dayjs(new Date()).format("HH:mm:ss");

export const formatDate = (date) => dayjs(new Date(date)).format("YYYY-MM-DD");

export const formatTime = (date) => dayjs(date).format("HH:mm:ss");
