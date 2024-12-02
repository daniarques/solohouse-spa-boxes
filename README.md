# Solo House boxes

## Overview

This repository contains the front-end for Solo House's boxes.
The purpose of the app is showing a map with all the boxes. When accessed to a box, the user can "buy" shirts (very
simple buy, no payment gateway).
All the info seen is retrieved dynamically from the back-end.

## Guidelines

1. Follow guidelines in back-end repo: https://github.com/daniarques/solohouse-boxes
2. Clone this repository
3. `npm i`
4. `npm run dev`
5. Go to http://localhost:5174

## Pending improvements:

- Add user login
- Show QR after purchase confirmation. When the QR is scanned, it should flag the purchase as "picked"
- Add component where user can see the list of shirts they have pending to pick

## Usage demo

![Solo House boxes map demo.gif](docs/Solo%20House%20boxes%20map%20demo.gif)