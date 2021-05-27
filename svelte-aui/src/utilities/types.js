// types...

export const Int = (v) => {
	return parseInt( v );
};
export const Float = (v, d) => {
	if (d) return parseFloat(v).toPrecision(d);
	return parseFloat( v );
};
export const XY = (x, y) => {
	return {x: x, y: y};
};
export const XYZ = (x, y, z) => {
	return {x: x, y: y, z: z};
};
export const RGBA = (r, g, b, a) => {
	return {r: r, g: g, b: b, a: a};
};
export const HSLA = (h, s, l, a) => {
	return {h: h, s: s, l: l, a: a};
};
export const OPT = (value, name, meta) => {
	return { value, name, meta: {...meta} };
}

export const LRTB = (l,r,t,b) => {
	l = l || 10;
	if (r == undefined && t == undefined && b == undefined) {
		r = l;
		t = r;
		b = r;
	} else if (r != undefined && t == undefined && b == undefined) {
		t = r;
		b = r;
		r = l;
	} else if (r != undefined && t != undefined && b == undefined) {
		b = t;
	}
	return {
		left: l,
		right: r,
		top: t,
		bottom: b
	}
};
