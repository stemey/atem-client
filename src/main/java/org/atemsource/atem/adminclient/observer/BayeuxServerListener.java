package org.atemsource.atem.adminclient.observer;

import javax.servlet.ServletContextAttributeEvent;
import javax.servlet.ServletContextAttributeListener;

import org.atemsource.atem.adminclient.ObserverInitializer;
import org.atemsource.atem.api.BeanLocator;
import org.cometd.bayeux.server.BayeuxServer;

public class BayeuxServerListener implements ServletContextAttributeListener{

	public void attributeAdded(ServletContextAttributeEvent event) {
		if(event.getName().equals(BayeuxServer.ATTRIBUTE)) {
			BeanLocator.getInstance().getInstance(ObserverPublisher.class).bayeuxServerStarted((BayeuxServer) event.getValue());
		}
		
	}

	public void attributeRemoved(ServletContextAttributeEvent event) {
	}

	public void attributeReplaced(ServletContextAttributeEvent event) {
	}

}
