package org.atemsource.atem.adminclient.service;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.validation.constraints.Pattern;

import org.joda.time.DateTime;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@Scope("session")
public class SpringExampleRestService {

	private ArrayList<Car> list;

	@PostConstruct
	public void initialize() {
		list = new ArrayList<Car>();
		list.add(new Car("found you"));
		list.add(new Car("good to see you"));
		list.add(new Car("another one"));
	}

	/**
	 * find some data.
	 * 
	 * @param search
	 *            search token
	 * @return The search result
	 */
	@RequestMapping(value = "/car", method = RequestMethod.GET)
	@ResponseBody
	public List<Car> findCar(
			@RequestParam(required = false, value = "search") @Pattern(regexp = "[a-zA-Z0-9 ]*", message = "may only contain alphanumeric characters") String search) {
		return list;
	}

	/**
	 * post some data.
	 * 
	 * @param car
	 *            add a car to the collection
	 */
	@RequestMapping(value = "/car", method = RequestMethod.PUT)
	@ResponseBody
	public void addCar(@RequestBody Car car) {
		list.add(car);

	}

	/**
	 * post some data.
	 * 
	 * @param car
	 *            add a car to the collection
	 */
	@RequestMapping(value = "/car/{index}", method = RequestMethod.DELETE)
	@ResponseBody
	public void removeCar(@PathVariable("index") int index) {
		list.remove(index);

	}

	/**
	 * post some data.
	 * 
	 * @param car
	 *            add a car to the collection
	 */
	@RequestMapping(value = "/car/{index}", method = RequestMethod.PUT)
	@ResponseBody
	public void updateCar(@PathVariable(value = "index") int index, @RequestParam("label") String label,
			@RequestParam("length") int length) {
		Car car = list.get(index);
		car.setLabel(label);
		car.setLength(length);

	}
}
