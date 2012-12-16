define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"./TextAttributeFactory",//
"./BooleanAttributeFactory",//
"./SelectAttributeFactory",//
"./AccessTokenAttributeFactory",//
"./MappedSelectAttributeFactory",//
"./EmbeddedAttributeFactory2",//
"./IntegerAttributeFactory",//
"./SelectArrayAttributeFactory",//
"./AttributeListWidget",//
"./list_embedded/RepeatedEmbeddedAttributeFactory"

], function(array, lang, declare, TextAttributeFactory,
		BooleanAttributeFactory, SelectAttributeFactory,
		AccessTokenAttributeFactory, MappedSelectAttributeFactory,EmbeddedAttributeFactory,
		IntegerAttributeFactory, SelectArrayAttributeFactory,
		AttributeListWidget, RepeatedEmbeddedAttributeFactory) {

	var AttributeFactoryFinder = declare("app.editor.AttributeFactoryFinder",
			null, {
				constructor : function(kwArgs) {

				},

				attributeFactories : [ //
				new RepeatedEmbeddedAttributeFactory(),//
				new EmbeddedAttributeFactory(),//
				new SelectArrayAttributeFactory(),//
				new IntegerAttributeFactory(),//
				new SelectAttributeFactory(), // 
				new BooleanAttributeFactory(), // 
				new TextAttributeFactory() //
				],
				attributeFactoryMap : {},
				addFactory : function(factory) {
					this.attributeFactories.push(factory);
				},
				getFactory : function(attribute) {
					var factory = this.attributeFactoryMap[attribute.editor];
					// if (factory == null) {
					// factory = this.attributeFactoryMap[attribute.type.code];
					// }
					if (!factory) {
						var factories = array.filter(this.attributeFactories,
								function(af) {
									return af.handles && af.handles(attribute);
								});
						if (factories.length > 0) {
							factory = factories[0];
						}
					}
					return factory;
				}
			})

	return new AttributeFactoryFinder();
});
