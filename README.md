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

# authRouter:-
    - SignUp (Post)
    - Login and Logout (Post)
# profileRouter:-
    - Profile (Get)
    - Profile (Patch)
    - Profile password (Patch)
    - Profile (Delete)
# connectionRequestRouter:-
    - SendRequest---- Ignore(left swipe) (Post) 
                 ---- Interested(right swipe) (Post)
    - ReviewRequest ----- Accepted (Post)
                    ----- Rejected (Post)
# userRouter:-
    - All receieved Requests (Get)
    - ConnectedRequests (Get)
    - Feed- gets you the profiles of other users on platform (Get)


/////////////////////////////////////////////////////////////////////

Notes :-

1) validation should be on every field of your schema explore validator library. never trust the user . he can put anything inside our database.
       include API level validations too if required(i.e. add validations in the controller's function too if need)

       NEVER TRUST req.body

2) learn thought process behind writing POST vs GET api.


    
// password i will be using for user sign in :- Ankur@123 , Priya@123"