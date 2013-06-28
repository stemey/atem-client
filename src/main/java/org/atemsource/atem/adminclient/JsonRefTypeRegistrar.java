package org.atemsource.atem.adminclient;

import org.atemsource.atem.api.type.PrimitiveType;
import org.atemsource.atem.spi.PrimitiveTypeRegistrar;

public class JsonRefTypeRegistrar implements PrimitiveTypeRegistrar {

	public PrimitiveType<?>[] getTypes() {
		return new PrimitiveType<?>[] { new JsonRefType() };
	}

}
