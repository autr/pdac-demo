
import { createEventDispatcher } from 'svelte';
import { store } from './../Store.js'


export const Event = (key, a) => {
	return {key, a, value: a[key]};
};

export const Helper = function () {
	this.dispatcher = createEventDispatcher();
	this.set = ( key, value, a ) => {
		a[key] = value;
		this.dispatcher( 'updated', Event(key, a));
		return a;
	}
};

