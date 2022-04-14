# flight-reservation-system

This simple Node.js, Express, MongoDB flight reservation API project demonstrates how a passenger/user first creates an account, and then searches for available flights and reserves whichever he wants and wishes to travel with.    

Pre-reservation(s) of flights, the Admin adds airports for flights' source and destinations, and flights to be reserved. The Admin can never be able to delete/remove an airport when it still has flight's association, he can never be able to delete/remove a flight when it still has reservations.

Two or more passengers/users can't reserve the same flight and the seat altogether, only different seats are allowed. For a reason(s), a pasenger can cancel his/her reservation(s). it is allowed.

Most importantly, all  operations done whether by Admin or passenger/user require authorization [i.e: There are operations for an Admin a passenger can't  perform, vice versa. ]
