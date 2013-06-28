package org.atemsource.atem.adminclient;

import java.io.Serializable;
import java.util.Collection;
import java.util.LinkedList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Order;
import javax.persistence.criteria.ParameterExpression;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

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
import org.atemsource.atem.service.entity.search.AttributePredicate;
import org.atemsource.atem.service.entity.search.AttributeSorting;
import org.atemsource.atem.service.entity.search.Paging;
import org.atemsource.atem.service.entity.search.Query;
import org.atemsource.atem.service.entity.search.Sorting;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

public class JpaCrudService implements IdentityAttributeService, FindByIdService,
		org.atemsource.atem.api.service.FindByIdService, FindByTypeService, PersistenceService, StatefulUpdateService,
		DeletionService {

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

	public <E> Object getEntities(EntityType<E> originalType, Query query, Sorting sorting, Paging paging,
			ListCallback<E> callback) {

		TransactionStatus transaction = jpaTransactionManager.getTransaction(new DefaultTransactionDefinition(
				TransactionDefinition.PROPAGATION_REQUIRED));
		try {

			TypedQuery<E> jpaQuery = createListQuery(originalType, query, sorting, paging);
			List<E> resultList = jpaQuery.getResultList();

			TypedQuery<Long> totalCountQuery = createTotalCountQuery(originalType, query);
			long totalCount = totalCountQuery.getSingleResult();

			Object result = callback.process(resultList, totalCount);

			jpaTransactionManager.commit(transaction);
			return result;
		} catch (Exception e) {
			if (!transaction.isCompleted()) {
				jpaTransactionManager.rollback(transaction);
			}
			throw new TechnicalException("cannot commit transaction ", e);
		}

	}

	protected <E> TypedQuery<E> createListQuery(EntityType<E> originalType, Query query, Sorting sorting, Paging paging) {
		CriteriaQuery<E> criteriaQuery = entityManager.getCriteriaBuilder().createQuery(originalType.getJavaType());
		Root<E> from = criteriaQuery.from(originalType.getJavaType());
		if (query != null) {
			criteriaQuery.where(createQuery(from, query));
		}
		if (sorting != null) {
			criteriaQuery.orderBy(createOrderList(from, sorting));
		}
		TypedQuery<E> jpaQuery = entityManager.createQuery(criteriaQuery);
		if (paging != null) {
			jpaQuery.setMaxResults(paging.getCount()).setFirstResult(paging.getStart());
		}
		return jpaQuery;
	}

	protected TypedQuery<Long> createTotalCountQuery(EntityType<?> originalType, Query query) {
		CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		CriteriaQuery<Long> criteriaQuery = criteriaBuilder.createQuery(Long.class);
		Root<?> from = criteriaQuery.from(originalType.getJavaType());
		criteriaQuery.select(criteriaBuilder.count(from));
		if (query != null) {
			criteriaQuery.where(createQuery(from, query));
		}
		TypedQuery<Long> jpaQuery = entityManager.createQuery(criteriaQuery);
		return jpaQuery;
	}

	private List<Order> createOrderList(Root<?> root, Sorting sorting) {
		CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		List<Order> orderList = new LinkedList<Order>();
		for (AttributeSorting attributeSorting : sorting.getAttributeSortings()) {
			SingleAttribute<?> attribute = attributeSorting.getAttribute();
			Path<?> field = root.get(attribute.getCode());
			if (attributeSorting.isAsc()) {
				orderList.add(criteriaBuilder.asc(field));
			} else {
				orderList.add(criteriaBuilder.desc(field));
			}
		}
		return orderList;
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

	public Predicate createQuery(Root<?> root, Query query) {
		CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		List<Predicate> restrictions = new LinkedList<Predicate>();
		for (AttributePredicate<?> attributePredicate : query.getPredicates()) {
			SingleAttribute<?> attribute = attributePredicate.getAttribute();
			Path path = root.get(attribute.getCode());
			restrictions.add(createSubPredicate(criteriaBuilder, attributePredicate, path));
		}
		Predicate result;
		if (query.isOr()) {
			result = criteriaBuilder.or(restrictions.toArray(new Predicate[restrictions.size()]));
		} else {
			result = criteriaBuilder.and(restrictions.toArray(new Predicate[restrictions.size()]));
		}
		return result;
	}

	protected <A extends Comparable> Predicate createSubPredicate(CriteriaBuilder criteriaBuilder,
			AttributePredicate<?> attributePredicate, Path path) {
		A value = (A) attributePredicate.getValue();
		switch (attributePredicate.getOperator()) {
		case EQUAL:
			return criteriaBuilder.equal(path, attributePredicate.getValue());
		case GET:
			return criteriaBuilder.greaterThanOrEqualTo(path, value);
		case GT:
			return criteriaBuilder.greaterThan(path, value);
		case LT:
			return criteriaBuilder.lessThan(path, value);
		case LET:
			return criteriaBuilder.lessThanOrEqualTo(path, value);
		case LIKE:
			return criteriaBuilder.like((Expression<String>) path, (String) attributePredicate.getValue(), '*');
		default:
			throw new IllegalStateException("operator not implmeneted " + attributePredicate.getOperator());
		}
	}

	public <E> Collection<String> getQueryableFields(EntityType<E> entityType) {
		// TODO Auto-generated method stub
		return null;
	}
}
