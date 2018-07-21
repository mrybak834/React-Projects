import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DotEnv from 'dotenv';

/**
 * Configure enzyme to work with react 16
 */
Enzyme.configure({
    adapter: new Adapter()
});

/**
 * Use test db if in a test environment
 */
DotEnv.config({ path: '.env.test'});