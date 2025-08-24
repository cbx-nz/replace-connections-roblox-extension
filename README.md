# Roblox Friends Text Replacer

A browser extension that replaces "connections" with "friends" on the Roblox website.

## Features

- Automatically replaces various forms of "connections" with "friends" throughout the Roblox website
- Works on dynamically loaded content
- Replaces text in both content and attributes (placeholders, titles, etc.)
- Supports different capitalizations:
  - 'Connections': 'Friends',
  -              'connections': 'friends',
  -              'CONNECTION': 'FRIEND',
  -              'Connection': 'Friend',
  -              'Connect': 'Add Friend',
  -              'connect': 'Add Friend',
  -              'Connected': 'Added Friend',
  -              'connected': 'Added Friend'

## Installation

### Chrome/Edge (Manual Installation)

1. Open Chrome/Edge and go to `chrome://extensions/` (or `edge://extensions/`)
2. Enable "Developer mode" in the top right corner
3. Click "Load unpacked"
4. Select the folder containing this extension
5. The extension will be loaded and active on Roblox websites

### Firefox (Manual Installation)

1. Open Firefox and go to `about:debugging`
2. Click "This Firefox"
3. Click "Load Temporary Add-on"
4. Select the `manifest.json` file from this folder
5. The extension will be loaded temporarily

## How it Works

The extension uses a content script that:

1. Scans all text content on Roblox pages when they load
2. Monitors for dynamically added content using MutationObserver
3. Replaces instances of "connections" with "friends" in real-time
4. Also checks common attributes like placeholders and titles

## Files

- `manifest.json` - Extension configuration
- `content.js` - Main script that performs text replacement
- `README.md` - This file

## Supported Browsers

- Chrome (Version 88+)
- Edge (Version 88+)
- Firefox (with some limitations)

## Notes

- The extension only works on `*.roblox.com` domains
- It automatically handles both static and dynamic content
- The extension runs after the page loads to ensure all content is processed
