const createImage = require("./createItemImage");
const createResource = require("./createItemResource");

const parse = require("csv-parse");
const fs = require("fs");

const processFile = async () => {
	records = [];
	const parser = fs.createReadStream(`./items.csv`).pipe(
		parse({
			fromLine: 3,
		})
	);
	for await (const record of parser) {
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
			foundIn
		] = record;

		// createImage(id);
		createResource(record);
	}
};

(async () => {
	const records = await processFile();
})();
