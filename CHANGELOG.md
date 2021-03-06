# Change Log
All notable changes to the "rocket-code" extension will be documented in this file.

## 0.2.2 [2017-04-03]
- Improved code fence formatting in room preview, a few issues remain (mainly inline `code` and inline formatting)

## 0.2.1 [2017-04-03]
- Replace CRLF in selected text with LF to avoid double-spacing in Rocket.Chat code fences

## 0.2.0 [2017-03-30]
- Room conversation view in editor column two (still lacks support for code fences and images - coming soon!)

## 0.1.0 [2017-03-29]
- First release

## 0.0.4 [Unreleased]
- Added switching rooms (channel, group, im)
- Added sending message to current room
- Added sending selection in current editor to current room

## 0.0.3 [Unreleased]
- Refactored implementations of extension functions
- Refactored API
- Added auto-login on startup option
- List @ims
- Switch between current channel/group/im

## 0.0.2 [Unreleased]
- Changed activation event from "*" to login()
- Added icon for extension
- List joined channels
- Select current channel

## 0.0.1 [Unreleased]
- Implement basic Rocket.Chat API access
- Add configuration settings
- Login/logout via command palette and on startup.
