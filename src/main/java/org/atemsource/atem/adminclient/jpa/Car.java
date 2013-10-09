package org.atemsource.atem.adminclient.jpa;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Transient;

import org.atemsource.atem.api.attribute.annotation.Association;

@Entity
public class Car {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int carId;
	private double price;
	private boolean powerSteering;
	private String label;
	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	private String color;
	@OneToMany(targetEntity=Feature.class, cascade=CascadeType.ALL)
	@Association(targetType=Feature.class,composition=true)
	private List<Feature> features;

	public int getCarId() {
		return carId;
	}

	public void setCarId(int carId) {
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
