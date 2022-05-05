## AppointMe

## TODO:

### CRITICAL

 - Auth:
    - May need to set check - if serviceworker says user is offline then allow them to continue with logged in status as they can only access already downloaded data. Normal checks apply if online. - Check with Shaun about possible security concerns with this approach

 - Online fallbacks next-pwa:
    - Provide a template 404 to display if serviceworker can't load a page


### NON CRITICAL

- REACT HOOK FORM to replace state on forms... refactor register form

- Refactor all confirm Dialogs into component for consistent functionality

- Add padding to confirm dialogs

- Raise get businessId to app level -> add to user context

 - settings-menu
    - Add a heading and close button to drawer
    - think of a few more features to implement - account settings with password reset etc perhaps

- Payment system inc. payment history

## ADMIN PANEL

- ADMIN PANEL
    - Services blurb - description to include on the services page
    - create/update/delete services forms
    - create/update/delete business forms




## Other Possible Improvements:
 - logo as SVG
 - highlight upcoming appointments on the current day
 - deal with header indicator color...
 - calendar day default to next business day if is weekend
 - calendar date defaults to current day (or next business day) - choosing a date sets the fetch reference point, data will be fetched around that date. Auto load more data fetches from client side
 - modify logo home link to only work on image, not the containing div
 - Create user feedback context so I can implement a single success / error message handler at the application level. This will also make messages persist when they originate from a model and will display even if the modal closes.
 - Start to perform token refresh in advance so there is no change of affecting user experience.
 - For businessRep the associated business data is attached to the user object, this is not ideal. Separate it so it is its own object - or consider consolidating all user/business data into a single object to reduce the number of calls to localStorage.
 - Change appointment history to a button which opens in a new page. History should be searchable - possibly use calendar components.
 - Refactor use of businessId to access the global user object if is businessRep (if not needed by user)

## Future Additions to site:
 - breadcrumbs - mobile view in header - desktop view above page body
 - speed dial for quick access actions when logged in - for businessRep
 - User password reset

## Future issues to solve:
 - better method for getting viewport width/user agent for useState in layout to prevent page from rendering twice. some nice user agent solutions to set initial values here:https://stackoverflow.com/questions/59494037/how-to-detect-the-device-on-react-ssr-app-with-next-js and here: https://stackoverflow.com/questions/63928337/css-style-is-not-correctly-being-applied-when-conditional-render-in-react
