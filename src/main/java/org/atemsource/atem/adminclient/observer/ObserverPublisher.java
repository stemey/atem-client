package org.atemsource.atem.adminclient.observer;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

import org.atemsource.atem.utility.compare.AttributeChange;
import org.atemsource.atem.utility.compare.Difference;
import org.atemsource.atem.utility.observer.AttributeListener;
import org.atemsource.atem.utility.observer.EntityObserver;
import org.atemsource.atem.utility.observer.WatchHandle;
import org.cometd.bayeux.Bayeux;
import org.cometd.bayeux.client.ClientSession;
import org.cometd.bayeux.client.ClientSessionChannel;
import org.cometd.bayeux.client.ClientSessionChannel.MessageListener;
import org.cometd.bayeux.server.BayeuxServer;
import org.cometd.bayeux.server.BayeuxServer.BayeuxServerListener;
import org.cometd.bayeux.server.ConfigurableServerChannel;
import org.cometd.bayeux.server.ServerChannel;
import org.cometd.bayeux.server.ServerChannel.SubscriptionListener;
import org.cometd.bayeux.server.ServerSession;
import org.cometd.server.BayeuxServerImpl;
import org.eclipse.jetty.util.ConcurrentHashSet;
import org.springframework.stereotype.Component;

@Component
public class ObserverPublisher {
	private BayeuxServer bayeuxServer;
	private Map<String, Set<Observation>> observationsForSession = new ConcurrentHashMap<String, Set<Observation>>();

	public void initialize() {

		clientSession = bayeuxServer.newLocalSession("entity");
		clientSession.handshake();
		for (Observation observation : observations.values()) {
			boolean created = bayeuxServer.createIfAbsent(observation.getChannelName(),
					new ServerChannel.Initializer() {
						public void configureChannel(ConfigurableServerChannel channel) {
							channel.setPersistent(true);
						}
					});
			SubscriptionListener subscriptionListener = new SubscriptionListener() {

				public void subscribed(ServerSession session, ServerChannel channel) {
					Observation observation = observations.get(channel.getId());
					if (observation != null) {
						observation.setSubscribed(true);
					}

				}

				public void unsubscribed(ServerSession session, ServerChannel channel) {
					Observation observation = observations.get(channel.getId());
					if (observation != null) {
						observation.setSubscribed(false);
					}

				}
			};
			bayeuxServer.addListener(new BayeuxServer.SubscriptionListener() {

				public void subscribed(ServerSession session, ServerChannel channel) {
					Observation observation = observations.get(channel.getId());
					if (observation != null) {
						observation.setSubscribed(true);
					}

				}

				public void unsubscribed(ServerSession session, ServerChannel channel) {
					Observation observation = observations.get(channel.getId());
					if (observation != null) {
						observation.setSubscribed(false);
					}

				}
			});
		}

	}

	@PreDestroy
	public void destroy() throws Exception {
		clientSession.disconnect();
	}

	private Map<String, Observation> observations = new ConcurrentHashMap<String, Observation>();

	public String addObservable(String sessionId, final String name, EntityObserver entityObserver) {
		String channelName = createChannelname(sessionId, name);
		final Observation observation = new Observation();
		observation.setEntityObserver(entityObserver);
		observation.setChannelName(channelName);
		observations.put(channelName, observation);
		Set<Observation> set = observationsForSession.get(sessionId);
		if (set == null) {
			set = new ConcurrentHashSet<Observation>();
			observationsForSession.put(sessionId, set);
		}
		set.add(observation);
		WatchHandle watchHandle = entityObserver.watch(new AttributeListener() {

			public boolean onEvent(Difference difference) {
				if (difference instanceof AttributeChange) {
					AttributeChange change= (AttributeChange) difference;
					Map<String,Object> diff= new HashMap<String, Object>();
					diff.put("path",change.getPath());
					diff.put("oldValue",change.getOldValue());
					diff.put("newValue",change.getNewValue());
					clientSession.getChannel(observation.getChannelName()).publish(diff);
				}
				return true;
			}
		});
		observation.setWatchHandle(watchHandle);

		return channelName;
	}

	protected String createChannelname(String sessionId, final String name) {
		return "/atem/entity/" + sessionId + "/" + name;
	}

	private ClientSession clientSession;

	public void check(String sessionId) {
		Set<Observation> observations = observationsForSession.get(sessionId);
		if (observations != null) {
			for (Observation observation : observations) {
				if (observation.isSubscribed()) {
					observation.getEntityObserver().check();
				}
			}
		}

	}

	public void closeSession(String sessionId) {
		Set<Observation> observations = observationsForSession.get("sessionId");
		for (Observation observation : observations) {
			if (observation.isSubscribed()) {
				clientSession.getChannel(observation.getChannelName()).unsubscribe();
			}
			this.observations.remove(observation.getChannelName());
		}
		observationsForSession.remove("sessionId");
	}

	public void subscribe(String sessionId, String name, MessageListener listener) {
		ClientSessionChannel channel = clientSession.getChannel(createChannelname(sessionId, name));
		channel.subscribe(listener);
		Observation observation = observations.get(channel.getId());
		if (observation != null) {
			observation.setSubscribed(true);
		}
	}

	public void bayeuxServerStarted(BayeuxServer bayeuxServer) {
		this.bayeuxServer = bayeuxServer;
		initialize();
	}
}
