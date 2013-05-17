package org.atemsource.atem.adminclient;

import java.io.Serializable;

import javax.persistence.EntityManager;

import org.atemsource.atem.api.attribute.Attribute;
import org.atemsource.atem.api.attribute.relation.SingleAttribute;
import org.atemsource.atem.api.infrastructure.exception.TechnicalException;
import org.atemsource.atem.api.service.DeletionService;
import org.atemsource.atem.api.service.IdentityAttributeService;
import org.atemsource.atem.api.service.PersistenceService;
import org.atemsource.atem.api.type.EntityType;
import org.atemsource.atem.api.type.Type;
import org.atemsource.atem.service.entity.FindByIdService;
import org.atemsource.atem.service.entity.FindByTypeService;
import org.atemsource.atem.service.entity.ListCallback;
import org.atemsource.atem.service.entity.ReturnErrorObject;
import org.atemsource.atem.service.entity.SingleCallback;
import org.atemsource.atem.service.entity.StatefulUpdateService;
import org.atemsource.atem.service.entity.UpdateCallback;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

public class JpaCrudService implements IdentityAttributeService, FindByIdService,org.atemsource.atem.api.service.FindByIdService, FindByTypeService,
		PersistenceService, StatefulUpdateService, DeletionService {

	private EntityManager entityManager;

	private JpaTransactionManager jpaTransactionManager;

	public void delete(EntityType<?> originalType, Serializable id) {

		TransactionStatus transaction = jpaTransactionManager.getTransaction(new DefaultTransactionDefinition(
				TransactionDefinition.PROPAGATION_REQUIRED));
		try {
			Object entity = entityManager.find(originalType.getJavaType(), id);
			entityManager.remove(entity);
			jpaTransactionManager.commit(transaction);
		} catch (Exception e) {
			if (!transaction.isCompleted()) {
				jpaTransactionManager.rollback(transaction);
			}
			throw new TechnicalException("cannot commit transaction ", e);
		}
	}

	public <E> Object findById(EntityType<E> entityType, Serializable id, SingleCallback<E> callback) {
		TransactionStatus transaction = jpaTransactionManager.getTransaction(new DefaultTransactionDefinition(
				TransactionDefinition.PROPAGATION_REQUIRED));
		try {
			Object result = callback.process(entityManager.find(entityType.getJavaType(), id));
			jpaTransactionManager.commit(transaction);
			return result;
		} catch (Exception e) {
			if (!transaction.isCompleted()) {
				jpaTransactionManager.rollback(transaction);
			}
			throw new TechnicalException("cannot commit transaction ", e);
		}
	}

	public <E> Object getEntities(EntityType<E> originalType, ListCallback<E> callback) {

		TransactionStatus transaction = jpaTransactionManager.getTransaction(new DefaultTransactionDefinition(
				TransactionDefinition.PROPAGATION_REQUIRED));
		try {
			Object result = callback.process(entityManager.createQuery("from " + originalType.getJavaType().getName())
					.getResultList());
			jpaTransactionManager.commit(transaction);
			return result;
		} catch (Exception e) {
			if (!transaction.isCompleted()) {
				jpaTransactionManager.rollback(transaction);
			}
			throw new TechnicalException("cannot commit transaction ", e);
		}

	}

	public EntityManager getEntityManager() {
		return entityManager;
	}

	public <E> Serializable getId(EntityType<E> entityType, E entity) {
		return getIdAttribute(entityType).getValue(entity);
	}

	public SingleAttribute<? extends Serializable> getIdAttribute(EntityType<?> originalType) {
		return (SingleAttribute<? extends Serializable>) originalType.getAttribute(getIdentityValue(originalType)
				.getAttributeCode());
	}

	protected Identity getIdentityValue(EntityType<?> originalType) {
		Attribute getIdentityValue = originalType.getMetaType().getMetaAttribute(Identity.META_ATTRIBUTE_CODE);
		return (Identity) getIdentityValue.getValue(originalType);
	}

	public Type<?> getIdType(EntityType<?> entityType) {
		return getIdAttribute(entityType).getTargetType();
	}

	public JpaTransactionManager getJpaTransactionManager() {
		return jpaTransactionManager;
	}

	public <E> Serializable insert(EntityType<E> originalType, E entity) {
		TransactionStatus transaction = jpaTransactionManager.getTransaction(new DefaultTransactionDefinition(
				TransactionDefinition.PROPAGATION_REQUIRED));
		try {
			entityManager.persist(entity);
			jpaTransactionManager.commit(transaction);
			return getIdAttribute(originalType).getValue(entity);
		} catch (Exception e) {
			if (!transaction.isCompleted()) {
				jpaTransactionManager.rollback(transaction);
			}
			throw new TechnicalException("cannot commit transaction ", e);
		}
	}

	public <E> boolean isPersistent(EntityType<E> entityType, E entity) {
		return getIdAttribute(entityType).getValue(entity) != null;
	}

	public void setEntityManager(EntityManager entityManager) {
		this.entityManager = entityManager;
	}

	public void setJpaTransactionManager(JpaTransactionManager jpaTransactionManager) {
		this.jpaTransactionManager = jpaTransactionManager;
	}

	public ReturnErrorObject update(Serializable id, EntityType<?> originalType, UpdateCallback callback) {
		TransactionStatus transaction = jpaTransactionManager.getTransaction(new DefaultTransactionDefinition(
				TransactionDefinition.PROPAGATION_REQUIRED));
		try {
			Object persitentEntity = entityManager.find(originalType.getJavaType(), id);
			ReturnErrorObject errorObject = callback.update(persitentEntity);
			entityManager.merge(persitentEntity);
			jpaTransactionManager.commit(transaction);
			return errorObject;
		} catch (Exception e) {
			if (!transaction.isCompleted()) {
				jpaTransactionManager.rollback(transaction);
			}
			throw new TechnicalException("cannot commit transaction ", e);
		}
	}

	public <E> E findById(EntityType<E> entityType, Serializable id) {
		return entityManager.find(entityType.getJavaType(), id);
	}
}
