# Angular tree diagram

### About
Visualize employee structure hierarchy and manage using  Angular 2+ Java MongoDB.

### Preview
Application built using in back-end Java, which is running in JVM. Front-end built using (Angular 7) with Ecmascript 6 and in functional style. Datastore for structure model designed MongoDB in mlab.com. 
### Features
- Drag and drop
- Zoom and pan
- Configurable node width/height
- Add/remove nodes
- Tree-like UI
- Pure CSS relation lines
- No dependencies

## Application covered with tests and building procedure added into project as README.MD 
### Functional requirements: 
As a user I would like to have such options in web application: 
1. View hierarchical structure in visual way. With showing all employees. 
2. I would like to search in visual structure by name and highlight found persons. 
3. Add into hierarchy new people with possibility to search existing employees in hierarchy and add under found employee newly added employee. 
4. Delete in hierarchy employee without breaking structure. 
5. NB!!! Additional challenge (optional) As a user I would like to have another visual structure with the same employees , but with possibility to show another details. “ Who can sign important documents in  hierarchy. ” 
6. PS!!!Employee can have more than one manager and one person in structure won’t have top managers (CEO). 

### Installation Front-end
```
npm install
ng serve --proxy-config proxy.json
http://localhost:4200/
```
### Installation Back-end
```
Run as spring boot application
Setup as maven project
test all API with Postman Application
such as :
localhost:8080/api/getAllEmployee 
localhost:8080/api/addEmployee 
localhost:8080/api/getEmployeesByName/{employeeName}
localhost:8080/api/getHierarchyByEmployeeId/{guid} 
localhost:8080/api/updateNode 

```
### Tests procedure in Back-end
## Using Mockito and Junit
```
Run DeveloperArchitectureApplicationTests
in test / java / com.developer.architecture.app
testSearchByName
testSaveEmployee
testGetHierarchyByGuid
testGetAllemployee

```
### Usage
- Import module in your project
- Use tree-diagram directive
- Pass array of nodes and config
- See example.json for more details
