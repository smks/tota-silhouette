const path = require('path');
const fs = require('fs');

const NO_DEFINED_LOCATION_LEVEL = path.resolve(__dirname, '..', '..', 'src', 'LevelTypes', 'Level.tscn');
const FOREST_LEVEL = path.resolve(__dirname, '..', '..', 'src', 'LevelTypes', 'LevelForest.tscn');
const MOORLANDS_LEVEL = path.resolve(__dirname, '..', '..', 'src', 'LevelTypes', 'LevelMoorlands.tscn');
const MEADOWS_LEVEL = path.resolve(__dirname, '..', '..', 'src', 'LevelTypes', 'LevelMeadows.tscn');
const MOUNTAINS_LEVEL = path.resolve(__dirname, '..', '..', 'src', 'LevelTypes', 'LevelMountains.tscn');
const VALLEYS_LEVEL = path.resolve(__dirname, '..', '..', 'src', 'LevelTypes', 'LevelValleys.tscn');
const CANYONS_LEVEL = path.resolve(__dirname, '..', '..', 'src', 'LevelTypes', 'LevelCanyons.tscn');
const DARKFOREST_LEVEL = path.resolve(__dirname, '..', '..', 'src', 'LevelTypes', 'LevelDarkForest.tscn');
const BEACH_LEVEL = path.resolve(__dirname, '..', '..', 'src', 'LevelTypes', 'LevelBeach.tscn');

const MAX_X_ROOM = 7;
const MAX_Y_ROOM = 20;
const ROOM_SIZE_X = 1280;
const ROOM_SIZE_Y = 720;

var resource_paths = [];
var packed_scenes = [];
var tests_for_world = ['var level\n'];

let id = 1;
let data = '';

// Levels already designed (Outputted by outputLevels.js)
const blackList = [
	'0,-7',
	'0,-6',
	'0,-5',
	'0,-4',
	'0,-3',
	'0,-2',
	'0,-1',
	'0,0',
	'0,1',
	'0,2',
	'1,-7',
	'1,-6',
	'1,-5',
	'1,-4',
	'1,-3',
	'1,-2',
	'1,-1',
	'1,0',
	'1,1',
	'1,2',
	'2,-7',
	'2,-6',
	'2,-5',
	'2,-4',
	'2,-3',
	'2,-2',
	'2,-1',
	'2,0',
	'2,1',
	'2,2',
	'3,-7',
	'3,-6',
	'3,-5',
	'3,-4',
	'3,-3',
	'3,-2',
	'3,-1',
	'3,0',
	'3,1',
	'3,2',
	'4,-7',
	'4,-6',
	'4,-5',
	'4,-4',
	'4,-3',
	'4,-2',
	'4,-1',
	'4,0',
	'4,1',
	'4,2',
	'5,-7',
	'5,-6',
	'5,-5',
	'5,-4',
	'5,-3',
	'5,-2',
	'5,-1',
	'5,0',
	'5,1',
	'5,2',
	'6,-7',
	'6,-6',
	'6,-5',
	'6,-4',
	'6,-3',
	'6,-2',
	'6,-1',
	'6,0',
	'6,1',
	'6,2',
	'7,-7',
	'7,-6',
	'7,-5',
	'7,-4',
	'7,-3',
	'7,-2',
	'7,-1',
	'7,0',
	'7,1',
	'7,2'
]

function checkLocationByCoords(x, y) {

	if (x >= 0 && x <= 7 && y >= -2 && y <= 4) {
		return { name: 'MOORLANDS', levelPath: MOORLANDS_LEVEL };
	}

	if (x >= 8 && x <= 13 && y >= -3 && y <= 4) {
		return { name: 'FOREST', levelPath: FOREST_LEVEL };
	}
	
	if (x >= 0 && x <= 7 && y >= -7 && y <= -3) {
		return { name: 'MEADOWS', levelPath: MEADOWS_LEVEL };
	}

	if (x >= 0 && x <= 13 && y >= -11 && y <= -8) {
		return { name: 'MOUNTAINS', levelPath: MOUNTAINS_LEVEL };
	}

	if (x >= 14 && x <= 20 && y >= -7 && y <= -4) {
		return { name: 'CANYONS', levelPath: CANYONS_LEVEL };
	}

	if (x >= 12 && x <= 20 && y >= 2 && y <= 4) {
		return { name: 'VALLEYS', levelPath: VALLEYS_LEVEL };
	}

	if (x >= 14 && x <= 20 && y >= -3 && y <= 1) {
		return { name: 'DARKFOREST', levelPath: DARKFOREST_LEVEL };
	}

	return { name: 'BEACH', levelPath: BEACH_LEVEL };
}

for (let y = -MAX_X_ROOM; y<= MAX_X_ROOM; y++) {
  for (let x = 0; x <= MAX_Y_ROOM; x++) {

	if (blackList.includes(`${x},${y}`)) {
		console.log(`excluding ${x},${y}`);
		continue;
	}

    const level = `Level(${x}_${y})`;
    const fileName = `Levels/${level}.tscn`
	const filePath = path.resolve(__dirname, '..', '..', 'src', fileName)

    const xPos = ROOM_SIZE_X * x;
    const yPos = ROOM_SIZE_Y * y;

	console.log(`[ext_resource path="res://src/${fileName}" type="PackedScene" id=${id}]`)

    resource_paths.push(`[ext_resource path="res://src/${fileName}" type="PackedScene" id=${id}]`);

    packed_scenes.push(
      `[node name="${level}" parent="Levels" instance=ExtResource( ${id} )]\nposition = Vector2( ${xPos}, ${yPos} )\n`
    )

	tests_for_world.push(
`level = levels.get_node('${level}')
assert_is(level, Node2D)
assert_eq(level.position, Vector2(${xPos}, ${yPos}))`
	);

    id++;

	var { name, levelPath } = checkLocationByCoords(x, y);

	data += `Creating level ${name} at coords (${x}, ${y})\n`

    fs.readFile(levelPath, 'utf8', function (err, data) {
      if (err) {
        return console.log(err);
      }

	  // update level guide texture image
      let newData = data.replace('Level(0_0).png', `${level}.png`);

      fs.writeFile(filePath, newData, function (err, result) {
        if (err) {
          return console.log(err);
        }
      });
    });
  }
}

data += '======================' + '\n\n'

resource_paths.map(rp => {
	if (rp === undefined) {
		return;
	}
	data += rp + '\n';
});

packed_scenes.map(ps => {
	if (ps === undefined) {
		return;
	}
	data += ps + '\n';
});

data += '======================' + '\n\n'

tests_for_world.map(t => {
	if (t === undefined) {
		return;
	}
	data += t + '\n\n';
});

const sceneFilePath = path.resolve(__dirname, 'scenes.md')

fs.writeFileSync(sceneFilePath, data);
