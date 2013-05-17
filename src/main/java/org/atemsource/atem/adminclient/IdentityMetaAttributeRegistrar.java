package org.atemsource.atem.adminclient;

import org.atemsource.atem.utility.transform.api.meta.Binding;

import org.atemsource.atem.api.extension.EntityTypeRepositoryPostProcessor;
import org.atemsource.atem.api.extension.MetaAttributeService;
import org.atemsource.atem.api.type.EntityType;
import org.atemsource.atem.spi.EntityTypeCreationContext;


/**
* This registrar registers the meta attribute for extra binding information.
*/
public class IdentityMetaAttributeRegistrar implements EntityTypeRepositoryPostProcessor
{


	private MetaAttributeService metaAttributeService;

	public MetaAttributeService getMetaAttributeService()
	{
		return metaAttributeService;
	}

	public void initialize(EntityTypeCreationContext entityTypeCreationContext)
	{
		metaAttributeService.addSingleMetaAttribute(Identity.META_ATTRIBUTE_CODE,
			entityTypeCreationContext.getEntityTypeReference(EntityType.class),
			entityTypeCreationContext.getEntityTypeReference(Identity.class));
	}

	public void setMetaAttributeService(MetaAttributeService metaAttributeService)
	{
		this.metaAttributeService = metaAttributeService;
	}

}
