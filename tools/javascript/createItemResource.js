const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");

const PATH_TO_WRITE_TO = path.join(__dirname, "..", "..", "src", "Items");

const createResource = (record) => {
	const [
		assetDone,
		num,
		id,
		name,
		type,
		description,
		usageLeft,
		daysLeft,
		hp,
		sp,
		isUsable,
		isDiscardable,
		isCombinable,
		isEquippable,
		stateAfterUse,
		foundIn,
		location,
		rarity,
		weighting
	] = record;
	
	const fileTemplate = "./ItemResource.tres";
	const filename = path.join(PATH_TO_WRITE_TO, `${id}.tres`);

	const source = fs.readFileSync(fileTemplate).toString();
	const template = handlebars.compile(source);
	const obj = {
		ITEM_ID: id,
		ITEM_NAME: name,
		ITEM_DESCRIPTION: description,
		ITEM_USAGE: parseFloat(usageLeft),
		ITEM_HP: Number(hp).toFixed(1),
		ITEM_SP: Number(sp).toFixed(1),
		ITEM_DAYS_LEFT: daysLeft,
		ITEM_DAYS_MAX: daysLeft,
		ITEM_IS_USABLE: isUsable === 'Y' ? true : false,
		ITEM_IS_DISCARDABLE: isDiscardable === 'Y' ? true : false,
		ITEM_IS_COMBINABLE: isCombinable === 'Y' ? true : false,
		ITEM_IS_EQUIPPABLE: isEquippable === 'Y' ? true : false,
		ITEM_STATE_AFTER_USE: stateAfterUse,
		ITEM_TYPE: type,
		ITEM_FOUND_IN: foundIn,
		ITEM_LOCATION: location,
		ITEM_RARITY: rarity,
		ITEM_WEIGHTING: parseFloat(weighting),
	}
	const outputString = template(obj);

	console.log(obj);

	fs.writeFileSync(filename, outputString);
};

module.exports = createResource;
