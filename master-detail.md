schema:

master-detail
 collection
 - columns
 detail(s) more than one detail???	
 - editor/ different editors are displayed when differente entities are displayed.

send master detail meta firstly.


lade detail when selected,
save detail and reload collection or single in collection,

------------------------

merge metaeditor and metaschema

label, description comes from schema
group comes from editor
label, description may also come from editor

use editor first and add all missing inormation from schema.

group
 type: list|tab
 options
 group
  attriute-editor
   path
   type 
   attribute
   
attribute should be a attribute-editor 
 attributeeditor
  path
  label
  description
  editor {}
	
 
 attribute:
  ext_type
  code (path?)
  label 
  description
  values
  dateformat
  required
  writable
  valid-types
  type



text-attribute
 type: "text"
date-attribute
 type: "date"
 dateFormat
 editor:{two-months|text}
number-attribute
 type:"number"
 numberFormat
 array:true 
boolean-attribute
complex-attribute
 type:"complex"
 target-type:""
 description
  label
  description
 editor
  id
  ...
 valid-types
 collection:"map","array","none"
 collection-options
   min-number
   max-number
   

 








traversiere den editor und fügre missing Values from schema hinzu und entferne dinge die nicht sichtbar sein sollen.


wenn kein editor vorhanden, dann traversiere den Type.

wann ist schluß bei grpahen: wenn assoizierte entity eine id und einen find By id hat.


 







