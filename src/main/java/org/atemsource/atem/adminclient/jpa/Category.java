package org.atemsource.atem.adminclient.jpa;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import org.atemsource.atem.adminclient.JsonRefConverter;
import org.atemsource.atem.api.attribute.annotation.Association;
import org.atemsource.atem.utility.transform.api.annotation.Conversion;

@Entity
public class Category {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int categoryId;
	public int getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(int categoryId) {
		this.categoryId = categoryId;
	}

	private String label;
	@ManyToOne(targetEntity=Car.class)
	@Association(targetType=Car.class)
	private Set<Car> cars;

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public Set<Car> getCars() {
		return cars;
	}

	public void setCars(Set<Car> cars) {
		this.cars = cars;
	}
}
