ShelterHaven: Emergency Shelter & Volunteer Management System

Support emergency shelters by providing:
Volunteer coordination.
Connecting victims to essential resources.
Storing and displaying information on shelter resources, capacity, and volunteer availability.
Aim to provide services to shelters, volunteers, and victims.

System Requirements:
1. Track available shelters and capacities
2. Allow disaster victims to register for a shelter
3. Connect volunteers with shelters
4. Track available resources for disaster victims in each shelter

ER Diagram

<img width="1549" height="1064" alt="Screenshot 2025-09-28 173200" src="https://github.com/user-attachments/assets/cb94f7d6-a939-4685-8d18-ec613eb6946b" />

Assumptions:
A volunteer can only work at one shelter.
One volunteer oversees a shelter (manager).
Shelters need to have volunteers. 
A victim must go to a shelter to be in the system.
A victim can request multiple services. 
No two services have the same name. 
Each service requires one or more resources. 
A resource can belong to multiple services. 

Relational Schema

<img width="706" height="822" alt="image" src="https://github.com/user-attachments/assets/f4165f75-eb80-4754-8e5a-3b09ff95d9bd" />

----------------------------------------------------------------------------------------------------------------------------------

<img width="658" height="383" alt="image" src="https://github.com/user-attachments/assets/dd1c0bc2-8aa6-4398-a58f-3c1e91c87d36" />

<img width="520" height="414" alt="image" src="https://github.com/user-attachments/assets/934bf24f-320f-451d-9ce8-01b0d2ab3af9" />

<img width="727" height="356" alt="image" src="https://github.com/user-attachments/assets/00b6c0df-18d0-4796-a2bf-385e3b134478" />
