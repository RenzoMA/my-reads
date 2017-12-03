import moment from 'moment';

export function formatDate(unixDate) {
    return moment.unix(unixDate / 1000).format("DD MMM YYYY hh:mm a");
}