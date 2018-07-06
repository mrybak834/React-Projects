/**
 * A mock of the moment library
 * Tests call these functions instead of the actual library.
 * requireActual imports the actual library here
 */

const moment = require.requireActual('moment');

export default (timestamp = 0) => {
    return moment(timestamp);
}