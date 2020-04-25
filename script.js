
// generator.js
// written and released to the public domain by drow <drow@bin.sh>
// http://creativecommons.org/publicdomain/zero/1.0/

// var my_map = {"ravi": "Adelaide", "Demos": "Sydney"};
// var some_string = "ravi"
// console.log(my_map[some_string])


// var car = {"wheels" : 5, "colour": "blue", "people": ["ravi", "demos"]};
//var my_list = ["ravi", "stacey", "demos"]
// console.log(car["wheels"])
// console.log(car["colour"])
// console.log(car["people"])
// console.log(car["people"][1])
// console.log(car)
// car["lights"] = 8;
// console.log(car)

// function my_function () {
// 	var gen_data = {};
// 	gen_data['warrior'] = 'A {gender} {race} warrior, wearing {armor} and wielding {weapon}.';
// 	console.log(gen_data)
// 	gen_data['warrior'] = 'Bullshit'
// 	console.log(gen_data)
// }

var gen_data= {};
gen_data['warrior'] = ['This {attribute} guard was formerly {occupation}. You cannot fail to notice that they appear to be {incompetence}. Nonetheless, they took up the fine art of guarding because {motivation}.'];

gen_data['attribute'] = [
'anxious', 'overconfident', 'gluttonous', 'drunken', 'deeply religious', 'hedonistic', 'tedious', 'fearful', 'sycophantic', 'lecherous', 'arrogant', 'superstitious', 'enthusiastic', 'witty', 'young', 'insomniac', 'medically trained', 'nefarious', 'knowledgable', 'anally retentive',
];

gen_data['occupation'] = [
'a barkeep', 'a gravedigger', 'a jailor', 'a headsman', 'a prostitute', 'a knight', 'a shepherd', 'a bard', 'a sailor', 'a craftsman', 'a librarian', 'a priest', 'a sewer cleaner', 'a minor noble from an obscure and not especially important land', 'a chef', 'a small-time actor', 'an insurance salesman', 'a street vendor', 'a town crier', 'a criminal defense attorney',
];

gen_data['incompetence'] = [
'physically puny, some would say a weakling', 
'trapped in deep philosophical thought about the arbitrary nature of violence', 
'clumsy and dropping their weapon incessantly', 'falling asleep at their post', 
'not especially smart', 
'in poorly kept equipment', 
'admiring a sketch of some local beauty that they have drawn', 
'starving, hesitating to eat their foul and hard rations they hold in their hands',
'boisterous and loud, perhaps expelling gas with some mirth', 
'completely without a sense of where they are or what it is they are supposed to be doing',
'generally mildly incompetent','a sociopath', 'wandering off, maybe picking flowers or humming to themselves',
'challenged at basic arithmetic', 'sporting a peg-leg and an eyepatch', 'melancholic and staring into the sky with wanderlust and passion',
'attempting to hide something bulky underneath their helmet', 
'smoking from a long pipe and whimsically regaling their storied past to anyone who wishes to listen', 
'easily confused and overwhelmed by their new duties', 
'a worshipper of gods, heroes, especially muscular children, and that somewhat above-average goat that once overpowered them in hand-to-hand combat',
];

gen_data['motivation'] = [
'they have a sick relative', 'they are running from the authorities and making an entirely new identity', 'got caught up in a guarding pyramid-scheme', 
'they want to rise in caste by proving they can look after things competently', ' they needed to make some fast money', 'owe money to an ancient and stingy wizard', 
'are under a powerful spell that causes subordination to their master','they are after the pure thrill of standing in one place for an especially long time', 
'heard tales of old about many decorated and well-respected guards', 'they possess a uniquely misplaced sense of chivalry', 'wish to redeem themselves', 
'are in wedlock to the child of their master and have landed themselves this position through some good old-fashioned nepotism', 'have an insatiable death wish', 
'wish to prove themselves worthy to their god','are mean-spirited and wish to cause some minor inconvenience', 'they are possessed by the spirit of the last guy who was guarding this place', 
'had a desire to travel, meet interesting people, have career prospects and maybe even reach middle-management', 'had no other options left in their last job',
];

// var gen_data = {};
// gen_data['warrior'] = ['A {gender} {race} warrior, wearing {armor} and wielding {weapon}.'];

// gen_data['gender'] = [
// 'male', 'female',
// ];
// gen_data['race'] = {
// 	'1-3': 'human',
// 	'4-5': 'dwarf',
// 	'6': 'elf'
// };
// gen_data['armor'] = {
// 	'01-50': 'leather armor',
// 	'51-90': 'chainmail',
// 	'91-00': 'plate armor'
// };
// gen_data['weapon'] = [
// '{melee_weapon}',
// '{melee_weapon} and a shield',
// 'twin blades',
// '{ranged_weapon}'
// ];
// gen_data['melee_weapon'] = [
// 'a battleaxe', 'a mace', 'a spear', 'a sword'
// ];
// gen_data['ranged_weapon'] = [
// 'a longbow and arrows', 'a heavy crossbow'
// ];

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// generator function

function generate_text (type) {
	var list; 
	if (list = gen_data[type]) {
		var string; 
		if (string = select_from(list)) {
			return expand_tokens(string);
		}
	}
	return '';
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// generate multiple

function generate_list (type, n_of) {
	var list = [];

	var i; for (i = 0; i < n_of; i++) {
		list.push(generate_text(type));
	}
	return list;
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// select from list

function select_from (list) {
	if (list.constructor == Array) {
		return select_from_array(list);
	} else {
		return select_from_table(list);
	}
}
function select_from_array (list) {
	return list[Math.floor(Math.random() * list.length)];
}
function select_from_table (list) {
	var len; 
	if (len = scale_table(list)) {
		var idx = Math.floor(Math.random() * len) + 1;

		var key; 
		for (key in list) {
			var r = key_range(key);
			if (idx >= r[0] && idx <= r[1]) { return list[key]; }
		}
	}
	return '';
}
function scale_table (list) {
	var len = 0;

	var key; for (key in list) {
		var r = key_range(key);
		if (r[1] > len) { len = r[1]; }
	}
	return len;
}
function key_range (key) {
	var match; 
	if (match = /(\d+)-00/.exec(key)) {
		return [ parseInt(match[1]), 100 ];
	} else if (match = /(\d+)-(\d+)/.exec(key)) {
		return [ parseInt(match[1]), parseInt(match[2]) ];
	} else if (key == '00') {
		return [ 100, 100 ];
	} else {
		return [ parseInt(key), parseInt(key) ];
	}
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// expand {token} in string

function expand_tokens (string) {
	var match; while (match = /{(\w+)}/.exec(string)) {
		var token = match[1];

		var repl; if (repl = generate_text(token)) {
			string = string.replace('{'+token+'}',repl);
		} else {
			string = string.replace('{'+token+'}',token);
		}
	}
	return string;
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
