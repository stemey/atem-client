package org.atemsource.atem.adminclient.observer;

import org.atemsource.atem.utility.observer.EntityObserver;
import org.atemsource.atem.utility.observer.WatchHandle;

public class Observation {
	private EntityObserver entityObserver;
	private String channelName;
	private boolean subscribed;
	private WatchHandle watchHandle;
	public WatchHandle getWatchHandle() {
		return watchHandle;
	}
	public void setWatchHandle(WatchHandle watchHandle) {
		this.watchHandle = watchHandle;
	}
	public EntityObserver getEntityObserver() {
		return entityObserver;
	}
	public void setEntityObserver(EntityObserver entityObserver) {
		this.entityObserver = entityObserver;
	}
	public String getChannelName() {
		return channelName;
	}
	public void setChannelName(String channelName) {
		this.channelName = channelName;
	}
	public boolean isSubscribed() {
		return subscribed;
	}
	public void setSubscribed(boolean subscribed) {
		this.subscribed = subscribed;
	}
}
