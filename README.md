## AppointMe

## TODO:

- REACT HOOK FORM to replace state on forms... refactor register form

 - Auth:
    - implement auth checking and limiting routes/functionality
    - Check logged in status
    - Manage token refresh
    - Refresh token if access token expired but refresh token unexpired
    - Implement middleware to check for logged in status and redirect to appropriate resource

 - Use Dialog for popup forms...
 - Chip/toast to confirm appointment booked

 - settings-menu
    - Add a heading and close button to drawer
    - think of a few more features to implement - account settings with password reset etc perhaps

- profile page
    - implement display picture upload and edit with default image (frontend and backend)
    - Finish display of appointment history

- ADMIN PANEL
    - Services blurb - description to include on the services page
    - create/update/delete services forms
    - create/update/delete business forms


## Improvements:
 - logo as SVG
 - highlight upcoming appointments on the current day
 - deal with header indicator color...
 - calendar day default to next business day if is weekend
 - calendar date defaults to current day (or next business day) - choosing a date sets the fetch reference point, data will be fetched around that date. Auto load more data fetches from client side
 - modify logo home link to only work on image, not the containing div
 - Create user feedback context so I can implement a single success / error message handler at the application level. This will also make messages persist when they originate from a model and will display even if the modal closes.

## Future Additions to site:
 - breadcrumbs - mobile view in header - desktop view above page body
 - speed dial for quick access actions when logged in - for businessRep
 - User password reset

## Future issues to solve:
 - better method for getting viewport width/user agent for useState in layout to prevent page from rendering twice. some nice user agent solutions to set initial values here:https://stackoverflow.com/questions/59494037/how-to-detect-the-device-on-react-ssr-app-with-next-js and here: https://stackoverflow.com/questions/63928337/css-style-is-not-correctly-being-applied-when-conditional-render-in-react
