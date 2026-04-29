# Specifications :-

1) create an account
2) login
3) update your profile
4) feed page - explore
5) send connection request
6) see our matches
7) see the request we have sent/recieved    

# Database Design :-

#    Collections :-
  
        1) User
               - personal details

        2) ConnectionRequest
               - from userId (kisne bejha)
               - to userId (kisko bejha)
               - status (accepted/rejected/pending/ignore/block)
                 rejected tab hua jab aaya connection req aaya and maine usko reject kar diya.
                 ignore tab hua jab maine starting me hi left swipe kar diya. 
                 so rejected to hamesa pending se hokar hi gujerega.
                
            
# APIS Design :-

    - SignUp (Post)
    - Login (Post)
    - Profile (Get)
    - Profile (Post)
    - Profile (Patch)
    - Profile (Delete)
    - SendRequest---- Ignore (Post)
                 ---- Interested (Post)
    - ReviewRequest ----- Accepted (Post)
                    ----- Rejected (Post)
    
    - AllRequests (Get)
    - ConnectedRequests (Get)

        