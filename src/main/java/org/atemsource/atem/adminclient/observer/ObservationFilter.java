package org.atemsource.atem.adminclient.observer;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import org.atemsource.atem.api.BeanLocator;

public class ObservationFilter implements Filter{

	public void destroy() {
	}

	public void doFilter(ServletRequest arg0, ServletResponse arg1, FilterChain arg2) throws IOException,
			ServletException {
		arg2.doFilter(arg0, arg1);
		BeanLocator.getInstance().getInstance(ObserverPublisher.class).check("application");
	}

	public void init(FilterConfig arg0) throws ServletException {
	}

}
