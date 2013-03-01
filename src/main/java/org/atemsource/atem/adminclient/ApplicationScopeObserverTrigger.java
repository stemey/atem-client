package org.atemsource.atem.adminclient;

import java.util.Timer;
import java.util.TimerTask;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.inject.Inject;

import org.atemsource.atem.service.entity.ObservationService;
import org.atemsource.atem.service.observer.ObserverPublisher;

public class ApplicationScopeObserverTrigger extends TimerTask {
	@Inject
	private ObserverPublisher observerPublisher;
	private int delay = 5000;
	Timer timer = new Timer();

	@PostConstruct
	public void initialize() {
		timer.schedule(this, delay,delay);
	}
	
	@PreDestroy
	public void destroy() {
		timer.cancel();
	}
	
	public void run() {
		observerPublisher.check(ObservationService.APPLICATION);
	}
}
