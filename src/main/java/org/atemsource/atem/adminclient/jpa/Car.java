package org.atemsource.atem.adminclient.jpa;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import org.atemsource.atem.api.attribute.annotation.Association;

@Entity
/**
 * A car (e.g. sportscar, truck)
 * @author eee
 *
 */
public class Car {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer carId;
	/**
	 * the price of the car.
	 */
	private double price;
	/**
	 * powersteering makes it easy to drive.
	 */
	private boolean powerSteering;
	/**
	 * the name of the car.
	 */
	private String label;

	/**
	 * the color of the car (e.g. black)
	 */
	private String color;
	@OneToMany(targetEntity = Feature.class, cascade = CascadeType.ALL)
	/**
	 * a list of features.
	 */
	private List<Feature> features;

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public Integer getCarId() {
		return carId;
	}

	public void setCarId(Integer carId) {
		this.carId = carId;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public boolean isPowerSteering() {
		return powerSteering;
	}

	public void setPowerSteering(boolean powerSteering) {
		this.powerSteering = powerSteering;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public List<Feature> getFeatures() {
		return features;
	}

	public void setFeatures(List<Feature> features) {
		this.features = features;
	}
}
