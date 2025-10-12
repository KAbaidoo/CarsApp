// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Provide TextEncoder/TextDecoder for the Jest/jsdom environment
// (MUI DataGrid and other libs may use these APIs and they're not present
// in some test environments / Node versions)
if (typeof global.TextEncoder === 'undefined') {
	try {
		// Node >= 11 provides TextEncoder/TextDecoder from 'util'
		const { TextEncoder, TextDecoder } = require('util');
		global.TextEncoder = TextEncoder;
		global.TextDecoder = TextDecoder;
	} catch (e) {
		// Fallback: minimal polyfill using a lightweight implementation
		// This is a very small shim that covers common use-cases in tests.
		class _TextEncoder {
			encode(str) {
				const utf8 = Buffer.from(String(str), 'utf8');
				return new Uint8Array(utf8);
			}
		}
		class _TextDecoder {
			decode(buf) {
				return Buffer.from(buf).toString('utf8');
			}
		}
		global.TextEncoder = _TextEncoder;
		global.TextDecoder = _TextDecoder;
	}
}
