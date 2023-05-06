export const fullYears = (timeNow: Date, timeBorn: Date) => {
    let diff =(timeNow.getTime() - timeBorn.getTime()) / 1000;
    diff /= (60 * 60 * 24);
    return Math.floor(diff/365.25);
}