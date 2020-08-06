import log from 'loglevel';
import remote from 'loglevel-plugin-remote';
import {authHeader} from "./axios.service";
import moment from 'moment';

const url = process.env.REACT_APP_API_BASE_URL + '/logger';

const format = (log) => ({
    level: log.level.label,
    logger: log.logger,
    message: log.message,
    timestamp: moment(log.timestamp).format("YYYY-MM-DD HH:mm:ss"),
    stackTrace: log.stacktrace
});

const defaults = {
    url,
    method: 'POST',
    headers: {
        ...authHeader(),
        'Accept': 'application/json'
    },
    level: 'trace',
    format,
};

remote.apply(log, defaults);
log.enableAll();

export {log};