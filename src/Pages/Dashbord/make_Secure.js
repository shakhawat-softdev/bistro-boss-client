/*  --------------------------------------
                Bsic Layer
    --------------------------------------
*1. Don't show the link to them who should not see it.
    Only show the person /type of user who should see it.
*2. Don't allow to visite the link by typing on the url using AdminRoute that will check whwthere the user is admin or not. if not admin then redirect to any other page. You Could Logout user and send them to the login page as well.
-------------------------------------------
        TO SEND DATA Server to DB
-------------------------------------------
1. verify jwt Token (Send authorization Token in the header to the server). If Possible use axios to send jwt token by intercepting the request.
2. If it is an admin activity. Make sure only admin user is posting data by using "VerifyAdmin" 
3.




*/
