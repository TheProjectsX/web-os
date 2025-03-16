## OS Wrapper (`@/components/OSWrapper.jsx`)

-   Wraps the full OS with required settings.
-   Checks and Validates screen size
-   Loads user Settings and Custom Settings from Local Storage

## Application Wrapper (`@/components/ApplicationWrapper.jsx`)

-   Wraps the Applications
-   Takes Application (`children`) and Metadata (`metadata`)
-   `children` contains Application Elements
-   `metadata` contains Metadata of the Application:
    -   Logo
    -   Key
    -   Type
    -   Name
    -   Description
    -   Position: xp and yp : x percentage and y percentage
    -   {extra information}
