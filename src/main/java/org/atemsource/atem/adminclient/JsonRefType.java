package org.atemsource.atem.adminclient;

import org.atemsource.atem.impl.common.attribute.primitive.PrimitiveTypeImpl;
import org.codehaus.jackson.node.ObjectNode;

public class JsonRefType extends  PrimitiveTypeImpl<ObjectNode> {

	private static final String JSON_REF_TYPE_CODE = "json-ref";

	
	public String getCode() {
		return JSON_REF_TYPE_CODE;
	}

	public Class<ObjectNode> getJavaType() {
		return ObjectNode.class;
	}

}
