// events...

export const EVT_UPDATE = 1;
export const EVT_DESTROY = 2;
export const EVT_FORMAT = 3;

// elements...

export const NUL = "default";
export const COL = "column";
export const ROW = "row";
export const BTN = "button";
export const TOG = "toggle";
export const SLDR = "slider";
export const KNB = "knob";
export const TXT = "text";
export const RNG = "range";
export const AXS = "axis";
export const JOY = "joystick";
export const COLR = "colour";
export const VCTR = "vector";
export const SHP = "shape";
export const MTX = "matrix";
export const DRP = "dropdown";
export const NMBX = "numbox";
export const CNTN = "content";

// variants...

export const SLDR_CMPCT = 0;
export const SLDR_FLL = 1;
export const TXT_TXT = 0;
export const TXT_PASS = 1;
export const TXT_NUM = 2;
export const TXT_EML = 3;
export const MTX_BTN = BTN;
export const MTX_TOG = TOG;
export const MTX_SLDR = SLDR;
export const MTX_KNB = KNB;
export const MTX_AXS = AXS;

export const VARIANTS = {
	[SLDR_CMPCT]: "slider-compact",
	[SLDR_FLL]: "slider-full",
	[MTX_BTN]: "matrix-button",
	[MTX_TOG]: "matrix-toggle",
	[MTX_SLDR]: "matrix-slider",
	[MTX_KNB]: "matrix-knob",
	[MTX_AXS]: "matrix-axis" 
};

export let VARIANT = {

	[MTX_SLDR]: {
		rotate: 0
	}

};


import { XY, HSLA, LRTB } from './utilities/types.js'


export const PREFS = {
	width: "auto",
	height: "auto",
	rotate: 0,
	spacer: "10px",
	label: "above",
	grow: false
};

export let PROPS = {

	[NUL]: {
		...PREFS,
		name: "Default",
		type: NUL
	},
	[COL]: {
		...PREFS,
		name: "Column",
		children: [],
		type: COL,
		label: "none",
		grow: false
	},
	[ROW]: {
		...PREFS,
		name: "Row",
		children: [],
		type: ROW,
		label: "none",
		grow: false
	},
	[BTN]: {
		...PREFS,
		name: "Button",
		value: false,
		mode: 1,
		type: BTN
	},
	[TOG]: {
		...PREFS,
		name: "Toggle",
		value: false,
		mode: 2,
		type: TOG
	},
	[SLDR]: {
		...PREFS,
		name: "Slider",
		value: 0.5,
		min: 0,
		max: 1,
		type: SLDR,
		variant: SLDR_CMPCT,
		steps: 3840
	},
	[KNB]: {
		...PREFS,
		name: "Knob",
		value: 0.5,
		min: 0,
		max: 1,
		type: SLDR
	},
	[TXT]: {
		...PREFS,
		name: "Text",
		value: "",
		placeholder: "Enter some text...",
		type: TXT,
		variant: "text"
	},
	[RNG]: {
		...PREFS,
		name: "Range",
		value: XY(0.25, 0.75),
		min: XY(0,0),
		max: XY(1,1),
		type: RNG
	},
	[AXS]: {
		...PREFS,
		name: "Axis",
		value: XY(0.5, 0.5),
		min: XY(0,0),
		max: XY(1,1),
		type: AXS
	},
	[JOY]: {
		...PREFS,
		name: "Joystick",
		value: XY(0.5, 0.5),
		min: XY(0,0),
		max: XY(1,1),
		type: RNG
	},
	[MTX]: {
		...PREFS,
		name: "Matrix",
		value: [],
		type: MTX,
		variant: MTX_BTN,
		count: 16,
		columns: 4
	},
	[COLR]: {
		...PREFS,
		name: "Colour",
		value: HSLA(1,1,0.5,1),
		type: COLR
	},
	[VCTR]: {
		...PREFS,
		name: "Vector",
		value: [],
		type: VCTR
	},
	[DRP]: {
		...PREFS,
		name: "Index",
		value: -1,
		key: "name",
		placeholder: "Select an option",
		options: [
			{value: false, name: "One"},
			{value: false, name: "Two"},
			{value: false, name: "Three"}
		],
		type: DRP
	}

};
