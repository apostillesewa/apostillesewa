Add the Trustpilot bootstrap script to the root layout <head>, then insert the Trustpilot widget container in the Footer, centered above the copyright bar, with spacing that matches the existing clean design.

Files to change:
- `src/routes/__root.tsx`: add the Trustpilot bootstrap script to `scripts` in `head()`.
- `src/components/site/Footer.tsx`: insert the widget block centered above the copyright row.

No other dependencies or logic changes are required.