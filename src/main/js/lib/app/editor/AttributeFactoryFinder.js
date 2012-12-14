define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"./TextAttributeFactory",//
"./BooleanAttributeFactory",//
"./SelectAttributeFactory",//
"./AccessTokenAttributeFactory",//
"./MappedSelectAttributeFactory",//
"./IntegerAttributeFactory",//
"./SelectArrayAttributeFactory",//
"./AttributeListWidget",//
"./list_embedded/RepeatedEmbeddedAttributeFactory"

], function(array, lang, declare, TextAttributeFactory,
		BooleanAttributeFactory, SelectAttributeFactory,
		AccessTokenAttributeFactory, 
		MappedSelectAttributeFactory, IntegerAttributeFactory,
		SelectArrayAttributeFactory, 
		AttributeListWidget,RepeatedEmbeddedAttributeFactory) {

	var AttributeFactoryFinder= declare("app.editor.AttributeFactoryFinder", null, {
		constructor : function(kwArgs) {

		},
		
		attributeFactories : [ //
//		new RepeatedEmbeddedAttributeFactory(),//
//		new SelectArrayAttributeFactory(),//
//		new IntegerAttributeFactory(),//
//		new SelectAttributeFactory(), // 
//		new BooleanAttributeFactory(), // 
		new TextAttributeFactory() //
		],
		addFactory : function(factory) {
			this.attributeFactories.push(factory);
		},
		getFactory : function(attribute) {
			var factory = this.attributeFactoryMap[attribute.editor];
			// if (factory == null) {
			// factory = this.attributeFactoryMap[attribute.type.code];
			// }
			if (factory == null) {
				var factories = array.filter(this.attributeFactories, function(
						af) {
					return af.handles && af.handles(attribute);
				});
			}
			return factory.create(attribute, modelHandle);
		}
	})

	return new AttributeFactoryFinder(); 
});
