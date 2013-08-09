atem-client
===========

A java example web application using (atem-rest) and (gform) to administrate and observer java beans and entities.

##General

Gform provides automatic form generation based on json schema or gform schema. Gform is based on dojo. Atem provides powerful 
reflection and transformation for java. (Atem rest) provides rest services to access java entities, services and their meta information via a restful api. 
Also cometD is the basis for observing change on your data. See the list below for the technologies suported by (atem-rest).

Combining these two technologies makes it easy to create generic management tools. 
The Manager provides generic interfaces to invoke services and to create, update, delete and filter your data.


## Supported Technologies 

### Javax.bean.validation

Atem-client provides client-side and serv-side validation. The validation can be defined by javax.bean.validation annotations.

### Spring MVC Rest

Spring rest services (json as data format) can be managed with atem-client. Atem-Client provides a generic interface for the 
parameters a spring rest services uses:

* request parameters
* path variables
* json as request body


### Jpa entities

atem-rest provides CRUD rest services for JPA entities. Atem-client provides a generic interface employing the master detail pattern to manage your data.

### Spring bean

atem-rest provides CRUD rest services for spring beans. This way you the managercan update session or application scoped beans.
The atem-client gets can be notified of changes on watched beans via CometD push.












