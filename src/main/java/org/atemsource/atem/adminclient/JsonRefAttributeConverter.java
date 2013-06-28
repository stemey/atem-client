package org.atemsource.atem.adminclient;

import java.util.List;

import org.atemsource.atem.api.attribute.Attribute;
import org.atemsource.atem.api.type.EntityType;
import org.atemsource.atem.utility.binding.AttributeConverter;
import org.atemsource.atem.utility.binding.TransformationContext;
import org.atemsource.atem.utility.transform.api.Converter;

public class JsonRefAttributeConverter implements AttributeConverter {
	private JsonRefConverter jsonRefConverter;

	private List<String> embeddedAttributes;

	public Converter<?, ?> createConverter(TransformationContext context, Attribute attribute) {
		if (attribute.getTargetType() instanceof EntityType<?>) {
			if (!embeddedAttributes.contains(attribute.getCode())) {
				return jsonRefConverter.create((EntityType<?>) attribute.getTargetType());
			} else {
				return null;
			}
		} else {
			return null;
		}
	}

	public void setJsonRefConverter(JsonRefConverter jsonRefConverter) {
		this.jsonRefConverter = jsonRefConverter;
	}

	public void setEmbeddedAttributes(List<String> embeddedAttributes) {
		this.embeddedAttributes = embeddedAttributes;
	}

}
