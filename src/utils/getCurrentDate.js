const getCurrentDate = () => {
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    // add leading zero
    const monthFormatted = month < 10 ? `0${month}` : month;
    const dayFormatted = day < 10 ? `0${day}` : day;
    return `${monthFormatted}/${dayFormatted}/${year}`;
};

export default getCurrentDate