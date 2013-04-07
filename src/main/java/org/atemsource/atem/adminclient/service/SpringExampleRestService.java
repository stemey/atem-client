package org.atemsource.atem.adminclient.service;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.validation.constraints.Pattern;

import org.apache.commons.lang.StringUtils;
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
	 * find the cars.
	 * 
	 * @param search
	 *            matched against a fragment of the car label
	 * @return The search result
	 */
	@RequestMapping(value = "/car", method = RequestMethod.GET)
	@ResponseBody
	public List<Car> findCar(
			@RequestParam(required = false, value = "search") @Pattern(regexp = "[a-zA-Z0-9 ]*", message = "may only contain alphanumeric characters") String search) {
		if (StringUtils.isEmpty(search)) {
			return list;
		} else {
			List<Car> filtered = new LinkedList<Car>();
			for (Car car : list) {
				if (car.getLabel().contains(search)) {
					filtered.add(car);
				}
			}
			return filtered;
		}
	}

	/**
	 * post some data.
	 * 
	 * @param car
	 *            the car added
	 */
	@RequestMapping(value = "/car", method = RequestMethod.PUT)
	@ResponseBody
	public void addCar(@RequestBody Car car) {
		list.add(car);

	}

	/**
	 * post some data.
	 * 
	 * @param index
	 *            the index of the car to remove
	 * 
	 */
	@RequestMapping(value = "/car/{index}", method = RequestMethod.DELETE)
	@ResponseBody
	public void removeCar(@PathVariable("index") int index) {
		list.remove(index);

	}

	/**
	 * update a car
	 * 
	 * @param index
	 *            the index of the car
	 * @param label
	 *            its new label
	 * @param length
	 *            its new length
	 */
	@ResponseBody
	@RequestMapping(value = "/car/{index}", method = RequestMethod.POST)
	public void updateCar(@PathVariable(value = "index") int index, @RequestParam("label") String label,
			@RequestParam("length") int length) {
		Car car = list.get(index);
		car.setLabel(label);
		car.setLength(length);

	}
}
