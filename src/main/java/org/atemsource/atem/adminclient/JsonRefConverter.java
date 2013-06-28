package org.atemsource.atem.adminclient;

import java.io.Serializable;

import org.atemsource.atem.api.service.FindByIdService;
import org.atemsource.atem.api.service.IdentityAttributeService;
import org.atemsource.atem.api.type.EntityType;
import org.atemsource.atem.service.entity.EntityRestService;
import org.atemsource.atem.service.entity.TypeAndId;
import org.atemsource.atem.utility.transform.api.Converter;
import org.atemsource.atem.utility.transform.api.JavaConverter;
import org.atemsource.atem.utility.transform.api.TransformationContext;
import org.atemsource.atem.utility.transform.impl.converter.LocalConverter;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.node.ObjectNode;

public class JsonRefConverter implements JavaConverter<Object, JsonNode> {

	private EntityRestService entityRestService;
	private ObjectMapper objectMapper;

	public JsonNode convertAB(Object a, TransformationContext ctx) {
		ObjectNode node = objectMapper.createObjectNode();
		if (a == null) {
			node.putNull("$ref");
		} else {
			EntityType<Object> entityTypeByA = ctx.getEntityTypeByA(a);
			IdentityAttributeService identityAttributeService = entityTypeByA
					.getService(IdentityAttributeService.class);
			if (identityAttributeService == null) {
				throw new IllegalArgumentException("cannot convert object to jsonref " + a);
			} else {
				Serializable value = identityAttributeService.getIdAttribute(entityTypeByA).getValue(a);
				String uri = entityRestService.getUriById(entityTypeByA, value);
				node.put("$ref", uri);
			}
		}
		return node;
	}

	public Object convertBA(JsonNode b, TransformationContext ctx) {
		if (b == null || b.isNull()) {
			return null;
		} else {
			JsonNode jsonNode = b.get("$ref");
			if (jsonNode == null || jsonNode.isNull()) {
				return null;
			} else {
				TypeAndId typeAndId = entityRestService.parse(jsonNode.getTextValue());
				FindByIdService findByIdService = typeAndId.getEntityType().getService(FindByIdService.class);
				return findByIdService.findById(typeAndId.getEntityType(), typeAndId.getId());
			}
		}

	}

	public void setEntityRestService(EntityRestService entityRestService) {
		this.entityRestService = entityRestService;
	}

	public void setObjectMapper(ObjectMapper objectMapper) {
		this.objectMapper = objectMapper;
	}

	public <J> Converter<J, ObjectNode> create(EntityType<J> type) {

		return new LocalConverter<J, ObjectNode>(new JsonRefConverter(), type, new JsonRefType());
	}

}
