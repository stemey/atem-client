package org.atemsource.atem.adminclient;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.persistence.EntityManager;

import org.atemsource.atem.adminclient.jpa.ExampleBean;
import org.atemsource.atem.api.infrastructure.exception.TechnicalException;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;


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

			ExampleBean exampleBean = new ExampleBean();
			exampleBean.setText("my text");
			entityManager.persist(exampleBean);
			ExampleBean exampleBean2 = new ExampleBean();
			exampleBean2.setText("my text2");
			entityManager.persist(exampleBean2);
			ExampleBean exampleBean3 = new ExampleBean();
			exampleBean3.setText("my text3");
			entityManager.persist(exampleBean3);
			ExampleBean exampleBean4 = new ExampleBean();
			exampleBean4.setText("my text4");
			entityManager.persist(exampleBean4);
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
