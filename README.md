**ShelterHaven: Emergency Shelter & Volunteer Management System**

PDF REPORT (long 33 pgs)
[ProjectReport - ShelterHaven.pdf](https://github.com/user-attachments/files/22585769/ProjectReport.-.ShelterHaven.pdf)


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

**ER Diagram**

<img width="1549" height="1064" alt="Screenshot 2025-09-28 173200" src="https://github.com/user-attachments/assets/cb94f7d6-a939-4685-8d18-ec613eb6946b" />

Assumptions:
1. A volunteer can only work at one shelter.
2. One volunteer oversees a shelter (manager).
3. Shelters need to have volunteers. 
4. A victim must go to a shelter to be in the system.
5. A victim can request multiple services. 
6. No two services have the same name. 
7. Each service requires one or more resources. 
8. A resource can belong to multiple services. 

**Relational Schema**

<img width="706" height="822" alt="image" src="https://github.com/user-attachments/assets/f4165f75-eb80-4754-8e5a-3b09ff95d9bd" />

----------------------------------------------------------------------------------------------------------------------------------

<img width="658" height="383" alt="image" src="https://github.com/user-attachments/assets/dd1c0bc2-8aa6-4398-a58f-3c1e91c87d36" />

<img width="520" height="414" alt="image" src="https://github.com/user-attachments/assets/934bf24f-320f-451d-9ce8-01b0d2ab3af9" />

<img width="727" height="356" alt="image" src="https://github.com/user-attachments/assets/00b6c0df-18d0-4796-a2bf-385e3b134478" />

----------------------------------------------------------------------------------------------------------------------------------

**Frontend**

Signin View:

<img width="1298" height="773" alt="image" src="https://github.com/user-attachments/assets/d14a3f1f-e33d-455e-9edc-c2e68e28f72d" />


Manager View:

<img width="1471" height="636" alt="image" src="https://github.com/user-attachments/assets/1eb306a2-2d72-4452-8eaf-4a180081853b" />
<img width="1459" height="472" alt="image" src="https://github.com/user-attachments/assets/017e9dbe-41e9-4ef0-8505-8df27fabdd51" />

Volunteer View: 

<img width="1423" height="607" alt="image" src="https://github.com/user-attachments/assets/d7b3007e-58f1-421d-a8cb-56f840048a81" />

Victim View: 

<img width="1243" height="530" alt="image" src="https://github.com/user-attachments/assets/cad297d0-6a77-4cf2-a635-cdfd952d47a5" />
<img width="290" height="305" alt="image" src="https://github.com/user-attachments/assets/98db26a6-7a00-43ea-b51e-7f68fb49adf3" />

