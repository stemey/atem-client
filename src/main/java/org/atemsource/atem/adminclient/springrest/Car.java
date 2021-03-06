package org.atemsource.atem.adminclient.springrest;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;


public class Car {
	public Car(String label) {
		super();
		this.label = label;
	}

	public Car() {
		super();
	}

	/**
	 * name of the car
	 */
	@Pattern(regexp="[0-9a-zA-Z]+")
	@Size(min=5,max=20)
	@NotNull
	private String label;
	
	public int getLength() {
		return length;
	}

	public void setLength(int length) {
		this.length = length;
	}

	/**
	 * length of the car
	 */
	@Min(100)
	private int length;

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}
}
