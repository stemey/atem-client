package org.atemsource.atem.adminclient;

import java.util.ArrayList;
import java.util.Collection;

import javax.annotation.PostConstruct;

import org.atemsource.atem.api.type.EntityType;
import org.atemsource.atem.api.type.TypeFilter;
import org.atemsource.atem.utility.binding.Binder;
import org.atemsource.atem.utility.transform.impl.EntityTypeTransformation;

public class BoundTypeFilter implements TypeFilter {
	public void setBinder(Binder binder) {
		this.binder = binder;
	}

	public void setTypeFilter(TypeFilter<EntityType<?>> typeFilter) {
		this.typeFilter = typeFilter;
	}

	private Binder binder;
	private TypeFilter<EntityType<?>> typeFilter;
	private Collection<EntityType<?>> types;

	@PostConstruct
	public void initialize() {
		types = new ArrayList<EntityType<?>>();
		for (EntityType<?> type : typeFilter.getEntityTypes()) {
			EntityTypeTransformation<?, Object> typeTransformation = binder.getTransformation(type.getJavaType());
			if (typeTransformation != null) {
				types.add(typeTransformation.getEntityTypeB());
			}
		}

	}

	public Collection<? extends EntityType<?>> getEntityTypes() {
		return types;
	}

}
