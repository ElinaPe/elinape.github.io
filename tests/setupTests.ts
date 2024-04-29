import '@testing-library/jest-dom';
import 'resize-observer-polyfill';

class ResizeObserver {
    observe() {
        // do nothing
    }
    disconnect() {
        // do nothing
    }
}

global.ResizeObserver = ResizeObserver as any;
