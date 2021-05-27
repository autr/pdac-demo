export const updateCallback = (key, property, json, object) => {
	if (!property) object = clean(json);
	if (property) object[property] = json;
	return {updated: true, object, list: [object.key]};
}

export const addCallback = (key, position, json, object) => {
	object.children = object.children || [];
	position = Clamp(position, 0, object.children.length);
	const item = clean(json);
	object.children.splice(position,0,json);
	return {updated: true, object, list: [object.key]};
}
export const destroyCallback = (key, position, json, object) => {
	object.children = object.children || [];
	position = Clamp(position, 0, object.children.length-1);
	object.children.splice(position,1);
	return {updated: true, object, list: [object.key]};
}

export const recursiveOperator = (key, argument, json, object, callback) => {
	if (object.key == key) {
		return callback( key, argument, json, object );
	} else {
		if (object.children) {
			for( let i = 0; i < object.children.length;i++) {
				const c = recursiveOperator(key, argument, json, object.children[i], callback);
				if (c.updated) {
					c.list.push(object.key);
					object.children[i] = c.object;
					return {updated: true, object, list: c.list};
					break;
				}
			}
			return {updated: false, object};
		} else {
			return {updated: false, object};
		}
	}
}

export const isEmptyObject = (obj) => {
	return Object.keys(obj).length === 0 && obj.constructor === Object
};


export const cloneObject = (obj) => {
	return JSON.parse(JSON.stringify(obj));
};


export const isSameObject = (a_, b_) => {
	const a = JSON.stringify(a_);
	const b = JSON.stringify(b_);
	return (a == b);
};

