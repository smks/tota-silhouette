# Tribe of the Accord

## Directories
 
`assets/` Contains all imagery, animations and JSON files needed for the game to function.

`addons/` Contains all third party code.

`src/` Contains all of the production code.

`sandbox/` is used to trial out certain features in scenes that are not part of the official codebase.

`wwise/` contains all SoundBanks for the game to work with sophisticated audio. Check out `wwise/README.md` for more information.

---
 
## Useful Scenes to open

1. `Game` - is the root scene that runs and is the container for all scenes.
1. `Part_Gameloop` - is the main scene that contains the entire world
1. `Part_MainMenu` - is the main menu screen
1. `Part_FirstNight` - is the first cutscene

---

## Tools to Install

We use [Godot Toolkit](https://github.com/Scony/godot-gdscript-toolkit) to run linting and check code complexity. You'll need Python and gdtoolkit installed before running any shell scripts below.

```sh
pip3 install 'gdtoolkit==3.*'
```

### Run linting and apply it on project

```
sh tools/bin/lint-scripts-apply.sh
```

### Run code complexity

```
sh tools/bin/lint-scripts-apply.sh
```

### Create Scene test files

```
sh tools/bin/create-scene-test-files.sh
```

### Create Script test files

```
sh tools/bin/create-script-test-files.sh
```

---

## Testing

We use [GUT](https://github.com/bitwes/Gut) to run tests.

https://github.com/bitwes/Gut/wiki/Asserts-and-Methods#assert_has_method
