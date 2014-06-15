package org.atemsource.atem.adminclient.jpa;

import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.atemsource.atem.api.attribute.annotation.Association;
import org.atemsource.atem.utility.transform.api.annotation.Conversion;

@Entity
/**
 * A category of cars(e.g. truck)
 * @author eee
 *
 */
public class Category {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer categoryId;

	public Integer getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}

	/**
	 * name of the category
	 */
	private String label;
	@OneToMany(targetEntity = Car.class)
	/**
	 * members of the category.
	 */
	private List<Car> cars;

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public List<Car> getCars() {
		return cars;
	}

	public void setCars(List<Car> cars) {
		this.cars = cars;
	}
}
