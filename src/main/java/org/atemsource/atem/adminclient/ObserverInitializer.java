package org.atemsource.atem.adminclient;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.atemsource.atem.adminclient.example.ExampleBean;
import org.atemsource.atem.adminclient.observer.ObserverPublisher;
import org.atemsource.atem.api.BeanLocator;
import org.atemsource.atem.api.EntityTypeRepository;
import org.atemsource.atem.api.attribute.Attribute;
import org.atemsource.atem.api.attribute.JavaMetaData;
import org.atemsource.atem.api.infrastructure.bean.Bean;
import org.atemsource.atem.api.type.EntityType;
import org.atemsource.atem.api.view.View;
import org.atemsource.atem.api.view.ViewVisitor;
import org.atemsource.atem.api.view.Visitor;
import org.atemsource.atem.utility.compare.ComparisonBuilder;
import org.atemsource.atem.utility.compare.ComparisonBuilderFactory;
import org.atemsource.atem.utility.observer.EntityHandle;
import org.atemsource.atem.utility.observer.EntityObserver;
import org.atemsource.atem.utility.observer.EntityObserverDefinition;
import org.atemsource.atem.utility.observer.EntityObserverFactory;
import org.cometd.bayeux.Message;
import org.cometd.bayeux.client.ClientSessionChannel;
import org.cometd.bayeux.client.ClientSessionChannel.MessageListener;
import org.cometd.bayeux.server.BayeuxServer;
import org.cometd.bayeux.server.BayeuxServer.SessionListener;
import org.springframework.stereotype.Component;

@Component
public class ObserverInitializer{
	@Inject
	private ObserverPublisher observerPublisher;
	@Inject
	private BeanLocator beanLocator;
	@Inject
	private EntityObserverFactory entityObserverFactory;
	@Inject
	private ComparisonBuilderFactory comparisonBuilderFactory;
	@Inject
	private EntityTypeRepository entityTypeRepository;
	
	private Collection<EntityObserverDefinition> sessionObserverDefinitions = new HashSet<EntityObserverDefinition>();
	

	@PostConstruct
	public void initialize() {
		final ComparisonBuilder comparisonBuilder = createComparison();
		
		
		EntityObserverDefinition entityObserverDefinition = entityObserverFactory.createDefinition(comparisonBuilder.create());
		sessionObserverDefinitions.add(entityObserverDefinition);
		Set<Bean<ExampleBean>> sessionBeans = beanLocator.getBeans(ExampleBean.class);
		for (final Bean<ExampleBean> sessionBean: sessionBeans) {
			EntityObserver entityObserver = entityObserverDefinition.create();
			entityObserver.setHandle(new EntityHandle() {

				public Object getEntity() {
					return sessionBean.get();
				}
			});
			observerPublisher.addObservable("application", sessionBean.getBeanName(), entityObserver);
		}
		observerPublisher.check("application");

	}
	
	public void startSession(String id) {
//		for (EntityObserverDefinition definition: sessionObserverDefinitions) {
//			EntityObserver entityObserver = definition.create();
//			entityObserver.setHandle(new EntityHandle() {
//
//				public Object getEntity() {
//					return bean.get();
//				}
//			});
//			observerPublisher.addObservable("application", bean.getBeanName(), entityObserver);
//		}
//		observerPublisher.check(id);
	}

	public void endSession(String id) {
		
	}

	protected ComparisonBuilder createComparison() {
		EntityType<ExampleBean> entityType = entityTypeRepository.getEntityType(ExampleBean.class);
		ComparisonBuilder comparisonBuilder = comparisonBuilderFactory.create(entityType);
		
		entityType.visit(new ViewVisitor<ComparisonBuilder>() {

			public void visit(ComparisonBuilder context, Attribute attribute) {
				context.include(attribute);
			}

			public void visit(ComparisonBuilder context, Attribute attribute, Visitor<ComparisonBuilder> targetTypeVisitor) {
				if(((JavaMetaData)attribute).getAnnotation(Inject.class)==null) {
					ComparisonBuilder cascade = context.include(attribute).cascade();
					targetTypeVisitor.visit(cascade);
				}
			}

			public boolean visitSubView(ComparisonBuilder context, View view) {
				return false;
			}

			public boolean visitSuperView(ComparisonBuilder context, View view) {
				return false;
			}
		}, comparisonBuilder);
		return comparisonBuilder;
	}




	
}
