package org.atemsource.atem.adminclient;

import java.io.Serializable;
import java.util.List;

import javax.inject.Inject;
import javax.persistence.EntityManager;

import org.atemsource.atem.api.attribute.relation.SingleAttribute;
import org.atemsource.atem.api.type.EntityType;
import org.atemsource.atem.api.type.EntityTypeWithId;
import org.atemsource.atem.service.entity.CrudService;
import org.atemsource.atem.service.meta.service.model.resource.ResourceOperation;

public class JpaCrudService implements CrudService {

	private EntityManager entityManager;

	public <E> List<E> getEntities(EntityType<E> originalType) {
		return entityManager.createQuery("from " + originalType.getJavaType().getName()).getResultList();
	}

	public <E> Serializable create(EntityType<E> originalType, E entity) {
		entityManager.persist(entity);
		return getIdAttribute(originalType).getValue(entity);
	}

	public void delete(EntityType<?> originalType, Serializable id) {

		SingleAttribute<?> attribute = getIdAttribute(originalType);

		int updateCount = entityManager
				.createQuery(
						"delete from " + originalType.getJavaType().getName() + " where " + attribute.getCode()
								+ "=:id").setParameter("id", id).executeUpdate();
	}

	protected SingleAttribute<? extends Serializable> getIdAttribute(EntityType<?> originalType) {
		return ((EntityTypeWithId<?>) originalType).getIdAttribute();
	}

	public ResourceOperation[] getSupportedOperations(EntityType<?> entityType) {
		// TODO Auto-generated method stub
		return null;
	}

	public <E> Serializable getId(EntityType<E> entityType, E entity) {
		return getIdAttribute(entityType).getValue(entity);
	}

	public <E> E findEntity(EntityType<E> entityType, Serializable id) {
		return entityManager.find(entityType.getJavaType(), id);
	}

}
