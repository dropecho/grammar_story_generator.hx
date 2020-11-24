// Generated by Haxe 4.1.4
(function ($hx_exports, $global) { "use strict";
class EReg {
	constructor(r,opt) {
		this.r = new RegExp(r,opt.split("u").join(""));
	}
	match(s) {
		if(this.r.global) {
			this.r.lastIndex = 0;
		}
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	matched(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) {
			return this.r.m[n];
		} else {
			throw haxe_Exception.thrown("EReg::matched");
		}
	}
}
EReg.__name__ = "EReg";
Object.assign(EReg.prototype, {
	__class__: EReg
});
class HxOverrides {
	static cca(s,index) {
		let x = s.charCodeAt(index);
		if(x != x) {
			return undefined;
		}
		return x;
	}
	static substr(s,pos,len) {
		if(len == null) {
			len = s.length;
		} else if(len < 0) {
			if(pos == 0) {
				len = s.length + len;
			} else {
				return "";
			}
		}
		return s.substr(pos,len);
	}
	static now() {
		return Date.now();
	}
}
HxOverrides.__name__ = "HxOverrides";
Math.__name__ = "Math";
class Reflect {
	static field(o,field) {
		try {
			return o[field];
		} catch( _g ) {
			return null;
		}
	}
	static fields(o) {
		let a = [];
		if(o != null) {
			let hasOwnProperty = Object.prototype.hasOwnProperty;
			for( var f in o ) {
			if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) {
				a.push(f);
			}
			}
		}
		return a;
	}
}
Reflect.__name__ = "Reflect";
class Std {
	static parseInt(x) {
		if(x != null) {
			let _g = 0;
			let _g1 = x.length;
			while(_g < _g1) {
				let i = _g++;
				let c = x.charCodeAt(i);
				if(c <= 8 || c >= 14 && c != 32 && c != 45) {
					let nc = x.charCodeAt(i + 1);
					let v = parseInt(x,nc == 120 || nc == 88 ? 16 : 10);
					if(isNaN(v)) {
						return null;
					} else {
						return v;
					}
				}
			}
		}
		return null;
	}
	static random(x) {
		if(x <= 0) {
			return 0;
		} else {
			return Math.floor(Math.random() * x);
		}
	}
}
Std.__name__ = "Std";
class StringTools {
	static isSpace(s,pos) {
		let c = HxOverrides.cca(s,pos);
		if(!(c > 8 && c < 14)) {
			return c == 32;
		} else {
			return true;
		}
	}
	static ltrim(s) {
		let l = s.length;
		let r = 0;
		while(r < l && StringTools.isSpace(s,r)) ++r;
		if(r > 0) {
			return HxOverrides.substr(s,r,l - r);
		} else {
			return s;
		}
	}
	static rtrim(s) {
		let l = s.length;
		let r = 0;
		while(r < l && StringTools.isSpace(s,l - r - 1)) ++r;
		if(r > 0) {
			return HxOverrides.substr(s,0,l - r);
		} else {
			return s;
		}
	}
	static trim(s) {
		return StringTools.ltrim(StringTools.rtrim(s));
	}
}
StringTools.__name__ = "StringTools";
class UInt {
	static toFloat(this1) {
		let int = this1;
		if(int < 0) {
			return 4294967296.0 + int;
		} else {
			return int + 0.0;
		}
	}
}
class dropecho_storygen_Functions {
	static set(name,func) {
		dropecho_storygen_Functions.funcs.h[name] = func;
	}
	static get(name) {
		return dropecho_storygen_Functions.funcs.h[name];
	}
}
$hx_exports["Functions"] = dropecho_storygen_Functions;
dropecho_storygen_Functions.__name__ = "dropecho.storygen.Functions";
class dropecho_storygen_AbsMap {
	static _new(s) {
		let this1 = s;
		return this1;
	}
	static fromDynamic(d) {
		let _g = new haxe_ds_StringMap();
		let _g1 = 0;
		let _g2 = Reflect.fields(d);
		while(_g1 < _g2.length) {
			let f = _g2[_g1];
			++_g1;
			_g.h[f] = Reflect.field(d,f);
		}
		let map = _g;
		return dropecho_storygen_AbsMap._new(map);
	}
	static toMap(this1) {
		return this1;
	}
	static isMap(this1) {
		let type = js_Boot.getClass(this1);
		if(type != null) {
			return type.__name__ == "haxe.ds.StringMap";
		} else {
			return false;
		}
	}
}
class dropecho_storygen_Generator {
	constructor(grammars) {
		this.memory = new haxe_ds_StringMap();
		this.random = new seedyrng_Random();
		this.matcher = new EReg("(#.*?#)","");
		this.grammars = dropecho_storygen_AbsMap.isMap(grammars) ? dropecho_storygen_AbsMap.toMap(grammars) : dropecho_storygen_AbsMap.toMap(dropecho_storygen_AbsMap.fromDynamic(grammars));
	}
	getSeed() {
		return haxe_Int64.toString(this.random.get_seed());
	}
	mergeGrammar(grammars) {
		let g = dropecho_storygen_AbsMap.isMap(grammars) ? grammars : dropecho_storygen_AbsMap.fromDynamic(grammars);
		let e = haxe_ds_StringMap.kvIterator(dropecho_storygen_AbsMap.toMap(g).h);
		while(e.hasNext()) {
			let e1 = e.next();
			this.grammars.h[e1.key] = e1.value;
		}
	}
	inMemory(symbol) {
		return Object.prototype.hasOwnProperty.call(this.memory.h,symbol);
	}
	expand(token) {
		if(token.isMemorized || Object.prototype.hasOwnProperty.call(this.memory.h,token.symbol)) {
			let sym = token.memSymbol != null ? token.memSymbol : token.symbol;
			if(Object.prototype.hasOwnProperty.call(this.memory.h,sym)) {
				return this.memory.h[sym];
			}
		}
		let s = token.symbol;
		if(token.isFunction) {
			let func = dropecho_storygen_Functions.get(token.symbol);
			if(func != null) {
				return func(this,token.functionArgs);
			} else {
				throw haxe_Exception.thrown("\n          No function \"" + s + "\" exists on the function object.\n          Double check spelling (#random(5,10)#) or add function to Functions.\n          example: \n          ``` storygen.Functions.set(\"myFunc\", (s:String) => return \"hi\");```\n        ");
			}
		}
		let grammar = this.grammars.h[s];
		if(grammar == null) {
			throw haxe_Exception.thrown("\n        No symbol \"" + s + "\" exists in your grammar.\n        Ensure the object/map contains an array for this or\n        that you have stored this in memory.\n        example: ``` var grammar = {" + s + ": [\"choice1\", \"choice2\"]}; ```\n        example: ``` var grammar = {\"example\": [\"#" + s + ":some_other#\"]}; ```\n      ");
		}
		if(grammar.length <= 0) {
			throw haxe_Exception.thrown("\n        No choices in grammar for symbol \"" + s + "\", has 0 elements.\n        Try adding some.\n        example: ``` var grammar = {" + s + ": [\"choice1\", \"choice2\"]}; ```\n      ");
		}
		let pos = this.random.randomInt(0,grammar.length - 1);
		let expanded = grammar[pos];
		return expanded;
	}
	doTransforms(s,token) {
		let _g = 0;
		let _g1 = token.transforms;
		while(_g < _g1.length) {
			let transform = _g1[_g];
			++_g;
			let t = dropecho_storygen_Transforms.get(transform);
			if(t == null) {
				throw haxe_Exception.thrown("\n              No transform \"" + transform + "\" exists on the transforms object.\n              Double check spelling (#sym.capitalize#) or add transform to Transforms.\n              example: \n              ``` storygen.Transforms.set(\"myTransform\", (s:String) => return \"hi\");```\n            ");
			} else {
				s = t(s);
			}
		}
		return s;
	}
	parse(string) {
		let tempMemory = [];
		while(this.matcher.match(string)) {
			let match = this.matcher.matched(1);
			let token = new dropecho_storygen_Token(match);
			let expanded = this.expand(token);
			if(!token.isValid) {
				continue;
			}
			expanded = this.parse(expanded);
			if(token.isTransformed) {
				expanded = this.doTransforms(expanded,token);
			}
			if(token.isMemorized) {
				this.memory.h[token.memSymbol] = expanded;
				if(token.memSymbol.charAt(0) == "_") {
					tempMemory.push(token.memSymbol);
				}
			}
			if(token.isSilent) {
				string = string.replace(this.matcher.r,"");
			} else {
				string = string.replace(this.matcher.r,expanded);
			}
		}
		let _g = 0;
		while(_g < tempMemory.length) {
			let t = tempMemory[_g];
			++_g;
			let _this = this.memory;
			if(Object.prototype.hasOwnProperty.call(_this.h,t)) {
				delete(_this.h[t]);
			}
		}
		return string;
	}
	run(from,seed) {
		if(seed != null) {
			this.random.set_seed(haxe_Int64Helper.fromFloat(parseFloat(seed)));
		}
		let out;
		if(from.charAt(0) != "#") {
			out = this.parse("#" + from + "#");
		}
		out = this.parse(from);
		this.memory.h = Object.create(null);
		return out;
	}
	runAdvanced(from,seed) {
		if(seed != null) {
			this.random.set_seed(haxe_Int64Helper.fromFloat(parseFloat(seed)));
		}
		let output = this.parse(from);
		let memory_h = Object.create(null);
		let _g = haxe_ds_StringMap.kvIterator(this.memory.h);
		while(_g.hasNext()) {
			let _g1 = _g.next();
			let k = _g1.key;
			let v = _g1.value;
			memory_h[k] = v;
		}
		this.memory.h = Object.create(null);
		return { seed : this.getSeed(), output : output, memory : memory_h};
	}
	static configFromJson(json) {
		let json1 = JSON.parse(json);
		let _g = new haxe_ds_StringMap();
		let _g1 = 0;
		let _g2 = Reflect.fields(json1);
		while(_g1 < _g2.length) {
			let f = _g2[_g1];
			++_g1;
			_g.h[f] = Reflect.field(json1,f);
		}
		return _g;
	}
}
$hx_exports["Generator"] = dropecho_storygen_Generator;
dropecho_storygen_Generator.__name__ = "dropecho.storygen.Generator";
Object.assign(dropecho_storygen_Generator.prototype, {
	__class__: dropecho_storygen_Generator
});
class dropecho_storygen_Token {
	constructor(text) {
		this.isFunctionCall = new EReg("(.*)\\((.*)\\)","");
		this.shouldBeTransformed = new EReg("(.*?)\\.(.*)","");
		this.shouldBeMemorized = new EReg("(.*):(.*)","");
		this.shouldBeSilent = new EReg("\\[(.*?)\\]","");
		this.isValidToken = new EReg("#(.*?)#","");
		this.transforms = [];
		this.functionArgs = [];
		this.origText = text;
		this.isValid = this.isValidToken.match(text);
		if(this.isValid) {
			let token = this.isValidToken.matched(1);
			if(this.isSilent = this.shouldBeSilent.match(token)) {
				token = this.shouldBeSilent.matched(1);
			}
			if(this.isMemorized = this.shouldBeMemorized.match(token)) {
				this.memSymbol = this.shouldBeMemorized.matched(1);
				token = this.shouldBeMemorized.matched(2);
			}
			if(this.isTransformed = this.shouldBeTransformed.match(token)) {
				token = this.shouldBeTransformed.matched(1);
				this.transforms = this.shouldBeTransformed.matched(2).split(".");
			}
			if(this.isFunction = this.isFunctionCall.match(token)) {
				token = this.isFunctionCall.matched(1);
				let _this = this.isFunctionCall.matched(2).split(",");
				let result = new Array(_this.length);
				let _g = 0;
				let _g1 = _this.length;
				while(_g < _g1) {
					let i = _g++;
					result[i] = StringTools.trim(_this[i]);
				}
				let _g2 = [];
				let _g3 = 0;
				let _g4 = result;
				while(_g3 < _g4.length) {
					let v = _g4[_g3];
					++_g3;
					if(v != null && v != "") {
						_g2.push(v);
					}
				}
				this.functionArgs = _g2;
			}
			this.symbol = token;
		}
	}
}
dropecho_storygen_Token.__name__ = "dropecho.storygen.Token";
Object.assign(dropecho_storygen_Token.prototype, {
	__class__: dropecho_storygen_Token
});
class dropecho_storygen_Transforms {
	static isVowel(s) {
		let vowels = "aeiou";
		return vowels.indexOf(s.charAt(0)) != -1;
	}
	static capitalize(s) {
		let chars = s.split("");
		let f = chars.shift();
		return f.toUpperCase() + chars.join("");
	}
	static a(s) {
		if(dropecho_storygen_Transforms.isVowel(s.charAt(0))) {
			return "an " + s;
		} else {
			return "a " + s;
		}
	}
	static pluralize(s) {
		let end;
		switch(s.charAt(s.length - 1)) {
		case "h":
			end = "es";
			break;
		case "y":
			s = HxOverrides.substr(s,0,s.length - 1);
			end = "ies";
			break;
		default:
			end = "s";
		}
		return "" + s + end;
	}
	static get(name) {
		if(Object.prototype.hasOwnProperty.call(dropecho_storygen_Transforms.userTransforms.h,name)) {
			return dropecho_storygen_Transforms.userTransforms.h[name];
		}
		return Reflect.field(dropecho_storygen_Transforms,name);
	}
	static set(name,trans) {
		dropecho_storygen_Transforms.userTransforms.h[name] = trans;
	}
}
$hx_exports["Transforms"] = dropecho_storygen_Transforms;
dropecho_storygen_Transforms.__name__ = "dropecho.storygen.Transforms";
class haxe_Exception extends Error {
	constructor(message,previous,native) {
		super(message);
		this.message = message;
		this.__previousException = previous;
		this.__nativeException = native != null ? native : this;
	}
	get_native() {
		return this.__nativeException;
	}
	static thrown(value) {
		if(((value) instanceof haxe_Exception)) {
			return value.get_native();
		} else if(((value) instanceof Error)) {
			return value;
		} else {
			let e = new haxe_ValueException(value);
			return e;
		}
	}
}
haxe_Exception.__name__ = "haxe.Exception";
Object.assign(haxe_Exception.prototype, {
	__class__: haxe_Exception
});
class haxe_Int32 {
	static ucompare(a,b) {
		if(a < 0) {
			if(b < 0) {
				return ~b - ~a | 0;
			} else {
				return 1;
			}
		}
		if(b < 0) {
			return -1;
		} else {
			return a - b | 0;
		}
	}
}
class haxe_Int64 {
	static toString(this1) {
		let i = this1;
		let b_high = 0;
		let b_low = 0;
		if(i.high == b_high && i.low == b_low) {
			return "0";
		}
		let str = "";
		let neg = false;
		if(i.high < 0) {
			neg = true;
		}
		let this2 = new haxe__$Int64__$_$_$Int64(0,10);
		let ten = this2;
		while(true) {
			let b_high = 0;
			let b_low = 0;
			if(!(i.high != b_high || i.low != b_low)) {
				break;
			}
			let r = haxe_Int64.divMod(i,ten);
			if(r.modulus.high < 0) {
				let x = r.modulus;
				let high = ~x.high;
				let low = ~x.low + 1 | 0;
				if(low == 0) {
					let ret = high++;
					high = high | 0;
				}
				let this_high = high;
				let this_low = low;
				str = this_low + str;
				let x1 = r.quotient;
				let high1 = ~x1.high;
				let low1 = ~x1.low + 1 | 0;
				if(low1 == 0) {
					let ret = high1++;
					high1 = high1 | 0;
				}
				let this1 = new haxe__$Int64__$_$_$Int64(high1,low1);
				i = this1;
			} else {
				str = r.modulus.low + str;
				i = r.quotient;
			}
		}
		if(neg) {
			str = "-" + str;
		}
		return str;
	}
	static divMod(dividend,divisor) {
		if(divisor.high == 0) {
			switch(divisor.low) {
			case 0:
				throw haxe_Exception.thrown("divide by zero");
			case 1:
				let this1 = new haxe__$Int64__$_$_$Int64(dividend.high,dividend.low);
				let this2 = new haxe__$Int64__$_$_$Int64(0,0);
				return { quotient : this1, modulus : this2};
			}
		}
		let divSign = dividend.high < 0 != divisor.high < 0;
		let modulus;
		if(dividend.high < 0) {
			let high = ~dividend.high;
			let low = ~dividend.low + 1 | 0;
			if(low == 0) {
				let ret = high++;
				high = high | 0;
			}
			let this1 = new haxe__$Int64__$_$_$Int64(high,low);
			modulus = this1;
		} else {
			let this1 = new haxe__$Int64__$_$_$Int64(dividend.high,dividend.low);
			modulus = this1;
		}
		if(divisor.high < 0) {
			let high = ~divisor.high;
			let low = ~divisor.low + 1 | 0;
			if(low == 0) {
				let ret = high++;
				high = high | 0;
			}
			let this1 = new haxe__$Int64__$_$_$Int64(high,low);
			divisor = this1;
		}
		let this3 = new haxe__$Int64__$_$_$Int64(0,0);
		let quotient = this3;
		let this4 = new haxe__$Int64__$_$_$Int64(0,1);
		let mask = this4;
		while(!(divisor.high < 0)) {
			let v = haxe_Int32.ucompare(divisor.high,modulus.high);
			let cmp = v != 0 ? v : haxe_Int32.ucompare(divisor.low,modulus.low);
			let b = 1;
			b &= 63;
			if(b == 0) {
				let this1 = new haxe__$Int64__$_$_$Int64(divisor.high,divisor.low);
				divisor = this1;
			} else if(b < 32) {
				let this1 = new haxe__$Int64__$_$_$Int64(divisor.high << b | divisor.low >>> 32 - b,divisor.low << b);
				divisor = this1;
			} else {
				let this1 = new haxe__$Int64__$_$_$Int64(divisor.low << b - 32,0);
				divisor = this1;
			}
			let b1 = 1;
			b1 &= 63;
			if(b1 == 0) {
				let this1 = new haxe__$Int64__$_$_$Int64(mask.high,mask.low);
				mask = this1;
			} else if(b1 < 32) {
				let this1 = new haxe__$Int64__$_$_$Int64(mask.high << b1 | mask.low >>> 32 - b1,mask.low << b1);
				mask = this1;
			} else {
				let this1 = new haxe__$Int64__$_$_$Int64(mask.low << b1 - 32,0);
				mask = this1;
			}
			if(cmp >= 0) {
				break;
			}
		}
		while(true) {
			let b_high = 0;
			let b_low = 0;
			if(!(mask.high != b_high || mask.low != b_low)) {
				break;
			}
			let v = haxe_Int32.ucompare(modulus.high,divisor.high);
			if((v != 0 ? v : haxe_Int32.ucompare(modulus.low,divisor.low)) >= 0) {
				let this1 = new haxe__$Int64__$_$_$Int64(quotient.high | mask.high,quotient.low | mask.low);
				quotient = this1;
				let high = modulus.high - divisor.high | 0;
				let low = modulus.low - divisor.low | 0;
				if(haxe_Int32.ucompare(modulus.low,divisor.low) < 0) {
					let ret = high--;
					high = high | 0;
				}
				let this2 = new haxe__$Int64__$_$_$Int64(high,low);
				modulus = this2;
			}
			let b = 1;
			b &= 63;
			if(b == 0) {
				let this1 = new haxe__$Int64__$_$_$Int64(mask.high,mask.low);
				mask = this1;
			} else if(b < 32) {
				let this1 = new haxe__$Int64__$_$_$Int64(mask.high >>> b,mask.high << 32 - b | mask.low >>> b);
				mask = this1;
			} else {
				let this1 = new haxe__$Int64__$_$_$Int64(0,mask.high >>> b - 32);
				mask = this1;
			}
			let b1 = 1;
			b1 &= 63;
			if(b1 == 0) {
				let this1 = new haxe__$Int64__$_$_$Int64(divisor.high,divisor.low);
				divisor = this1;
			} else if(b1 < 32) {
				let this1 = new haxe__$Int64__$_$_$Int64(divisor.high >>> b1,divisor.high << 32 - b1 | divisor.low >>> b1);
				divisor = this1;
			} else {
				let this1 = new haxe__$Int64__$_$_$Int64(0,divisor.high >>> b1 - 32);
				divisor = this1;
			}
		}
		if(divSign) {
			let high = ~quotient.high;
			let low = ~quotient.low + 1 | 0;
			if(low == 0) {
				let ret = high++;
				high = high | 0;
			}
			let this1 = new haxe__$Int64__$_$_$Int64(high,low);
			quotient = this1;
		}
		if(dividend.high < 0) {
			let high = ~modulus.high;
			let low = ~modulus.low + 1 | 0;
			if(low == 0) {
				let ret = high++;
				high = high | 0;
			}
			let this1 = new haxe__$Int64__$_$_$Int64(high,low);
			modulus = this1;
		}
		return { quotient : quotient, modulus : modulus};
	}
}
class haxe__$Int64__$_$_$Int64 {
	constructor(high,low) {
		this.high = high;
		this.low = low;
	}
}
haxe__$Int64__$_$_$Int64.__name__ = "haxe._Int64.___Int64";
Object.assign(haxe__$Int64__$_$_$Int64.prototype, {
	__class__: haxe__$Int64__$_$_$Int64
});
class haxe_Int64Helper {
	static fromFloat(f) {
		if(isNaN(f) || !isFinite(f)) {
			throw haxe_Exception.thrown("Number is NaN or Infinite");
		}
		let noFractions = f - f % 1;
		if(noFractions > 9007199254740991) {
			throw haxe_Exception.thrown("Conversion overflow");
		}
		if(noFractions < -9007199254740991) {
			throw haxe_Exception.thrown("Conversion underflow");
		}
		let this1 = new haxe__$Int64__$_$_$Int64(0,0);
		let result = this1;
		let neg = noFractions < 0;
		let rest = neg ? -noFractions : noFractions;
		let i = 0;
		while(rest >= 1) {
			let curr = rest % 2;
			rest /= 2;
			if(curr >= 1) {
				let a_high = 0;
				let a_low = 1;
				let b = i;
				b &= 63;
				let b1;
				if(b == 0) {
					let this1 = new haxe__$Int64__$_$_$Int64(a_high,a_low);
					b1 = this1;
				} else if(b < 32) {
					let this1 = new haxe__$Int64__$_$_$Int64(a_high << b | a_low >>> 32 - b,a_low << b);
					b1 = this1;
				} else {
					let this1 = new haxe__$Int64__$_$_$Int64(a_low << b - 32,0);
					b1 = this1;
				}
				let high = result.high + b1.high | 0;
				let low = result.low + b1.low | 0;
				if(haxe_Int32.ucompare(low,result.low) < 0) {
					let ret = high++;
					high = high | 0;
				}
				let this1 = new haxe__$Int64__$_$_$Int64(high,low);
				result = this1;
			}
			++i;
		}
		if(neg) {
			let high = ~result.high;
			let low = ~result.low + 1 | 0;
			if(low == 0) {
				let ret = high++;
				high = high | 0;
			}
			let this1 = new haxe__$Int64__$_$_$Int64(high,low);
			result = this1;
		}
		return result;
	}
}
haxe_Int64Helper.__name__ = "haxe.Int64Helper";
class haxe_ValueException extends haxe_Exception {
	constructor(value,previous,native) {
		super(String(value),previous,native);
		this.value = value;
	}
}
haxe_ValueException.__name__ = "haxe.ValueException";
Object.assign(haxe_ValueException.prototype, {
	__class__: haxe_ValueException
});
class haxe_ds_StringMap {
	constructor() {
		this.h = Object.create(null);
	}
	static kvIterator(h) {
		let keys = Object.keys(h);
		let len = keys.length;
		let idx = 0;
		return { hasNext : function() {
			return idx < len;
		}, next : function() {
			idx += 1;
			let k = keys[idx - 1];
			return { key : k, value : h[k]};
		}};
	}
}
haxe_ds_StringMap.__name__ = "haxe.ds.StringMap";
Object.assign(haxe_ds_StringMap.prototype, {
	__class__: haxe_ds_StringMap
});
class haxe_iterators_ArrayIterator {
	constructor(array) {
		this.current = 0;
		this.array = array;
	}
	hasNext() {
		return this.current < this.array.length;
	}
	next() {
		return this.array[this.current++];
	}
}
haxe_iterators_ArrayIterator.__name__ = "haxe.iterators.ArrayIterator";
Object.assign(haxe_iterators_ArrayIterator.prototype, {
	__class__: haxe_iterators_ArrayIterator
});
class js_Boot {
	static getClass(o) {
		if(o == null) {
			return null;
		} else if(((o) instanceof Array)) {
			return Array;
		} else {
			let cl = o.__class__;
			if(cl != null) {
				return cl;
			}
			let name = js_Boot.__nativeClassName(o);
			if(name != null) {
				return js_Boot.__resolveNativeClass(name);
			}
			return null;
		}
	}
	static __nativeClassName(o) {
		let name = js_Boot.__toStr.call(o).slice(8,-1);
		if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") {
			return null;
		}
		return name;
	}
	static __resolveNativeClass(name) {
		return $global[name];
	}
}
js_Boot.__name__ = "js.Boot";
class seedyrng_Random {
	constructor(seed,generator) {
		if(seed == null) {
			let this1 = new haxe__$Int64__$_$_$Int64(seedyrng_Random.randomSystemInt(),seedyrng_Random.randomSystemInt());
			seed = this1;
		}
		if(generator == null) {
			generator = new seedyrng_Xorshift128Plus();
		}
		this.generator = generator;
		this.set_seed(seed);
	}
	get_seed() {
		return this.generator.get_seed();
	}
	set_seed(value) {
		return this.generator.set_seed(value);
	}
	get_usesAllBits() {
		return this.generator.get_usesAllBits();
	}
	nextInt() {
		return this.generator.nextInt();
	}
	nextFullInt() {
		if(this.generator.get_usesAllBits()) {
			return this.generator.nextInt();
		} else {
			let num1 = this.generator.nextInt();
			let num2 = this.generator.nextInt();
			num2 = num2 >>> 16 | num2 << 16;
			return num1 ^ num2;
		}
	}
	random() {
		let upper = this.nextFullInt() & 2097151;
		let lower = this.nextFullInt();
		let b = upper * Math.pow(2,32);
		let floatNum = UInt.toFloat(lower) + b;
		let result = floatNum * Math.pow(2,-53);
		return result;
	}
	randomInt(lower,upper) {
		return Math.floor(this.random() * (upper - lower + 1)) + lower;
	}
	static randomSystemInt() {
		let value = Std.random(255) << 24 | Std.random(255) << 16 | Std.random(255) << 8 | Std.random(255);
		return value;
	}
}
seedyrng_Random.__name__ = "seedyrng.Random";
Object.assign(seedyrng_Random.prototype, {
	__class__: seedyrng_Random
});
class seedyrng_Xorshift128Plus {
	constructor() {
		this._currentAvailable = false;
		let this1 = new haxe__$Int64__$_$_$Int64(0,1);
		this.set_seed(this1);
	}
	get_usesAllBits() {
		return false;
	}
	get_seed() {
		return this._seed;
	}
	set_seed(value) {
		let b_high = 0;
		let b_low = 0;
		if(!(value.high != b_high || value.low != b_low)) {
			let this1 = new haxe__$Int64__$_$_$Int64(0,1);
			value = this1;
		}
		this._seed = value;
		this._state0 = value;
		this._state1 = seedyrng_Xorshift128Plus.SEED_1;
		this._currentAvailable = false;
		return value;
	}
	stepNext() {
		let x = this._state0;
		let y = this._state1;
		this._state0 = y;
		let b = 23;
		b &= 63;
		let b1;
		if(b == 0) {
			let this1 = new haxe__$Int64__$_$_$Int64(x.high,x.low);
			b1 = this1;
		} else if(b < 32) {
			let this1 = new haxe__$Int64__$_$_$Int64(x.high << b | x.low >>> 32 - b,x.low << b);
			b1 = this1;
		} else {
			let this1 = new haxe__$Int64__$_$_$Int64(x.low << b - 32,0);
			b1 = this1;
		}
		let this1 = new haxe__$Int64__$_$_$Int64(x.high ^ b1.high,x.low ^ b1.low);
		x = this1;
		let a_high = x.high ^ y.high;
		let a_low = x.low ^ y.low;
		let b2 = 17;
		b2 &= 63;
		let b3;
		if(b2 == 0) {
			let this1 = new haxe__$Int64__$_$_$Int64(x.high,x.low);
			b3 = this1;
		} else if(b2 < 32) {
			let this1 = new haxe__$Int64__$_$_$Int64(x.high >> b2,x.high << 32 - b2 | x.low >>> b2);
			b3 = this1;
		} else {
			let this1 = new haxe__$Int64__$_$_$Int64(x.high >> 31,x.high >> b2 - 32);
			b3 = this1;
		}
		let a_high1 = a_high ^ b3.high;
		let a_low1 = a_low ^ b3.low;
		let b4 = 26;
		b4 &= 63;
		let b5;
		if(b4 == 0) {
			let this1 = new haxe__$Int64__$_$_$Int64(y.high,y.low);
			b5 = this1;
		} else if(b4 < 32) {
			let this1 = new haxe__$Int64__$_$_$Int64(y.high >> b4,y.high << 32 - b4 | y.low >>> b4);
			b5 = this1;
		} else {
			let this1 = new haxe__$Int64__$_$_$Int64(y.high >> 31,y.high >> b4 - 32);
			b5 = this1;
		}
		let this2 = new haxe__$Int64__$_$_$Int64(a_high1 ^ b5.high,a_low1 ^ b5.low);
		this._state1 = this2;
		let a = this._state1;
		let high = a.high + y.high | 0;
		let low = a.low + y.low | 0;
		if(haxe_Int32.ucompare(low,a.low) < 0) {
			let ret = high++;
			high = high | 0;
		}
		let this3 = new haxe__$Int64__$_$_$Int64(high,low);
		this._current = this3;
	}
	nextInt() {
		if(this._currentAvailable) {
			this._currentAvailable = false;
			return this._current.low;
		} else {
			this.stepNext();
			this._currentAvailable = true;
			return this._current.high;
		}
	}
}
seedyrng_Xorshift128Plus.__name__ = "seedyrng.Xorshift128Plus";
Object.assign(seedyrng_Xorshift128Plus.prototype, {
	__class__: seedyrng_Xorshift128Plus
});
if(typeof(performance) != "undefined" ? typeof(performance.now) == "function" : false) {
	HxOverrides.now = performance.now.bind(performance);
}
String.prototype.__class__ = String;
String.__name__ = "String";
Array.__name__ = "Array";
js_Boot.__toStr = ({ }).toString;
dropecho_storygen_Functions.funcs = (function($this) {
	var $r;
	let _g = new haxe_ds_StringMap();
	_g.h["random"] = function(gen,args) {
		let min = Std.parseInt(args[0]);
		let max = Std.parseInt(args[1]);
		let int = gen.random.randomInt(min,max);
		if(int == null) {
			return "null";
		} else {
			return "" + int;
		}
	};
	_g.h["switch"] = function(gen,args) {
		let symbol = args.shift();
		let parsed = gen.memory.h[symbol];
		if(parsed != null) {
			let _g = 0;
			while(_g < args.length) {
				let a = args[_g];
				++_g;
				let split = a.split("=>");
				if(split[0] == parsed) {
					return "#" + split[1] + "#";
				}
			}
		}
		return "";
	};
	$r = _g;
	return $r;
}(this));
dropecho_storygen_Transforms.userTransforms = new haxe_ds_StringMap();
seedyrng_Xorshift128Plus.SEED_1 = (function($this) {
	var $r;
	let this1 = new haxe__$Int64__$_$_$Int64(842650776,685298713);
	$r = this1;
	return $r;
}(this));
})(typeof exports != "undefined" ? exports : typeof window != "undefined" ? window : typeof self != "undefined" ? self : this, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
