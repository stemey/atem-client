package org.atemsource.atem.adminclient.jpa;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

import org.atemsource.atem.api.attribute.annotation.Association;
import org.springframework.stereotype.Component;

@Entity
public class ExampleBean {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	/**
	 * just a simple text
	 */
	@NotNull
	private String text;
	/**
	 * a number
	 */
	private int number;
	/**
	 * some associated thingies
	 */
	@OneToMany(targetEntity=ExampleThing.class)
	private List<ExampleThing> things;

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public int getNumber() {
		return number;
	}

	public void setNumber(int number) {
		this.number = number;
	}

	public List<ExampleThing> getThings() {
		return things;
	}

	public void setThings(List<ExampleThing> things) {
		this.things = things;
	}
}
