# H. Gokaldas & Co. — Homepage and Product Catalogue Preview

## Run locally
1. Extract this ZIP to a folder.
2. Double-click `RUN-LOCAL.bat` on Windows. It starts a local web server and opens the preview in your browser.
3. If Windows blocks the batch file, open PowerShell in this folder and run `python -m http.server 8001`, then visit `http://localhost:8001`.

## Included
- Homepage styled around the supplied HGC reference, including the original office/motif composite.
- Product category pages and catalogue data loaded from the supplied spreadsheet.
- Functional product search, category/dye class/application/shade filters, and enquiry navigation.
- Product Finder on a flat `#68B92E` background with supplied white motif artwork; controls are real HTML inputs/selects.
- Contact strip artwork cropped from the supplied continuous motif illustration.
- Solid-green footer with no texture, gradient, or decorative overlay.
- Animated Three.js 3D Earth with a green India texture and country dots/labels only (no route arrows).

## Globe note
The 3D globe loads Three.js 0.160.0 from jsDelivr at runtime, so the browser needs an internet connection for that library. The globe itself is rendered in code using the local Earth texture; it is not a screenshot.

## Important
This is a front-end preview. The enquiry form prepares an email in the visitor's email application; it does not send enquiries to a server by itself. Before publishing, connect a real enquiry backend and review company-approved legal text.
