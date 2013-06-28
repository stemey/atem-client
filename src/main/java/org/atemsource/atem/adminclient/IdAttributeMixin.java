package org.atemsource.atem.adminclient;

import java.io.Serializable;

import org.atemsource.atem.api.attribute.Attribute;
import org.atemsource.atem.api.attribute.relation.SingleAttribute;
import org.atemsource.atem.api.service.IdentityAttributeService;
import org.atemsource.atem.api.type.EntityType;
import org.atemsource.atem.impl.meta.DerivedObject;
import org.atemsource.atem.service.meta.service.binding.AttributeMixin;
import org.atemsource.atem.utility.path.AttributePath;
import org.atemsource.atem.utility.transform.api.JavaTransformation;
import org.atemsource.atem.utility.transform.api.TransformationContext;
import org.atemsource.atem.utility.transform.api.TypeTransformationBuilder;
import org.atemsource.atem.utility.transform.api.meta.DerivedType;
import org.atemsource.atem.utility.transform.impl.builder.GenericTransformationBuilder;
import org.atemsource.atem.utility.transform.impl.builder.TransformationTargetTypeBuilder;

public class IdAttributeMixin implements AttributeMixin {

	public void mixin(TypeTransformationBuilder<?, ?> builder) {
		TransformationTargetTypeBuilder targetTypeBuilder = builder.transformCustom(GenericTransformationBuilder.class)
				.transform(new JavaTransformation<Object, Object>() {

					public void mergeAB(Object a, Object b, TransformationContext ctx) {
						EntityType jsonType = ((Attribute<?, ?>) a).getEntityType();
						DerivedType derivedType = (DerivedType) jsonType.getMetaType()
								.getMetaAttribute(DerivedObject.META_ATTRIBUTE_CODE).getValue(jsonType);
						IdentityAttributeService identityAttributeService = (IdentityAttributeService) derivedType
								.getOriginalType().getService(IdentityAttributeService.class);
						if (identityAttributeService != null) {
							SingleAttribute<? extends Serializable> idAttribute = identityAttributeService
									.getIdAttribute(((Attribute) a).getEntityType());
							if (idAttribute != null) {
								AttributePath jsonIdAttributePath = derivedType.getTransformation()
										.getAttributeTransformationByA(idAttribute.getCode()).getAttributeBs()
										.iterator().next();
								if (a == jsonIdAttributePath.getAttribute()) {
									EntityType<Object> entityTypeByB = ctx.getEntityTypeByB(b);
									entityTypeByB.getAttribute("disabled").setValue(b, true);
								}
							}
						}
					}

					public void mergeBA(Object b, Object a, TransformationContext ctx) {

					}
				}).to();
		targetTypeBuilder.addSingleAttribute("disabled", boolean.class);

	}

}
