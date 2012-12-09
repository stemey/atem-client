package org.atemsource.atem.adminclient.observer;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

import org.cometd.bayeux.client.ClientSession;
import org.cometd.server.BayeuxServerImpl;
import org.springframework.stereotype.Component;
import org.springframework.test.annotation.Timed;

public class ObserverPublisher {
	private BayeuxServerImpl bayeuxServer;

	@PostConstruct
	public void initialize() throws Exception {
		// Prepare the transport
		Map<String, Object> options = new HashMap<String, Object>();
		bayeuxServer = new BayeuxServerImpl();
		bayeuxServer.start();
		publish();
	}

	@PreDestroy
	public void destroy() throws Exception {
		bayeuxServer.stop();
	}

	
	public void publish() {
		ClientSession client = bayeuxServer.newLocalSession("here");
		client.handshake();
		client.getChannel("/entity").publish("hallo");
		client.disconnect();
	}
}
