'use strict';

var test = require('tape');
var scribble = require('../dest/index');

test('clip should use provided notes', function(t) {
	t.equal(
		scribble.clip({
			notes: ['d3']
		})[0].note[0],
		'd3',
		'Clip function uses the provided notes'
	);

	t.end();
});

test('clip should throw an error in case of invalid notes', function(t) {
	t.throws(function() {
		scribble.clip({notes: ['k1']});
	});

	t.end();
});

test('clip should throw an error in case of invalid notes type', function(t) {
	t.throws(function() {
		scribble.clip({notes: 'c3'});
	});

	t.end();
});

test('clip should validate provided notes & pattern using default notes and patterns in their absence', function(t) {
	var clip;
	t.throws(function() {
		scribble.clip({pattern: 'kkjd'});
	});
	t.throws(function() {
		scribble.clip({notes: ['k1']});
	});
	clip = scribble.clip({pattern: 'x_______x-------'}),
	t.equal(clip[0].length, 256, 'Clip uses provided pattern');
	t.equal(clip[8].length, 32, 'Clip uses provided pattern');
	t.equal(clip[0].note[0], 'c3', 'Clip uses default note and octave');

	clip = scribble.clip();
	t.equal(clip[0].length, 512, 'Clip uses a default pattern');
	t.equal(clip[0].note[0], 'c3', 'Clip uses default note and octave');

	t.end();
});

test('clip should shuffle provided notes', function(t) {
	var clip = scribble.clip({
		notes: scribble.scale('c', 'major', 3),
		pattern: 'xxxx',
		shuffle: true
	});
	t.equal(
		clip[0].note[0] === 'c3' && clip[0].note[1] === 'd3',
		false,
		'Clip function uses the provided notes'
	);

	t.end();
});

test('clip should override default params with provided params', function(t) {
	var clip = scribble.clip({
		accentHi: 100
	});
	t.equal(
		clip[0].level,
		100,
		'Clip function uses the provided notes'
	);

	t.end();
});

test('clip should extend notes in case of a longer pattern', function(t) {
	var longerPattern = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxx';
	var clip = scribble.clip({
		notes: ['c3', 'd3'],
		pattern: longerPattern
	});
	t.equal(
		clip.length,
		longerPattern.length,
		'Clip function extends notes in case of longer pattern'
	);

	t.end();
});