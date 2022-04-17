## AppointMe

## TODO:
        
 - Auth:
    - implement auth checking and limiting routes/functionality
    - Check logged in status
    - Manage token refresh
    - Refresh token if access token expired but refresh token unexpired

 - Use Dialog for popup forms...
 - Chip/toast to confirm appointment booked

 - settings-menu
    - Add a heading and close button to drawer
    - think of a few more features to implement - account settings with password reset etc perhaps

- profile page
    - implement display picture upload and edit with default image (frontend and backend)



## Improvements:
 - logo as SVG
 - highlight upcoming appointments on the current day
 - deal with header indicator color...
 - calendar day default to next business day if is weekend
 - calendar date defaults to current day (or next business day) - choosing a date sets the fetch reference point, data will be fetched around that date. Auto load more data fetches from client side
 - modify logo home link to only work on image, not the containing div

## Future Additions to site:
 - breadcrumbs - mobile view in header - desktop view above page body
 - speed dial for quick access actions when logged in - for businessRep

## Future issues to solve:
 - better method for getting viewport width/user agent for useState in layout to prevent page from rendering twice. some nice user agent solutions to set initial values here:https://stackoverflow.com/questions/59494037/how-to-detect-the-device-on-react-ssr-app-with-next-js and here: https://stackoverflow.com/questions/63928337/css-style-is-not-correctly-being-applied-when-conditional-render-in-react
