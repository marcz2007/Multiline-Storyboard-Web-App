# Multiline-Storyboard-Web-App
A web application which allows users to enter multiple child sentences of a root sentence and then be able to follow the children along in order to create a storyboard. Made using Express, Nodejs and Jade templates (Written in Javascript)

## Instructions for Running Application

1. Clone this repository
2. Open the (linux/mac/pc) terminal and change to the project folder directory
3. Run the application by writing `npm start` or `node app.js` (assuming npm is already installed)
4. Open an internet browser and go to `localhost:8081`
5. Start writing sentences around the original root
6. Click on each inputted sentence and continue writing more on the next page and so on...
7. Click 'back to the beginning' to go back to the original parent node


### Design and Implementation Approach

To make this application, it became clear that routing needed to occur. Due to the large number of possible combinations of user entries and different pages, the approach taken to combat this was to use a concise routing system which covered a large number of variables. This, too, was reflected in the Jade templating used which allowed for only one html page to be necessary. This lone page is able to act as a template for multiple user entries. To reduce duplicate code, a mixin was used in the Jade template which allowed for the four quadrants of the table to be repeated by manipulating the only two changing parameters - 1. the text field input value and 2. which quadrant of the table the value was entered.

When it came to which data structures would be necessary, there was a choice between using cookies or using a Directed Acyclic Graph. The latter was used due to the ease of implementation, however it brought drawbacks with it which will be discussed further down. 

Directed Acyclic Graphs (DAGs) are data structures which have topological ordering; This means that every node points to nodes further along the graph and are said to be the children of the parents that came before them. This seemed a sensible structure for this project since it relied on one parent (the root sentence) pointing to its children (the branches from that sentence, further along the program. For this to be possible, there needed to be a `currentNode` which pointed to the node currently being initialised in the DAG structure. Once the POST route is called, the values entered by the user are stored in the dag at the position pointed to by `currentNode`. If the user clicks on a previously entered input - which now appears in the form of a hyper link due to the conditional logic surrounding if the user has entered any text values in the text input field or not - then the GET route is called. The GET route uses the `position` value, entered as query parameters, to determine where the `currentNode` now points to in the DAG structure which contains the child objects for the sbranch sentences from the parent root. The page, therefore, is loaded containing the root sentence that the user just entered and clicked on alongside four new text input fields. The GET route is also accessed when the user clicks to return to the beginning of the storyboard, using the same conditional logic as loading the `localhost:8081` page originally; This time, however, the `currentNode`'s values are all loaded from the DAG using a function to get the string values from the object literal. 

### Implications of Shortcuts Taken

Using the DAG enabled a fluid structure of directional logic in the application. However, the drawbacks of such a structure are that all the data is stored in one structure in memory. This means that if the DAG gets too large then the user will run out of memory. The server would then crash and the application would be unusable. Another issue is that only one user can use the application at any one time. This is because each user would be inputting sentences to the same DAG meaning that a user's entry may link to a child which they did not write. 

To solve the former issue of running out of memory, a full production web application would store the DAG in a database - perhaps one on a cloud or a server with a great deal more memory. To solve the latter issue, cookies could be used. The cookies could store user information alongside user entries so that only the same user's entries link to their own specific entries based on them having the same user information. This would allow for multiple users to use the application simultaneously (but of course it would require more memory to store the user's information from their specific web browser).

### This Excercise Tested my Ability to

⋅⋅* Set up a locally hosted server using a web framework (Express in NodeJS)
⋅⋅* Route based on conditional logic surrounding query and body parameters
⋅⋅* Create template HTML pages using Jade
⋅⋅* Design a web application which requires logic and a directioinal data structure to store information without relying on Javascript <script> code resulting in a Backend web application
  


