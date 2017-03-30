[![Stories in Ready](https://badge.waffle.io/andre-f/rocket-code.png?label=ready&title=Ready)](https://waffle.io/andre-f/rocket-code)


![logo](images/icon128.png)
# Rocket.Code

This Extension lets you post to Rocket.Chat from within Visual Studio Code. It supports channels, groups and instant messages, as well as posting code snippets.

The Extension loads when you call the "Rocket.Code login" command from the palette.

## Features

* switch between joined channels, groups and instant messages (aka _rooms_)
* Post a message to the current room (if nothing is selected in the current editor)
* Post code snippet to the current room (if text is selected in the editor, it will be included in a code fence)
* View the conversation in the current room in an editor pane (similar to Markdown preview)

## Requirements

Visual Studio Code (obviously).

## Key Bindings

Currently, only `Ctrl-Shift-Enter` (`Cmd-Shift-Enter` on Mac), which either sends the selection to the current room, or else asks you for a message to send.

## Extension Settings

This extension contributes the following settings:

* `rocketCode.serverUrl`: The URL of the Rocket.Chat server, e.g. https://rocket.example.com
* `rocketCode.apiPath`: The path of the Rocket.Chat API, currently `api/v1` - you shouldn't need to change this
* `rocketCode.username`: Your Rocket.Chat username
* `rocketCode.password`: Your Rocket.Chat password
* `rocketCode.channel`: The default channel to post to (you can post to a different #channel/@DM at any time)
* `rocketCode.loginOnStartup`: Whether to connect to Rocket.Chat when VSCode starts. `false` by default.

### Using Environment Variables and/or the workspace

You can connect to different Rocket.Chat servers for various projects, simply put the `rocketCode` settings in your workspace settings. This way, you can connect to your work server when on a work project, and a private server for a private project.

You can also set your Rocket.Chat credentials using environment variables:

* `ROCKET_SERVER`
* `ROCKET_USER`
* `ROCKET_PASSWORD`

The order of precedence is:

1. Workspace settings
1. User settings
1. Environment variables

You can also use a utility such as `direnv`, which you can get here: [https://github.com/direnv/direnv](https://github.com/direnv/direnv)

This allows you to set the `ROCKET_*` environment variables per directory, and gives you the best of both worlds.

## Planned Features

* Improve the side view of the current room's conversation - code fences, images, etc.
* Edit or delete the last message
* ??? (suggestions welcome)

## Known Issues

* Not all features are implemented yet
* Needs more tests...

## Release Notes

Please see the CHANGELOG
