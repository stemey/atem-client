package org.atemsource.atem.adminclient;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.persistence.EntityManager;

import org.atemsource.atem.adminclient.jpa.Car;
import org.atemsource.atem.adminclient.jpa.Category;
import org.atemsource.atem.api.infrastructure.exception.TechnicalException;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

/**
 * Persist some sample jpa entities.
 * @author stemey
 *
 */
public class ExampleDataProvider
{
	@Inject
	private EntityManager entityManager;

	@Inject
	private JpaTransactionManager jpaTransactionManager;

	@PostConstruct
	public void createTestData()
	{
		TransactionStatus status =
			jpaTransactionManager.getTransaction(new DefaultTransactionDefinition(
				TransactionDefinition.PROPAGATION_REQUIRED));
		try
		{

			Car car = new Car();
			car.setPrice(123.3D);
			car.setLabel("Audi");
			entityManager.persist(car);
			Car car2 = new Car();
			car2.setPrice(1553.3D);
			car2.setLabel("BMW");
			entityManager.persist(car2);
			Category category= new Category();
			category.setLabel("cars");
			List<Car> cars= new ArrayList<Car>();
			cars.add(car);
			cars.add(car2);
			category.setCars(cars);
			entityManager.persist(category);
			entityManager.flush();
			jpaTransactionManager.commit(status);
		}
		catch (Exception e)
		{
			jpaTransactionManager.rollback(status);
			throw new TechnicalException("cannot persist test data", e);
		}
	}
}
